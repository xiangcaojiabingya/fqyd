<template>
  <!--主要管理人员ycm-->
  <div class="MainPerson">
    <item-nav-bar title="主要管理人员" />
    <title-list-card-item
      v-for="(item, index) in info"
      :key="index"
      :itemInfo="itemInfo"
      :title="item.ENTNAME"
      :value1="item.PERNAME"
      :value2="item.PERSONAMOUNT"
      @click.native="itemClick(item)"
    />
  </div>
</template>

<script>
import TitleListCardItem from "../components/TitleListCardItem.vue";
import { gongShangConstData } from "@/utils/commonData.js";
import ItemNavBar from "../components/ItemNavBar.vue";

export default {
  name: "MainPerson", //主要管理人员ycm
  components: { TitleListCardItem, ItemNavBar },
  props: {},
  data() {
    return {
      itemInfo: {
        title: "企业名称",
        title1: "高管姓名",
        title2: "高管总数量",
        title3: "",
        title4: "",
        state: "",
        isShowToRight: true,
      },
      info: [
        {
          ENTNAME:
            "山东大德物业管理有限公司山东大德物业管理有限公司山东大德物业管理有限公司",
          PERNAME: "王景生",
          PERSONAMOUNT: "2",
          POSITION: "执行董事兼总经理",
          POSITIONCODE: "410C",
        },
        {
          ENTNAME: "山东大德物业管理有限公司",
          PERNAME: "韩文勇",
          PERSONAMOUNT: "2",
          POSITION: "执行董事兼总经理",
          POSITIONCODE: "410C",
        },
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
          title: "主要管理人员",
          type: gongShangConstData[15],
        },
      });
    },
  },
};
</script>

<style  scoped>
.MainPerson {
  padding: 46px 0 12px;
}
</style>
