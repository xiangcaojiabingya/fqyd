<template>
  <div class="Business">
    <item-nav-bar :title="title2"></item-nav-bar>
    <div>
      <top />
      <div v-for="item in title">
        <CheckMessage :title="item.title" :href="item.href" :type="item.type" />
      </div>
    </div>
  </div>
</template>

<script>
import CheckMessage from "../components/Details.vue";
import { taxConstData } from "@/utils/commonData.js";
import ItemNavBar from "../components/ItemNavBar.vue";
import Top from "@/components/module/Top.vue";

export default {
  name: "TaxList", //税务列表
  components: { CheckMessage, ItemNavBar, Top },
  data() {
    return {
      arrs: taxConstData,
      title: [],
      title2: "税务信息",
    };
  },
  mounted() {
    console.log("11=" + JSON.stringify(this.arrs));
    this.title = [
      { title: this.arrs[0], href: "TaxDetail", type: this.arrs[0] }, //基本信息
      { title: this.arrs[1], href: "ChangeInfo" },//变更信息
      { title: this.arrs[2], href: "illegal"},//违法违章信息
      { title: this.arrs[3], href: "OweTaxInfo" },//欠税信息
      { title: this.arrs[4], href: "ReportInfo"},//申报信息
      { title: this.arrs[5], href: "CollectionInfo"},//征收信息
      { title: this.arrs[6], href: "FinancialInfo"},//财务报表汇总信息（资产负债表、利润表）年报前两年/CWBB
      { title: this.arrs[7], href: "OtherInfo"},//企业一个月内其他银行相关查询
    ];
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.Business {
  padding-top: 46px;
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
</style>