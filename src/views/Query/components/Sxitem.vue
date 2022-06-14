<template>
  <div class="sxitem">
    <!-- 分割线顶部 -->
    <div class="item_one_div">
      <div class="typename_div">
        <div
          class="vertical_line_tg"
          v-if="itemInfo.productId == 'SYD001'"
          :style="{ background: setColor(itemInfo.state) }"
        ></div>
        <div
          class="vertical_line_tg"
          v-else-if="itemInfo.state == '3' && itemInfo.approveResult != '1'"
        ></div>
        <div
          class="vertical_line_jj"
          v-else-if="
            itemInfo.state == '1' ||
            (itemInfo.state == '3' && itemInfo.approveResult == '1')
          "
        ></div>
        <div class="vertical_line_spz" v-else></div>
        <span class="typename_span">{{ itemInfo.typeName }}</span>
      </div>
      <div class="typename_div">
        <span
          class="state_span_tg"
          v-if="itemInfo.productId == 'FQD001'"
          :style="{ color: setColor(itemInfo.state) }"
        >{{ itemInfo.stateName }}</span>
        <span
          class="state_span_tg"
          v-else-if="itemInfo.state == '3' || itemInfo.status == '0'"
        >{{ itemInfo.stateName }}</span>
        <span
          class="state_span_jj"
          v-else-if="itemInfo.state == '4' || itemInfo.status == '3'"
        >{{ itemInfo.stateName }}</span>
        <span class="state_span_spz" v-else>审批中</span>
        <img class="to_right_img" src="@/assets/img/lb_jr_icon.png" />
      </div>
    </div>
    <!-- 中间信息 -->
    <div class="info_div">
      <span class="key_span">客户名称：</span>
      <span class="value_span">{{ itemInfo.khNameVal }}</span>
    </div>
    <div class="info_div">
      <span class="key_span">申请金额：</span>
      <span class="value_span">{{ moneyFormat(itemInfo.applyJeVal) }}</span>
    </div>
    <div class="info_div">
      <span class="key_span">申请时间：</span>
      <span class="value_span">{{ itemInfo.time }}</span>
    </div>
    <!-- 底部信息 -->
    <div class="bottom_div" v-if="itemType == 'sp'">
      <div class="bottom_container">
        <span class="key_span1">当前节点：</span>
        <span class="btm_value">{{ itemInfo.nodeVal }}</span>
      </div>
      <div class="bottom_container">
        <span class="key_span1">处理人：</span>
        <span class="btm_value">{{ itemInfo.dealPersonVal }}</span>
      </div>
    </div>
    <div class="bottom_div_add" v-if="itemType != 'sp'"></div>
    <div class="line_div"></div>
  </div>
</template>

<script>
import { moneyFormat } from "@/utils/index.js";
export default {
  // 审批、查询 授信和支用列表Item
  name: "Sxitem",
  props: {
    itemInfo: Object,
    itemType: String,
  },
  data() {
    return {};
  },
  methods: {
    moneyFormat(val) {
      return moneyFormat(val);
    },
    setColor(status) {
      // console.log("status = " + status);
      switch (status) {
        case "09":
        case "3":
          return "#14ccbd"; //通过类
        case "07":
        case "10":
        case "30":
          return "#ff1919"; //警告类
        case "01":
        case "20":
        case "21":
        case "31":
          return "#999999"; //灰色类
        default:
          return "#ffb319"; //进行中类
      }
      return "#ffb319"; //进行中类
    },
  },
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
  margin: 15px;
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 12px;
  padding: 5px 15px;
  box-sizing: border-box;
  border-radius: 4px;
}
.bottom_container {
  display: flex;
}
.bottom_container:first-child {
  margin-bottom: 5px;
}
.bottom_div_add {
  height: 15px;
}
.key_span1 {
  display: block;
  width: 80px;
  color: #999999;
  font-size: 12px;
}
.line_div {
  width: 100%;
  height: 12px;
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