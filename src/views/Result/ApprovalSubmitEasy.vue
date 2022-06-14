<template>
  <div class="main">
    <item-nav-bar title="审批结果" />
    <my-textarea v-model="suggestion" placeholder="请填写申请意见均可填" my-title="审批意见" />
    <select-man
      v-if="manList.length <= 0 ? false : true"
      :cardTitle="cardTitle"
      :custIndex="custIndex"
      :manList="manList"
      @selectManFun="selectManFun"
    />
    <div class="btn_div">
      <van-button
        round
        type="info"
        color="#ff6619"
        size="large"
        class="btn_sty"
        @click="submitImg"
      >提交</van-button>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import MyTextarea from "@/views/Result/components/MyTextarea.vue";
import SelectMan from "@/views/Result/components/SelectMan.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";

export default {
  name: "ApprovalSubmitEasy", //审批提交的简单的页面，用于支用审批，尽调支用
  components: { ItemNavBar, MyTextarea, SelectMan },
  props: {},
  data() {
    return {
      suggestion: "", //申请意见
      manList: [],
      isSelected: "", //被选中的处理人
      item: {},
      orderContent: {},
      orderOther: "",
      orderAttachment: "",
      closeNum: 0, //计数器
      closeTag: 2, //拦截固定值，请求次数
      custIndex: -1, //默认客户经理索引
      custMgrId: this.$route.query.custMgrId, //默认客户经理编号
      cardTitle: "下一岗位：",
      type: this.$route.query.type,
      currentNodeCode: this.$route.query.currentNodeCode,
      ownerList: []
    };
  },
  computed: {},
  created() {},
  mounted() {
    // var itemTemp = this.$route.query.item;
    // this.item = JSON.parse(itemTemp);
    this.item.flowId = this.$route.query.flowId;
    this.item.currentNodeTaskId = this.$route.query.currentNodeTaskId;
    this.item.processId = this.$route.query.processId;
    this.item.applyId = this.$route.query.applyId;
    this.$toast.loading({
      duration: 0, // 持续展示 this.$toast
      forbidClick: true,
      message: "加载中...",
      loadingType: "spinner"
    });

    this.getManList();
    this.getOrderContent();
  },
  methods: {
    selectManFun(index) {
      this.isSelected = this.manList[index];
    },
    // 点击提交按钮
    submitImg() {
      if (this.manList.length > 0 && this.checkNull(this.isSelected)) {
        this.$toast("请选择处理人");
        return;
      }
      //授信结束 审批意见必填

      if (this.suggestion == null || this.suggestion == "") {
        this.$toast("请填写审批意见");
        return;
      }

      console.log(
        "提交=审批意见" + this.suggestion + ",处理人" + this.isSelected.name
      );

      // this.orderContent  判断一下 watch 为空 客户经理经理
      //"currentNodeCode": "consumer_manager", consumer_manager_end
      // if (this.item.currentNodeCode == "consumer_manager_end") {
      //   let oc = JSON.parse(this.orderContent);
      //   if (
      //     this.checkNull(oc.watchAccount) ||
      //     this.checkNull(oc.watchOpenBank) ||
      //     this.checkNull(oc.watchOpenBankName) ||
      //     this.checkNull(oc.watchSubBranch)
      //   ) {
      //     this.$toast("监管账户信息不足，请前去填写！");
      //     return;
      //   }
      // }

      this.$toast.loading({
        duration: 0, // 持续展示 this.$toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner"
      });
      if (this.type == "sxcx" && this.currentNodeCode == "fh-fuhe") {
        var content = this.$route.query.orderContent;
        console.log(
          "qqqqq" +
            JSON.stringify(JSON.parse(JSON.parse(content).fq_dataSource))
        );
        this.ownerList = [];
        JSON.parse(JSON.parse(content).fq_dataSource).forEach(element => {
          var connPersonType = element.connPersonType;

          if (connPersonType == "04") {
            this.ownerList = [
              {
                name: element.name,
                certificateType: element.certificateType,
                certificateNo: element.certificateNo,
                connPersonType: "02"
              },
              {
                name: element.name,
                certificateType: element.certificateType,
                certificateNo: element.certificateNo,
                connPersonType: "03"
              }
            ];
          } else if (connPersonType == "05") {
            this.ownerList = [];
          } else {
            this.ownerList.push({
              name: element.name,
              certificateType: element.certificateType,
              certificateNo: element.certificateNo,
              connPersonType: element.connPersonType
            });
          }
        });
        var lishData = {
          creditApplyId: this.$route.query.applyId,
          custMgrId: this.$route.query.custMgrId,
          custMgrName: this.$route.query.custMgrName,
          organId: this.$route.query.organId,
          organName: this.$route.query.organName,
          ownerList: this.ownerList,
          productId: "FQD001"
        };
        console.log(
          "contractAndGuarantyEstablish请求参数=" + JSON.stringify(lishData)
        );
        ajaxPostPlus(apiUrl.contractAndGuarantyEstablish, lishData)
          .then(res => {
            this.sumit();
          })
          .catch(err => {
            this.$toast.clear();
            this.$toast("担保信息创建失败");
          });
      } else {
        this.sumit();
      }
    },
    sumit() {
      var data = {
        flowIdList: [this.item.flowId], //	流程编号List<String>
        orderAttachment: "[]", //进件附件
        orderContent: this.orderContent, //进件详情
        orderOther: this.orderOther,
        orderAttachment: this.orderAttachment,
        reply: "2", //审批结果 通过
        orderId: this.item.flowId, //工作流编号
        taskId: this.item.currentNodeTaskId, //	任务编号
        roleIdList: [this.isSelected.roleId], //	角色编号列表
        userIdList: [this.isSelected.userId], //	用户编号列表
        operator: localStorage.getItem("operatorId"), //	操作人
        fraudPost: "0",
        context: this.suggestion
      };
      console.log("提交请求参数=" + JSON.stringify(data));

      ajaxPostPlus(apiUrl.submit, data)
        .then(res => {
          this.$toast.clear();
          //{"responseType":"HSJRY_SUCCESS","data":null,"httpStatus":200,"errorMessage":null,"errorCode":null,"rpcResult":"000000","parentIdemSerialId":null}
          this.$toast("审批成功");
          this.$router.go(-2);
        })
        .catch(err => {
          this.$toast.clear();
          this.$toast("审批失败");
        });
    },
    getManList() {
      var data = {
        applyId: this.item.applyId, //	申请编号
        processId: this.item.processId, //流程id
        taskId: this.item.currentNodeTaskId //任务id
      };
      console.log("queryNextNodeUser请求参数 = " + JSON.stringify(data));
      ajaxPostPlus(apiUrl.queryNextNodeUser, data)
        .then(res => {
          if (res.nodeName != undefined) {
            this.cardTitle = "下一岗位：" + res.nodeName + "：";
          } else {
            this.cardTitle = "下一岗位：";
          }
          res.userDtoList.forEach(item => {
            this.manList.push({
              name: item.userName,
              roleId: item.roleId,
              userId: item.userId
            });
          });
          this.item.currentNodeCode = this.$route.query.currentNodeCode;
          if (this.item.currentNodeCode == "fh-fuhe") {
            for (let index = 0; index < this.manList.length; index++) {
              const cust = this.manList[index];
              if (cust.userId == this.custMgrId) {
                this.custIndex = index;
              }
            }
          }
          // this.$toast.clear();
          this.closeLoading();
        })
        .catch(err => {
          this.closeLoading();
          // this.$toast.clear();
        });
    },
    getOrderContent() {
      var data = {
        flowId: this.item.flowId
      };
      return ajaxPostPlus(apiUrl.queryOrderContent, data)
        .then(res => {
          this.orderContent = res.orderContent;
          this.orderOther = res.orderOther;
          this.orderAttachment = res.orderAttachment;
          this.closeLoading();
        })
        .catch(err => {
          this.closeLoading();
        });
    },
    checkNull(obj) {
      if (obj == null || obj == "") {
        return true;
      }
      if (obj.length == 0) {
        return true;
      }
      return false;
    },
    closeLoading() {
      this.closeNum += 1;
      if (this.closeNum >= this.closeTag) {
        this.$toast.clear();
      }
    }
  }
};
</script>

<style  scoped>
.main {
  font-size: 14px;
  padding: 46px 0 84px;
}

/*按钮*/
.btn_div {
  width: 100%;
  background: var(--color-Lightgray-bg);
  padding: 20px 15px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0px;
}
.btn_sty {
  height: var(--size-bottom-btn);
}
</style>
