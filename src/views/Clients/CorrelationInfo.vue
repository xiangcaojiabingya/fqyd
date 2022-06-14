<template>
  <div>
    <item-nav-bar title="公积金信息"></item-nav-bar>
    <div class="body-margin-top">
      <div v-if="isShowEmpty" class="emptytxt">暂无数据</div>
      <div
        class="card_div"
        v-for="(item, index) in netWorkData.userAccumulationFundInfoBoList"
        :key="index"
        v-show="!isShowEmpty"
      >
        <div class="card_item">
          <span>参缴地</span>
          <span>{{item.payPalce}}</span>
        </div>
        <div class="card_item">
          <span>参缴日期</span>
          <span>{{item.payDate==null?"--":item.payDate.substring(0,10)}}</span>
        </div>
        <div class="card_item">
          <span>初缴月份</span>
          <span>{{item.firstPayMonth}}</span>
        </div>
        <div class="card_item">
          <span>缴至月份</span>
          <span>{{item.lastPayMonth}}</span>
        </div>
        <div class="card_item">
          <span>缴费状态</span>
          <span>{{item.paymentStatus}}</span>
        </div>
        <div class="card_item">
          <span>月缴存额</span>
          <span>{{item.payQuotaMouth}}</span>
        </div>
        <div class="card_item">
          <span>个人缴存比例</span>
          <span>{{item.personalProportion}}</span>
        </div>
        <div class="card_item">
          <span>单位缴存比例</span>
          <span>{{item.companyProportion}}</span>
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
export default {
  name: "FinancialInformation", //公积金信息
  components: { ItemNavBar },
  data() {
    return {
      netWorkData: {},
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
      isShowEmpty: false,
    };
  },
  methods: {
    getData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0, // 持续展示 toast
      });
      ajaxPostPlus(apiUrl.queryResource, this.requestData)
        .then((result) => {
          console.log("公积金信息：" + JSON.stringify(result));
          this.netWorkData = result;
          if (
            this.netWorkData.userAccumulationFundInfoBoList != null &&
            this.netWorkData.userAccumulationFundInfoBoList.length > 0
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
  },
  mounted() {
    this.getData();
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