<template>
  <div class="com_body fixfloat">
    <!-- 竖线 -->
    <div class="left_vertical_line"></div>
    <!-- title -->
    <div class="title_text">{{ title }}</div>
    <!-- 右侧
    <div class="right_text_icon"></div> -->
  </div>
</template>

<script>
export default {
  name: "ItemTitle", //标题，左侧有竖线
  components: {},
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "标题",
    },
  },
  methods: {},
  mounted() {},
  activated() {},
};
</script>

<style scoped>
.fixfloat::after {
  overflow: hidden;
  content: "";
  display: block;
  clear: both;
}
.com_body {
  background: var(--color-white-bg);
}
.left_vertical_line {
  float: left;
  width: 3px;
  background: #ff6619;
  height: 20px;
  margin-top: 12px;
}
.title_text {
  float: left;
  font-size: 14px;
  line-height: 14px;
  margin: 15px 0 15px 12px;
  color: #ff6619;
}
</style>