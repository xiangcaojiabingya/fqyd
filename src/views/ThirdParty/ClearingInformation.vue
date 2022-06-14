<template>
    
  <div>
    <item-nav-bar title="清算信息"></item-nav-bar>
    <div class="body-margin-top">
      <item-clearing-member
        v-for="(item, index) in arrs"
        :item="item"
        :key="index"
        @click="onClick(item)"
      ></item-clearing-member>
       <item-clearing-member
    </div>
  </div>
</template>

<script>
import { setWebViewTitle } from "@/utils/index.js";
import ItemNavBar from './components/ItemNavBar.vue';
import ItemClearingMember from './components/ItemClearingMember.vue';
export default {
  name: "ClearingInformation", //清算信息
  components: { ItemClearingMember,ItemNavBar,ItemClearingMember },
  data() {
    return {
      arrs: [
        {
          title: "清算负责人",
          subhead: "清算组成员",
          member: [
            { img: require("@/assets/img/heard_icon.png"), name: "小红" },
            { img: require("@/assets/img/heard_icon.png"), name: "小红" },
            { img: require("@/assets/img/heard_icon.png"), name: "小红" },
          ],
        },
        {
          title: "清算负责人",
          subhead: "清算组成员",
          member: [
            { img: require("@/assets/img/heard_icon.png"), name: "小红" },
            { img: require("@/assets/img/heard_icon.png"), name: "小红" },
            { img: require("@/assets/img/heard_icon.png"), name: "小红" },
          ],
        },
        {
          title: "清算负责人",
          subhead: "清算组成员",
          member: [
            { img: require("@/assets/img/heard_icon.png"), name: "小红" },
            { img: require("@/assets/img/heard_icon.png"), name: "小红" },
            { img: require("@/assets/img/heard_icon.png"), name: "小红" },
          ],
        },
      ],
    };
  },
  methods: {
    onClick(item) {
      this.$toast(item.title);
    },
  },
  mounted() {
    setWebViewTitle("清算信息");
  },
  activated() {},
};
</script>

<style scoped>
</style>