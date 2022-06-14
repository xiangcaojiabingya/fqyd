<template>
  <div>
    <item-nav-bar title="企业法定代表人对外投资信息"></item-nav-bar>
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
  name: "LegalPersonsInvest", //企业法定代表人对外投资信息
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
          value1: "企业(机构)名称企业(机构)名称",
          value2: "企业(机构)名称企业(机构)名称企业(机构)名称企",
          value3: "企业(机构)名称企业(机构)名称企业(机构)名称企",
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
          title: "企业法定代表人对外投资信息",
          type: gongShangConstData[8],
        },
      });
    },
  },
  mounted() {
    setWebViewTitle("企业法定代表人对外投资信息");
  },
  activated() {},
};
</script>

<style scoped>
</style>