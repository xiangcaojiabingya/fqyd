<template>
  <div class="sxitem">
    <!-- 分割线顶部 -->
    <div class="item_one_div">
      <div class="typename_div">
        <div class="vertical_line_spz" :style="bgColor(itemInfo.status)"></div>
        <span class="typename_span">借据编号：</span>
        <span class="time_span">{{ itemInfo.loanInvoiceId }}</span>
      </div>
      <div class="typename_div">
        <span class="state_span_tg"
          :style="spanColor(itemInfo.status)">{{ getDictStrs(itemInfo.status) }}</span>
        <img class="to_right_img" src="@/assets/img/lb_jr_icon.png" />
      </div>
    </div>
    <!-- 中间信息 -->
    <div class="info_div">
      <span class="key_span">客户名称：</span>
      <span class="value_span">{{ itemInfo.userName }}</span>
    </div>
    <!-- <div class="info_div">
      <span class="key_span">{{itemInfo.cpNameKey}}</span>:
      <span>{{itemInfo.cpNameVal}}</span>
    </div>-->
    <div class="info_div">
      <span class="key_span">借款金额：</span>
      <span class="value_span">{{ moneyFormat }}元</span>
    </div>
    <div class="info_div">
      <span class="key_span">申请时间：</span>
      <span class="value_span">{{ itemInfo.applyTime }}</span>
    </div>
    <div class="line_div"></div>
  </div>
</template>

<script>
import { moneyFormat } from "@/utils/index.js";
export default {
  name: "Jjitem",
  props: {
    itemInfo: Object,
  },
  data() {
    return {
      colorGreen: "#14ccbd",
      colorRed: "#ff1919",
      colorYellow: "#ffb319",
    };
  },

  methods: {
    status_color(status) {
      if (status == "1") {
        return this.colorGreen;
      } else if (status == "2") {
        return this.colorRed;
      } else {
        return this.colorYellow;
      }
    },
    bgColor(status) {
      return { backgroundColor: this.status_color(status) };
    },
    spanColor(status) {
      return { color: this.status_color(status) };
    },
    getDictStrs(code) {
      switch (code) {
        case "1":
          return "使用中";
          break;
        case "2":
          return "已逾期";
          break;
        case "3":
          return "已结清";
          break;
        default:
          return "-";
          break;
      }
    },
  },
  computed: {
    moneyFormat() {
      if (this.itemInfo.loanAmount != "" && this.itemInfo.loanAmount !== null) {
        return moneyFormat(this.itemInfo.loanAmount);
      } else {
        return "-";
      }
    },
  },
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
  font-size: 15px;
  margin-left: 12px;
}
.time_span {
  font-size: 14px;
  color: #999999;
  margin-top: 2px;
}
.state_span_tg {
  font-size: 12px;
  text-align: end;
  margin-right: 3px;
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
  /* background: #ffb319;*/
}
.to_right_img {
  height: 12px;
}
.btm_value {
  font-size: 12px;
  color: #333333;
}
</style>

