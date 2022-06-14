    <!--单行基本信息，左右各对齐-->
<template>
  <div>
    <item-cutting-line :lineHeight="1" v-if="lineShow"></item-cutting-line>
    <div class="SingleLineItem">
      <span>{{ item.name }}</span>
      <span>{{ item.value }}</span>
    </div>
  </div>
</template>

<script>
import ItemCuttingLine from "./ItemCuttingLine.vue";
export default {
  name: "ItemSingleLine",
  components: { ItemCuttingLine },
  props: {
    item: {
      type: Object,
      default: {
        label: "",
        value: "",
      },
    },
    lineShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
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
  padding: 15px;
}
.SingleLineItem span {
  font-size: 14px;
  line-height: 14px;
  max-width: 70%;
}
.SingleLineItem span:last-child{
  text-align: right;
}
</style>
