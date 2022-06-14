<template>
  <div class="itemPicker">
    <div class="item_content">
      <span>{{ title }}<span id="icon">*</span></span>
      <div class="right_div" @click="chooseData">
        <span :class="[value == '请选择' ? 'gray_col' : 'black_col']">
          {{ value }}
        </span>
        <img src="@/assets/img/lb_jr_icon.png" />
      </div>
    </div>
    <div class="line" v-if="isShowLine"></div>
    <van-popup v-model="show" position="bottom">
      <van-area
        title="房产所在地"
        @confirm="onConfirm"
        @cancel="onCancel"
        :area-list="areaLists"
        value="370000"
        :columns-placeholder="['请选择', '请选择', '请选择']"
      />
    </van-popup>
  </div>
</template>

<script>
import { areaList } from "@vant/area-data"; //全国的城市列表
import { sdAreaList } from "@/assets/js/sdAreaList.js"; //山东省的城市列表

export default {
  name: "ItemCity",
  data() {
    return {
      areaLists: areaList,
      show: false,
      value: this.currentValue,
    };
  },
  model: {
    prop: "currentValue",
    event: "chooseCityChange", //当组件的值发生改变时要emit的事件名
  },
  props: {
    columns: Array,
    currentValue: {
      type: String,
      default: "请选择",
    },
    title: String,
    isShowLine: {
      type: Boolean,
      default: true,
    },
    type: String,
    maxDate: {
      type: Object,
    },
    showData: String, //可选择区域数据
  },
  watch: {
    currentValue(val, oldVal) {
      //普通的watch监听
      console.log(
        "第一次数据a: " +
          JSON.stringify(val) +
          "           oldVal: " +
          JSON.stringify(oldVal)
      );
      if (val == "") {
        this.value = "请选择";
      } else {
        this.value = val;
      }
    },
    value(val, oldVal) {
      console.log(
        "val - 新数据: " +
          JSON.stringify(val) +
          "    oldVal: " +
          JSON.stringify(oldVal)
      );
    },
  },
  methods: {
    chooseData() {
      this.show = true;
    },
    onConfirm(value) {
      this.value = this.formatCity(value);
      this.show = false;
      console.log(" this.$emit=" + this.formatCity(value));
      this.$emit("chooseCityChange", {
        code: this.st(value),
        city: this.formatCity(value),
      });
    },
    onCancel() {
      this.show = false;
    },
    //格式化c城市
    st(value) {
      let code1 = JSON.stringify(value[0].code).match(/"(\S*)"/)[1];
      let code2 = JSON.stringify(value[1].code).match(/"(\S*)"/)[1];
      let code3 = JSON.stringify(value[2].code).match(/"(\S*)"/)[1];
      return `${code1}/${code2}/${code3}`;
    },
    formatCity(value) {
      console.log("vvvvvvvvvvvv" + JSON.stringify(value));
      let province = JSON.stringify(value[0].name).match(/"(\S*)"/)[1];
      let city = JSON.stringify(value[1].name).match(/"(\S*)"/)[1];
      let area = JSON.stringify(value[2].name).match(/"(\S*)"/)[1];
      return `${province}/${city}/${area}`;
    },
  },
  computed: {},
  mounted() {
    if (this.showData == "shandong") {
      this.areaLists = sdAreaList;
    } else {
      this.areaLists = areaList;
    }
  },
};
</script>

<style scoped>
.itemPicker {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  background-color: white;
}
.item_content {
  width: 100%;
  padding: var(--form-padding-top) 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  font-size: var(--size-text-small);
  align-items: center;
}
.item_content > span {
  color: #333333;
}
#icon {
  color: red;
}
.right_div {
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
}
.right_div img {
  height: 14px;
  margin-left: 6px;
}

.black_col {
  color: var(--color-edit-text);
  font-size: var(--size-text-small);
}
.gray_col {
  color: var(--color-edit-text);
  font-size: var(--size-text-small);
}
.line {
  height: 1px;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
</style>