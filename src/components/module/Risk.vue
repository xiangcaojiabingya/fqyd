<template>
  <div class="Rick2">

      <van-notice-bar color="#F4333C"
        background="#FFE5E6" :left-icon="leftIcon" mode="link"
        :right-icon="rightIcon"
        :scrollable="false"
        wrapable
        >
        风险提示：查看风险信息
        </van-notice-bar>
  </div>
</template>

<script>
export default {
  name: 'Rick2',
  data() { 
    return {
        leftIcon: require("@/assets/img/xyfzx_icon.png"),
      rightIcon: require("@/assets/img/lb_jr_icon.png"),
    }
  },
 methods: {
notice() {
      this.$router.push({
        path: "/RiskWarning",
      });
    },
  },
 computed: {

  }
 }
</script>

<style scoped>
  .Rick2{
      height: 44px;
      width: 100%;
  }
  .van-notice-bar {
  padding: 0 12px;
  height: 100%;
}
</style>