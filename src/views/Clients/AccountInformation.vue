<template>
  <div>
    <item-nav-bar title="历史借贷"></item-nav-bar>
    <div class="body-margin-top">
      <div v-if="isShowEmpty" class="emptytxt">暂无数据</div>
      <div
        class="card_div"
        v-for="(item, index) in netWorkData.userHistoricalCreditInfoBoList"
        :key="index"
        v-show="!isShowEmpty"
      >
        <div class="card_item">
          <span>贷款类别</span>
          <span>{{getDkType(item.creditType)}}</span>
        </div>
        <div class="card_item">
          <span>贷款总额</span>
          <span>{{item.loanAmount}}</span>
        </div>
        <div class="card_item">
          <span>还款金额</span>
          <span>{{item.repaymentAmount}}</span>
        </div>
        <div class="card_item">
          <span>逾期金额</span>
          <span>{{item.overdueAmount}}</span>
        </div>
        <div class="card_item">
          <span>最长逾期时间</span>
          <span>{{item.longestOverdueDate}}</span>
        </div>
        <div class="card_item">
          <span>信息来源</span>
          <span>{{item.infoSource}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import { ajaxPostPlus, apiUrl } from "@/api.js";
import { codeToValue } from "@/utils/index.js";
export default {
  name: "AccountInformation", //历史借贷
  components: { ItemNavBar },
  data() {
    return {
      requestData1: {
        //数据字典接口
        //请求报文
        dictKeys: ["credit_type"],
      },
      requestData: {
        //请求报文
        dimension: "1",
        dimensionId: JSON.parse(this.$route.query.info).userId,
        resourceTypeList: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
        ],
      },
      netWorkData: {},
      typeList: [],
      isShowEmpty: false,
    };
  },
  methods: {
    getData() {
      ajaxPostPlus(apiUrl.queryResource, this.requestData)
        .then((result) => {
          console.log("历史借贷信息：" + JSON.stringify(result));
          this.netWorkData = result;
          if (
            this.netWorkData.userHistoricalCreditInfoBoList != null &&
            this.netWorkData.userHistoricalCreditInfoBoList.length > 0
          ) {
            this.isShowEmpty = false;
          } else {
            this.isShowEmpty = true;
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    //贷款类别处理
    getDkType(code) {
      return codeToValue(this.typeList, code);
    },
    //获取数据字典---信息类别
    getCodeList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0, // 持续展示 toast
      });
      ajaxPostPlus(apiUrl.QueryDictKeys, this.requestData1)
        .then((result) => {
          console.log("信息类别：" + JSON.stringify(result));
          this.typeList = result.dictItemMap.credit_type;
          this.getData();
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
  },
  mounted() {
    this.getCodeList();
  },
  computed: {},
};
</script>

<style scoped>
.card_div {
  background: #ffffff;
  margin-top: 12px;
  padding: 0px 15px 15px 0px;
  font-size: 14px;
}
.card_item {
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 0px 0 15px;
}
.card_item span:first-child {
  min-width: 70px;
}
.card_item span:last-child {
  margin-left: 12px;
  word-break: break-all;
  word-wrap: break-word;
}
.emptytxt {
  padding: 15px;
  font-size: 14px;
  color: #999999;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  box-sizing: border-box;
}
</style>