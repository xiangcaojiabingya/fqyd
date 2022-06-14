
<template>
  <div class="yearReportBasic">
    <item-nav-bar title="年报-企业年报基本信息" />
    <div class="main">
      <year-report-basic-item
        v-for="(item,index) in arrs"
        @click.native="toDetail(index)"
        :itemInfo="item"
        :isShowToRight="true"
      ></year-report-basic-item>
    </div>
  </div>
</template>

<script>
import YearReportBasicItem from "../components/YearReportBasicItem.vue";
import { gongShangConstData } from "@/utils/commonData.js";
import ItemNavBar from "../components/ItemNavBar.vue";
export default {
  // 年报-企业年报基本信息
  components: { YearReportBasicItem, ItemNavBar },
  name: "YearReportBasic",
  data() {
    return {
      arrs: [
        {
          title: "企业名称",
          state: "经营状态",
          title1: "年报ID：",
          value1: "-",
          title2: "年报年份：",
          value2: "-",
          title3: "年报日期：",
          value3: "-",
        },
        {
          title: "企业名称",
          state: "经营状态",
          title1: "年报ID：",
          value1: "-",
          title2: "年报年份：",
          value2: "-",
          title3: "年报日期：",
          value3: "-",
        },
        {
          title: "企业名称",
          state: "经营状态",
          title1: "年报ID：",
          value1: "-",
          title2: "年报年份：",
          value2: "-",
          title3: "年报日期：",
          value3: "-",
        },
        {
          title: "企业名称",
          state: "经营状态",
          title1: "年报ID：",
          value1: "-",
          title2: "年报年份：",
          value2: "-",
          title3: "年报日期：",
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
          type: gongShangConstData[20],
          title: "年报-企业年报基本信息",
        },
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
.yearReportBasic {
  flex-direction: column;
  display: flex;
  width: 100%;
  padding-top: 12px;
}
.main {
  margin-top: 46px;
}
</style>