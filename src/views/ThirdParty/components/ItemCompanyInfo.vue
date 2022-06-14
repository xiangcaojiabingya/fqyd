<template>
  <div>
    <item-cutting-line v-if="lineShow"></item-cutting-line>
    <div class="company_info_item" @click="onClick">
      <div class="top_div">
        <span>{{ itemInfo.title }}</span>

        <span
          class="state_sapn"
          :class="{ margin_right: imgTopRight }"
          v-if="itemInfo.state != '' || itemInfo.state != null"
          >{{ itemInfo.state }}</span
        >
        <div class="imgTopRight" v-if="imgTopRight">
          <van-icon name="arrow" size="14" />
        </div>
      </div>
      <div class="info_div">
        <span>{{ itemInfo.title1 }}</span>
        <span :class="{ margin_right: imgRight }">{{ itemInfo.value1 }}</span>
      </div>
      <div class="info_div">
        <span>{{ itemInfo.title2 }}</span>
        <span :class="{ margin_right: imgRight }">{{ itemInfo.value2 }}</span>
      </div>
      <div
        class="info_div"
        v-if="itemInfo.title3 != '' && itemInfo.title3 != null"
      >
        <span>{{ itemInfo.title3 }}</span>
        <span :class="{ margin_right: imgRight }">{{ itemInfo.value3 }}</span>
      </div>
      <div class="line_div"></div>
      <div class="divRight" v-if="imgRight">
        <van-icon name="arrow" size="14" />
      </div>
    </div>
  </div>
</template>

<script>
import ItemCuttingLine from "./ItemCuttingLine";
export default {
  name: "ItemCompanyInfo",
  components: { ItemCuttingLine },
  props: {
    itemInfo: Object,
    index: {
      type: Number,
      default: 0,
    },
    lineShow: {
      type: Boolean,
      default: true,
    },
    imgRight: Boolean, //右侧箭头
    imgTopRight: Boolean, //右侧状态箭头
  },
  data() {
    return {};
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
.company_info_item {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  align-items: center;
  position: relative;
}
.top_div span:first-child {
  font-size: 16px;
}
.top_div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 12px 0px 12px;
  box-sizing: border-box;
}
.state_sapn {
  color: #ffc600;
  font-size: 14px;
  text-align: end;
}
.info_div {
  width: 100%;
  padding: 12px 12px 0px 12px;
  box-sizing: border-box;
  display: flex;
  font-size: 14px;
  align-items: center;
  color: #8d8d8d;
}

.info_div span:last-child {
  margin-left: 3px;
}
.line_div {
  width: 100%;
  /* height: 8px; */
  background: #f2f2f2;
  margin-top: 12px;
}
.divRight {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0 12px;
  font-size: 14px;
  cursor: pointer;
}
.margin_right {
  margin-right: 14px;
}
.imgTopRight {
  display: inline;
  position: absolute;
  right: 12px;
  margin-top: 1px;
}
</style>