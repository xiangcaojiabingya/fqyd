<template>
  <!--年报-修改信息ycm-->
  <div class="YearReportAlter">
    <item-nav-bar title="年报-修改信息" />
    <title-list-card-item
      v-for="(item, index) in info"
      :itemInfo="itemInfo"
      :title="item.ALITEM"
      :value1="item.ALTDATE"
      :value2="item.ALTBE"
      :value3="item.ALTAF"
    />
  </div>
</template>

<script>
import ItemNavBar from "../components/ItemNavBar.vue";
import TitleListCardItem from '../components/TitleListCardItem.vue';

export default {
  name: "YearReportAlter",
  components: { TitleListCardItem, ItemNavBar },
  props: {},
  data() {
  
      return {
      itemInfo: {
        title: "修改事项",
        title1: "修改日期",
        title2: "修改前",
        title3: "修改后",
        title4: "",
        state: "",
        isShowToRight: false,
      },
      info: [""],
    };
  },
  computed: {},
  created() {},
  mounted() {
  },
  methods: {},
};
</script>

<style  scoped>
.YearReportAlter {
  padding: 46px 0 12px;
}
</style>
