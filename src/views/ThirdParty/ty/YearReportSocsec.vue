<template>
  <div class="yearReportSocsec">
    <item-nav-bar title="年报-社会保障信息" />
    <div class="main">
      <gong-shng-item
        v-for="(item,index) in arrs"
        :itemInfo="item"
        @click.native="toDetail(index)"
        :isShowToRight="true"
      ></gong-shng-item>
    </div>
  </div>
</template>

<script>
import GongShngItem from "../components/GongShngItem.vue";
import { gongShangConstData } from "@/utils/commonData.js";
import ItemNavBar from "../components/ItemNavBar.vue";
export default {
  //年报-社会保障信息
  components: { GongShngItem, ItemNavBar },
  name: "YearReportSocsec",
  data() {
    return {
      arrs: [
        {
          title: "年报ID",
          title1: "城镇职工基本养老保险参保人数：",
          value1: "-",
          title2: "失业保险参保人数：",
          value2: "-",
          title3: "职工基本医疗保险参保人数：",
          value3: "-",
        },
        {
          title: "年报ID",
          title1: "城镇职工基本养老保险参保人数：",
          value1: "-",
          title2: "失业保险参保人数：",
          value2: "-",
          title3: "职工基本医疗保险参保人数：",
          value3: "-",
        },
        {
          title: "年报ID",
          title1: "城镇职工基本养老保险参保人数：",
          value1: "-",
          title2: "失业保险参保人数：",
          value2: "-",
          title3: "职工基本医疗保险参保人数：",
          value3: "-",
        },
        {
          title: "年报ID",
          title1: "城镇职工基本养老保险参保人数：",
          value1: "-",
          title2: "失业保险参保人数：",
          value2: "-",
          title3: "职工基本医疗保险参保人数：",
          value3: "-",
        },
      ],
    };
  },
  methods: {
    toDetail(index) {
      this.$router.push({
        path: "/BusInformation",
        query: {
          title: "年报-社会保障信息",
          type: gongShangConstData[24],
        },
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
.yearReportSocsec {
  width: 100%;
  padding-top: 12px;
}
.main {
  margin-top: 46px;
}
</style>