<template>
  <div class="itemPicker">
    <div class="item_content">
      <span class="left_span">
        {{ title }}
        <span class="necessarily" v-show="necessary">*</span>
      </span>
      <div class="right_div" @click="chooseData" v-if="!readonly">
        <span :class="[ !readonly ? 'gray_col' : 'black_col']">
          {{
          getTypeName(value)
          }}
        </span>
        <img src="@/assets/img/lb_jr_icon.png" />
      </div>
      <div class="right_div" v-else>
        <span :class="[ !readonly ? 'gray_col' : 'black_col']">
          {{
          getTypeName(value) == '请选择' ? '' : getTypeName(value)
          }}
        </span>
        <img v-if="!readonly" src="@/assets/img/lb_jr_icon.png" />
      </div>
    </div>
    <div class="line" v-if="isShowLine"></div>
    <van-popup v-model="show" position="bottom">
      <van-picker
        :title="pickerTitle"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        value-key="itemName"
      />
    </van-popup>
  </div>
</template>

<script>
import { codeToValue2 } from "@/utils/index.js";
export default {
  name: "ItemPicker",
  data() {
    return {
      show: false,
      value: this.currentValue,
    };
  },
  model: {
    prop: "currentValue",
    event: "change", //当组件的值发生改变时要emit的事件名
  },
  props: {
    columns: Array,
    currentValue: {
      type: String,
      default: "请选择",
    },
    title: String,
    isShowLine: {
      type: Boolean,
      default: true,
    },
    pickerTitle: {
      type: String,
      default: "标题",
    },
    // 是否展示必填图标
    necessary: {
      type: Boolean,
      default: false,
    },
    // 选择框是否只读
    readonly: {
      type: Boolean,
      default: false,
    },

  },
  watch: {
    currentValue(val, oldVal) {
      //普通的watch监听
      // console.log("newval: " + JSON.stringify(val) + "--oldVal: " + JSON.stringify(oldVal));
      this.value = val;
    },
  },
  methods: {
    chooseData() {
      this.show = true;
    },
    onConfirm(value, index) {
      this.value = this.columns[index].itemKey;
      this.show = false;
      // console.log(" this.$emit=" + this.value);
      this.$emit("change", value);
    },
    onCancel() {
      this.show = false;
    },
    getTypeName(str) {
      // console.log("数据处理=" + JSON.stringify(str));
      return codeToValue2(this.columns, str);
    },
  },
  computed: {},
};
</script>

<style scoped>
.itemPicker {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  background-color: white;
}
.item_content {
  width: 100%;
  padding: var(--form-padding-top) 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  font-size: var(--size-text-small);
  align-items: center;
}
.item_content > span {
  color: #333333;
}
.left_span {
  min-width: 70px;
}
.necessarily {
  color: rgba(255, 0, 0);
}
.right_div {
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
}
.right_div img {
  height: 14px;
  margin-left: 6px;
}
.black_col {
  color: var(--color-black-text);
  font-size: var(--size-text-small);
}
.gray_col {
  /* color: #999999;*/
  color: var(--color-orange-text);
  font-size: var(--size-text-small);
}
.line {
  height: 1px;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
</style>