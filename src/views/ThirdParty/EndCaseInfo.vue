<template>
  <div>
    <item-nav-bar title="终本案件信息"></item-nav-bar>
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
  name: "EndCaseInfo", //终本案件信息
  components: { ItemCompanyInfo, ItemNavBar },
  data() {
    return {
      arrs: [
        {
          title: "被执行人姓名/名称",
          state: "",
          title1: "身份证号码/组织机构代码：",
          title2: "案号：",
          title3: "执行法院：",
          value1: "身份证号码/组织机构代码：",
          value2: "案号：",
          value3: "执行法院：",
        },
        {
          title: "被执行人姓名/名称",
          state: "",
          title1: "身份证号码/组织机构代码：",
          title2: "案号：",
          title3: "执行法院：",
          value1: "-",
          value2: "-",
          value3: "-",
        },
        {
          title: "被执行人姓名/名称",
          state: "",
          title1: "身份证号码/组织机构代码：",
          title2: "案号：",
          title3: "执行法院：",
          value1: "-",
          value2: "-",
          value3: "-",
        },
      ],
    };
  },
  methods: {
    onClick(item) {
      // this.$toast(item.title);
      this.$router.push({
        path: "/BusInformation",
        query: {
          title: "终本案件信息",
          type: gongShangConstData[7],
        },
      });
    },
  },
  mounted() {
    setWebViewTitle("终本案件信息");
  },
  activated() {},
};
</script>

<style scoped>
</style>