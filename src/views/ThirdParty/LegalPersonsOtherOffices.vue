<template>
  <div>
    <item-nav-bar title="法定代表人其他公司任职"></item-nav-bar>
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
  name: "LegalPersonsOtherOffices", //法定代表人其他公司任职
  components: { ItemCompanyInfo, ItemNavBar },
  data() {
    return {
      arrs: [
        {
          title: "企业(机构)名称",
          state: "",
          title1: "注册号：",
          title2: "企业(机构)类型：",
          title3: "注册资本(万元)：",
          value1: "-",
          value2: "-",
          value3: "-",
        },
        {
          title: "企业(机构)名称",
          state: "",
          title1: "注册号：",
          title2: "企业(机构)类型：",
          title3: "注册资本(万元)：",
          value1: "-",
          value2: "-",
          value3: "-",
        },
        {
          title: "企业(机构)名称",
          state: "",
          title1: "注册号：",
          title2: "企业(机构)类型：",
          title3: "注册资本(万元)：",
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
          title: "法定代表人其他公司任职",
          type: gongShangConstData[9],
        },
      });
    },
  },
  mounted() {
    setWebViewTitle("法定代表人其他公司任职");
  },
  activated() {},
};
</script>

<style scoped>
</style>