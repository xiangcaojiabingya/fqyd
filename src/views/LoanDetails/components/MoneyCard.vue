<template>
  <!--借据监控的卡片（已用）-->
  <div class="card_div">
    <div class="card_head">{{ title }}</div>
    <div class="card_head2">
      <span>￥</span><span>{{ value }}</span>
    </div>
    <div class="card_body">
      <div class="card_item">
        <span>本金：</span><span>{{ getFormatMoney(value1) }}元</span>
      </div>
      <div class="card_item">
        <span>罚息：</span><span>{{ getFormatMoney(value2) }}元</span>
      </div>
      <div class="card_item">
        <span>利息：</span><span>{{ getFormatMoney(value3) }}元</span>
      </div>
      <div class="card_item">
        <span>复利：</span><span>{{ getFormatMoney(value4) }}元</span>
      </div>
      <div class="card_item">
        <span>费用：</span><span>{{ getFormatMoney(value5) }}元</span>
      </div>
    </div>
  </div>
</template>

<script>
import { moneyFormat } from "@/utils/index.js";

export default {
  name: "MoneyCard",
  components: {},
  props: ["title", "value", "value1", "value2", "value3", "value4", "value5"],
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    getFormatMoney(money) {
      return moneyFormat(money);
    },
  },
};
</script>

<style  scoped>
.card_div {
  width: 100%;
  background: #ffffff;
  padding: 15px 0 0;
  box-sizing: border-box;
}

.card_head {
  margin-left: 15px;
  color: #333333;
}
.card_head2 {
  margin-top: 12px;
  margin-left: 15px;
  color: #ff6619;
}
.card_head2 span:nth-child(2),
.text_style2 {
  font-size: 18px;
  font-weight: 600;
  padding: 0 0 15px;
}

.card_body {
  padding: 0 0 15px 15px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.card_item {
  width: 50%;
  margin-top: 15px;
  color: var(--color-gray-text);
}
.card_item span:nth-child(2) {
  color: var(--color-black-text);
  margin-left: 15px;
}
</style>
