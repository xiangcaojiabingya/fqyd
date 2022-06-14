<template>
  <!-- 灰色状态 -->
  <div class="company_info_item">
    <div class="top_div">
      <span>{{itemInfo.title}}</span>
      <div class="right_to_div">
        <span class="state_sapn">{{itemInfo.state}}</span>
        <img src="@/assets/img/lb_jr_icon.png" v-if="isShowToRight" />
      </div>
    </div>
    <div class="info_div">
      <span class="title_spans">{{itemInfo.title1}}</span>
      <span>{{itemInfo.value1}}</span>
    </div>
    <div class="info_div">
      <span class="title_spans">{{itemInfo.title2}}</span>
      <span>{{itemInfo.value2}}</span>
    </div>
    <div class="info_div" v-if="itemInfo.title3!=''">
      <span class="title_spans">{{itemInfo.title3}}</span>
      <span>{{itemInfo.value3}}</span>
    </div>
    <div class="line_div"></div>
  </div>
</template>

<script>
export default {
  name: "CompanyInfoItem",
  props: {
    itemInfo: Object,
    isShowToRight: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.company_info_item {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;
}
.top_div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 12px 0px 12px;
  box-sizing: border-box;
  font-size: 16px;
  align-items: center;
}
.state_sapn {
  color: #8d8d8d;
  font-size: 14px;
  text-align: end;
}
.info_div {
  width: 100%;
  padding: 12px 5px 0px 12px;
  box-sizing: border-box;
  display: flex;
  font-size: 14px;
  align-items: center;
  color: #8d8d8d;
  overflow-wrap: break-word;
  word-break: break-all;
  word-wrap: break-word;
}
.title_spans {
  min-width: 70px;
}
.line_div {
  width: 100%;
  height: 12px;
  background: var(--color-Lightgray-bg);
  margin-top: 12px;
}
img {
  height: 14px;
  margin-left: 6px;
}
.right_to_div {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>