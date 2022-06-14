<template>
  <div class="yearReportSubcapital">
    <item-nav-bar title="年报-认缴出资信息" />
    <div class="main">
      <year-report-basic-item v-for="(item,indec) in arrs" :itemInfo="item" :isShowToRight="true"></year-report-basic-item>
    </div>
  </div>
</template>

<script>
import YearReportBasicItem from "../components/YearReportBasicItem.vue";
import ItemNavBar from "../components/ItemNavBar.vue";

export default {
  //年报-认缴出资信息
  components: { YearReportBasicItem, ItemNavBar },
  name: "YearReportSubcapital",
  data() {
    return {
      arrs: [
        {
          title: "投资人/发起人",
          state: "认缴出资日期",
          title1: "年报ID：",
          value1: "-",
          title2: "出资方式：",
          value2: "-",
          title3: "累计认缴额：",
          value3: "-",
        },
        {
          title: "投资人/发起人",
          state: "认缴出资日期",
          title1: "年报ID：",
          value1: "-",
          title2: "出资方式：",
          value2: "-",
          title3: "累计认缴额：",
          value3: "-",
        },
        {
          title: "投资人/发起人",
          state: "认缴出资日期",
          title1: "年报ID：",
          value1: "-",
          title2: "出资方式：",
          value2: "-",
          title3: "累计认缴额：",
          value3: "-",
        },
        {
          title: "投资人/发起人",
          state: "认缴出资日期",
          title1: "年报ID：",
          value1: "-",
          title2: "出资方式：",
          value2: "-",
          title3: "累计认缴额：",
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
.yearReportSubcapital {
  width: 100%;
  padding-top: 12px;
}
.main {
  margin-top: 46px;
}
</style>