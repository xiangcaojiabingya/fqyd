<template>
  <div class="main">
    <div class="itemInput">
      <span>{{ title }}<span id="icon">*</span></span>
      <span class="unit"
        ><input
          id="change"
          :placeholder="placeholder"
          :type="inputType"
          :readonly="readonly"
          v-model="inputValue"
          @input="inputChange"
          @blur="blur"
        />
        <span id="ccc">{{ end }}</span>
      </span>
    </div>
    <div class="line" v-if="isShowLine"></div>
  </div>
</template>

<script>
export default {
  name: "ItemInputs",
  data() {
    return {
      inputValue: "",
    };
  },
  props: {
    readonly: Boolean,
    title: String,
    end: String,
    inputType: {
      type: String,
      default: "text",
    },
    isShowLine: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
    nummode: {
      type: String,
      default: "NP", //NP 浮点类型 ON 只有数字
    },
    value: String,
  },
  watch: {
    value(val, oval) {
      console.log("value1 - val = " + val + " - oval = " + oval);
      this.inputValue = val;
    },
  },
  methods: {
    inputChange() {
      console.log("this.inputValue = " + this.inputValue);
      this.$emit("input", this.inputValue);
      console.log("this.inputValue = " + this.inputValue);
    },
    blur() {
      this.$emit("blur", this.inputValue);
    },
  },
  computed: {},
};
</script>

<style scoped>
.main {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
}
.itemInput {
  width: 100%;
  padding: var(--form-padding-top) 0;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
}
.itemInput span {
  font-size: var(--size-text-small);
  color: #333333;
  width: 55%;
}
#change {
  align-items: right;
  text-align: right;
  color: var(--color-edit-text);
}
.unit {
  display: flex;
  flex-direction: row;
  font-size: var(--size-text-small);
  color: #333333;
  width: 5%;
  align-items: right;
}
#icon {
  color: red;
}
input {
  margin-bottom: -3px;
  border: none;
  text-align: right;
  color: var(--color-edit-text);
  font-size: var(--size-text-small);
  float: right;
  width: 96%;
}
#ccc {
  margin-top: 1px;
  width: 6%;
  text-align: right;
}
input::-webkit-input-placeholder {
  /* WebKit browsers */
  font-size: var(--size-text-small);
  color: var(--color-edit-text);
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-size: var(--size-text-small);
  color: var(--color-edit-text);
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-size: var(--size-text-small);
  color: var(--color-edit-text);
}
input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-size: var(--size-text-small);
  color: var(--color-edit-text);
}
.line {
  height: 1px;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
</style>