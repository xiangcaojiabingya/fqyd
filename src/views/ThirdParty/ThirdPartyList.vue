<template>
  <div class="ThirdPartyList2">
    <item-nav-bar :title="title1"></item-nav-bar>
    <div class="ThirdPartyList">
      <top />
      <div v-for="item in title2">
        <CheckMessage :title="item.title" :href="item.href" />
      </div>
    </div>
  </div>
</template>

<script>
import CheckMessage from "./components/Details.vue";
import ItemNavBar from "./components/ItemNavBar.vue";
import Top from "@/components/module/Top.vue";

export default {
  name: "ThirdPartyList",
  components: {
    CheckMessage,
    "item-nav-bar": ItemNavBar,
    Top,
  },
  data() {
    return {
      title: [],
      title1: '第三方信息',
      title2: [
        { title: "申请人征信信息", href: "" },
        { title: "汇法信息", href: "HuiFa" },
        { title: "行内征信信息", href: "BankInternalCredit" },
        { title: "配偶征信信息", href: "" },
        { title: "抵押人征信信息", href: "" },
        { title: "抵押人配偶征信信息", href: "" },
        { title: "以下为旧的", href: "" },
        { title: "企业征信信息", href: "" },
        { title: "工商信息", href: "Business" },
        { title: "税务信息", href: "TaxList" },
      ]
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  mounted() {
  },
  computed: {}
};
</script>

<style scoped>
.ThirdPartyList2 {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
.ThirdPartyList {
  padding-top: 46px;
  width: 100%;
  /* height: 100%; */
}
</style>