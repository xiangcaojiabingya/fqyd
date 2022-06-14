<template>
  <div class="itemDateChoose">
    <div class="item_content">
      <span>{{ title }}<span id="icon">*</span></span>
      <div class="right_div" @click="chooseData">
        <span :class="[value == '请选择' ? 'gray_col' : 'black_col']">{{
          value
        }}</span>
        <img src="@/assets/img/lb_jr_icon.png" />
      </div>
    </div>
    <div class="line" v-if="isShowLine"></div>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        @confirm="onConfirm"
        @cancel="onCancel"
        type="date"
        title="使用到期日"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "ItemDateChoose",
  data() {
    return {
      show: false,
      value: this.currentValue,
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(3000, 1, 1),
      currentDate:
        localStorage.getItem("startTime").length == "8"
          ? new Date(
              localStorage.getItem("startTime").substr(0, 4),
              localStorage.getItem("startTime").substr(4, 2) - 1,
              localStorage.getItem("startTime").substr(6, 2)
            )
          : new Date(),
    };
  },
  model: {
    prop: "currentValue",
    event: "chooseDateChange", //当组件的值发生改变时要emit的事件名
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
      this.value = this.formatDate(value);
      this.show = false;
      console.log(" this.$emit=" + this.formatDate(value));
      this.$emit("chooseDateChange", {
        type: this.type,
        time: this.formatDate(value),
      });
    },
    onCancel() {
      this.show = false;
    },

    //格式化日期
    formatDate(date) {
      //处理个位数月,日，不然后台库不识别
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      return `${date.getFullYear()}-${month}-${day}`;
    },
  },
  computed: {},
  // mounted() {
  //   console.log("sdfgh" + localStorage.getItem("startTime").length);
  // },
};
</script>

<style scoped>
.itemDateChoose {
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