// 支用 申请信息
<template>
  <div class="Application2">
    <top />
    <item-nav-bar :title="title" :rightSet="rightSet" @onClickRight="onClickRight"></item-nav-bar>
    <div class="Application">
      <div class="content">
        <div class="title">
          <div class="left"></div>
          <div class="top">申请信息</div>
        </div>
        <div class="word" v-for="(item, index) in demoData" :key="index">
          <single-line-item
            :label="item.label"
            :value="item.value"
            :isShowLine="index == demoData.length - 1 ? false : true"
          ></single-line-item>
        </div>
      </div>
      <item-one-row :item="jiekuan" class="content2" @click="sceneImg()"></item-one-row>
      <div class="content">
        <div class="title">
          <div class="left"></div>
          <div class="top">借款账户</div>
        </div>
        <div class="word" v-for="(item, index) in demoData2" :key="index">
          <single-line-item
            :label="item.label"
            :value="item.value"
            :isShowLine="index == demoData2.length - 1 ? false : true"
          ></single-line-item>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <div class="left"></div>
          <div class="top">还款账户</div>
        </div>
        <div class="word" v-for="(item, index) in demoData3" :key="index">
          <single-line-item
            :label="item.label"
            :value="item.value"
            :isShowLine="index == demoData3.length - 1 ? false : true"
          ></single-line-item>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <div class="left"></div>
          <div class="top">受托收款账户</div>
        </div>
        <div class="word" v-for="(item, index) in demoData4" :key="index">
          <single-line-item
            :label="item.label"
            :value="item.value"
            :isShowLine="index == demoData4.length - 1 ? false : true"
          ></single-line-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleLineItem from "@/components/common/SingleLineItem.vue";
import ItemOneRow from "@/views/Result/components/ItemOneRow.vue";
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import Top from "@/components/module/Top.vue";
import { apiUrl, ajaxPostPlus, FilePreview } from "@/api.js";
import { codeToValue } from "@/utils/index.js";
export default {
  name: "Application2",
  components: {
    "single-line-item": SingleLineItem,
    "item-nav-bar": ItemNavBar,
    "item-one-row": ItemOneRow,
    Top,
  },
  data() {
    return {
      title: "支用申请",
      rightSet: "rightSet",
      jiekuan: {
        content: "合同预览",
        title: "借款合同"
      },
      demoData: [
        // { label: "客户名称", value: "" },
        // { label: "证件号码", value: "" },
        // { label: "手机号码", value: "" },
        { label: "申请单编号", value: "" },
        { label: "申请日期", value: "" },
        { label: "申请产品", value: "" },
        { label: "借款金额", value: "" },
        { label: "借款用途", value: "" },
        { label: "借款期限", value: "" },
        { label: "借款期限单位", value: "" },
        { label: "还款方式", value: "" },
        { label: "执行年利率", value: "" },
        { label: "担保方式", value: "" },
        { label: "支付方式", value: "" },
      ],
      demoData2: [
        { label: "借款账号", value: "" },
        { label: "借款户名", value: "" },
        { label: "借款行号", value: "" },
        { label: "借款行名", value: "" },
        { label: "是否本行卡", value: "" },
      ],
      demoData3: [
        { label: "还款账号", value: "" },
        { label: "还款户名", value: "" },
        { label: "还款行号", value: "" },
        { label: "还款行名", value: "" },
        { label: "是否本行卡", value: "" },
      ],
      demoData4: [
        { label: "受托收款账号", value: "" },
        { label: "受托收款户名", value: "" },
        { label: "受托收款行号", value: "" },
        { label: "受托收款行名", value: "" },
        { label: "受托收款账户是否本行卡", value: "" },
      ],
      dictKeys: [
        "term_unit",
        "loan_purpose",
        "loan_apply_status",
        "certificate_type",
        "repay_method",
        "pay_Method",
        "enum_boolean",
        "rcvAcctBankType",
      ],
      term_unit: [], //期限单位
      loan_purpose: [], // 借款用途
      loan_apply_status: [], // 状态
      certificate_type: [], // 证件类型
      enum_boolean:[],//是否本行卡
      rcvAcctBankType:[],//受托支付是否本行卡
      pay_Method:[],//支付方式
      repay_method:[],//还款方式
      // creditApplyId:'000CA2021050000000093',
      imageData: [],
      query: this.$route.query,
      loanApplyId: this.$route.query.loanApplyId,
      flowId: this.$route.query.flowId,
    };
  },
  methods: {
    getDictionary() {
      var reqBody = {
        dictKeys: this.dictKeys,
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, reqBody)
        .then((res) => {
          console.log(" -数据字典列表-" + JSON.stringify(res));
          try {
            var dist = res.dictItemMap;
            this.term_unit = dist.term_unit;
            this.loan_purpose = dist.loan_purpose;
            this.loan_apply_status = dist.loan_apply_status;
            this.certificate_type = dist.certificate_type;
            this.enum_boolean=dist.enum_boolean;
            this.rcvAcctBankType=dist.rcvAcctBankType;
            this.pay_Method = dist.pay_Method;
            this.repay_method = dist.repay_method;
            this.getData();
            this.getHt();
          } catch (error) {
            this.$toast("获取数据失败");
            this.$toast.clear();
          }
        })
        .catch((res) => {
          this.$toast.clear();
        });
    },
    // 获取类型、类别
    getKindType(code, flag) {
      let str = "";
      let list = [];
      if (flag == "type") {
        list = this.term_unit;
      } else if (flag == "demo") {
        list = this.loan_purpose;
      } else if (flag == "status") {
        list = this.loan_apply_status;
      } else if (flag == "certificate") {
        list = this.certificate_type;
      }else if (flag == "repay"){
        list = this.repay_method;
      }else if (flag == "payMethod"){
        list = this.pay_Method;
      }else if (flag == "enum"){
        list = this.enum_boolean;
      }else if(flag == 'rcv'){
        list = this.rcvAcctBankType;
      }
      if (list.length == 0) {
        this.getDictionary();
        return;
      } else {
        str = codeToValue(list, code);
      }
      return str;
    },
    getData() {
      ajaxPostPlus(apiUrl.ApplicationDetails, {
        loanApplyId: this.loanApplyId,
      })
        .then((res) => {
          try {
            console.log("申请信息" + JSON.stringify(res));
            this.demoData[0].value = res.loanApplyId;
            this.demoData[1].value = res.applyTime;
            // this.demoData[1].value = res.certificateNo;
            this.demoData[2].value = res.productName;
            this.demoData[3].value = res.applyAmount + "元";
            this.demoData[4].value = this.getKindType(res.loanPurpose, "demo");
            this.demoData[5].value = res.applyTerm;
            this.demoData[6].value = this.getKindType(res.applyTermUnit, "type");
            this.demoData[7].value = this.getKindType(res.repayMethod,"repay");
            this.demoData[8].value = res.applyRate+"%";
            this.demoData[9].value = '抵押';
            const applyContent=JSON.parse(res.applyContent);
            console.log("applyContent-----------",JSON.stringify(applyContent));
            this.demoData[10].value = this.getKindType(applyContent.payMethod,"payMethod");

            this.demoData2[0].value = applyContent.userBankCardAccountNo;
            this.demoData2[1].value = applyContent.userBankCardAccountName;
            this.demoData2[2].value = applyContent.userBankCardBranchCode;
            this.demoData2[3].value = applyContent.userBankCardBranchName;
            this.demoData2[4].value = this.getKindType(applyContent.ownCard,"enum");


            this.demoData3[0].value = applyContent.repayUserBankCardAccountNo;
            this.demoData3[1].value = applyContent.repayUserBankCardAccountName;
            this.demoData3[2].value = applyContent.repayUserBankCardBranchCode;
            this.demoData3[3].value = applyContent.repayUserBankCardBranchName;
            this.demoData3[4].value = this.getKindType(applyContent.repayOwnCard,"enum");

            this.demoData4[0].value = applyContent.rcvAcctNo;
            this.demoData4[1].value = applyContent.rcvAcctName;
            this.demoData4[2].value = applyContent.rcvAcctBankNo;
            this.demoData4[3].value = applyContent.rcvAcctBankName;
            this.demoData4[4].value = this.getKindType(applyContent.rcvAcctCardBelong,"rcv");

            // var time = res.applyTerm;
            // var unit = this.getKindType(res.applyTermUnit, "type");
            // this.demoData2[2].value = time + unit;
            // this.demoData2[4].value = this.getKindType(res.loanPurpose, "demo");
            // this.demoData4[0].value = this.getKindType(res.status, "status");
          } catch (error) {
            this.$toast("获取数据失败");
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },

    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({
        name: "ImageData",
        params: {
          flag: "2", //标志
          creditApplyId: this.loanApplyId,
          flowId: this.flowId,
          loanApplyId: this.loanApplyId,
        },
      });
    },
    getHt() {
      let reqBody = {
          flowId: this.flowId,
        };
        ajaxPostPlus(apiUrl.queryOrderContent, reqBody)
        .then((res) => {
          try {
            var netWorkImgData = JSON.parse(res.orderAttachment);
            console.log(" -影像资料：" + JSON.stringify(netWorkImgData));
            netWorkImgData.forEach(item => {
              if(item.fileKind == '17') {
                this.url = item.filePath
              }
            });
          } catch (error) {
            this.$toast("获取数据失败");
          }
            this.$toast.clear();
          })
          .catch((err) => {
            console.log(" -影像资料请求错误" + JSON.stringify(err));
            this.$toast.clear();
          });
    },
    sceneImg() {
      console.log("查看合同的url" + this.url);
      if (this.url == null) {
        this.$toast("无合同");
      } else {
        var filePath = this.url;
        // var resourceUrl = this.url.replace(/^http:\/\/[^/]/, "");
        // var resourceUrl = this.url.split('/').slice(3).join('/');
        let temp = filePath.substr(filePath.lastIndexOf(":") + 1);
        let resourceUrl = temp.substr(temp.indexOf("/") + 1);
        var index = filePath.lastIndexOf(".");
        var ext = filePath.substr(index + 1);
        var reqData = {
          resourceUrl: resourceUrl,
          fileType: ext,
          resourceType: "HT"
        };
        FilePreview(reqData);
      }
    },
  },
  mounted() {
    this.$toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: "加载中...",
      loadingType: "spinner",
    });
    this.getDictionary();
    // this.getData();
    console.log("Application2---接收页面传参-" + JSON.stringify(this.$route.query));
  },
  computed: {},
};
</script>

<style scoped>
.Application2 {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
.content {
  background-color: #ffffff;
  margin-top: 10px;
}
.content:last-child {
  margin-bottom: 12px;
}
.Application {
  margin-top: 46px;
}
.word {
  font-size: 14px;
  /* margin: 0 15px;*/
}
div.title {
  padding: var(--form-padding-top) 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
div.top {
  font-size: var(--size-text-small);
  margin-left: 10px;
  color: #ff6619;
}
div.left {
  width: 3px;
  height: 20px;
  background-color: #ff6619;
}
.content2 {
  margin-top: 12px;
}
</style>