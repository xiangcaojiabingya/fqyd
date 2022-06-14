<template>
  <div class="Qyyc">
    <item-nav-bar :title="title"></item-nav-bar>
    <div class="content">
      <top />
      <div v-for="(item,index) in arrs" @click="btn(index)">
        <company-infoitem :itemInfo="item" :isShowToRight='true'></company-infoitem>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyInfoItem from "../components/CompanyInfoitem";
import ItemNavBar from "../components/ItemNavBar.vue";
import { gongShangConstData } from "@/utils/commonData.js";
import Top from "@/components/module/Top.vue";

export default {
  name: "Qyyc",
  components: {
    "item-nav-bar": ItemNavBar,
    "company-infoitem": CompanyInfoItem,
    Top,
  },
  data() {
    return {
      title: "企业异常名录",
      arrs: [
        {
          title: "标题",
          title1: "注册号：",
          title2: "统一社会信用代码：",
          value1: "-",
          value2: "-",
          INDATE: "-",
          OUTDATE: "-",
          YR_REGORG: "-",
          YC_REGORG: "-",
          INREASON: "-",
          OUTREASON: "-",
        },
      ],
    };
  },
  methods: {
    btn(a) {
      console.log(a);
      console.log(this.arrs);
      this.$router.push({
        path: "/BusInformation",
        query: {
          title: this.title,
          type: gongShangConstData[5],
        },
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
.Qyyc {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
  display: flex;
  flex-direction: column;
}
.content {
  padding-top: 46px;
}
</style>