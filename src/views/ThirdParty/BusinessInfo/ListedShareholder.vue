<template>
  <!--上市公司十大股东ycm-->
  <div class="ListedShareholder">
    <item-nav-bar title="上市公司十大股东" />
    <title-list-card-item
      v-for="(item, index) in info"
      :key="index"
      :itemInfo="itemInfo"
      :title="item.SHHOLDERNAME"
      :value1="item.HOLDERAMT"
      :value2="item.HOLDERRTO"
      @click.native="itemClick(item)"
    />
  </div>
</template>

<script>
import TitleListCardItem from "../components/TitleListCardItem.vue";
import ItemNavBar from "../components/ItemNavBar.vue";
import { gongShangConstData } from "@/utils/commonData.js";

export default {
  name: "ListedShareholder",
  components: { TitleListCardItem, ItemNavBar },
  props: {},
  data() {
    return {
      itemInfo: {
        title: "股东名称",
        title1: "持股数量",
        title2: "持股比例",
        title3: "",
        title4: "",
        state: "",
        isShowToRight: true,
      },
      info: ["", ""],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    itemClick(item) {
      this.$router.push({
        path: "/BusInformation",
        query: {
          title: "上市公司十大股东",
          type: gongShangConstData[14],
        },
      });
    },
  },
};
</script>

<style  scoped>
.ListedShareholder {
  padding: 46px 0 12px;
}
</style>
