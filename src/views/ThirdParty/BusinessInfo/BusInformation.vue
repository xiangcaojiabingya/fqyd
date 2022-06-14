<template>
  <div class="main">
    <item-nav-bar :title="title"></item-nav-bar>
    <div class="content2">
      <top />
      <Check :infomation="infomation" />
    </div>
  </div>
</template>

<script>
import Check from "../components/Check.vue";
import { getDetailList } from "@/utils/commonData.js";
import ItemNavBar from "../components/ItemNavBar.vue";
import Top from "@/components/module/Top.vue";

export default {
  name: "BusInformation",
  components: { Check, "item-nav-bar": ItemNavBar, Top },
  data() {
    return {
      data: "",
      type: this.$route.query.type,
      title: this.$route.query.title,
      infomation: [],
    };
  },
  mounted() {
    this.infomation = getDetailList(this.type, this.data);
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
.content2 {
  padding-top: 46px;
}
</style>