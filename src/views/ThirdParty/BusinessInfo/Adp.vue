<template>
  <div class="Adp">
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
import { gongShangConstData } from "@/utils/commonData.js";
import ItemNavBar from "../components/ItemNavBar.vue";
import Top from "@/components/module/Top.vue";

export default {
  name: "Adp",
  components: {
    "company-infoitem": CompanyInfoItem,
    "item-nav-bar": ItemNavBar,
    Top,
  },
  data() {
    return {
      title: "行政处罚基本信息",
      arrs: [
        {
          title: "标题",
          title1: "决定机关名称：",
          title2: "行政处罚内容：",
          value1: "-",
          value2: "-",
          PENDECISSDATE: "2",
          PENDECNO: "2",
          PENTYPE: "",
          PUBLICDATE: "",
        },
        {
          title: "标题",
          title1: "决定机关名称：",
          title2: "行政处罚内容：",
          value1: "-",
          value2: "-",
          PENDECISSDATE: "3",
          PENDECNO: "3",
          PENTYPE: "",
          PUBLICDATE: "",
        },
      ],
    };
  },
  methods: {
    btn(a) {
      console.log(a);
      console.log(111);
      console.log(this.arrs);
      this.$router.push({
        path: "/BusInformation",
        query: {
          title: this.title,
          type: gongShangConstData[3],
        },
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
.Adp {
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