<template>
  <div class="com_body fixfloat">
    <div class="left_content">
      <input
        class="client_name"
        type="text"
        placeholder="请输入客户名称"
        v-model.trim="client_name"
        @input="nameInputChange"
      />
      <input
        class="client_tel"
        type="tel"
        placeholder="请输入客户手机号码"
        v-model.trim="client_tel"
        @input="telInputChange"
      />
      <div class="pop_select fixfloat">
        <div @click="showTime = true" :class="funcShowClass(pop_time.value)">
          <van-popover
            v-model="showTime"
            trigger="click"
            :actions="arrActions.arrTime"
            @select="onSelectTime"
          >
            <template #reference>
              <div>
                {{ pop_time.text }}
                <img class="showAction" :src="funcShowImg(pop_time.value)" />
              </div>
            </template>
          </van-popover>
        </div>
        <div
          class="right_select"
          @click="funSelect"
          :class="funcShowClass(pop_result.value)"
        >
          <van-popover
            v-model="showResult"
            :actions="arrActions.arrResult"
            @select="onSelectResult"
          >
            <template #reference>
              <div>
                {{ pop_result.text }}
                <img class="showAction" :src="funcShowImg(pop_result.value)" />
              </div>
            </template>
          </van-popover>
        </div>
      </div>
    </div>

    <div class="search_div" @click="toSubmit" :style="imgBg">
      <div class="search_text">查询</div>
    </div>

    <van-popup v-model="show" position="bottom">
      <van-picker
        title="状态"
        show-toolbar
        :columns="dictCode"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
        value-key="text"
      />
    </van-popup>
  </div>
</template>

<script>
import { getDateFor, isPoneAvailable } from "@/utils/index.js";
export default {
  name: "ItemSearchTop", //位于查询页面顶部的查询组件
  components: {},
  data() {
    return {
      arrActions: {
        arrTime: [
          {
            text: "申请时间",
            value: "",
            valueEnd: "",
          },
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
            text: "审批结果",
            value: "",
          },
          {
            text: "审批中",
            value: "02",
          },
          {
            text: "拒绝",
            value: "04",
          },
          {
            text: "通过",
            value: "03",
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
      show: false,
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
    titleType: {
      type: String,
      default: "sxcx",
    },
    dictCode: {
      type: Array,
      default: [
        {
          text: "审批结果",
          value: "",
        },
      ],
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
      this.saveChange();
    },
    onSelectResult(e) {
      this.showResult = false;
      this.pop_result = e;
      this.saveChange();
    },
    toSubmit() {
      if (this.client_tel != "" && !isPoneAvailable(this.client_tel)) {
        this.$toast("请输入正确的手机号");
        return;
      }

      var searchResult = {
        pop_time: this.pop_time, //申请时间
        pop_result: this.pop_result, //审核状态
        client_name: this.client_name, //客户名称
        client_tel: this.client_tel, //客户电话
      };
      localStorage.setItem("SEARCH", JSON.stringify(searchResult));
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
      this.saveChange();
    },
    funSelect() {
      console.log('this.titleType = '+ this.titleType);
      if (this.titleType == "sxcx") {
        this.showResult = true;
      } else {
        this.show = true;
      }
    },
    onConfirm(value, index) {
      this.show = false;
      this.pop_result = value;
      this.saveChange();
    },
    onChange(picker, value, index) {},
    onCancel() {
      this.show = false;
    },
    nameInputChange() {
      this.saveChange();
    },
    saveChange() {
      var searchResult = {
        pop_time: this.pop_time, //申请时间
        pop_result: this.pop_result, //审核状态
        client_name: this.client_name, //客户名称
        client_tel: this.client_tel, //客户电话
      };
      localStorage.setItem("SEARCH", JSON.stringify(searchResult));
      this.$emit("toChange", searchResult);
    },
  },
  mounted() {
    let temp = localStorage.getItem("SEARCH");
    if (temp) {
      let search = JSON.parse(temp);
      this.pop_time = search.pop_time;
      this.pop_result = search.pop_result;
      this.client_name = search.client_name;
      this.client_tel = search.client_tel;
    }
  },
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
  /* padding: 0 0 0 30px;
  width: calc(100% - 30px); */
  padding: 0px 30px;
  width: calc(100% - 60px);
}
.client_tel {
  margin-top: 12px;
}
.pop_select {
  width: 100%;
}
/* .pop_select div:last-child {
  margin-left: 12px;
} */
.right_select {
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