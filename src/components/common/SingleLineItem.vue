    <!--单行基本信息，左右各对齐（已用）-->
<template>
  <div class="SingleLineItem" :class="{ showLine: isShowLine }">
    <span>{{ label }}</span>
    <span>{{ getValue }}</span>
  </div>
</template>

<script>
export default {
  name: "SingleLineItem",
  components: {},
  props: {
    label: {
      type: String,
      default: "--",
    },
    value: {
      type: String,
      default: "--",
    },
    isShowLine: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    getValue() {
      if (this.value == "" || this.value == null) {
        return "--";
      }
      return this.value;
    },
  },
  watch: {
    value(val, oldVal) {
      this.value = val;
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
.SingleLineItem {
  display: flex;
  background: #ffffff;
  justify-content: space-between;
  padding: var(--form-padding-top) 15px;
}
.showLine {
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
.SingleLineItem span {
  font-size: var(--size-text-small);
  word-break: break-all;
  word-wrap: break-word;
}
.SingleLineItem span:first-child {
  min-width: 70px;
}
.SingleLineItem span:last-child {
  margin-left: 5px;
}
</style>
