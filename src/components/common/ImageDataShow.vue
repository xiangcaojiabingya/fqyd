<template>
  <!-- 影像资料展示（已用）-->
  <div class="ImageData">
    <div>{{ imagetype }}</div>
    <div class="img_div">
      <div class="img_main" v-for="(item, index) in imgList" :key="index">
        <van-image
          class="img_item"
          fit="cover"
          :src="item.imageUrl"
          @click="clickImg(item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
import { FilePreview } from "@/api.js";

export default {
  name: "ImageDataShow",
  components: {},
  props: {
    imagetype: { type: String, default: "" },
    imgList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    images() {
      let list = [];
      this.imgList.forEach((item) => {
        if (item.isImg == true) {
          list.push(item.imageUrl);
        }
      });
      return list;
    },
  },
  created() {},
  mounted() {},
  methods: {
    //点击图片
    clickImg(item) {
      console.log("是图片？" + item.isImg);
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
      console.log(" 点击文件="+item.resourceName);
      let reqBody = {
        resourceId: item.resourceId,
        resourceName: item.resourceName,
        resourceUrl: item.fileUrl,
        chnlCode: "14",
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
  padding: 15px;
  box-sizing: border-box;
  font-size: var(--size-text-small);
}
.img_div {
  width: 100%;
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
}
.img_main {
  position: relative;
  width: 33.33%;
  height: 120px;
  padding: 5px;
  box-sizing: border-box;
}

.img_item {
  width: 100%;
  height: 100%;
}
</style>
