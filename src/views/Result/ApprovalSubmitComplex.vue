<template>
  <!-- 审批结果-业务调查/审核/审批 -->
  <div class="approval_submit_complex">
    <item-nav-bar title="审批结果" />
    <div
      class="first_div"
      v-if="
        currentNodeCode == 'fh-manager' || currentNodeCode == 'fh-manager-one'
      "
    >
      <item-inputs
        title="授信金额"
        v-model="value1"
        :readonly="noDo"
        end="元"
      ></item-inputs>
      <item-pickers
        :columns="chooseMonth"
        title="授信期限"
        pickerTitle="授信期限"
        end="月"
        v-model="value4"
      ></item-pickers>
      <item-inputs
        title="1年期(含)及以下借款年利率"
        v-model="value2"
        :readonly="noDo"
        end="%"
        @blur="inputLv"
      ></item-inputs>
      <item-inputs
        title="1年期(不含)以上借款年利率"
        v-model="value3"
        :readonly="noDo"
        end="%"
        @blur="inputUp"
      ></item-inputs>
    </div>
    <div class="first_div" v-else>
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
        currentNodeCode == 'fh-manager' || currentNodeCode == 'fh-manager-one'
      "
    >
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
      placeholder="请填写申请意见均可填"
      v-resetPage
      my-title="审批意见"
    />

    <!--当前处理人为最后一个审批人时，下一处理人不显示-->
    <select-man
      v-if="cardTitle == '' ? false : true"
      :cardTitle="'下一岗位：' + cardTitle + '：'"
      :manList="manList"
      :custIndex="custIndex"
      @selectManFun="selectManFun"
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
  name: "ApprovalSubmitComplex", //审批提交的复杂的页面，用于授信审批，尽调授信
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
        { label: "1年期(含)及以下借款年利率(%)", value: "" },
        { label: "1年期(不含)以上借款年利率(%)", value: "" },
        { label: "授信期限(月)", value: "" },
      ],
      demoData: [
        { label: "抵质押物编号", value: "" },
        { label: "风险缓释押品认定价值", value: "" },
      ],
      chooseMonth: [
        "12月",
        "13月",
        "24月",
        "25月",
        "36月",
        "37月",
        "48月",
        "49月",
        "60月",
        "61月",
        "72月",
        "73月",
        "84月",
        "85月",
        "96月",
        "97月",
        "108月",
        "109月",
        "120月",
        "121月",
      ],

      columns: [], //同意码
      suggestion: "", //申请意见
      cardTitle: "", //下一审批岗名
      manList: [], //下一审批岗可选人
      isSelected: "", //被选中的处理人
      item: {},
      orderContent: {},
      dictCodeId: "LN01",
      flag: this.$route.query.flag, //判断是尽调（jd）还是审批（sp）,尽调可以修改批复xx
      closeNum: 0, //计数器
      closeTag: 3, //拦截固定值，请求次数
      currentNodeCode: this.$route.query.currentNodeCode,
      creditApplyId: this.$route.query.creditApplyId,
      applyAmount: "", // 授信金额
      approveTerm: "", // 授信权限
      oneUplv: "", // 一年以上利率
      oneDownlvNew: "", // 一年以下利率
      oneDownlvOld: "", // 一年一下利率修改前
      value2: "",
      value3: "",
      estateUse: localStorage.getItem("estateUse"),
      custIndex: -1, //默认客户经理索引
      custMgrId: this.$route.query.custMgrId, //默认客户经理编号
      orderAttachment: {},
      orderOther: {},
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
    setTimeout(() => {
      this.getManList();
    }, 1000);

    this.getList();
    this.getDictCode();
    this.getCol();
  },
  methods: {
    // 选择处理人
    selectManFun(index) {
      this.isSelected = this.manList[index];
    },
    change(value) {
      this.months = value;
    },
    inputLv(value) {
      if (
        (this.currentNodeCode == "fh-manager" ||
          this.currentNodeCode == "fh-manager-one") &&
        this.oneDownlvNew != undefined &&
        Number(this.value2) <= Number(this.oneDownlvNew)
      ) {
        this.value2 = this.oneDownlvNew;
      } else if (
        (this.currentNodeCode == "fh-manager" ||
          this.currentNodeCode == "fh-manager-one") &&
        this.oneDownlvNew == undefined &&
        Number(this.value2) <= Number(this.oneDownlvOld)
      ) {
        this.value2 = this.oneDownlvOld;
      }
    },
    inputUp(value) {
      if (
        (this.currentNodeCode == "fh-manager" ||
          this.currentNodeCode == "fh-manager-one") &&
        Number(this.value3) <= Number(this.oneUplv)
      ) {
        this.value3 = this.oneUplv;
      }
    },
    // 点击提交按钮
    submitImg() {
      if (
        this.currentNodeCode == "fh-manager" ||
        this.currentNodeCode == "fh-manager-one"
      ) {
        if (this.demoData[1].value == "") {
          this.$toast("押品认定价值为空");
          return;
        }
        if (this.checkNull(this.value1)) {
          this.$toast("请填写授信金额");
          return;
        }
        if (this.value1 % 10000 != 0) {
          this.$toast("请输入10000的整数倍的数值");
          return;
        }
        if (this.estateUse == "03") {
          var content = "";
          content = parseInt((this.demoData[1].value * 6) / 10);

          if (this.value1 > content) {
            this.$toast("授信金额是不能超过" + content + "的整数");
            return;
          }
        } else {
          var content = "";
          content = parseInt((this.demoData[1].value * 7) / 10);
          if (this.value1 > content) {
            this.$toast("授信金额是不能超过" + content + "的整数");
            return;
          }
        }
        if (this.checkNull(this.value4)) {
          this.$toast("请填写授信期限");
          return;
        }
        if (this.checkNull(this.value2)) {
          this.$toast("请填写一年期以下执行利率");
          return;
        }

        if (this.checkNull(this.value3)) {
          this.$toast("请填写一年期以上执行利率");
          return;
        }

        if (this.checkNull(this.suggestion)) {
          this.$toast("请填写申请意见");
          return;
        }
      } else {
        if (this.checkNull(this.suggestion)) {
          this.$toast("请填写申请意见");
          return;
        }
      }
      if (this.manList.length > 0 && this.checkNull(this.isSelected)) {
        this.$toast("请选择处理人");
        return;
      }

      console.log(
        "提交=审批意见" + this.suggestion + ",处理人" + this.isSelected.name
      );
      if (
        this.currentNodeCode == "fh-manager" ||
        this.currentNodeCode == "fh-manager-one"
      ) {
        this.value4 = this.value4.substring(0, this.value4.length - 1);
      } else {
        this.value4 = this.value4;
      }
      if (this.flag != "sp") {
        //尽调可编辑
        var oc = this.orderContent;
        oc.OUT_ADJUST_RATE = this.value2;
        oc.OUT_ADJUST_RATE_SECOND_LEVEL = this.value3;
        oc.loanPeriod = this.value4;
        // this.orderContent = JSON.stringify(oc);
      }

      this.$toast.loading({
        duration: 0, // 持续展示 this.$toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      if (
        this.currentNodeCode == "fh-manager" ||
        this.currentNodeCode == "fh-manager-one"
      ) {
        (this.applyAmount = this.value1), (this.approveTerm = this.value4);
      } else {
        (this.applyAmount = this.demoData2[0].value),
          (this.approveTerm = this.demoData2[3].value);
      }

      var data = {
        approveAmount: this.applyAmount,
        approveTerm: this.approveTerm,
        approveUnit: "2", //批复期限单位
        creditApproveCode: this.dictCodeId, //	审批授信代码
        flowIdList: [this.item.flowId], //	流程编号List<String>
        orderAttachment: this.orderAttachment, //进件附件
        orderOther: this.orderOther,
        orderContent: JSON.stringify(this.orderContent), //进件详情
        reply: "2", //审批结果 通过
        orderId: this.item.flowId, //工作流编号
        taskId: this.item.currentNodeTaskId, //	任务编号
        roleIdList: [this.isSelected.roleId], //	角色编号列表
        userIdList: [this.isSelected.userId], //	用户编号列表
        operator: localStorage.getItem("operatorId"), //	操作人
        fraudPost: "0",
        context: this.suggestion,
      };
      console.log("提交数据请求参数---" + JSON.stringify(data));

      ajaxPostPlus(apiUrl.submit, data)
        .then((res) => {
          this.$toast.clear();
          //{"responseType":"HSJRY_SUCCESS","data":null,"httpStatus":200,"errorMessage":null,"errorCode":null,"rpcResult":"000000","parentIdemSerialId":null}
          this.$toast("审批成功");
          localStorage.removeItem("estateUse"); //移除缓存
          setTimeout(() => {
            this.$router.go(-2);
          }, 500);
        })
        .catch((err) => {
          this.$toast.clear();
          this.$toast("审批失败");
        });
    },
    getCol() {
      //认定价值
      var page = {
        creditApplyId: this.creditApplyId,
        pageNum: "1",
        pageSize: "10",
      };

      ajaxPostPlus(apiUrl.productInformationSelectPage, page)
        .then((res) => {
          try {
            res.list.forEach((element) => {
              this.demoData[0].value = element.outCltId;
              this.demoData[1].value = element.rmEvalValue;
            });
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
      this.$toast.loading({
        duration: 0, // 持续展示 this.$toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      //下一任务人
      var data = {
        applyId: this.item.applyId, //	申请编号
        processId: this.item.processId, //流程id
        taskId: this.item.currentNodeTaskId, //任务id
      };

      console.log(
        "获取下一任务人queryNextNodeUser请求参数 = " + JSON.stringify(data)
      );
      ajaxPostPlus(apiUrl.queryNextNodeUser, data)
        .then((res) => {
          if (res.nodeName != undefined) {
            this.cardTitle = res.nodeName;
          }
          if (res.userDtoList != null) {
            res.userDtoList.forEach((item) => {
              this.manList.push({
                name: item.userName,
                roleId: item.roleId,
                userId: item.userId,
              });
            });
            // 下一岗位为客户经理，默认选中
            if (this.currentNodeCode == "fh-shenpi") {
              for (let index = 0; index < this.manList.length; index++) {
                const cust = this.manList[index];
                if (cust.userId == this.custMgrId) {
                  this.custIndex = index;
                  console.log(this.custIndex);
                }
              }
            }
          }
          this.$toast.clear();
          this.closeLoading();
        })
        .catch((err) => {
          console.log("请求错误");
          this.$toast.clear();
          this.closeLoading();
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
          // console.log("QueryDictKeys = " + JSON.stringify(res));
          this.columns = res.dictItemMap.ApproveCode1;
          this.closeLoading();
        })
        .catch((err) => {
          console.log("QueryDictKeysErr = " + JSON.stringify(err));
          this.closeLoading();
        });
    },
    getList() {
      //获取利率、期限
      var page = {
        flowId: this.$route.query.flowId,
      };
      ajaxPostPlus(apiUrl.queryOrderContent, page)
        .then((res) => {
          try {
            this.orderContent = JSON.parse(res.orderContent);
            this.orderAttachment = res.orderAttachment;
            this.orderOther = res.orderOther;
            this.demoData2[1].value = this.orderContent.OUT_ADJUST_RATE + "%";

            this.demoData2[2].value =
              this.orderContent.OUT_ADJUST_RATE_SECOND_LEVEL + "%";

            this.demoData2[0].value = this.$route.query.applyAmount;
            this.demoData2[3].value = this.$route.query.applyPeriod;
            this.orderContent = JSON.parse(res.orderContent);
            this.getCreditApplicationDetails();
            this.oneUplv = this.orderContent.OUT_ADJUST_RATE_SECOND_LEVEL;
            this.oneDownlvNew = this.orderContent.OUT_ADJUST_RATE;
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
    checkNull(obj) {
      if (obj == null || obj == "") {
        return true;
      }
      if (obj.length == 0) {
        return true;
      }
      return false;
    },
    getCreditApplicationDetails() {
      ajaxPostPlus(apiUrl.CreditApplicationDetails, {
        creditApplyId: this.creditApplyId,
      })
        .then((res) => {
          this.caDetail = res;
          this.oneDownlvOld = String(this.caDetail.applyRate);
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
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

.showLine {
  border-bottom: 1px solid var(--color-Lightgray-bg);
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
