<template>
  <div class="yearReportForinv">
    <item-nav-bar title="年报-企业对外投资信息" />
    <div class="main">
      <gong-shng-item v-for="(item,index) in arrs" :itemInfo="item"></gong-shng-item>
    </div>
  </div>
</template>

<script>
import GongShngItem from "../components/GongShngItem.vue";
import ItemNavBar from "../components/ItemNavBar.vue";
export default {
  //年报-企业对外投资信息
  components: { GongShngItem, ItemNavBar },
  name: "YearReportForinv",
  data() {
    return {
      arrs: [
        {
          title: "企业名称",
          title1: "年报ID：",
          value1: "-",
          title2: "注册号：",
          value2: "-",
          title3: "统一社会信用代码：",
          value3: "-",
        },
        {
          title: "企业名称",
          title1: "年报ID：",
          value1: "-",
          title2: "注册号：",
          value2: "-",
          title3: "统一社会信用代码：",
          value3: "-",
        },
        {
          title: "企业名称",
          title1: "年报ID：",
          value1: "-",
          title2: "注册号：",
          value2: "-",
          title3: "统一社会信用代码：",
          value3: "-",
        },
        {
          title: "企业名称",
          title1: "年报ID：",
          value1: "-",
          title2: "注册号：",
          value2: "-",
          title3: "统一社会信用代码：",
          value3: "-",
        },
        {
          title: "企业名称",
          title1: "年报ID：",
          value1: "-",
          title2: "注册号：",
          value2: "-",
          title3: "统一社会信用代码：",
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
.yearReportForinv {
  width: 100%;
  padding-top: 12px;
}
.main {
  margin-top: 46px;
}
</style>