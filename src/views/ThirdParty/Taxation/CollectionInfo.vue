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
  name: "CollectionInfo", //征收信息
  components: {
    TitleListCardItem,
    ItemNavBar,
  },
  props: {},
  data() {
    return {
      navTitle: "",
      itemInfo: {
        title: "征收项目名称",
        title1: "税款种类名称",
        title2: "税款所属时期起",
        title3: "税款所属时期止",
        title4: "",
        state: "",
        isShowToRight: true,
      },
      info: ["", "", ""],
    };
  },
  computed: {},
  created() {
    this.navTitle = this.$route.query.title;
  },
  mounted() {
    console.log("this.itemInfo.state" + this.itemInfo.state);
    console.log("this.itemInfo.isShowToRight=" + this.itemInfo.isShowToRight);
  },
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
