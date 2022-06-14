<template>
  <!-- 尽调上传影像资料 -->
  <div class="main">
    <item-nav-bar title="尽调信息" />
    <div class="card_div">
      <div class="card_head">
        <div class="vertical_bar"></div>
        <div class="card_title">影像资料</div>
        <div class="card_tips">只能上传图片可上传多张图片</div>
      </div>
      <div class="card_content">
        <take-photo imagetype="补充资料" :imgList="imgList" @addImg="addImg" />
      </div>
    </div>
    <div class="btn_div">
      <van-button
        round
        type="info"
        color="#ff6619"
        size="large"
        class="btn_sty"
        @click="submitImg"
        >保存</van-button
      >
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import TakePhoto from "@/components/common/TakePhoto.vue";
import { disableWebViewScreenShot, cancelNoScreenShot } from "@/utils/index.js";
import { apiUrl, ajaxPostPlus } from "@/api.js";
import { getOtherImgList } from "@/utils/ImageData.js";
export default {
  name: "JinDiaoImageUp", //尽调上传影像资料（旧版本）
  components: { ItemNavBar, TakePhoto },
  props: {},
  data() {
    return {
      flowId: this.$route.query.flowId,
      currentNodeTaskId: this.$route.query.currentNodeTaskId,
      imgList: [], //图片和文件的列表
      requestData: {}, //获取到全部网络数据用于点击保存时提交数据
      netWorkData: {}, //获取服务器的影像资料
    };
  },
  computed: {},
  created() {},
  mounted() {
    // this.$toast(process.env.NODE_ENV);
    disableWebViewScreenShot();
    this.getNetWorkData();
  },
  methods: {
    // 点击提交按钮
    submitImg() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      this.requestData.orderId = this.flowId;
      this.requestData.taskId = this.currentNodeTaskId;
      console.log("提交数据=" + this.requestData.orderAttachment);
      console.log("数据" + JSON.stringify(this.requestData));

      ajaxPostPlus(apiUrl.save, this.requestData)
        .then((result) => {
          console.log("数据保存：" + JSON.stringify(result));
          this.$toast.clear();
          if (result == null) {
            this.$toast("保存成功");
            this.$router.go(-1);
          }
        })
        .catch((error) => {
          this.$toast.clear();
        });
    },
    //组件回传上传以后的文件
    addImg(value) {
      let arr = JSON.parse(this.requestData.orderAttachment);
      if (arr == undefined || arr == null) {
        arr = [];
        arr.push(value);
      } else {
        arr.push(value);
      }
      this.requestData.orderAttachment = JSON.stringify(arr);
      console.log("回传图片地址：" + JSON.stringify(value));
    },
    //查询尽调信息
    getNetWorkData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      ajaxPostPlus(apiUrl.queryOrderContent, {
        flowId: this.flowId,
      })
        .then((result) => {
          console.log("尽调信息：" + JSON.stringify(result));
          this.requestData = result; //最后保存时需要提交的数据
          this.netWorkData = JSON.parse(result.orderAttachment);
          this.imgList = getOtherImgList(this.netWorkData);
          console.log("图片列表：" + result.orderAttachment);
          this.$toast.clear();
        })
        .catch((error) => {
          this.$toast.clear();
        });
    },
  },

  destroyed() {
    // 取消截屏（只在Android手机有用）
    cancelNoScreenShot();
  },
};
</script>

<style  scoped>
.main {
  padding: 46px 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
  box-sizing: border-box;
}
.card_div {
  margin: 12px 0 0;
  background: #ffffff;
}
/*头部*/
.card_head {
  padding: var(--form-padding-top) 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
/**/
/*竖杠*/
.vertical_bar {
  width: 3px;
  height: 20px;
  background: #ff6619;
}
/*标题*/
.card_title {
  color: #ff6619;
  font-size: var(--size-text-small);
  margin-left: 12px;
}
.card_tips {
  font-size: 12px;
  color: var(--color-gray-text);
  position: absolute;
  right: 15px;
}
/*内容*/
.card_content {
  margin: 0px 15px 0;
  padding: 0 0 15px;
}
/*按钮*/
.btn_div {
  width: 100%;
  background: var(--color-Lightgray-bg);
  padding: 30px 15px;
  box-sizing: border-box;
}
.btn_sty {
  height: 44px;
}
</style>
