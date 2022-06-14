<template>
  <div class="com_body fixfloat">
    <div class="left_content">
      <input
        class="client_name"
        type="text"
        placeholder="请输入客户名称"
        v-model="client_name"
      />
      <input
        class="client_tel"
        type="tel"
        placeholder="请输入客户手机号码"
        v-model="client_tel"
        @input="telInputChange"
      />
      <div class="pop_select fixfloat">
        <div @click="showTime = true" :class="funcShowClass(pop_time.value)">
          {{ pop_time.text }}
          <van-popover
            v-model="showTime"
            trigger="click"
            :actions="arrActions.arrTime"
            @select="onSelectTime"
          ></van-popover>
          <img class="showAction" :src="funcShowImg(pop_time.value)" />
        </div>
        <div
          @click="showResult = true"
          :class="funcShowClass(pop_result.value)"
        >
          {{ pop_result.text }}
          <van-popover
            v-model="showResult"
            trigger="click"
            :actions="arrActions.arrResult"
            @select="onSelectResult"
          >
          </van-popover>
          <img class="showAction" :src="funcShowImg(pop_result.value)" />
        </div>
      </div>
    </div>

    <div class="search_div" @click="toSubmit" :style="imgBg">
      <div class="search_text">查询</div>
    </div>
  </div>
</template>

<script>
import { getDateFor } from "@/utils/index.js";
export default {
  name: "ItemSearchTop", //位于查询页面顶部的查询组件
  components: {},
  data() {
    return {
      arrActions: {
        arrTime: [
          {
            text: "一个月内",
            value: getDateFor("M").startTime,
            valueEnd: getDateFor("M").endTime,
          },
          {
            text: "半年内",
            value: getDateFor("HY").startTime,
            valueEnd: getDateFor("HY").endTime,
          },
          {
            text: "一年内",
            value: getDateFor("Y").startTime,
            valueEnd: getDateFor("Y").endTime,
          },
        ],
        arrResult: [
          {
            text: "审批中",
            value: "0",
          },
          {
            text: "拒绝",
            value: "1",
          },
          {
            text: "通过",
            value: "2",
          },
        ],
      },
      pop_time: {
        text: "申请时间",
        value: "",
        valueEnd: "",
      },
      pop_result: {
        text: "审批结果",
        value: "",
      },
      client_name: "",
      client_tel: "",
      showTime: false,
      showResult: false,
      imgBg: {
        backgroundImage: "url(" + require("@/assets/img/sxcx_cx_bg.png") + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      },
      showAction: {
        unselected: require("@/assets/img/sxcx_xl_icon.png"),
        selected: require("@/assets/img/sxcx_xlh_icon.png"),
      },
    };
  },
  props: {
    clientName: {
      type: String,
      default: "",
    },
  },
  watch: {
    clientName(newval, oldval) {
      this.client_name = newval;
    },
  },
  methods: {
    onSelectTime(e) {
      this.pop_time = e;
    },
    onSelectResult(e) {
      this.pop_result = e;
    },
    toSubmit() {
      var searchResult = {
        pop_time: this.pop_time, //申请时间
        pop_result: this.pop_result, //审核状态
        client_name: this.client_name, //客户名称
        client_tel: this.client_tel, //客户电话
      };
      this.$emit("toSearch", searchResult);
    },
    funcShowImg(value) {
      if (value != "") {
        return this.showAction.selected;
      }
      return this.showAction.unselected;
    },
    funcShowClass(value) {
      if (value != "") {
        return "selected_pop";
      }
      return "unselected_pop";
    },
    telInputChange() {
      this.client_tel = this.client_tel.replace(/[^\d]/g, "");
    },
  },
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
  padding: 24px 12px;
  /* border-top: 1px solid #e5e5e5; */
  font-size: var(--size-text-14);
}
.search_div {
  text-align: center;
  height: 120px;
  width: 89px;
  float: right;
}
.search_text {
  text-align: center;
  color: white;
  margin-top: 68.5px;
  position: absolute;
  width: 89px;
}
.left_content {
  float: left;
  width: calc(100% - 89px - 12px);
}

.client_name,
.client_tel {
  border: none;
  background: var(--color-gray-bg);
  height: var(--height-input-search);
  border-radius: 5px;
  padding: 0 0 0 30px;
  width: calc(100% - 30px);
}
.client_tel {
  margin-top: 12px;
}
.pop_select {
  width: 100%;
}

.pop_select div:last-child {
  margin-left: 12px;
}
.showAction {
  width: 8px;
  height: 4px;
  margin-left: 4px;
  vertical-align: middle;
}
.selected_pop {
  background: var(--color-selected-bg);
  border: var(--color-orange-selected) 1px solid;
  color: var(--color-orange-selected);
  width: calc(50% - 8px);
  margin-top: 12px;
  float: left;
  text-align: center;
  height: calc(var(--height-input-search) - 2px);
  border-radius: 5px;
  line-height: 30px;
}
.unselected_pop {
  margin-top: 12px;
  width: calc(50% - 8px);
  float: left;
  text-align: center;
  background: var(--color-gray-bg);
  height: calc(var(--height-input-search) - 2px);
  border: var(--color-gray-bg) 1px solid;
  border-radius: 5px;
  line-height: 30px;
  color: var(--color-unselected-text);
}

input::-webkit-input-placeholder {
  color: var(--color-unselected-text);
}
/* Mozilla Firefox 4 to 18 */
input:-moz-placeholder {
  color: var(--color-unselected-text);
  opacity: 1;
}

/* Mozilla Firefox 19+ */
input::-moz-placeholder {
  color: var(--color-unselected-text);
  opacity: 1;
}

/* Internet Explorer 10+ */
input:-ms-input-placeholder {
  color: var(--color-unselected-text);
}
</style>