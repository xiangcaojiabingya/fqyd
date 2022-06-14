<template>
  <!--借据详情，有三个tab页-->
  <div class="loan_detail">
    <item-nav-bar title="借据详情" class="navbar" />
    <van-tabs offset-top="47" sticky color="#ff6619" title-active-color="#ff6619"
      title-inactive-color="var(--tab-color-unselect)" line-width="33%" class="tabs_style">
      <van-tab title="借据监控" title-style="font-size: 15px;" class="tab_style">
        <loan-monitor :loanInvoiceId="loanInvoiceId"></loan-monitor>
      </van-tab>
      <van-tab title="还款计划" title-style="font-size: 15px;" class="tab_style">
        <loan-play :loanInvoiceId="loanInvoiceId"></loan-play>
      </van-tab>
      <van-tab title="借据信息" title-style="font-size: 15px;" class="tab_style">
        <loan-info :loanInvoiceId="loanInvoiceId"
          :overdueDailyInterestRate="overdueDailyInterestRate"></loan-info>
      </van-tab>
      <van-tab title="更多记录" title-style="font-size: 15px;" class="tab_style">
        <loan-return :loanInvoiceId="loanInvoiceId"></loan-return>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import LoanInfo from "@/views/LoanDetails/common/LoanInfo.vue";
import LoanMonitor from "@/views/LoanDetails/common/LoanMonitor.vue";
import LoanPlay from "@/views/LoanDetails/common/LoanPlay.vue";
import LoanReturn from "@/views/LoanDetails/common/LoanReturn.vue";

export default {
  name: "LoanDetail", //借据详情
  components: { LoanMonitor, LoanPlay, LoanInfo, ItemNavBar,LoanReturn },
  props: {},
  data () {
    return {
      loanInvoiceId: this.$route.query.loanInvoiceId,
      overdueDailyInterestRate: this.$route.query.overdueDailyInterestRate, //借据信息详情需要的罚息日利率
    };
  },
  computed: {},
  created () { },
  mounted () { },
  methods: {},
};
</script>

<style scoped>
.loan_detail {
  font-size: 14px;
  /* height: 100vh;
  overflow: auto;*/
  position: relative;
}
.tabs_style {
  padding-top: 46px;
}
/*
.tab_style {
  height: calc(100vh - 46px - 44px);
  overflow: scroll;
}*/
</style>
