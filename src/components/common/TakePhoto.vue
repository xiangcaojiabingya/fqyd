<template>
  <!-- 影像资料上传加水印（已用）-->
  <div class="ImageData">
    <div>{{ imagetype }}</div>
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
        <!-- <img
          v-show="imageData != []"
          class="delete_img"
          src="@/assets/img/delete_icon.png"
          @click.prevent="deletePic(index)"
        />-->
      </div>
      <van-image
        fit="cover"
        class="add_img"
        @click="addImgs()"
        :src="require('@/assets/img/yxzl_tj_icon.png')"
      />
    </div>
  </div>
</template>

<script>
import { getLocation, MXCamera, chooseImg } from "@/utils/index.js";
import { ImagePreview } from "vant";
import { FilePreview } from "@/api.js";
import { uploadFile } from "@/utils/common";
import { baseImgUrl } from "@/api.js";
var blob;

export default {
  name: "TakePhoto",
  components: {},
  props: {
    imagetype: { type: String, default: "营业执照" },
    imgList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      imageData: [
        // require("@/assets/img/yxzl_tj_icon.png"),
        // require("@/assets/img/yxzl_tj_icon.png"),
        // require("@/assets/img/yxzl_tj_icon.png"),
        // require("@/assets/img/yxzl_tj_icon.png"),
      ],
      position: "",
      images: [],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {
    imgList(val, oldVal) {
      //普通的watch监听
      console.log("数据变化：" + val.length);
      this.imageData = val;
    },
  },
  methods: {
    // 上传图片
    addImgs() {
      // 获取地理位置

      getLocation()
        .then((res) => {
          console.log(" =获取地理位置==" + res);
          this.position = res;
          MXCamera(this.position)
            .then((res) => {
              // this.imageData.push("data:image/jpg;base64," + base64);
              console.log(`刷新列表成功`);
              //调用
              blob = this.dataURLtoBlob("data:image/png;base64," + res.base64);
              this.uploadImg(blob);
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
        // on confirm
        .then(() => {
          let temp = this.imageData;
          temp.splice(index, 1);
          this.imageData = temp;
        })
        .catch(() => {
          // on cancel
        });
    },
    // 预览图片
    previewImgs(index) {
      ImagePreview({ images: this.imageData, startPosition: index });
    },
    //上传附件
    uploadImg(blob) {
      var canvas = document.createElement("canvas");
      var dataURL = canvas.toDataURL("image/png", 0.5);
      var param = new FormData(document.forms[0]);
      param.append("file", this.blobToFile(blob, "image.png"), "image.png");
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      uploadFile(param)
        .then((result) => {
          console.log("上传附件:" + JSON.stringify(result));
          let filePath = result.data.data.fileUrl;
          let temp = filePath.substr(filePath.lastIndexOf(":") + 1);
          let pathUrl = temp.substr(temp.indexOf("/") + 1); //
          this.imageData.push({
            imageUrl: baseImgUrl + pathUrl, //图片地址
            isImg: true,
          });

          let date = new Date();
          this.$emit("addImg", {
            imageClass: "OTHER",
            imageClassName: "上传资料及其他",
            fileKind: "x",
            filePath: result.data.data.fileUrl,
            type: null,
            name: date.getTime() + ".png",
          });
          this.$toast.clear();
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
      ImagePreview({ images: [item.imageUrl] });
    },
    // 文件预览
    creditFilePreview(item) {
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

.add_img {
  width: 28.67%;
  height: 100%;
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
