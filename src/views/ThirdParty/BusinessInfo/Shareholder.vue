<template>
  <!--股东及出资信息ycm-->
  <div class="Shareholder">
    <item-nav-bar title="股东及出资信息" />
    <title-list-card-item
      v-for="(item, index) in info"
      :key="index"
      :itemInfo="itemInfo"
      :title="item.SHANAME"
      :value1="item.INVTYPE"
      :value2="item.SUBCONAM"
      @click.native="itemClick(item)"
    />
  </div>
</template>

<script>
import { gongShangConstData } from "@/utils/commonData.js";
import ItemNavBar from "../components/ItemNavBar.vue";
import TitleListCardItem from "../components/TitleListCardItem.vue";

export default {
  name: "Shareholder",
  components: { ItemNavBar, TitleListCardItem },
  props: {},
  data() {
    return {
      itemInfo: {
        title: "股东名称",
        title1: "股东类型",
        title2: "认缴出资额（万元）",
        title3: "",
        title4: "",
        state: "",
        isShowToRight: true,
      },
      info: [
        {
          ACCONAM: "",
          CONDATE: "2032-03-28",
          CONFORM: "货币",
          CONFORMCODE: "1",
          CREDITCODE: "",
          CURRENCYCODE: "156",
          FUNDEDRATIO: "97.00%",
          INVTYPE: "自然人股东",
          INVTYPECODE: "20",
          REGCAPCUR: "人民币元",
          REGNO: "",
          SHANAME: "韩文勇",
          SUBCONAM: "485.000000",
        },
        {
          ACCONAM: "",
          CONDATE: "2032-03-28",
          CONFORM: "货币",
          CONFORMCODE: "1",
          CREDITCODE: "",
          CURRENCYCODE: "156",
          FUNDEDRATIO: "3.00%",
          INVTYPE: "自然人股东",
          INVTYPECODE: "20",
          REGCAPCUR: "人民币元",
          REGNO: "",
          SHANAME: "王景生",
          SUBCONAM: "15.000000",
        },
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    itemClick(item) {
      console.log(JSON.stringify(item));
      this.$router.push({
        path: "/BusInformation",
        query: {
          title: "股东及出资信息",
          type: gongShangConstData[17],
        },
      });
    },
  },
};
</script>

<style  scoped>
.Shareholder {
  padding: 46px 0 12px;
}
</style>
