<template>
  <div>
    <item-nav-bar title="抽查检查"></item-nav-bar>
    <div class="body-margin-top">
      <item-company-info
        v-for="(item, index) in arrs"
        :itemInfo="item"
        :key="index"
        @click="onClick(item)"
        imgRight
      ></item-company-info>
    </div>
  </div>
</template>

<script>
import ItemCompanyInfo from "./components/ItemCompanyInfo";
import { setWebViewTitle } from "@/utils/index.js";
import { gongShangConstData } from "@/utils/commonData.js";
import ItemNavBar from "./components/ItemNavBar.vue";
export default {
  name: "SpotTest", //抽查检查
  components: { ItemCompanyInfo, ItemNavBar },
  data() {
    return {
      arrs: [
        {
          title: "公告名称",
          state: "",
          title1: "抽检日期：",
          title2: "检查核实机关名称：",
          title3: "",
          value1: "-",
          value2: "检查核实机关名称：检查核实机关名称检查核实机关名称",
          value3: "-",
        },
        {
          title: "公告名称",
          state: "",
          title1: "抽检日期：",
          title2: "检查核实机关名称：",
          title3: "检查结果：",
          value1: "-",
          value2: "-",
          value3: "-",
        },
        {
          title: "公告名称",
          state: "",
          title1: "抽检日期：",
          title2: "检查核实机关名称：",
          title3: "检查结果：",
          value1: "-",
          value2: "-",
          value3: "-",
        },
      ],
    };
  },
  methods: {
    onClick(item) {
      this.$router.push({
        path: "/BusInformation",
        query: {
          title: "抽查检查",
          type: gongShangConstData[10],
        },
      });
    },
  },
  mounted() {
    setWebViewTitle("抽查检查");
  },
  activated() {},
};
</script>

<style scoped>
</style>