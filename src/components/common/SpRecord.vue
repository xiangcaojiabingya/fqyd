<template>
  <div class="spRecord">
    <div class="empty_txt" v-if="isShowEmpty">暂无数据</div>
    <div
      class="item_div"
      v-for="(item, index) in list"
      :key="index"
      v-if="!isShowEmpty"
    >
      <div class="horizontal_line"></div>
      <div class="mains_div">
        <div class="left_div">
          <div class="line_div" v-if="index != 0"></div>
          <img v-if="index == 0" src="@/assets/img/spjl_hq_icon.png" />
          <img v-else src="@/assets/img/spjl_gq_icon.png" />
          <div class="line_div1" v-if="index != list.length - 1"></div>
        </div>
        <div class="content_div">
          <div class="right_top_div">
            <span class="sp_person"
              >{{ item.operatorName }}{{ item.taskName }}</span
            >
            <span class="sp_time">{{ item.operatorTime }}</span>
          </div>
          <div class="right_btm_div">
            <span class="yijian_span">审批意见：{{ item.content }}</span>
            <span class="state_span" :style="spanColor(item.approve)">
              {{ getZHType(item.approve) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ajaxPostPlus, apiUrl } from "@/api.js";
import { codeToValue } from "@/utils/index.js";
export default {
  // 审批记录
  name: "SpRecord",
  data() {
    return {
      list: [],
      typeList: [],
      requestData1: {
        dictKeys: ["approval_reply"],
      },
      colorGreen: "#14ccbd",
      colorRed: "#ff1919",
      colorYellow: "#ffb319",
      isShowEmpty: false,
    };
  },
  props: {
    orderId: String,
    currentNodeName: String,
    currentOperatorName: String,
    currentNodeCode: String,
    bottomType: String,
  },
  mounted() {
    this.getCodeList();
    console.log("nnnnnnnnnnnnnnnnnnnn" + this.orderId);
  },
  methods: {
    getRecordData() {
      ajaxPostPlus(apiUrl.queryFlowTaskApprove, {
        orderId: this.orderId,
      })
        .then((result) => {
          console.log("审批记录：" + JSON.stringify(result));
          if (result == []) {
            this.list.push({
              operatorName: this.currentOperatorName,
              taskName: this.currentNodeName,
              approve: "审批中",
            });
          }
          this.list = result;
          this.list = this.list.reverse();
          if (this.currentNodeCode != "0000" && this.bottomType != "0") {
            this.list.unshift({
              trackApproveCode: null,
              orderId: null,
              nodeCode: null,
              operatorName: this.currentOperatorName,
              content: null,
              approveAmount: null,
              refuseCode: null,
              applyId: "",
              caseApproveCode: null,
              operatorTime: "",
              approve: "审批中",
              approveUnit: null,
              taskName: this.currentNodeName,
              id: "",
              operatorId: "",
              taskId: "",
              creditApproveCode: null,
              approveTerm: null,
            });
          }
          if (this.list != null && this.list.length > 0) {
            this.isShowEmpty = false;
          } else {
            this.isShowEmpty = true;
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    //获取数据字典---信息类别
    getCodeList() {
      // this.$toast.loading({
      //   message: "加载中...",
      //   forbidClick: true,
      //   loadingType: "spinner",
      //   duration: 0,
      // });
      ajaxPostPlus(apiUrl.QueryDictKeys, this.requestData1)
        .then((result) => {
          this.typeList = result.dictItemMap.approval_reply;
          this.getRecordData();
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    getZHType(code) {
      if (code == null) {
        return "保存";
      }
      if (code == "审批中") {
        return "审批中";
      }
      return codeToValue(this.typeList, code);
    },
    status_color(status) {
      if (status == "2") {
        return this.colorGreen;
      } else if (status == "1") {
        return this.colorRed;
      } else {
        return this.colorYellow;
      }
    },
    spanColor(status) {
      return { color: this.status_color(status) };
    },
  },
  computed: {},
};
</script>

<style scoped>
.spRecord {
  width: 100%;
  margin-bottom: 80px;
}
.item_div {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}
.line_div {
  width: 1px;
  background: #e5e5e5;
  top: 0;
  height: 100%;
  bottom: 29px;
  left: 18px;
}
.line_div1 {
  height: 100%;
  width: 1px;
  position: absolute;
  background: #e5e5e5;
  top: 40px;
  left: 18px;
}
.left_div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9;
  height: 100%;
  background: white;
  width: 36px;
}
.left_div img {
  width: 12px;
  height: 12px;
  position: absolute;
  top: 29px;
  z-index: 99;
  left: 12px;
}
.horizontal_line {
  width: 100%;
  height: 12px;
  background: var(--color-Lightgray-bg);
  padding-left: 27px;
  box-sizing: border-box;
}
.content_div {
  width: calc(100% - 36px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0 12px 15px 0;
  background: white;
}
.right_top_div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 15px;
  box-sizing: border-box;
}
.right_btm_div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 12px;
  box-sizing: border-box;
}
.sp_person {
  font-size: 14px;
  color: #333333;
}
.sp_time {
  font-size: 14px;
  color: #999999;
  text-align: end;
}
.yijian_span {
  font-size: 12px;
  color: #999999;
  width: 88%;
  overflow-wrap: break-word;
  word-break: break-all;
  word-wrap: break-word;
}
.state_span {
  font-size: 12px;
  color: #ff1919;
}
.mains_div {
  display: flex;
  flex-direction: row;
  width: 100%;
  background: white;
}
.empty_txt {
  font-size: 14px;
  color: #999999;
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
}
</style>