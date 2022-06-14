<template>
    
  <div class="com_body" v-if="showItem">
    <img :src="noMessage" />
    <div>{{ hintText }}</div>
  </div>
</template>

<script>
export default {
  name: "ItemNoMessage", //无信息时显示样式
  components: {},
  data() {
    return {
      noMessage: require("@/assets/img/cx_qxy_pic.png"),
    };
  },
  props: {
    list: {
      type: Array,
      default: ()=>{return []},
    },
    hintText: {
      type: String,
      default: "请先输入您的搜索信息哦~",
    },
  },
  methods: {
      showItem(){
          if(list != [] && list != null){
            return true
          }
          return false
      }
  },
  mounted() {},
  activated() {},
};
</script>

<style scoped>
.com_body {
  /* background: var(--color-nomessage-bg); */
  text-align: center;
  padding-top: 80px;
  min-height: var(--height-no-message);
}
.com_body img {
  width: 150px;
  height: 100px;
}
.com_body div {
  margin-top: 12px;
  color: var(--color-gray-text);
  font-size: var(--size-text-12);
}
</style>