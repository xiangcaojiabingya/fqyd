// 查询审批详情 申请信息
<template>
  <div class="bj">
    <top />
    <item-nav-bar
      :title="title"
      :rightSet="rightSet"
      @onClickRight="onClickRight"
    ></item-nav-bar>
    <div class="Application">
      <div class="content">
        <div class="title">
          <div class="left"></div>
          <div class="top">基本信息</div>
        </div>
        <div
          v-if="
            currentNodeCode == 'fh-managectl' || currentNodeCode == 'fh-manager'
          "
        >
          <div
            v-for="(item, index) in demoData4"
            :key="index"
            class="margin_style"
          >
            <single-line-item
              :label="item.label"
              :value="item.value"
              :isShowLine="index == demoData.length - 1 ? false : true"
            ></single-line-item>
          </div>
        </div>
        <div v-else>
          <div
            v-for="(item, index) in demoData"
            :key="index"
            class="margin_style"
          >
            <single-line-item
              :label="item.label"
              :value="item.value"
              :isShowLine="index == demoData.length - 1 ? false : true"
            ></single-line-item>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <div class="left"></div>
          <div class="top">认定价值</div>
        </div>
        <div
          v-for="(item, index) in demoData3"
          :key="index"
          class="margin_style"
        >
          <single-line-item
            :label="item.label"
            :value="item.value"
            :isShowLine="index == demoData2.length - 1 ? false : true"
          ></single-line-item>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <div class="left"></div>
          <div class="top">客户经理</div>
        </div>
        <div
          v-for="(item, index) in demoData2"
          :key="index"
          class="margin_style"
        >
          <single-line-item
            :label="item.label"
            :value="item.value"
            :isShowLine="index == demoData2.length - 1 ? false : true"
          ></single-line-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleLineItem from "@/components/common/SingleLineItem.vue";
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import { setWebViewTitle } from "@/utils/index.js";
import Top from "@/components/module/Top.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
import { codeToValue } from "@/utils/index.js";
export default {
  name: "Application",
  components: {
    "single-line-item": SingleLineItem,
    "item-nav-bar": ItemNavBar,
    Top,
  },
  data() {
    return {
      demoData: [
        { label: "申请单编号", value: "" },
        { label: "申请日期", value: "" },
        { label: "申请产品", value: "" },
        { label: "授信金额", value: "" },
        { label: "授信期限", value: "" },
        { label: "1年期(含)及以下借款年利率", value: "" },
        { label: "1年期(含)及以上借款年利率", value: "" },
        { label: "借款用途", value: "综合消费" },
        { label: "担保方式", value: "抵押" },
      ],
      demoData2: [
        { label: "推荐机构", value: "" },
        { label: "推荐人工号", value: "" },
        { label: "经办机构", value: "" },
        { label: "经办客户经理姓名", value: "" },
        { label: "经办客户经理工号", value: "" },
        { label: "管户客户经理姓名", value: "" },
        { label: "管户客户经理工号", value: "" },
      ],
      demoData3: [
        { label: "风控押品认定价值", value: "" },
        { label: "风险缓释押品认定价值", value: "" },
      ],
      demoData4: [
        { label: "申请单编号", value: "" },
        { label: "申请日期", value: "" },
        { label: "申请产品", value: "" },
        { label: "借款用途", value: "综合消费" },
        { label: "担保方式", value: "抵押" },
      ],
      title: "申请信息",
      rightSet: "rightSet",
      dictKeys: ["term_unit", "loan_purpose", "image_kind"],
      term_unit: [], //期限单位
      loan_purpose: [], // 借款用途
      image_kind: [], // 附件类型
      // creditApplyId:'000CA2021050000000093',
      imageData: [],
      creditApplyId: this.$route.query.creditApplyId,
      currentNodeCode: this.$route.query.currentNodeCode,
      flowId: this.$route.query.flowId,
      id: this.$route.query.id,
    };
  },
  methods: {
    getDictionary() {
      var reqBody = {
        dictKeys: this.dictKeys,
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, reqBody)
        .then((res) => {
          // console.log(" -数据字典列表-" + JSON.stringify(res));
          try {
            var dist = res.dictItemMap;
            this.term_unit = dist.term_unit;
            this.loan_purpose = dist.loan_purpose;
            this.image_kind = dist.image_kind;
            this.getData();
          } catch (error) {
            this.$toast("获取数据失败");
            this.$toast.clear();
          }
        })
        .catch((res) => {
          this.$toast.clear();
        });
    },
    // 获取类型、类别
    getKindType(code, flag) {
      let str = "";
      let list = [];
      if (flag == "type") {
        list = this.term_unit;
      } else if (flag == "demo") {
        list = this.loan_purpose;
      } else if (flag == "image") {
        list = this.image_kind;
      }
      if (list.length == 0) {
        this.getDictionary();
        return;
      } else {
        str = codeToValue(list, code);
      }
      return str;
    },
    getData() {
      // this.$toast.loading({
      //   duration: 0, // 持续展示 toast
      //   forbidClick: true,
      //   message: "加载中...",
      //   loadingType: "spinner"
      // });
      var data = {
        applyId: this.creditApplyId,
        id: this.id,
      };
      ajaxPostPlus(apiUrl.queryApprovalResultWithoutPermission, data)
        .then((res) => {
          try {
            // console.log("申请信息" + JSON.stringify(res));
            res.applyList.list.forEach((element) => {
              this.demoData[0].value = element.applyId;
              this.demoData[1].value = element.applyTime;
              this.demoData[2].value = element.productName;
              
              this.demoData[4].value = element.applyPeriod + "月";

              this.demoData4[0].value = element.applyId;
              this.demoData4[1].value = element.applyTime;
              this.demoData4[2].value = element.productName;
            });
            this.getCol();
            this.getDetails();
            this.$toast.clear();
          } catch (error) {
            this.$toast("获取数据失败");
            console.log("error = " + error.message);
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
    getCurrent() {
      //获取岗位
      var data = {
        applyId: this.creditApplyId,
      };
      ajaxPostPlus(apiUrl.zhCreditTune, data)
        .then((res) => {
          console.log("ajsfgdshfsjgdk," + JSON.stringify(res));
          res.applyList.list.forEach((element) => {
            this.currentNodeCode = element.currentNodeCode;
          });
          this.getDictionary();
        })
        .catch((err) => {
          this.hintText = "网络请求错误~";
          this.$toast.clear();
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
            // console.log("押品" + JSON.stringify(res));
            res.list.forEach((element) => {
              this.demoData3[0].value = element.evalCurrency;
              if (element.rmEvalValue != null && element.rmEvalValue != "") {
                this.demoData3[1].value = element.rmEvalValue + "元";
              } else {
                this.demoData3[1].value = element.rmEvalValue;
              }
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
    getDetails() {
      // 申请信息
      var page = {
        flowId: this.flowId,
      };
      ajaxPostPlus(apiUrl.queryOrderContent, page)
        .then((res) => {
          try {
            var orderContent = JSON.parse(res.orderContent);
            console.log("申请信息2-----------" + JSON.stringify(orderContent));
            this.demoData[3].value = orderContent.approveAmount + "元";
            this.demoData[5].value = orderContent.OUT_ADJUST_RATE + "%";
            this.demoData[6].value = orderContent.OUT_ADJUST_RATE_SECOND_LEVEL
              ? orderContent.OUT_ADJUST_RATE_SECOND_LEVEL + "%"
              : "--";
            this.demoData2[0].value = orderContent.orgId;
            this.demoData2[1].value = orderContent.recommendOperateId;
            this.demoData2[2].value = orderContent.manageOrganName;
            this.demoData2[3].value = orderContent.manageName;
            this.demoData2[4].value = orderContent.manageEmpNo;
            this.demoData2[5].value = "--";
            this.demoData2[6].value = "--";
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
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({
        name: "ImageData",
        params: {
          flag: "1", //标志
          creditApplyId: this.creditApplyId,
          flowId: this.flowId,
        },
      });
    },
  },
  mounted() {
    // console.log("aaa" + JSON.stringify(this.$route.query));
    // console.log("vvvv" + this.creditApplyId);
    //业务分配不展示影像资料
    if (
      this.$route.query.currentNodeCode != undefined &&
      this.$route.query.currentNodeCode == "fh-managectl"
    ) {
      this.rightSet = "FINISH";
    } else {
      this.rightSet = "rightSet";
    }
    this.$toast.loading({
      duration: 0, // 持续展示 toast
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    this.getCurrent();
    // this.getData();
    this.getDictionary();
  },
  computed: {},
};
</script>

<style scoped>
.bj {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
.Application {
  margin-top: 46px;
}
.content {
  background-color: #ffffff;
  margin-top: 12px;
}
.content:last-child {
  margin-bottom: 12px;
}
div.title {
  padding: var(--form-padding-top) 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
div.top {
  font-size: var(--size-text-small);
  margin-left: 10px;
  color: #ff6619;
}
div.left {
  width: 3px;
  height: 20px;
  background-color: #ff6619;
}
/*.margin_style {
  margin: 0 15px;
}*/
</style>