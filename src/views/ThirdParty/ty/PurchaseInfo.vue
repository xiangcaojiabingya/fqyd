<template>
  <div class="purchaseInfo">
    <item-nav-bar :title="title" />
    <div class="content_div">
      <single-line-item label="采购项目名称" :value="info"></single-line-item>
      <single-line-item label="采购合同编号" :value="info"></single-line-item>
      <single-line-item label="预算单位" :value="info"></single-line-item>
      <single-line-item label="采购项目金额" :value="info"></single-line-item>
      <single-line-item label="已支付金额" :value="info"></single-line-item>
      <single-line-item label="未支付金额" :value="info"></single-line-item>
      <single-line-item label="历史合作合同数" :value="info"></single-line-item>
      <single-line-item label="历史合作合同频次" :value="info"></single-line-item>
      <single-line-item label="历史合作合同总金额" :value="info"></single-line-item>
      <single-line-item label="历史合作合同最大金额" :value="info"></single-line-item>
      <single-line-item label="此次申请合同中是否有明确付款时间" :value="info"></single-line-item>
      <single-line-item label="此次申请合同中是否有付款条件" :value="info"></single-line-item>
      <single-line-item label="此次申请合同中是否有项目周期" :value="info"></single-line-item>
      <single-line-item label="合同中最后付款期限距今月份" :value="info"></single-line-item>
      <single-line-item label="此次申请贷款的合同金额" :value="info"></single-line-item>
      <single-line-item label="此次申请贷款的合同已收到的款项" :value="info"></single-line-item>
    </div>
  </div>
</template>

<script>
import SingleLineItem from "../components/SingleLineItem.vue";
import ItemNavBar from "../components/ItemNavBar.vue";
export default {
  //采购信息页面
  components: { SingleLineItem, ItemNavBar },
  name: "PurchaseInfo",
  data() {
    return {
      info: "xx项目",
      title:this.$route.query.title
    };
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.purchaseInfo {
  width: 100%;
  margin-top: 12px;
}
.content_div {
  margin-top: 58px;
  padding: 0 15px;
  width: 100%;
  box-sizing: border-box;
  background: white;
}
</style>