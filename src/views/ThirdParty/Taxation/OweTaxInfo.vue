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
  name: "OweTaxInfo", //税务信息-欠税信息
  components: {
    TitleListCardItem,
    ItemNavBar,
  },
  props: {},
  data() {
    return {
      navTitle: "",
      itemInfo: {
        title: "征收项目代码",
        title1: "欠税金额",
        title2: "欠税日期",
        title3: "税款所属期起",
        title4: "税款所属期止",
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
