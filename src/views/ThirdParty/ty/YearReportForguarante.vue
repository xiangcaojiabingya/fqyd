<template>
  <div class="yearReportForguarante">
    <item-nav-bar title="年报-企业对外提供保证担保信息" />
    <div class="main">
      <gong-shng-item
        v-for="(item,index) in arrs"
        :itemInfo="item"
        @click.native="toDetail(index)"
        :isShowToRight="true"
      ></gong-shng-item>
    </div>
  </div>
</template>

<script>
import GongShngItem from "../components/GongShngItem.vue";
import { gongShangConstData } from "@/utils/commonData.js";
import ItemNavBar from "../components/ItemNavBar.vue";
export default {
  //年报-企业对外提供保证担保信息
  components: { GongShngItem, ItemNavBar },
  name: "YearReportForguarante",
  data() {
    return {
      arrs: [
        {
          title: "债权人",
          title1: "年报ID：",
          value1: "-",
          title2: "主债权种类：",
          value2: "-",
          title3: "主债权数额：",
          value3: "-",
        },
        {
          title: "债权人",
          title1: "年报ID：",
          value1: "-",
          title2: "主债权种类：",
          value2: "-",
          title3: "主债权数额：",
          value3: "-",
        },
        {
          title: "债权人",
          title1: "年报ID：",
          value1: "-",
          title2: "主债权种类：",
          value2: "-",
          title3: "主债权数额：",
          value3: "-",
        },
        {
          title: "债权人",
          title1: "年报ID：",
          value1: "-",
          title2: "主债权种类：",
          value2: "-",
          title3: "主债权数额：",
          value3: "-",
        },
      ],
    };
  },
  methods: {
    toDetail(index) {
      this.$router.push({
        path: "/BusInformation",
        query: {
          title: "年报-企业对外提供保证担保信息",
          type: gongShangConstData[21],
        },
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
.yearReportForguarante {
  width: 100%;
  padding-top: 12px;
}
.main {
  margin-top: 46px;
}
</style>