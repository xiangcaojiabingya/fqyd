<template>
  <!-- 借据详情-》-->
  <div class="loan_return">
    <van-dropdown-menu>
      <van-dropdown-item
        :title="accountName"
        v-model="accountNameValue"
        :options="options"
        @change="toggleAccountName"
      />
      <div v-if="show1" class="card_div">
        <div class="contract_list" v-for="(item, index) in contractList">
          <div class="contract_item">
            <span>退货日期</span>
            <span>{{ item.refundTime }}</span>
          </div>
          <div class="contract_item">
            <span>外部订单号</span>
            <span>{{ item.thirdLoanApplyId }}</span>
          </div>
          <div class="contract_item">
            <span>外部订单日期</span>
            <span>{{ item.loanApplyDate }}</span>
          </div>
          <div class="contract_item">
            <span>借据号</span>
            <span>{{ item.loanInvoiceId }}</span>
          </div>
          <div class="contract_item">
            <span>结算类型</span>
            <span>{{ getKindType(item.settleType, "type3") }}</span>
          </div>
          <div class="contract_item">
            <span>结算金额</span>
            <span>{{ item.settleAmount }}</span>
          </div>
          <div class="contract_item">
            <span>客户名称</span>
            <span>{{ item.userName }}</span>
          </div>
        </div>
        <div v-if="noMsg" class="no_message">暂无数据</div>
      </div>
      <div v-if="show2" class="card_div">
        <div class="contract_list" v-for="(item, index) in contractList2">
          <div class="contract_item">
            <span>还款时间</span>
            <span>{{ item.tradeTime }}</span>
          </div>
          <div class="contract_item">
            <span>还款类型</span>
            <span>{{ getKindType(item.repayKind, "type") }}</span>
          </div>
          <div class="contract_item">
            <span>还款金额</span>
            <span>{{ item.repayAmt }}</span>
          </div>
          <div class="contract_item">
            <span>本金</span>
            <span>{{ item.repayPrincipal }}</span>
          </div>
          <div class="contract_item">
            <span>利息</span>
            <span>{{ item.repayInterest }}</span>
          </div>
          <div class="contract_item">
            <span>费用</span>
            <span>{{ item.repayFee }}</span>
          </div>
          <div class="contract_item">
            <span>罚息</span>
            <span>{{ item.repayOverdueFee }}</span>
          </div>
        </div>
        <div v-if="noMsg2" class="no_message">暂无数据</div>
      </div>
      <div v-if="show4" class="card_div">
        <div class="contract_list" v-for="(item, index) in contractList4">
          <div class="contract_item">
            <span>调整时间</span>
            <span>{{ item.applyTime }}</span>
          </div>
          <div class="contract_item">
            <span>调整前</span>
            <span>{{ item.oldRate + "%" }}</span>
          </div>
          <div class="contract_item">
            <span>调整后</span>
            <span>{{ item.adjustRate + "%" }}</span>
          </div>
          <div class="contract_item">
            <span>处理状态</span>
            <span>{{ getKindType(item.handleStatus, "type2") }}</span>
          </div>
          <div class="contract_item">
            <span>经办人</span>
            <span>{{ item.operatorName }}</span>
          </div>
        </div>
        <div v-if="noMsg4" class="no_message">暂无数据</div>
      </div>
      <div v-if="show5" class="card_div">
        <div class="contract_list" v-for="(item, index) in contractList5">
          <div class="contract_item">
            <span>调整时间</span>
            <span>{{ item.updateTime }}</span>
          </div>
          <div class="contract_item">
            <span>调整前利息</span>
            <span>{{ item.oldInterest + "元" }}</span>
          </div>
          <div class="contract_item">
            <span>调整后利息</span>
            <span>{{ item.oldInterest + item.adjustInterest + "元" }}</span>
          </div>
          <div class="contract_item">
            <span>调整前罚息</span>
            <span>{{ item.oldOverdueFee + "元" }}</span>
          </div>
          <div class="contract_item">
            <span>调整后罚息</span>
            <span>{{ item.oldOverdueFee + item.adjustOverdueFee + "元" }}</span>
          </div>
          <div class="contract_item">
            <span>调整前复利</span>
            <span>{{ item.originalCompoundInterestAdjustAmount + "元" }}</span>
          </div>
          <div class="contract_item">
            <span>调整后复利</span>
            <span>{{
              item.originalCompoundInterestAdjustAmount +
              item.compoundInterestAdjustAmount +
              "元"
            }}</span>
          </div>
          <!-- <div class="contract_item">
            <span>费用</span>
            <span>{{ item.value5}}</span>
          </div> -->
          <div class="contract_item">
            <span>操作人</span>
            <span>{{ item.operatorName }}</span>
          </div>
          <div class="contract_item">
            <span>处理状态</span>
            <span>{{ getKindType(item.handleStatus, "type2") }}</span>
          </div>
        </div>
        <div v-if="noMsg5" class="no_message">暂无数据</div>
      </div>
      <div v-if="show6" class="card_div">
        <div class="contract_list" v-for="(item, index) in contractList6">
          <div class="contract_item">
            <span>调整时间</span>
            <span>{{ item.adjustTime }}</span>
          </div>
          <div class="contract_item">
            <span>调整前</span>
            <span>{{ getKindType(item.lastRiskLevel, "type5") }}</span>
          </div>
          <div class="contract_item">
            <span>调整后</span>
            <span>{{ getKindType(item.newRiskLevel, "type5") }}</span>
          </div>
          <div class="contract_item">
            <span>调整原因</span>
            <span>{{ item.adjustReason }}</span>
          </div>
        </div>
        <div v-if="noMsg6" class="no_message">暂无数据</div>
      </div>
    </van-dropdown-menu>
  </div>
</template>

<script>
import SingleLineItem from "@/components/common/SingleLineItem.vue";
import { apiUrl, ajaxPostPlus, FilePreview, baseImgUrl } from "@/api.js";
import {
  codeToValue,
  isHasData,
  isAssetTypeAnImage,
  moneyFormat,
} from "@/utils/index.js";
export default {
  name: "LoanReturn", //借据详情-》借据信息
  components: { SingleLineItem },
  props: { loanInvoiceId: String },
  data() {
    return {
      resData: {}, //网络请求结果
      accountName: "退货记录",
      options: [
        { text: "退货记录", value: 0 },
        { text: "还款记录", value: 1 },
        { text: "利率调整记录", value: 2 },
        { text: "息费调整记录", value: 3 },
        { text: "五级认定记录", value: 4 },
      ],
      accountNameValue: "",
      licensePlateValue: "",
      contractList: [], //退货记录
      contractList2: [], //还款记录
      contractList4: [], //利率调整
      contractList5: [], //息费
      contractList6: [], //五级认定

      show1: true,
      show2: false,
      show4: false,
      show5: false,
      show6: false,
      noMsg: false,
      noMsg2: false,
      noMsg4: false,
      noMsg5: false,
      noMsg6: false,
      imgSrc: "", //图片路径
      pageNum: "1", //页码
      pageSize: "10", //条数
      adjustType1: "0", // 息费
      adjustType2: "1", // 利率
      dictKeys: [
        //数据字典还款方式、借款用途、借款状态
        "asset_repay_kind",
        "adjust_apply_handle_status",
        "refund_settle_type",
        "refund_settle_status",
        "asset_risk_level",
      ],
      asset_repay_kind: [], //结算类型数据字典
      adjust_apply_handle_status: [], // 处理状态
      refund_settle_type: [], // 退货结算类型
      refund_settle_status: [], // 退货结算状态
      asset_risk_level: [], //五级调整
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.$toast.loading({
      duration: 0, // 持续展示 toast
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    this.getDictionary();
  },
  methods: {
    toggleAccountName(value) {
      this.accountName = this.options[value].text;
      this.accountNameValue = this.options[value].value;
      console.log(this.accountNameValue);
      if (this.accountNameValue == 0) {
        this.show1 = true;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
        this.show6 = false;
      } else if (this.accountNameValue == 1) {
        this.show1 = false;
        this.show2 = true;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
        this.show6 = false;
      } else if (this.accountNameValue == 2) {
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = true;
        this.show5 = false;
        this.show6 = false;
      } else if (this.accountNameValue == 3) {
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = true;
        this.show6 = false;
      } else if (this.accountNameValue == 4) {
        this.show1 = false;
        this.show2 = false;
        this.show3 = false;
        this.show4 = false;
        this.show5 = false;
        this.show6 = true;
      }
    },
    getDictionary() {
      var reqBody = {
        dictKeys: this.dictKeys,
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, reqBody)
        .then((res) => {
          console.log(" -数据字典列表-" + JSON.stringify(res));
          try {
            var dist = res.dictItemMap;
            this.asset_repay_kind = dist.asset_repay_kind;
            this.adjust_apply_handle_status = dist.adjust_apply_handle_status;
            this.refund_settle_type = dist.refund_settle_type;
            this.refund_settle_status = dist.refund_settle_status;
            this.asset_risk_level = dist.asset_risk_level;
            this.getData();
            this.getData3();
            // this.getData();
            this.getData4();
            this.getData2();
            this.getData5();
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
        list = this.asset_repay_kind;
      } else if (flag == "type2") {
        list = this.adjust_apply_handle_status;
      } else if (flag == "type3") {
        list = this.refund_settle_type;
      } else if (flag == "type4") {
        list = this.refund_settle_status;
      } else if (flag == "type5") {
        list = this.asset_risk_level;
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
      //退货记录
      ajaxPostPlus(apiUrl.queryUserRepay, {
        loanInvoiceId: this.loanInvoiceId,
        pageNum: this.pageNum, //页码
        pageSize: this.pageSize, //条数
      })
        .then((res) => {
          try {
            console.log(" -resData-" + JSON.stringify(res));
            if (res.list == null || res.list.length == 0) {
              this.noMsg = true;
            }
            this.contractList = res.list;
            // var list2 = [];
            // this.list2 = res.list;
            // if(this.contractList >= this.pageSize) {
            //   this.pageNum++;
            // }
            // if (this.pageNum === "1") {
            //   this.contractList = this.list2;
            // } else {
            //   this.contractList = [...this.contractList, ...this.list2];
            // }
          } catch (error) {
            this.$toast("获取数据失败");
            console.log("error = " + error.message);
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
    getData2() {
      //息费
      ajaxPostPlus(apiUrl.selectPage, {
        loanInvoiceId: this.loanInvoiceId,
        adjustType: this.adjustType1,
      })
        .then((res) => {
          try {
            if (res.list == null || res.list.length == 0) {
              this.noMsg5 = true;
            }
            console.log(" -resData-" + JSON.stringify(res));
            this.contractList5 = res.list;
          } catch (error) {
            this.$toast("获取数据失败");
            console.log("error = " + error.message);
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
    getData3() {
      //还款记录
      ajaxPostPlus(apiUrl.queryAssetRepay, {
        loanInvoiceId: this.loanInvoiceId,
      })
        .then((res) => {
          try {
            if (
              res.listAssetRepaySerialBo == null ||
              res.listAssetRepaySerialBo.length == 0
            ) {
              this.noMsg2 = true;
            }
            console.log(" -resData-" + JSON.stringify(res));
            this.contractList2 = res.listAssetRepaySerialBo;
          } catch (error) {
            this.$toast("获取数据失败");
            console.log("error = " + error.message);
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
    getData4() {
      //利率
      ajaxPostPlus(apiUrl.queryAjustInfoListPage, {
        loanInvoiceId: this.loanInvoiceId,
        adjustType: this.adjustType2,
      })
        .then((res) => {
          try {
            if (res.list == null || res.list.length == 0) {
              this.noMsg4 = true;
            }
            console.log(" -resData-" + JSON.stringify(res));
            this.contractList4 = res.list;
          } catch (error) {
            this.$toast("获取数据失败");
            console.log("error = " + error.message);
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
    getData5() {
      //五级
      ajaxPostPlus(apiUrl.queryRiskManagement, {
        loanInvoiceId: this.loanInvoiceId,
      })
        .then((res) => {
          try {
            if (
              res.riskManagementAdjustSerialBoList == null ||
              res.riskManagementAdjustSerialBoList.length == 0
            ) {
              this.noMsg6 = true;
            }
            console.log(" -resData-" + JSON.stringify(res));
            this.contractList6 = res.riskManagementAdjustSerialBoList;
          } catch (error) {
            this.$toast("获取数据失败");
            console.log("error = " + error.message);
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
  },
};
</script>

<style  scoped>
.loan_return {
  padding-bottom: 12px;
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
/*内容*/
/* .card_content {
  margin: 0 15px;
} */
/*合同列表*/
.contract_list {
  padding: 0 15px 15px;
  border-bottom: 12px solid var(--color-Lightgray-bg);
}
/**/
.contract_item {
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 0px 0 0;
}
.contract_item span {
  font-size: 14px;
}
.van-dropdown-menu >>> .van-dropdown-menu__bar {
  box-shadow: none;
}
.no_message {
  background: var(--color-Lightgray-bg);
}
</style>
