<template>
  <!--失信被执行人信息  ycm-->
  <div class="PunishBreak">
    <item-nav-bar title="失信被执行人信息" />
    <title-list-card-item
      v-for="(item, index) in info"
      :key="index"
      :itemInfo="itemInfo"
      :title="item.INAMECLEAN"
      :value1="item.REGDATECLEAN"
      :value2="item.PERFORMANCE"
      @click.native="itemClick(item)"
    />
  </div>
</template>

<script>
import TitleListCardItem from "../components/TitleListCardItem.vue";
import { gongShangConstData } from "@/utils/commonData.js";
import ItemNavBar from "../components/ItemNavBar.vue";

export default {
  name: "PunishBreak",
  components: { TitleListCardItem, ItemNavBar },
  props: {},
  data() {
    return {
      itemInfo: {
        title: "被执行人姓名/名称",
        title1: "立案时间",
        title2: "被执行人履行情况",
        title3: "",
        title4: "",
        state: "",
        isShowToRight: true,
      },
      info: [
        {REGDATECLEAN:'凉快地方比V领剧哦一吗1234567890987654vdfjkbsvvVN', PERFORMANCE: "被执行人履行情况被执行人履行情况被执行人履行情况" },
        "",
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    itemClick(item) {
      this.$router.push({
        path: "/BusInformation",
        query: {
          title: "失信被执行人信息",
          type: gongShangConstData[16],
        },
      });
    },
  },
};
</script>

<style  scoped>
.PunishBreak {
  padding: 46px 0 12px;
}
</style>
