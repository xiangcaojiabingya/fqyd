<template>
  <!-- 单行右侧是点击事件 （合同下载） -->
  <div class="oneline-div">
    <div class="fixfloat">
      <div class="oneline-title">{{ item.title }}</div>
      <div class="div-arrow" v-if="arrow">
        <van-icon name="arrow" size="14" />
      </div>
      <div
        class="oneline-content"
        @click="onClick"
        :style="{ color: textColor, marginRight: marginRight + 'px' }"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemOneRow",
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          title: "借款合同",
          content: "合同下载",
        };
      },
    },
    textColor: {
      type: String,
      default: "#109CEF",
    },
    arrow: {
      type: Boolean,
      default: false,
    },
    marginRight: String,
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
  computed: {},
};
</script>

<style scoped>
.fixfloat::after {
  overflow: hidden;
  content: "";
  display: block;
  clear: both;
}
.oneline-div {
  font: initial;
  font-size: 14px;
  padding: 15px;
  background: white;
  border-bottom: 1px solid var(--color-gray-bg);
  line-height: 14px;
}
.oneline-title {
  color: #272727;
  float: left;
  max-width: 150px;
  word-break: break-all;
}
.oneline-content {
  float: right;
  margin-right: 8px;
  max-width: 150px;
  word-break: break-all;
}
.div-arrow {
  float: right;
  height: 14px;
}
</style>