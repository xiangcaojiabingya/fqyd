<template>
  <!-- 审批结果-同意-支用调查/支用审批 -->
  <div class="approval_submit_complex">
    <item-nav-bar title="审批结果" />
    <div class="first_div">
      <div
        v-for="(item, index) in demoData2"
        :key="index.id"
        class="margin_style"
      >
        <single-line-item
          :label="item.label"
          :value="item.value"
          :isShowLine="index == demoData2.length - 1 ? false : true"
        ></single-line-item>
      </div>
    </div>
    <div
      class="first_div"
      v-if="
        (currentNodeCode == 'zh-shenpi' && estateCity != '济南市') ||
        (currentNodeCode == 'zh-shenpi' && homeState == '其他')
      "
    >
      <item-pickers
        v-model="changeHomeState"
        :currentValue="house"
        :columns="chooseHouse"
        @change="change"
        title="房产状态"
        pickerTitle="房产状态"
      ></item-pickers>
    </div>
    <div class="first_div" v-else>
      <div
        v-for="(item, index) in demoData"
        :key="index.id"
        class="margin_style"
      >
        <single-line-item
          :label="item.label"
          :value="item.value"
          :isShowLine="index == demoData.length - 1 ? false : true"
        ></single-line-item>
      </div>
    </div>
    <my-textarea
      v-model="suggestion"
      v-resetPage
      placeholder="请填写审批意见"
      my-title="审批意见"
    />

    <!--当前处理人为最后一个审批人时，下一处理人不显示-->
    <select-man
      v-if="manList.length <= 0 ? false : true"
      :cardTitle="cardTitle"
      :manList="manList"
      @selectManFun="selectManFun"
      :custIndex="custIndex"
    />
    <div class="btn_div">
      <van-button
        round
        type="info"
        color="#ff6619"
        size="large"
        class="btn_sty"
        @click="submitImg"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
import SingleLineItem from "@/components/common/SingleLineItem.vue";
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import MyTextarea from "@/views/Result/components/MyTextarea.vue";
import ItemPickers from "@/views/Result/components/ItemPickers.vue";
import SelectMan from "@/views/Result/components/SelectMan.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
import ItemInputs from "../../components/common/ItemInputs.vue";

export default {
  name: "ResultsOf", //审批提交的复杂的页面，用于授信审批，尽调授信
  components: {
    ItemNavBar,
    MyTextarea,
    SelectMan,
    ItemInputs,
    SingleLineItem,
    ItemPickers,
    ItemInputs,
  },
  props: {},
  data() {
    return {
      demoData2: [
        { label: "授信金额(元)", value: "" },
        { label: "借款利率", value: "" },
        { label: "借款期限(月)", value: "" },
      ],
      demoData: [{ label: "房产状态", value: "" }],
      loanApplyId: this.$route.query.loanApplyId,
      currentNodeCode: this.$route.query.currentNodeCode,

      type: this.$route.query.type,
      chooseHouse: ["正常", "查封", "异议"],
      warrType: "",
      estateStatus: "",
      estateUnder: "",
      estateCity: "",
      estateProvince: "",
      estateDomain: "",
      estateProvinceCode: "",
      estateDomainCode: "",
      estateCityCode: "",
      estateId: "",
      estateCode: "",
      propertyEndTime: "",
      estateUse: "",
      estateAddress: "",
      communityName: "",
      estateArea: "",
      propertyUseYear: "",
      columns: [], //同意码
      suggestion: "", //申请意见
      manList: [],
      isSelected: "", //被选中的处理人
      item: {},
      orderContent: {},
      dictCodeId: "",
      flag: this.$route.query.flag, //判断是尽调（jd）还是审批（sp）,尽调可以修改批复xx
      closeNum: 0, //计数器
      closeTag: 3, //拦截固定值，请求次数
      custIndex: -1,
      orderAttachment: "",
      orderOther: "",
      houseStatusCode: "",
      cardTitle: "下一岗位：",
    };
  },
  computed: {
    noDo() {
      console.log("从哪里跳过来" + this.flag);
      if (this.flag == "sp") {
        //审批为只读
        return true;
      } else {
        //尽调为可编辑
        return false;
      }
    },
  },
  created() {},
  mounted() {
    // var itemTemp = this.$route.query.item;
    // this.item = JSON.parse(itemTemp);
    this.item.flowId = this.$route.query.flowId;
    this.item.applyAmount = this.$route.query.applyAmount;
    this.item.applyPeriod = this.$route.query.applyPeriod;
    this.item.currentNodeTaskId = this.$route.query.currentNodeTaskId;
    this.item.processId = this.$route.query.processId;
    this.item.applyId = this.$route.query.applyId;
    // this.value2 = this.item.applyUnit + "%"; //利率？？？？

    setTimeout(() => {
      this.getHomeState();
    }, 1000);

    this.getOrderOther();
    this.getList();
    this.getHomeList();
    this.getManList();
  },
  methods: {
    // 选择处理人
    selectManFun(index) {
      this.isSelected = this.manList[index];
    },
    change(value) {
      this.house = value;
    },

    // 点击提交按钮
    submitImg() {
      // if (this.manList.length > 0 && this.checkNull(this.isSelected)) {
      //   this.$toast("请选择处理人");
      //   return;
      // }
      if (
        (this.currentNodeCode == "zh-shenpi" && this.estateCity != "济南市") ||
        (this.currentNodeCode == "zh-shenpi" && this.homeState == "其他")
      ) {
        if (this.checkNull(this.changeHomeState)) {
          this.$toast("请选择房产状态");
          return;
        }
        if (this.changeHomeState == "查封") {
          this.$toast("房产状态不正常");
          return;
        }
        if (this.changeHomeState == "异议") {
          this.$toast("房产状态不正常");
          return;
        }
        if (this.changeHomeState == "正常") {
          this.estateStatus = "1";
        }

        var reqData = {
          loanApplyId: this.loanApplyId,
          warrType: this.warrType,
          estateId: this.estateId,
          estateCode: this.estateCode,
          estateProvinceCode: this.estateProvinceCode,
          estateProvince: this.estateProvince,
          estateCityCode: this.estateCityCode,
          estateCity: this.estateCity,
          estateDomainCode: this.estateDomainCode,
          estateDomain: this.estateDomain,
          estateAddress: this.estateAddress,
          estateUnder: this.estateUnder,
          estateUse: this.estateUse,
          estateArea: this.estateArea,
          estateStatus: this.estateStatus,
          communityName: this.communityName,
          propertyEndTime: this.propertyEndTime,
          propertyUseYear: this.propertyUseYear,
        };
        console.log("保存数据=" + JSON.stringify(reqData));
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 0,
        });
        ajaxPostPlus(apiUrl.modifyCreditEstateAndContactInfo, reqData)
          .then((res) => {
            this.$toast.clear();
            this.$toast("保存成功");
          })
          .catch((err) => {
            this.$toast.clear();
            console.log("请求错误" + JSON.stringify(err));
          });
      }
      if (this.checkNull(this.suggestion)) {
        this.$toast("请填写申请意见");
        return;
      }
      console.log(
        "提交=审批意见" + this.suggestion + ",处理人" + this.isSelected.name
      );
      this.$toast.loading({
        duration: 0, // 持续展示 this.$toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      var data = {
        flowIdList: [this.item.flowId], //	流程编号List<String>
        fraudPost: "0",
        operator: localStorage.getItem("operatorId"), //	操作人
        orderAttachment: this.orderAttachment, //进件附件
        orderOther: this.orderOther,
        orderContent: JSON.stringify(this.orderContent), //进件详情
        orderId: this.item.flowId, //工作流编号
        reply: "2", //审批结果 通过
        taskId: this.item.currentNodeTaskId, //	任务编号
        roleIdList: [this.isSelected.roleId], //	角色编号列表
        userIdList: [this.isSelected.userId], //	用户编号列表
        context: this.suggestion,
      };
      console.log("提交请求data---" + JSON.stringify(data));
      ajaxPostPlus(apiUrl.submit, data)
        .then((res) => {
          this.$toast.clear();
          //{"responseType":"HSJRY_SUCCESS","data":null,"httpStatus":200,"errorMessage":null,"errorCode":null,"rpcResult":"000000","parentIdemSerialId":null}
          this.$toast("审批成功");
          setTimeout(() => {
            this.$router.go(-2);
          }, 500);
        })
        .catch((err) => {
          this.$toast.clear();
          this.$toast("审批失败");
        });
    },
    getOrderOther() {
      //获取利率、期限
      var page = {
        flowId: this.$route.query.flowId,
      };
      ajaxPostPlus(apiUrl.queryOrderContent, page)
        .then((res) => {
          try {
            var content = JSON.parse(res.orderContent);
            content.houseStatusCode = "1";
            this.orderContent = content;
            this.orderAttachment = res.orderAttachment;
            this.orderOther = res.orderOther;
            this.houseStatusCode = this.orderContent.houseStatusCode;
          } catch (error) {
            this.$toast("获取数据失败");
            console.log("error = " + error.message);
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
    getList() {
      //获取利率、期限
      var page = {
        loanApplyId: this.$route.query.loanApplyId,
      };
      ajaxPostPlus(apiUrl.ApplicationDetails, page)
        .then((res) => {
          try {
            this.demoData2[1].value = res.applyRate + "%";
            this.demoData2[2].value = res.applyTerm;
            this.demoData2[0].value = res.applyAmount;
          } catch (error) {
            this.$toast("获取数据失败");
            console.log("error = " + error.message);
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
    getManList() {
      var data = {
        applyId: this.item.applyId, //	申请编号
        processId: this.item.processId, //流程id
        taskId: this.item.currentNodeTaskId, //任务id
      };

      console.log("queryNextNodeUser传参 = " + JSON.stringify(data));
      ajaxPostPlus(apiUrl.queryNextNodeUser, data)
        .then((res) => {
          if (res.nodeName != undefined) {
            this.cardTitle = "下一岗位：" + res.nodeName + "：";
          } else {
            this.cardTitle = "下一岗位：";
          }
          res.userDtoList.forEach((item) => {
            this.manList.push({
              name: item.userName,
              roleId: item.roleId,
              userId: item.userId,
            });
          });
          this.$toast.clear();
          this.closeLoading();
        })
        .catch((err) => {
          this.$toast.clear();
          this.closeLoading();
        });
    },
    getHomeState() {
      this.$toast.loading({
        duration: 0, // 持续展示 this.$toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      if (this.type == "zycx" || this.currentNodeCode == "zh-shenpi") {
        ajaxPostPlus(apiUrl.queryJiNanEstateInfoByLoanApplyId, {
          loanApplyId: this.loanApplyId,
        })
          .then((res) => {
            try {
              if (res.resCode == "1") {
                this.homeState = "正常";
              } else if (res.resCode == "2") {
                this.homeState = "查封";
              } else if (res.resCode == "3") {
                this.homeState = "异议";
              } else if (
                res.resCode == "0" &&
                this.currentNodeCode == "zh-shenpi"
              ) {
                this.homeState = "其他";
              } else if (
                res.resCode == "0" &&
                this.currentNodeCode == "fh-fuhe"
              ) {
                res.resCode = this.houseStatusCode;
                if (res.resCode == "1") {
                  this.homeState = "正常";
                } else if (res.resCode == "2") {
                  this.homeState = "查封";
                } else if (res.resCode == "3") {
                  this.homeState = "异议";
                }
              }

              this.demoData[0].value = this.homeState;
            } catch (error) {
              this.$toast("获取数据失败");
              console.log("error = " + error.message);
            }
            this.$toast.clear();
          })
          .catch((err) => {
            this.$toast.clear();
            console.log("请求错误" + JSON.stringify(err));
          });
      }
    },
    getHomeList() {
      ajaxPostPlus(apiUrl.queryEstateInfoByLoanApplyId, {
        loanApplyId: this.loanApplyId,
      })
        .then((res) => {
          this.warrType = res.warrType;
          this.estateAddress = res.estateAddress;
          this.communityName = res.communityName;
          this.estateArea = res.estateArea;

          this.estateUse = res.estateUse;

          // var temp = JSON.parse(res.intoDetail);
          // console.log("bbb____" + JSON.stringify(temp));
          this.estateStatus = res.estateStatus;

          this.propertyUseYear = res.propertyUseYear;
          this.propertyEndTime = res.propertyEndTime;

          this.estateUnder = res.estateUnder;
          this.estateId = res.estateId;
          this.estateCode = res.estateCode;
          this.estateProvinceCode = res.estateProvinceCode;
          this.estateCityCode = res.estateCityCode;
          this.estateDomainCode = res.estateDomainCode;
          this.estateDomain = res.estateDomain;
          this.estateProvince = res.estateProvince;
          this.estateCity = res.estateCity;

          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
    getDictCode() {
      // ApproveCode1
      var data = {
        dictKeys: [
          "ApproveCode1", //进件状态
        ],
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, data)
        .then((res) => {
          this.columns = res.dictItemMap.ApproveCode1;
          this.closeLoading();
        })
        .catch((err) => {
          console.log("QueryDictKeysErr = " + JSON.stringify(err));
          this.closeLoading();
        });
    },
    checkNull(obj) {
      if (obj == null || obj == "") {
        return true;
      }
      if (obj.length == 0) {
        return true;
      }
      return false;
    },
    closeLoading() {
      this.closeNum += 1;
      if (this.closeNum >= this.closeTag) {
        this.$toast.clear();
      }
    },
  },
  directives: {
    //解决ios手机键盘隐藏后页面卡顿白屏问题
    resetPage: {
      inserted: function (el) {
        document.body.addEventListener("focusout", () => {
          if (device.platform.toLowerCase() == "ios") {
            // 软键盘收起的事件处理
            setTimeout(() => {
              const scrollHeight =
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0;
              window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            }, 100);
          }
        });
      },
    },
  },
};
</script>

<style  scoped>
.approval_submit_complex {
  /*加上底部按钮的高度*/
  font-size: 14px;
  padding: 46px 0 84px;
}
.first_div {
  background: #ffffff;
  padding: 0 0;
  margin: 12px 0;
}
.picker_sty {
  margin: 12px 0 -12px;
}
.SingleLineItem {
  display: flex;
  background: #ffffff;
  justify-content: space-between;
  padding: 15px 15px;
}
.showLine {
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
.SingleLineItem span {
  font-size: var(--size-text-small);
  word-break: break-all;
  word-wrap: break-word;
}
.SingleLineItem span:first-child {
  min-width: 70px;
}
.SingleLineItem button {
  width: 40px;
  height: 20px;
  margin-left: 5px;
  background: var(--color-Lightgray-bg);
  font-size: var(--size-text-small);
}

/*按钮*/
.btn_div {
  width: 100%;
  background: var(--color-Lightgray-bg);
  padding: 20px 15px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0px;
}
.btn_sty {
  height: var(--size-bottom-btn);
}
</style>
