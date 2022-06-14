<template>
    
  <div>
    <item-nav-bar title="分支机构"></item-nav-bar>
    <div class="body-margin-top">
      <item-company-info
        v-for="(item, index) in arrs"
        :itemInfo="item"
        :key="index"
        @click="onClick(item)"
      ></item-company-info>
    </div>

     
  </div>
</template>

<script>
import ItemCompanyInfo from "./components/ItemCompanyInfo";
import { setWebViewTitle } from "@/utils/index.js";
import ItemNavBar from "./components/ItemNavBar.vue";
import ItemCuttingLine from "./components/ItemCuttingLine.vue";
export default {
  name: "BranchOffices", //分支机构
  components: { ItemCompanyInfo, ItemNavBar, ItemCuttingLine },
  data() {
    return {
      arrs: [
        {
          title: "分支机构名称",
          state: "",
          title1: "分支机构企业注册号：",
          title2: "分支机构统一社会信用代码：",
          title3: "分支机构登记机关：",
          value1: "-",
          value2: "-",
          value3: "-",
        },
        {
          title: "分支机构名称",
          state: "",
          title1: "分支机构企业注册号：",
          title2: "分支机构统一社会信用代码：",
          title3: "分支机构登记机关：",
          value1: "-",
          value2: "-",
          value3: "-",
        },
        {
          title: "分支机构名称",
          state: "",
          title1: "分支机构企业注册号：",
          title2: "分支机构统一社会信用代码：",
          title3: "分支机构登记机关：",
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
    },
  },
  mounted() {
    setWebViewTitle("分支机构");
  },
  activated() {},
};
</script>

<style scoped>
</style>