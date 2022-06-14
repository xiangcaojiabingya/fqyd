<template>
  <div class>
    <item-nav-bar title="汇法信息"></item-nav-bar>
    <div class="main">
      <div v-for="item in title">
        <CheckMessage :title="item.title" :href="item.href" :type="item.type" />
      </div>
    </div>
  </div>
</template>

<script>
import CheckMessage from "../components/Details.vue";
import { huiFaConstData } from "@/utils/commonData.js";
import ItemNavBar from "../components/ItemNavBar.vue";
export default {
  name: "HuiFa",
  components: {
    CheckMessage,
    ItemNavBar,
  },
  data() {
    return {
      arrs: [],
      title: [],
    };
  },
  mounted() {
    this.arrs = huiFaConstData;
    this.title = [
      { title: this.arrs[0], href: "HuiFaList", type: this.arrs[0] },
      { title: this.arrs[1], href: "HuiFaList", type: this.arrs[1] },
      { title: this.arrs[2], href: "HuiFaList", type: this.arrs[2] },
      { title: this.arrs[3], href: "HuiFaList", type: this.arrs[3] },
      { title: this.arrs[4], href: "HuiFaList", type: this.arrs[4] },
      { title: this.arrs[5], href: "HuiFaList", type: this.arrs[5] },
      { title: this.arrs[6], href: "HuiFaList", type: this.arrs[6] },
      { title: this.arrs[7], href: "HuiFaList", type: this.arrs[7] },
      { title: this.arrs[8], href: "HuiFaList", type: this.arrs[8] },
      { title: this.arrs[9], href: "HuiFaList", type: this.arrs[9] },
      { title: this.arrs[10], href: "HuiFaList", type: this.arrs[10] },
    ];
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.main {
  margin-top: 58px;
}
</style>