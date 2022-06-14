<template>
  <div class="ClientsList">
    <item-nav-bar title="客户信息" />

    <div class="content">
      <top />
      <div v-for="(item, index) in title2" :key="index">
        <CheckMessage
          :title="item.title"
          :href="item.href"
          :type="item.type"
          :info="item.info"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { setWebViewTitle, hideWebViewTitle } from "@/utils/index.js";
import CheckMessage from "./components/Details.vue";
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import Top from "@/components/module/Top.vue";

export default {
  name: "ClientsList",
  components: {
    CheckMessage,
    ItemNavBar,
    Top,
  },
  data() {
    return {
      title2: [
        {
          title: "基本信息",
          href: "khInformation",
          info: JSON.parse(this.$route.query.data), //query传递的是String，info定义的是Object
        },
        {
          title: "资产信息",
          href: "Contact",
          info: JSON.parse(this.$route.query.data),
        },
        {
          title: "账户信息",
          href: "Run",
          info: JSON.parse(this.$route.query.data),
        },
        {
          title: "影像资料",
          href: "ImageData",
          type: "5", //跳转影像资料的标志，必传
          info: JSON.parse(this.$route.query.data),
        },
        {
          title: "关联信息",
          href: "FinancialInformation",
          info: JSON.parse(this.$route.query.data),
        },
        {
          title: "历史借贷",
          href: "AccountInformation",
          info: JSON.parse(this.$route.query.data),
        },
        {
          title: "公积金信息",
          href: "CorrelationInfo",
          info: JSON.parse(this.$route.query.data),
        },
        {
          title: "社保征信",
          href: "Memorabilia",
          info: JSON.parse(this.$route.query.data),
        },
        {
          title: "司法诉讼信息",
          href: "CreditInformation",
          info: JSON.parse(this.$route.query.data),
        },
        {
          title: "其他征信",
          href: "LegalRepresentative",
          info: JSON.parse(this.$route.query.data),
        },
        {
          title: "经营信息",
          href: "Extend",
          info: JSON.parse(this.$route.query.data),
        },
        {
          title: "征信信息",
          href: "zhengxin",
          info: JSON.parse(this.$route.query.data),
        },
      ],
    };
  },
  methods: {},
  created() {
    console.log("this.$route.query.data=" + this.$route.query.data);
  },
  mounted() {},
  computed: {},
};
</script>

<style scoped>
.ClientsList {
  padding: 46px 0;
}
</style>