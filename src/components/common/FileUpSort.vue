<template>
  <div class="ImageData">
    <div v-for="(item, index) in TotalImgData" :key="index">
      <div>{{ item.imageKindName }}</div>
      <div class="img_div">
        <van-popover
          class="add_img"
          placement="right"
          trigger="click"
          v-model="showPopover[index]"
          :actions="actions"
          @select="onSelect"
        >
          <template #reference>
            <van-image
              v-if="item.isAdd"
              fit="fill"
              :src="require('@/assets/img/yxzl_tj_icon.png')"
              @click="clickAdd(item.imageKind,index)"
            />
          </template>
        </van-popover>
        <div class="img_main" v-for="(item2, index2) in item.imgList" :key="index2">
          <van-image class="img_item" fit="cover" :src="item2.imageUrl" @click="clickImg(item2)" />
          <img
            v-show="!item2.readonly"
            class="delete_img"
            src="@/assets/img/delete_icon.png"
            @click.prevent="deletePic(index,index2,item2)"
          />
        </div>
      </div>
    </div>
    <van-uploader
      id="uploader"
      class="uploader"
      :before-read="beforeRead"
      :after-read="afterRead"
      accept
    ></van-uploader>

  </div>
</template>

<script>
import { getLocation, MXCamera } from "@/utils/index.js";
import { ImagePreview } from "vant";
import { FilePreview } from "@/api.js";
import { uploadFile } from "@/utils/common";
import { baseImgUrl } from "@/api.js";

export default {
  name: "FileUpSort", //合同上传分类，影像资料上传分类，可上传图片和文件，以及拍照
  components: {},
  props: {
    oldImgList: {//已上传文件
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      TotalImgData: this.oldImgList,//用于展示的图片列表
      imageKind: "", //上传附件类型
      imageData: [], //新上传图片列表
      position: "", //地理位置
      images: [], //预览图片列表
      fileName: "", //选择文件名
      fileType: "", //选择文件类型
      fileBase64: "", //选择文件的base64
      actions: [{ text: '拍照' }, { text: '图片/文件' }],
      show: false,
      showPopover: [],
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
  created() { },
  mounted() { },
  watch: {
    oldImgList(newVal) {
      this.oldImgList = newVal
      this.TotalImgData = newVal
    }
  },
  methods: {
    clickAdd(type, index) {//点击添加按钮
      this.imageKind = type;
      // this.showPopover[index] = true
      console.log(type,index);
    },
    onSelect(actions, index) {
      if (index == 0) {
        this.takephoto();
      } else {
        document.getElementById("uploader").click();
      }
    },
    beforeRead(file) {
      //经测试已发现的接口不支持的文件格式："image/webp",cvs,video/mp4，text/xml，"image/tiff",
      console.log("文件读取前=" + file.type + "!!!!" + file.name);
      this.fileName = file.name;
      this.fileType = file.type;
      if ((this.imageKind == '400' || this.imageKind == '401' || this.imageKind == '402')
        && file.type !== 'application/pdf') {
        this.$toast('请上传 pdf 格式文件');
        return false;
      }
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
      if (this.imageKind == '400' || this.imageKind == '401' || this.imageKind == '402') {
        this.$toast("请上传 pdf 格式文件")
        return
      }
      getLocation() // 获取地理位置
        .then((res) => {
          this.position = res;
          MXCamera(this.position)
            .then((res) => {
              console.log("拍照结果返回=" + JSON.stringify(res));
              this.fileType = "image/png";
              let date = new Date();
              this.fileName = date.getTime() + ".png";
              // e:InvalidCharacterError: Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.
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
        .catch((e) => {
          this.$toast("定位获取失败")
        });
    },

    //删除图片
    deletePic(fatherIndex, childIndex, childItem) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要删除这张图片吗？",
        })
        .then(() => {
          let temp = this.TotalImgData[fatherIndex].imgList;
          temp.splice(childIndex, 1);
          this.TotalImgData[fatherIndex].imgList = temp;
          for (let i in this.imageData) {
            if (this.imageData[i].endUrl === childItem.endUrl) {
              this.$emit("delOneImg", i);
            }
          }
        })
        .catch(() => { });
    },

    //上传附件
    uploadImg(blob) {
      var canvas = document.createElement("canvas");
      var dataURL = canvas.toDataURL("image/png", 0.5);
      let newBlob = this.blobToFile(blob, this.fileName);
      var param = new FormData(document.forms[0]);
      param.append("file", newBlob, this.fileName);
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      uploadFile(param)
        .then((result) => {
          if (result.data.responseType == "HSJRY_SUCCESS") {
            console.log("上传=" + JSON.stringify(result));
            let filePath = result.data.data.fileUrl;
            let ext = filePath.substr(filePath.lastIndexOf(".") + 1); //获取后缀
            let temp = filePath.substr(filePath.lastIndexOf(":") + 1);
            let pathUrl = temp.substr(temp.indexOf("/") + 1); //
            //加入展示列表
            this.TotalImgData.forEach(element => {
              if (this.imageKind == element.imageKind) {
                if (this.imageTypes.indexOf(this.fileType) == -1) {
                  //不是图片
                  element.imgList.push({
                    imageUrl: require("@/assets/img/file.png"),
                    isImg: false,
                    fileUrl: result.data.data.fileUrl, //文件地址，用于文件预览
                    fileType: ext, //文件类型，用于文件预览
                    resourceType: "YX", //用于文件预览
                    readonly: false,//是否只读标志
                    endUrl: pathUrl,//附件地址
                  });
                } else {
                  element.imgList.push({
                    imageUrl: baseImgUrl + pathUrl, //图片地址
                    isImg: true,
                    readonly: false,//是否只读标志
                    endUrl: pathUrl,//附件地址
                  });
                }
              }
            });
            this.imageData.push({
              fileKind: this.imageKind,//影像资料类型
              filePath: result.data.data.fileUrl,//影像资料地址
              type: ext,
              name: this.fileName,
              endUrl: pathUrl,//附件地址
            })
            this.$emit("addImg", {
              imageClass: "OTHER",
              imageClassName: "其他",
              fileKind: this.imageKind,//影像资料类型
              filePath: result.data.data.fileUrl,//影像资料地址
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
    //点击图像
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
  padding: 15px;
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
  display: none;
}
.add_img {
  width: 28.67%;
  margin-left: 3.5%;
  float: left;
  margin-top: 10px;
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
