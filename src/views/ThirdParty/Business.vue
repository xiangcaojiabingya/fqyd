<template>
  <div class="Business">
    
    <item-nav-bar :title="title2"></item-nav-bar>
    <div>
      <top/>
      <div v-for="item in title">
      <CheckMessage :title="item.title" :href="item.href" :type="item.type" />
    </div>
    </div>
    
  </div>
</template>

<script>
import CheckMessage from "./components/Details.vue";
import { gongShangConstData } from "@/utils/commonData.js";
import ItemNavBar from "./components/ItemNavBar.vue";
import Top from "@/components/module/Top.vue";

export default {
  name: "Business", //三方信息工商列表
  components: {
    CheckMessage,
        "item-nav-bar": ItemNavBar,
        Top


  },
  data() {
    return {
      arrs: [],
      title: [],
      title2: '工商信息'
    };
  },
  mounted() {
    this.arrs = gongShangConstData;
    this.title = [
      { title: this.arrs[0], href: "BusInformation", type: this.arrs[0]},
      { title: this.arrs[1], href: "ChangeHistory" },
      { title: this.arrs[2], href: "Illegality" },
      { title: this.arrs[3], href: "Adp" },
      { title: this.arrs[4], href: "Oioe" },
      { title: this.arrs[5], href: "Qyyc" },
      { title: this.arrs[6], href: "BranchOffices" },
      { title: this.arrs[7], href: "EndCaseInfo" },
      { title: this.arrs[8], href: "LegalPersonsInvest" },
      { title: this.arrs[9], href: "LegalPersonsOtherOffices" },
      { title: this.arrs[10], href: "SpotTest" },
      { title: this.arrs[11], href: "ClearingInformation" },
      { title: this.arrs[12], href: "BusInformation" , type: this.arrs[12]},
      { title: this.arrs[13], href: "ListedManager" },
      { title: this.arrs[14], href: "ListedShareholder" },
      { title: this.arrs[15], href: "MainPerson" },
      { title: this.arrs[16], href: "PunishBreak" },
      { title: this.arrs[17], href: "Shareholder" },
      { title: this.arrs[18], href: "YearReportAlter" },
      { title: this.arrs[19], href: "YearReportAlterStock" },
      { title: this.arrs[20], href: "YearReportBasic" },
      {
        title: this.arrs[21],
        href: "YearReportForguarante",
      },
      { title: this.arrs[22], href: "YearReportForinv" },
      { title: this.arrs[23], href: "YearReportPaidupcapital" },
      { title: this.arrs[24], href: "YearReportSocsec" },
      { title: this.arrs[25], href: "YearReportSubcapital" },
      { title: this.arrs[26], href: "YearReportWebsiteInfo" },
    ];
  },
  methods: {
    onClickLeft() {
            this.$router.go(-1);
        }
  },
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