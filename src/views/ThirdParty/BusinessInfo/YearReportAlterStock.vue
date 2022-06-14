<template>
  <!--年报-股权变更信息 ycm-->
  <div class="YearReportAlterStock">
    <item-nav-bar title="年报-股权变更信息" />
    <title-list-card-item
      v-for="(item, index) in info"
      :key="index"
      :itemInfo="itemInfo"
      :title="item.INV"
      :value1="item.ANCHEID"
      :value2="item.TRANSAMPR"
      :value3="item.TRANSAMAFT"
      :state="item.ALTDATE"
    />
  </div>
</template>

<script>
import ItemNavBar from "../components/ItemNavBar.vue";
import TitleListCardItem from "../components/TitleListCardItem.vue";

export default {
  name: "YearReportAlterStock",
  components: { TitleListCardItem, ItemNavBar },
  props: {},
  data() {
    return {
      itemInfo: {
        title: "股东名称",
        title1: "年报ID",
        title2: "转让前股权比例",
        title3: "转让后股权比例",
        title4: "",
        state: "股权变更日期",
        isShowToRight: false,
      },
      info: [""],
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
.YearReportAlterStock {
  padding: 46px 0 12px;
}
</style>
