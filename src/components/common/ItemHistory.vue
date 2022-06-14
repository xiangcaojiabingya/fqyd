<template>
  <div>
    <!-- <item-cutting-line></item-cutting-line> -->
    <!-- 历史授信信息和历史支用信息 -->
    <div class="history-div" @click="onClick">
      <div class="fixfloat history-top">
        <div class="history-title">
          {{ item.productName }}-{{ getID(item) }}
        </div>
        <div class="history-time">{{ dealTime(item.createTime) }}</div>
      </div>
      <div class="fixfloat history-bottom">
        <div class="history-sum" v-if="title == '支用金额'">
          {{ title }} {{ getMoneyFormat(item.approvalAmount) }}
        </div>
        <div class="history-sum" v-if="title == '授信金额'">
          {{ title }} {{ getMoneyFormat(item.creditAmount) }}
        </div>
        <div class="history-status" :style="{ color: funSetColor(item) }">
          {{ getZHType(item.status) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCuttingLine from "@/components/common/ItemCuttingLine.vue";
import { codeToValue, moneyFormat } from "@/utils/index.js";
export default {
  name: "ItemHistory",
  components: { ItemCuttingLine },
  data() {
    return {
      list: this.typeList,
    };
  },
  props: {
    item: {
      type: Object,
    },
    title: String,
    typeList: Array,
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
    funSetColor(item) {
      if (this.title == "授信金额") {
        //待更改，暂不完整
        if (item.status == "03") {
          return "#14ccbd";
        } else if (item.status == "04") {
          return "#ff1919";
        } else {
          return "#ffb319";
        }
      } else {
        //待更改，暂不完整
        if (item.status == "09") {
          return "#14ccbd";
        } else if (item.status == "07") {
          return "#ff1919";
        } else {
          return "#ffb319";
        }
      }
    },
    dealTime(str) {
      return str == null ? "--" : str.substring(0, 16);
    },
    getZHType(code) {
      return codeToValue(this.typeList, code);
    },
    getMoneyFormat(str) {
      return moneyFormat(str);
    },
    // 判断申请单号
    getID(item) {
      if (this.title == "授信金额") {
        return item.creditApplyId;
      } else {
        return item.loanApplyId;
      }
    },
  },
  computed: {},
  watch: {
    typeList(val, oldVal) {
      //普通的watch监听
      this.list = val;
    },
  },
};
</script>

<style scoped>
.fixfloat {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}
.history-div {
  font-size: var(--size-text-12);
  padding: 12px 15px;
  background: white;
  /* border-bottom: 1px solid #c2c2c2; */
}
.history-top {
  line-height: 14px;
}
.history-title {
  color: #333333;
  float: left;
  font-size: var(--size-text-14);
  word-break: break-all;
  word-wrap: break-word;
  width: calc(100% - 120px);
  word-break: break-all;
  word-wrap: break-word;
}
.history-time {
  float: right;
  color: #999999;
  min-width: 108px;
  display: flex;
  justify-content: flex-end;
}
.history-bottom {
  margin-top: 12px;
  line-height: 12px;
}

.history-sum {
  float: left;
  color: #999999;
}
.history-status {
  float: right;
}
</style>