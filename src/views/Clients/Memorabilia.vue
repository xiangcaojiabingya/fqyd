<template>
  <div class="main">
    <item-nav-bar title="社保征信" />
    <div v-if="isShowEmpty" class="emptytxt">暂无数据</div>
    <div
      class="card_div"
      v-for="(item, index) in netWorkData.userSocialSecurityInfoBoList"
      :key="index"
      v-show="!isShowEmpty"
    >
      <div class="card_item">
        <span>参缴保地</span>
        <span>{{ item.insuredAddress }}</span>
      </div>
      <div class="card_item">
        <span>参保日期</span>
        <span>{{ item.insuredTime==null?"--":item.insuredTime.substring(0,10) }}</span>
      </div>
      <div class="card_item">
        <span>累计缴费月数</span>
        <span>{{ item.totalPayMonth }}</span>
      </div>
      <div class="card_item">
        <span>缴费状态</span>
        <span>{{ item.paymentStatus }}</span>
      </div>
      <div class="card_item">
        <span>参加工作月份</span>
        <span>{{ item.workingMonth }}</span>
      </div>
      <div class="card_item">
        <span>个人缴费基数</span>
        <span>{{ item.basePayAmount }}</span>
      </div>
      <div class="card_item">
        <span>月缴费额</span>
        <span>{{ item.monthPayAmount }}</span>
      </div>
      <div class="card_item">
        <span>缴费单位</span>
        <span>{{ item.payCompany }}</span>
      </div>
      <div class="card_item">
        <span>缴费停止原因</span>
        <span>{{ item.interruptReason }}</span>
      </div>
      <div class="card_item">
        <span>信息来源</span>
        <span>{{ item.infoSource }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import { ajaxPostPlus, apiUrl } from "@/api.js";
export default {
  name: "Memorabilia", //客户信息-》社保征信
  components: { ItemNavBar },
  props: {},
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
  computed: {},
  created() {},
  mounted() {
    this.getData();
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
          console.log("社保征信信息：" + JSON.stringify(result));
          this.netWorkData = result;
          if (
            this.netWorkData.userSocialSecurityInfoBoList != null &&
            this.netWorkData.userSocialSecurityInfoBoList.length > 0
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
};
</script>

<style  scoped>
.main {
  font-size: 14px;
  padding: 46px 0 12px;
}
.card_div {
  background: #ffffff;
  margin-top: 12px;
  padding: 0px 15px 15px 0px;
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
