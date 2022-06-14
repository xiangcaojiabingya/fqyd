<template>
    <div class="Oioe">
        <item-nav-bar :title="title"></item-nav-bar>
        <div class="content" >
        <top/>
            <div v-for="(item,index) in arrs" @click="btn(index)">
            <company-infoitem :itemInfo="item" :isShowToRight='true'></company-infoitem>
        </div>
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
  name: "Oioe",
  components: {
    "item-nav-bar": ItemNavBar,
    "company-infoitem": CompanyInfoItem,
    Top
  },
  data() {
    return {
      title: "企业对外投资信息",
      arrs: [
        {
          title: "标题",
          state: "企业状态",
          title1: "注册号：",
          title2: "企业(机构)类型：",
          value1: "-",
          value2: "-",
          REGCAP: "",
          REGCAPCUR: "",
          ENTSTATUS: "",
          REGORG: "",
          SUBCONAM: "",
          CONGROCUR: "",
          FUNDEDRATIO: "",
          ESDATE: "",
          NAME: "",
          BINVVAMOUNT: "",
          CANDATE: "",
          REVDATE: "",
          CONFORM: "",
          REGORGCODE: "",
          CREDITCODE: "",
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
          type: gongShangConstData[4],
        },
      });
  },
  },
  computed: {},
};
</script>

<style scoped>
.Oioe {
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