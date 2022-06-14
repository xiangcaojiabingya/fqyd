<template>
  <div class="yearReportPaidupcapital">
    <item-nav-bar title="年报-企业实缴出资信息" />
    <div class="main">
      <year-report-basic-item v-for="(item,index) in arrs" :itemInfo="item" :isShowToRight="true"></year-report-basic-item>
    </div>
  </div>
</template>

<script>
import YearReportBasicItem from "../components/YearReportBasicItem.vue";
import ItemNavBar from "../components/ItemNavBar.vue";
export default {
  //年报-企业实缴出资信息
  components: { YearReportBasicItem, ItemNavBar },
  name: "YearReportPaidupcapital",
  data() {
    return {
      arrs: [
        {
          title: "股东/发起人",
          state: "实缴出资日期",
          title1: "年报ID：",
          value1: "-",
          title2: "出资方式：",
          value2: "-",
          title3: "累计实缴额（万元）：",
          value3: "-",
        },
        {
          title: "股东/发起人",
          state: "实缴出资日期",
          title1: "年报ID：",
          value1: "-",
          title2: "出资方式：",
          value2: "-",
          title3: "累计实缴额（万元）：",
          value3: "-",
        },
        {
          title: "股东/发起人",
          state: "实缴出资日期",
          title1: "年报ID：",
          value1: "-",
          title2: "出资方式：",
          value2: "-",
          title3: "累计实缴额（万元）：",
          value3: "-",
        },
        {
          title: "股东/发起人",
          state: "实缴出资日期",
          title1: "年报ID：",
          value1: "-",
          title2: "出资方式：",
          value2: "-",
          title3: "累计实缴额（万元）：",
          value3: "-",
        },
      ],
    };
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.yearReportPaidupcapital {
  width: 100%;
  padding-top: 12px;
}
.main {
  margin-top: 46px;
}
</style>