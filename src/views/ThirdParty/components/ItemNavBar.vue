<template>
    
  <div
    class="item-nav-bar"
    :class="{ 'title-border': border }"
    :style="{ borderBottomColor: borderColor }"
  >
    <div>
      <div class="van-nav-bar__left" @click="onClickLeft">
        <van-icon name="arrow-left" color="#000000" size="24" />
      </div>
      <div class="van-nav-bar__title van-ellipsis">{{ title }}</div>
      <div class="van-nav-bar__right" @click="onClickRight">
        <img
          :src="'FINISH' == rightSet ? imgUrl[0] : imgUrl[1]"
          width="20"
          height="20"
        />
      </div>
    </div>

      
  </div>
</template>

<script>
import { closeApp } from "@/utils/index.js";
export default {
  name: "ItemNavBar", //顶部标题栏
  components: {},
  props: {
    title: {
      type: String,
      default: "Title",
    },
    lefttext: {
      type: String,
      default: "",
    },
    rightSet: {
      type: String,
      default: "FINISH",
    },
    border: {
      type: Boolean,
      default: true,
    },
    borderColor: {
      type: String,
      default: "var(--color-Lightgray-bg)",
    },
  },
  data() {
    return {
      imgUrl: [
        require("@/assets/img/finish_icon3.png"),
        require("@/assets/img/yxyp_icon.png"),
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      if (this.rightSet == "FINISH") {
        console.log("FINISH!!!");
        closeApp();
      } else {
        this.$emit("onClickRight");
      }
    },
  },
  mounted() {},
  activated() {},
};
</script>

<style scoped>
.item-nav-bar {
  position: fixed;
  width: 100%;
  top: 0;
  height: 46px;
  background: var(--color-white-bg);
  z-index: 99999;
}
.title-border {
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
.van-nav-bar {
  position: relative;
  z-index: 1;
  line-height: 22px;
  text-align: center;
  background-color: #fff;
  -webkit-user-select: none;
  user-select: none;
}
.van-nav-bar__left,
.van-nav-bar__right {
  position: absolute;
  top: 0;
  bottom: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 16px;
  font-size: 14px;
  cursor: pointer;
}
.van-nav-bar__left {
  left: 0;
}
.van-nav-bar__right {
  right: 0;
}
.van-nav-bar__title {
  max-width: 60%;
  margin: 0 auto;
  color: #323233;
  font-weight: 500;
  font-size: 18px;
  margin-top: 10px;
  text-align: center;
}
.van-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>