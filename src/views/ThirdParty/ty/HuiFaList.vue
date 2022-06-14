<template>
  <div class="huiFaList">
    <item-nav-bar :title="title" />
    <year-report-basic-item
      class="list"
      v-for="(item,index) in arrs"
      :itemInfo="item"
      @click.native="toDetail(index)"
      :isShowToRight="true"
    ></year-report-basic-item>
  </div>
</template>

<script>
import YearReportBasicItem from "../components/YearReportBasicItem.vue";
import { huiFaListData } from "@/utils/commonData.js";
import ItemNavBar from "../components/ItemNavBar.vue";
export default {
  components: { YearReportBasicItem, ItemNavBar },
  name: "HuiFaList",//汇法信息列表
  data() {
    return {
      arrs: [],
      type: this.$route.query.type,
      info: "",
      title: this.$route.query.title,
    };
  },
  mounted() {
    console.log("信息：" + JSON.stringify(this.$store.state.info));
    this.info = this.$store.state.info;
    this.arrs = huiFaListData(this.type, this.info);
  },
  methods: {
    toDetail(index) {
      this.$router.push({
        path: "/BusInformation",
        query: { title: this.title, type: this.type },
      });
    },
  },
  computed: {},
};
</script>

<style scoped>
.huiFaList {
  width: 100%;
  padding-top: 12px;
}
.list {
  margin-top: 46px;
}
</style>