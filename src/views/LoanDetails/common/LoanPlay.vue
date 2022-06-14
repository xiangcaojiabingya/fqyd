<template>
  <div class="loan_play">
    <div class="table_div">
      <table cellspacing="15">
        <thead>
          <tr>
            <th>期数</th>
            <th>还款日</th>
            <th>应还金额</th>
            <th>逾期天数</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in list" :key="index">
            <td>{{ item.currentNum }}</td>
            <td>{{ formatDate(item.preRepayDate) }}</td>
            <td>{{ item.preRepayAmt }}</td>
            <td :class="textColor(getRepayStatus(item.repayPlanStatus))">
              {{ item.overdueDays }}
            </td>
            <td :class="textColor(getRepayStatus(item.repayPlanStatus))">
              {{ getRepayStatus(item.repayPlanStatus) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { apiUrl, ajaxPostPlus } from "@/api.js";
import { codeToValue, isHasData } from "@/utils/index.js";
export default {
  name: "LoanPlay", //借据详情-》还款计划
  components: {},
  props: { loanInvoiceId: String },
  data() {
    return {
      dictKeys: ["repayplan_status"],
      repayplan_status: [],
      list: [],
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
    formatDate(date) {
      return date.substr(0, 10);
    },
    textColor(flag) {
      return { overdue_style: flag == "逾期" ? true : false };
    },
    // 查询数据字典
    getDictKeys() {
      console.log("查询数据字典");
      let reqBody = {
        dictKeys: ["repayplan_status"], //
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, reqBody)
        .then((res) => {
          console.log(" -数据字典列表-" + JSON.stringify(res));
          let distMap = res.dictItemMap;
          this.repayplan_status = distMap.repayplan_status;
          this.getData();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(" -数据字典请求错误" + JSON.stringify(err));
        });
    },
    // 获取关系、类型
    getRepayStatus(code) {
      return codeToValue(this.repayplan_status, code);
    },
    // 网络请求
    getData() {
      ajaxPostPlus(apiUrl.queryRepayPlanByLoanInvoiceId, {
        loanInvoiceIdList: [this.loanInvoiceId],
      })
        .then((res) => {
          if (isHasData(res.loanInvoiceMap)) {
            this.list = res.loanInvoiceMap[this.loanInvoiceId];
          } else {
            this.$toast("暂无数据");
          }
          if (this.list == []) {
            this.$toast("暂无数据");
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
.loan_play {
  padding-bottom: 12px;
}
.table_div {
  margin: 12px 0;
  padding: 12px 12px;
  background: #ffffff;
}
table {
  border-collapse: collapse;
  text-align: center;
  background: #ffffff;
}
table td,
table th {
  color: #333333;
  height: 40px;
  font-size: 12px;
}
table thead th {
  background-color: #fef6ef;
  width: 160px;
}
table td {
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
.overdue_style {
  color: #ff1919;
}
</style>
