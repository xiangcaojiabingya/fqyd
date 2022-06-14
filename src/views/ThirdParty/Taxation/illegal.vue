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
  name: "illegal", //税务信息-违法违章信息
  components: {
    TitleListCardItem,
    ItemNavBar,
  },
  props: {},
  data() {
    return {
      navTitle: "",
      itemInfo:  {
        title: "违约标志",
        title1: "登记日期",
        title2: "违法违章事实",
        title3: "所属时期起",
        title4: "所属时期止",
        state: "",
        isShowToRight: true,
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
