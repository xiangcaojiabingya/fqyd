<template>
  <div class="yearReportWebsiteInfo">
    <item-nav-bar title="年报-网站信息" />
    <div class="main">
      <gong-shng-item v-for="(item,index) in arrs" :itemInfo="item"></gong-shng-item>
    </div>
  </div>
</template>

<script>
import GongShngItem from "../components/GongShngItem.vue";
import ItemNavBar from "../components/ItemNavBar.vue";
export default {
  //年报-网站信息
  components: { GongShngItem, ItemNavBar },
  name: "YearReportWebsiteInfo",
  data() {
    return {
      arrs: [
        {
          title: "网站（网店）名称",
          title1: "年报ID：",
          value1: "-",
          title2: "网站（网店）类型：",
          value2: "-",
          title3: "网站（网店）地址：",
          value3: "-",
        },
        {
          title: "网站（网店）名称",
          title1: "年报ID：",
          value1: "-",
          title2: "网站（网店）类型：",
          value2: "-",
          title3: "网站（网店）地址：",
          value3: "-",
        },
        {
          title: "网站（网店）名称",
          title1: "年报ID：",
          value1: "-",
          title2: "网站（网店）类型：",
          value2: "-",
          title3: "网站（网店）地址：",
          value3: "-",
        },
        {
          title: "网站（网店）名称",
          title1: "年报ID：",
          value1: "-",
          title2: "网站（网店）类型：",
          value2: "-",
          title3: "网站（网店）地址：",
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
.yearReportWebsiteInfo {
  width: 100%;
  padding-top: 12px;
}
.main {
  margin-top: 46px;
}
</style>