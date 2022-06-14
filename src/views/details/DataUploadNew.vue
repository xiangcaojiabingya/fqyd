<template>
  <div class="main">
    <item-nav-bar title="合同附件上传" rightSet="rightSet" @onClickRight="onClickRight" />
    <div class="card_div">
      <div class="card_head">
        <div class="vertical_bar"></div>
        <div class="card_title">合同附件资料</div>
        <div class="card_tips">可上传图片和文件</div>
      </div>
      <div class="card_content">
        <file-up-sort
          :oldImgList="oldImgList"
          @addImg="addImg"
          @delOneImg="delOneImg"
        />
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
      >保存</van-button>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import FileUpSort from '@/components/common/FileUpSort.vue';
import { apiUrl, ajaxPostPlus } from "@/api.js";
import { dealContactList } from "@/utils/ImageData.js"
import { disableWebViewScreenShot, cancelNoScreenShot } from "@/utils/index.js";

export default {
  name: "DataUpload", //上传合同资料-可查看已上传合同（最新版本）
  components: { ItemNavBar, FileUpSort },
  prop: {},
  data() {
    return {
      flowId: this.$route.query.flowId,
      creditApplyId: this.$route.query.creditApplyId,
      loanApplyId: this.$route.query.loanApplyId,
      currentNodeTaskId: this.$route.query.currentNodeTaskId,
      oldImgList: [], //图片和文件的列表展示
      requestData: {}, //获取到全部网络数据用于点击保存时提交数据
      netWorkData: [], //获取服务器的影像资料
      attachmentList: [], //新上传的附件
      image_type: [//合同的影像类型
        {
          itemName: "最高额债权合同",
          itemDesc: "影像资料名称",
          dictKey: "image_kind",
          itemKey: "400",
        },
        {
          itemName: "本金最高额抵押合同",
          itemDesc: "影像资料名称",
          dictKey: "image_kind",
          itemKey: "401",
        },
        {
          itemName: "本金最高额保证合同",
          itemDesc: "影像资料名称",
          dictKey: "image_kind",
          itemKey: "402",
        },
        {
          itemName: "同意抵押声明",
          itemDesc: null,
          dictKey: "image_kind",
          itemKey: "403",
        },
        {
          itemName: "其他",
          itemDesc: "影像资料名称",
          dictKey: "image_kind",
          itemKey: "x",
        },
      ]
    };
  },
  computed: {},
  created() { },
  mounted() {
    // this.$toast(process.env.NODE_ENV);
    disableWebViewScreenShot();
    this.getNetWorkData();
  },
  methods: {
    // 跳转到影像资料页面
    onClickRight() {
      this.$router.push({
        name: "ImageData",
        params: {
          flag: "1", //标志,支用申请2  授信里面 1   客户5
          creditApplyId: this.creditApplyId,
          flowId: this.flowId,
          loanApplyId: this.loanApplyId,
        },
      });
    },
    //组件回传上传以后的文件
    addImg(value) {
      let newImg = {
        imageClass: "CREDIT_CONTRACT",
        imageClassName: "授信合同资料",
        fileKind: value.fileKind,//影像资料类型
        filePath: value.filePath,//影像资料地址
        type: value.type,
        name: value.name,
      }
      this.attachmentList.push(newImg);
      console.log("回传图片地址：" + JSON.stringify(value));
    },
    delOneImg(index) {
      //删除图片
      this.attachmentList.splice(index, 1);
    },
    // 点击提交按钮
    submitImg() {
      let arr = [];
      arr.push(...this.netWorkData);
      if (this.attachmentList.length > 0) {
        arr.push(...this.attachmentList);
      }
      this.requestData.orderAttachment = JSON.stringify(arr);
      console.log("提交数据=" + JSON.stringify(this.requestData));
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      ajaxPostPlus(apiUrl.save, this.requestData)
        .then((result) => {
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
          this.requestData = result; //最后保存时需要提交的数据
          let arr = JSON.parse(this.requestData.orderAttachment);
          if (arr == undefined || arr == null) {
            this.netWorkData = [];
          } else {
            this.netWorkData = JSON.parse(result.orderAttachment);
          }
          this.oldImgList = dealContactList(this.netWorkData,this.image_type);//已上传文件的展示
          console.log("图片列表：" + JSON.stringify(result));
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
  padding: 15px 0;
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
  font-size: 14px;
  margin-left: 12px;
}
.card_tips {
  font-size: 12px;
  color: var(--color-gray-text);
  position: absolute;
  right: 15px;
}
/*内容
.card_content {
  margin: 0px 15px 0;
  padding: 0 0 15px;
}*/
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
