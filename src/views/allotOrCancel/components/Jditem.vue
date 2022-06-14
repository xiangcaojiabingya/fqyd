<template>
  <div class="sxitem">
    <!-- 分割线顶部 -->
    <div class="item_one_div">
      <div class="typename_div">
        <div class="vertical_line_spz"></div>
        <span class="typename_span">{{itemInfo.typeName}}</span>
      </div>
      <div class="typename_div">
        <span class="state_span_spz">{{itemInfo.status}}</span>
        <img class="to_right_img" src="@/assets/img/lb_jr_icon.png" />
      </div>
    </div>
    <!-- 中间信息 -->
    <div class="info_div">
      <span class="key_span">客户名称：</span>
      <span class="value_span">{{itemInfo.khNameVal}}</span>
    </div>
    <!-- <div class="info_div">
      <span class="key_span">{{itemInfo.cpNameKey}}</span>:
      <span>{{itemInfo.cpNameVal}}</span>
    </div>-->
    <div class="info_div">
      <span class="key_span">申请金额：</span>
      <span class="value_span">{{itemInfo.applyJeVal}}</span>
    </div>
    <div class="info_div">
      <span class="key_span">申请时间：</span>
      <span class="value_span">{{itemInfo.time}}</span>
    </div>
    <div class="line_div"></div>
  </div>
</template>

<script>
export default {
  name: "Jditem",
  props: {
    itemInfo: Object,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>
<style scoped>
.sxitem {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;
}
/* 分割线顶部 */
.item_one_div {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 13px 12px 13px 0px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
.typename_div {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.typename_span {
  font-size: 16px;
  margin-left: 12px;
}
.time_span {
  font-size: 14px;
  width: 100%;
  color: #8d8d8d;
  margin-top: 2px;
}
.state_span_tg {
  color: #14ccbd;
  font-size: 12px;
  text-align: end;
  margin-right: 6px;
}
.state_span_jj {
  color: #ff1919;
  font-size: 12px;
  text-align: end;
  margin-right: 6px;
}
.state_span_spz {
  color: #ffb319;
  font-size: 12px;
  text-align: end;
  margin-right: 6px;
}
/* 中间信息 */
.info_div {
  width: 100%;
  padding: 8px 15px 0px 15px;
  font-size: 15px;
  box-sizing: border-box;
}
.key_span {
  color: #999999;
  margin-right: 30px;
  font-size: 14px;
}
.value_span {
  color: #333333;
  font-size: 14px;
  overflow-wrap: break-word;
  word-break: break-all;
  word-wrap: break-word;
}
/* 底部信息 */
.bottom_div {
  width: cale (100% - 24px);
  margin-left: 15px;
  margin-right: 15px;
  background: #f1f1f1;
  height: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding: 0 15px;
  box-sizing: border-box;
  margin-top: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
}
.key_span1 {
  color: #999999;
  font-size: 12px;
}
.line_div {
  width: 100%;
  height: 12px;
  margin-top: 15px;
  background: var(--color-Lightgray-bg);
}
/* 竖线 */
.vertical_line_jj {
  width: 3px;
  height: 20px;
  background: #ff1919;
}
.vertical_line_tg {
  width: 3px;
  height: 20px;
  background: #14ccbd;
}
.vertical_line_spz {
  width: 3px;
  height: 20px;
  background: #ffb319;
}
.to_right_img {
  height: 12px;
}
.btm_value {
  font-size: 12px;
  color: #333333;
}
</style>