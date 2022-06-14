<template>
  <!--借据详情-》借据监控-->
  <div class="main2">
    <money-card 
      title="已还金额" 
      :value="statistData.repayAmount" 
      :value1="statistData.repayPrincipal" 
      :value2="statistData.repayOverdueFee" 
      :value3="statistData.repayInterest" 
      :value4="statistData.repayCompoundInterest" 
      :value5="statistData.repayFee"></money-card>
    <money-card 
      title="应还金额" 
      :value="statistData.preRepayAmount" 
      :value1="statistData.preRepayPrincipal" 
      :value2="statistData.preRepayOverdueFee" 
      :value3="statistData.preRepayInterest" 
      :value4="statistData.preRepayCompoundInterest" 
      :value5="statistData.preRepayFee"></money-card>
    <money-card 
      title="当前剩余应还金额" 
      :value="statistData.leftAmount" 
      :value1="statistData.leftPrinciple" 
      :value2="statistData.leftOverdueFee" 
      :value3="statistData.leftInterest" 
      :value4="statistData.leftCompoundInterest" 
      :value5="statistData.leftFee"></money-card>
    <div class="card_div">
      <div class="card_head">五级分类</div>
      <div class="text_style2 card_head2">{{this.type_level(riskManageData.riskLevel,"1")}}</div>
    </div>
    <div class="card_div">
      <div class="card_head">借据动态</div>
      <div class="solid_line"></div>
        <div class="action_item "  v-for="(item,index) in list" :key="index" :class="{dashed_line:index==list.length-1?false:true}">
          <div class="card_head2">
            <span>支用</span>
            <span style="margin-left: 5px" >{{getFormatMoney(item.amount)}}</span>
          </div>
          <div class="card_body ">
            <div class="card_item">
              <span>支用时间：</span><span>{{item.createTime}}</span>
            </div>
            <div class="card_item">
              <span>支用方式：</span><span>{{item.relateBizIdType}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiUrl, ajaxPostPlus } from "@/api.js";
import { codeToValue, isHasData, moneyFormat } from "@/utils/index.js";
import MoneyCard from "@/views/LoanDetails/components/MoneyCard.vue";

export default {
  name: "LoanMonitor", //借据详情-》借据监控
  components: { MoneyCard },
  props: { loanInvoiceId: String },
  data() {
    return {
      dictKeys: ["asset_risk_level", "loan_type"], //数据字典五级分类、支付方式
      asset_risk_level: [],
      loan_type: [],
      statistData: {}, //借据监控数据
      riskManageData: {}, //五级分类数据
      list: [], //借据动态数据
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.$toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: "加载中...",
      loadingType: "spinner",
    });
    this.getDictKeys();
  },
  methods: {
    // 查询数据字典
    getDictKeys() {
      console.log("查询数据字典");
      let reqBody = {
        dictKeys: this.dictKeys,
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, reqBody)
        .then((res) => {
          console.log(" -数据字典列表-" + JSON.stringify(res));
          let distMap = res.dictItemMap;
          this.asset_risk_level = distMap.asset_risk_level;
          this.loan_type = distMap.loan_type;
          this.getData();
          this.getData2();
          this.getData3();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(" -数据字典请求错误" + JSON.stringify(err));
        });
    },
    type_level(code, flag) {
      let list = [];
      if (flag == "1") {
        list = this.asset_risk_level;
      } else {
        list = this.loan_type;
      }
      return codeToValue(list, code);
    },
    // 请求数据借据监控
    getData() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      ajaxPostPlus(apiUrl.LoanMonitor, {
        loanInvoiceIdList: [this.loanInvoiceId],
      }).then((res) => {
        if (isHasData(res.loanInvoiceStatisticBoList)) {
          this.statistData = res.loanInvoiceStatisticBoList[0];
        }
        this.$toast.clear();
      }).catch(err=>{
        this.$toast.clear();
      })
    },
    // 五级分类
    getData2() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      ajaxPostPlus(apiUrl.queryRiskManageInfo, {
        loanInvoiceId: this.loanInvoiceId,
      }).then((res) => {
        if (res.riskManageInfoBo != undefined) {
          this.riskManageData = res.riskManageInfoBo;
          console.log(" -五级分类-" + JSON.stringify(res.riskManageInfoBo));
        }
        this.$toast.clear();
      }).catch(err=>{
        this.$toast.clear();
      })
    },
    // 借据动态
    getData3() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      ajaxPostPlus(apiUrl.queryCapitalListByLoanInvoiceId, {
        loanInvoiceId: this.loanInvoiceId,
      })
        .then((res) => {
          if (res.creditLoanInvoiceCapitaLogDtoList != undefined) {
            this.list = res.creditLoanInvoiceCapitaLogDtoList;
            console.log(" -借据动态-" + JSON.stringify(this.list));
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    // 格式化金额
    getFormatMoney(money) {
      return moneyFormat(money);
    },
  },
};
</script>

<style scoped>
.main2 {
  padding-bottom: 12px;
}
.card_div {
  margin-top: 12px;
  background: #ffffff;
  padding: 15px 0 0;
}

.card_head {
  margin-left: 15px;
  color: #333333;
}
.card_head2 {
  margin-top: 12px;
  margin-left: 15px;
  color: #ff6619;
}
.card_head2 span:nth-child(2),
.text_style2 {
  font-size: 18px;
  font-weight: 600;
  padding: 0 0 15px;
}

.card_body {
  padding: 0 0 15px 15px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.card_item {
  width: 100%;
  margin-top: 15px;
  color: var(--color-gray-text);
}
.card_item span:nth-child(2) {
  color: var(--color-black-text);
  margin-left: 15px;
}

/*实线*/
.solid_line {
  margin-top: 12px;
  height: 1px;
  width: 100%;
  background: var(--color-Lightgray-bg);
}
.dashed_line {
  border-bottom: 1px dashed var(--color-Lightgray-bg);
}
</style>
