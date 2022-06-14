<template>
  <div class="main">
    <item-nav-bar :title="navTitle" />
    <title-list-card-item
      v-for="(item, index) in info"
      :key="index"
      :itemInfo="itemInfo"
      :title="item.SHHOLDERNAME"
      :value1="item.HOLDERAMT"
      :value2="item.HOLDERRTO"
      @click.native="itemClick(item)"
    ></title-list-card-item>
  </div>
</template>

<script>
import TitleListCardItem from "../components/TitleListCardItem.vue";
import ItemNavBar from "../components/ItemNavBar.vue";

export default {
  name: "ChangeInfo", //税务信息-变更信息
  components: {
    TitleListCardItem,
    ItemNavBar,
  },
  props: {},
  data() {
    return {
      navTitle: "",
      itemInfo: {
        title: "变更项目",
        title1: "变更日期",
        title2: "变更前内容",
        title3: "变更后内容",
        title4: "",
        state: "",
        isShowToRight: false,
      },
      info: ["", ""],
    };
  },
  computed: {},
  created() {
    this.navTitle = this.$route.query.title;
  },
  mounted() {},
  methods: {
    itemClick(item) {
      if (this.itemInfo.isShowToRight) {
        this.$router.push({
          path: "/TaxDetail",
          query: {
            title: this.navTitle,
            type: this.navTitle,
          },
        });
      }
    },
  },
};
</script>

<style  scoped>
.main {
  padding: 46px 0 0;
}
</style>
