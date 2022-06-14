<template>
  <!--  个人信息,可带返回或者编辑（已用） -->
  <div>
    <div class="PersonalInfo" @click="toRelevance(position)">
      <div class="right_div" v-if="rightShow != '0'">
        <van-image
          class="right_img"
          width="6.5px"
          height="11.5px"
          fit="contain"
          :src="rightShow == '1' ? editPath : nextPath"
          @click="imgClick"
        ></van-image>
      </div>
      <div class="name_div">
        <span>{{ itemInfo.name }}</span>
        <span class="relation_style">{{ itemInfo.connPersonType }}</span>
      </div>
      <div class="info_div" v-if="rightShow == '0'">
        <span>证件类型 {{ itemInfo.idType }}</span>
        <span>证件号码 {{ itemInfo.idCard }}</span>
        <span>手机号码 {{ itemInfo.phoneNum }}</span>
      </div>
      <div class="info_div" v-else>
        <span>证件类型 {{ itemInfo.idType }}</span>
        <span>证件号码 {{ itemInfo.idCard }}</span>
      </div>
    </div>

    <div v-if="isShowLine" class="line_style"></div>
  </div>
</template>

<script>
export default {
  name: "PersonalInfoRight",
  components: {},
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {
          name: "刘丽",
          relation: "法定代表人配偶",
          idType: "居民身份证",
          idCard: "37295499730044249",
        };
      },
    },
    isShowLine: {
      //是否展示虚线
      type: Boolean,
      default: false,
    },
    //是否展示右边图标，默认0不展示，1为编辑，2为右箭头
    rightShow: {
      type: String,
      default: "0",
    },
    position: String,
  },
  data() {
    return {
      nextPath: require("@/assets/img/lb_jr_icon.png"),
      editPath: require("@/assets/img/edit.png"),
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    imgClick() {
      this.$emit("imgClick");
    },
    // 跳转到关联人信息详情页面
    toRelevance(index) {
      if (index != null) {//可编辑
        this.$emit("itemClick", index);
      } else {//仅展示
        this.$router.push({
          path: "/relationMessageShow",
          query: {
            item: this.itemInfo,
          },
        });
      }
    },
  },
};
</script>

<style  scoped>
.PersonalInfo {
  background: white;
  font-size: var(--size-text-small);
  padding: 15px 0px;
  position: relative;
}
span {
  line-height: 2;
}
.name_div {
  vertical-align: middle;
}
.relation_style {
  width: 55px;
  height: 14px;
  font-size: 10px;
  color: #ff6619;
  margin-left: 10px;
  padding: 2px 4px;
  border: #ff6619 1px solid;
  border-radius: 2px;
}
.info_div {
  display: flex;
  flex-direction: column;
  color: #999999;
}
/* 虚线 */
.line_style {
  margin: 0 10px;
  height: 0px;
  border-top: 1px var(--color-Lightgray-bg) solid;
  justify-content: center;
  text-align: center;
}
/* 右边 */
.right_div {
  position: absolute;
  top: 40px;
  right: 0px;
  z-index: 9;
}
.right_img {
  padding: 10px;
}
</style>
