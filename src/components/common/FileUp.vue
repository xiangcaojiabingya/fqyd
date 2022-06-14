<template>
  <div class="ImageData">
    <div class="title_div">
      <span>选择文件</span>
      <img src="@/assets/img/camera.png" width="25" height="25" @click="takephoto" />
    </div>
    <div class="img_div">
      <div class="img_main" v-for="(item, index) in imageData" :key="index">
        <van-image
          class="img_item"
          fit="cover"
          width="100%"
          height="100%"
          :src="item.imageUrl"
          @click="clickImg(item)"
        />
        <img
          v-show="imageData != []"
          class="delete_img"
          src="@/assets/img/delete_icon.png"
          @click.prevent="deletePic(index)"
        />
      </div>
      <van-uploader
        class="uploader"
        :before-read="beforeRead"
        :after-read="afterRead"
        accept
        @click="clickImg(item)"
      >
        <van-image fit="fill" class="add_img" :src="require('@/assets/img/yxzl_tj_icon.png')" />
      </van-uploader>
    </div>
  </div>
</template>

<script>
import { getLocation, MXCamera } from "@/utils/index.js";
import { ImagePreview } from "vant";
import { FilePreview } from "@/api.js";
import { uploadFile } from "@/utils/common";
import { baseImgUrl } from "@/api.js";

export default {
  name: "FileUp", //合同上传，可上传图片和文件，以及拍照
  components: {},
  props: {
    title: String,
    imageType: String, //上传附件类型
    imgList: {
      type: Array,
      default() {
        return [];
      },
    },
    creditApplyId: String,
    loanApplyId: String,
  },
  data() {
    return {
      imageData: [], //上传的图片列表
      position: "", //地理位置
      images: [], //预览图片列表
      fileName: "", //选择文件名
      fileType: "", //选择文件类型
      fileBase64: "", //选择文件的base64
      acceptFile: [
        "application/msword", //.doc
        "application/pdf", //.pdf
        "text/plain", //文本文档
        "application/vnd.ms-excel", //表格
        "image/png",
        "image/jpg",
        "image/jpeg",
        "image/x-ms-bmp",
        "image/gif",
        "image/svg",
        "image/svg+xml",
      ],
      //图片类型用于判断是否是图片
      imageTypes: [
        "image/png", //支持
        "image/jpg", //支持
        "image/jpeg", //支持
        "image/x-ms-bmp", //支持
        "image/gif", //支持
        "image/svg+xml", //支持.svg
        "image/webp", //不支持
        "image/svg",
        "image/tiff", //不支持
        "image/x-photoshop", //不支持.psd
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {
    imageType(newVal) {
      this.imageType = newVal;
    },
  },
  methods: {
    beforeRead(file) {
      //经测试已发现的接口不支持的文件格式："image/webp",cvs,video/mp4，text/xml，"image/tiff",
      console.log("文件读取前=" + file.type + "!!!!" + file.name);
      this.fileName = file.name;
      this.fileType = file.type;
      return true;
    },
    afterRead(file, detail) {
      // 此时可以自行将文件上传至服务器
      this.fileBase64 = file.content;
      var blob = this.dataURLtoBlob(file.content);
      this.uploadImg(blob);
    },
    //拍照
    takephoto() {
      getLocation() // 获取地理位置
        .then((res) => {
          this.position = res;
          MXCamera(this.position)
            .then((res) => {
              this.fileType = "image/png";
              let date = new Date();
              this.fileName = date.getTime() + ".png";
              var blob = this.dataURLtoBlob(
                "data:image/png;base64," + res.base64
              );
              this.uploadImg(blob);
              console.log(`刷新列表成功` + res.localUrls[0] + "\n");
            })
            .catch((e) => {
              console.log(`e:${e}`);
              this.$toast.fail("拍照调用失败");
            });
        })
        .catch((e) => {});
    },

    //删除图片
    deletePic(index) {
      console.log(" 删除图片的index==" + index);
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要删除这张图片吗？",
        })
        .then(() => {
          let temp = this.imageData;
          temp.splice(index, 1);
          this.imageData = temp;
          this.$emit("delOneImg", index);
        })
        .catch(() => {});
    },

    //上传附件
    uploadImg(blob) {
      var canvas = document.createElement("canvas");
      var dataURL = canvas.toDataURL("image/png", 0.5);
      let newBlob = this.blobToFile(blob, this.fileName);
      var param = new FormData(document.forms[0]);
      param.append("file", newBlob, this.fileName);
      // param.append("creditApplyId", this.creditApplyId);
      // param.append(
      //   "loanApplyId",
      //   this.loanApplyId == undefined ? "" : this.loanApplyId
      // );
      // param.append("imageType", this.imageType);
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      uploadFile(param)
        .then((result) => {
          console.log("上传附件:" + JSON.stringify(result));
          if (result.data.responseType == "HSJRY_SUCCESS") {
            let filePath = result.data.data.fileUrl;
            let ext = filePath.substr(filePath.lastIndexOf(".") + 1); //获取后缀
            let temp = filePath.substr(filePath.lastIndexOf(":") + 1);
            let pathUrl = temp.substr(temp.indexOf("/") + 1); //
            if (this.imageTypes.indexOf(this.fileType) == -1) {
              //不是图片
              this.imageData.push({
                imageUrl: require("@/assets/img/file.png"),
                isImg: false,
                fileUrl: result.data.data.fileUrl, //文件地址，用于文件预览
                fileType: ext, //文件类型，用于文件预览
                resourceType: "YX", //用于文件预览
              });
            } else {
              this.imageData.push({
                imageUrl: baseImgUrl + pathUrl, //图片地址
                isImg: true,
              });
            }
            this.$emit("addImg", {
              imageClass: "OTHER",
              imageClassName: "其他",
              fileKind: this.imageType,
              filePath: result.data.data.fileUrl,
              type: ext,
              name: this.fileName,
            });
            this.$toast.clear();
          } else {
            this.$toast(result.data.errorMessage);
          }
        })
        .catch((error) => {
          this.$toast.clear();
          console.log("失败数据:" + JSON.stringify(error));
        });
    },

    //将base64转换为blob
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    // blob转file
    blobToFile(newBlob, fileName) {
      newBlob.lastModifiedDate = new Date();
      newBlob.name = fileName;
      return newBlob;
    },
    clickImg(item) {
      if (item.isImg == true) {
        this.previewImgs(item);
      } else {
        this.creditFilePreview(item);
      }
    },
    // 预览图片
    previewImgs(item) {
      ImagePreview({ images: [item.imageUrl] }); //单张图片预览
    },
    // 文件预览
    creditFilePreview(item) {
      this.$toast(this.fileName);
      let reqBody = {
        resourceUrl: item.fileUrl,
        fileType: item.fileType,
        resourceType: item.resourceType,
      };
      FilePreview(reqBody);
    },
  },
};
</script>

<style  scoped>
.ImageData {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding-top: 15px;
  font-size: var(--size-text-small);
}
.title_div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.img_div {
  width: 100%;
  margin: 10px 0 15px;
  display: flex;
  flex-wrap: wrap;
}

.img_main {
  position: relative;
  float: left;
  width: 28.67%;
  margin-left: 3.5%;
  margin-top: 10px;
}
.img_main::before {
  content: "";
  padding-top: 100%;
  display: block;
}

.img_item {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
.uploader {
  width: 28.67%;
  margin-left: 3.5%;
  float: left;
  margin-top: 10px;
  height: 100%;
}
.add_img {
  width: 100%;
  height: 100%;
}
.delete_img {
  width: 22px;
  height: 22px;
  padding: 10px;
  position: absolute;
  top: -15px;
  right: -15px;
}
</style>
