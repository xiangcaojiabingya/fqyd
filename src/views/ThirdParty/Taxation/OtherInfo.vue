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
  name: "OtherInfo", ////企业一个月内其他银行相关查询
  components: {
    TitleListCardItem,
    ItemNavBar,
  },
  props: {},
  data() {
    return {
      navTitle: "",
      itemInfo: {
        title: "",
        title1: "企业一月内获得其他银行贷款审批通过 ",
        title2: "企业一月内通过其他银行发起授权",
        title3: "",
        title4: "",
        state: "",
        isShowToRight: false,
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
