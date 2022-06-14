<template>
  <!-- 分割线-很宽 -->
  <div
    class="cuttingline-div"
    :style="{ background: lineColor, height: lineHeight +'px' }"
  ></div>
</template>

<script>
export default {
  name: "ItemCuttingLine",
  data() {
    return {};
  },
  props: {
    lineColor: {
      type: String,
      default: 'var(--color-nomessage-bg)',
    },
    lineHeight: {
      type: Number,
      default: 12,
    },
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>

</style>