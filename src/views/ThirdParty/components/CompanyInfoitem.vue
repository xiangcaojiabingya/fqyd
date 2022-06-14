<template>
  <!-- 带颜色的状态 -->
  <div class="mains">
    <div class="company_info_item">
      <div class="top_div">
        <span>{{itemInfo.title}}</span>
        <div class="right_to_div" v-if="itemInfo.state">
          <span class="state_sapn">{{itemInfo.state}}</span>
          <img src="@/assets/img/lb_jr_icon.png" class="margin_img" v-if="isShowToRight" />
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
      <div class="info_div" :class="{'margin_btm':itemInfo.title3}" v-if="itemInfo.title3!=''">
        <span class="title_spans">{{itemInfo.title3}}</span>
        <span>{{itemInfo.value3}}</span>
      </div>
    </div>
    <img
      src="@/assets/img/lb_jr_icon.png"
      class="margin_right_img"
      v-if="!itemInfo.state&&isShowToRight"
    />
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
  padding: 12px 0px 0px 12px;
  box-sizing: border-box;
  font-size: 16px;
}
.state_sapn {
  color: #ffc600;
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
.mains {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: white;
  margin-bottom: 12px;
}
img {
  height: 14px;
}
.right_to_div {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 12px;
}
.margin_btm {
  margin-bottom: 12px;
}
.margin_img {
  margin-left: 6px;
}
.margin_right_img {
  margin-right: 12px;
}
</style>