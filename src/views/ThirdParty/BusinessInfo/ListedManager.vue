<template>
  <!--上市公司高管信息ycm-->
  <div class="ListedManager">
    <item-nav-bar title="上市公司高管信息" />
    <title-list-card-item
      v-for="(item, index) in info"
      :key="index"
      :itemInfo="itemInfo"
      :title="item.CNAME"
      :value1="item.ACTDUTYNAME"
      :value2="item.EDUCATIONLEVEL"
      @click.native="itemClick(item)"
    ></title-list-card-item>
  </div>
</template>

<script>
import { gongShangConstData } from "@/utils/commonData.js";
import ItemNavBar from "../components/ItemNavBar.vue";
import TitleListCardItem from "../components/TitleListCardItem.vue";

export default {
  name: "ListedManager",
  components: { TitleListCardItem, ItemNavBar },
  props: {},
  data() {
    return {
      itemInfo: {
        title: "姓名",
        title1: "职位",
        title2: "最高学位",
        title3: "",
        title4: "",
        state: "",
        isShowToRight: true,
      },
      info: ["", "", ""],
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
          title: "上市公司高管信息",
          type: gongShangConstData[13],
        },
      });
    },
  },
};
</script>

<style  scoped>
.ListedManager {
  padding: 46px 0 12px;
}
</style>
