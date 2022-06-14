<template>
  <div class="main">
    <div class="itemInput">
      <span>{{ title }}</span>
      <input
        :placeholder="placeholder"
        :value="value"
        :type="inputType"
        :readonly="readonly"
        @input="$emit('input', $event.target.value)"
      />
    </div>
    <div class="line" v-if="isShowLine"></div>
  </div>
</template>

<script>
export default {
  name: "ItemInput",
  data() {
    return {};
  },
  props: {
    readonly: {
      type: Boolean,
      default: true,
    },
    value: String,
    title: String,
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
  },
  methods: {},
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
  height: 50px;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
}
.itemInput span {
  font-size: 14px;
  color: #333333;
  width: 55%;
}
input {
  border: none;
  text-align: right;
  color: #333333;
  font-size: 14px;
  float: right;
  width: 96%;
}
input::-webkit-input-placeholder {
  /* WebKit browsers */
  font-size: 14px;
  color: #999999;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-size: 14px;
  color: #999999;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-size: 14px;
  color: #999999;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-size: 14px;
  color: #999999;
}
.line {
  height: 1px;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
</style>