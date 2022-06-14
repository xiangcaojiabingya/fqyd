<template>
  <!-- 房产信息不可编辑 -->
  <div class="bj">
    <top />
    <item-nav-bar
      :title="title"
      :rightSet="rightSet"
      @onClickRight="onClickRight"
    ></item-nav-bar>
    <div class="Application">
      <div
        class="content"
        v-if="type == 'sxcx' && demoData[0].value == '不动产权证'"
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
      <div
        class="content"
        v-else-if="type == 'sxcx' && demoData[0].value == '房屋所有权证'"
      >
        <div
          v-for="(item, index) in demoData3"
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
    </div>
    <div class="content" v-if="type != 'sxcx'">
      <div
        v-for="(item, index) in demoData2"
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
  </div>
</template>

<script>
import SingleLineItem from "@/components/common/SingleLineItem.vue";
import { disableWebViewScreenShot, cancelNoScreenShot } from "@/utils/index.js";
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import Top from "@/components/module/Top.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
import { codeToValue } from "@/utils/index.js";
export default {
  name: "RealEstateSpan",
  components: {
    "single-line-item": SingleLineItem,
    "item-nav-bar": ItemNavBar,
    Top,
  },
  //   props: {
  //     creditApplyId: String, // 申请编号
  //   },
  data() {
    return {
      estate: "sp",
      demoData: [
        { label: "权利证类型", value: "" },
        { label: "不动产权证", value: "" },
        { label: "房产所在地", value: "" },
        { label: "详细地址", value: "" },
        { label: "小区名称", value: "" },
        { label: "建筑面积(平方米)", value: "" },
        { label: "规划用途", value: "" },
        { label: "房屋状态", value: "" },
        { label: "产权年限", value: "" },
        { label: "使用到期日", value: "" },
        { label: "房屋所有权人", value: "" },
        { label: "风控押品认定价值", value: "" },
        { label: "风险缓释押品认定价值(元)", value: "" },
        { label: "抵制押物编号", value: "" },
      ],
      demoData3: [
        { label: "权利证类型", value: "" },
        { label: "房屋所有权证号", value: "" },
        { label: "房产所在地", value: "" },
        { label: "详细地址", value: "" },
        { label: "小区名称", value: "" },
        { label: "建筑面积(平方米)", value: "" },
        { label: "规划用途", value: "" },
        { label: "房屋状态", value: "" },
        { label: "产权年限", value: "" },
        { label: "使用到期日", value: "" },
        { label: "房屋所有权人", value: "" },
        { label: "风控押品认定价值", value: "" },
        { label: "风险缓释押品认定价值(元)", value: "" },
        { label: "抵制押物编号", value: "" },
      ],
      demoData2: [
        { label: "不动产权证号", value: "" },
        { label: "小区名称", value: "" },
        { label: "房产地区", value: "" },
        { label: "房屋坐落", value: "" },
        { label: "房屋所有人", value: "" },
        { label: "规划用途", value: "" },
        { label: "建筑面积(平方米)", value: "" },
        { label: "房屋归属", value: "" },
        { label: "使用年限开始", value: "" },
        { label: "使用年限截止日", value: "" },
      ],
      title: "房产信息",
      rightSet: "rightSet",
      dictKeys: ["term_unit", "loan_purpose", "image_kind"],
      term_unit: [], //期限单位
      loan_purpose: [], // 借款用途
      image_kind: [], // 附件类型
      // creditApplyId:'000CA2021050000000093',
      imageData: [],
      timeAfter: "",
      timeBefore: "",
      planningPurposes: "",
      riskContentData: "",
      riskContentTemp: "",
      pageNum: "1",
      pageSize: "10",
      homeState: "", //规划用途
      housingOwnership: "", //房屋归属
      cardType: "", //权利证类型
      type: this.$route.query.type,
      loanApplyId: this.$route.query.loanApplyId,
      // applyId: this.$route.query.applyId,
      creditApplyId: this.$route.query.creditApplyId,
      currentNodeCode: this.$route.query.currentNodeCode,
      flowId: this.$route.query.flowId,
    };
  },
  methods: {
    getDictionary() {
      var reqBody = {
        dictKeys: this.dictKeys,
      };
      if (this.currentNodeCode != "") {
      }
      ajaxPostPlus(apiUrl.QueryDictKeys, reqBody)
        .then((res) => {
          try {
            var dist = res.dictItemMap;
            this.warr_type = dist.Warr_Type; //权利证类型
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
    getList() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      if (this.type == "sxcx") {
        ajaxPostPlus(apiUrl.queryEstateInfoByCreditApplyId, {
          creditApplyId: this.creditApplyId,
        })
          .then((res) => {
            try {
              if (res.estateStatus == "01") {
                this.homeState = "出租";
              } else if (res.estateStatus == "02") {
                this.homeState = "自住";
              } else {
                this.homeState = "闲置";
              }
              if (res.estateUnder == "01") {
                this.housingOwnership = "本人单独所有";
              } else if (res.estateUnder == "02") {
                this.housingOwnership = "配偶单独所有";
              } else if (res.estateUnder == "03") {
                this.housingOwnership = "夫妻双方共同所有";
              } else {
                this.housingOwnership = "第三人所有";
              }
              if (res.warrType == "01") {
                this.cardType = "不动产权证";
              } else {
                this.cardType = "房屋所有权证";
              }
              if (res.estateUse == "01") {
                this.planningPurposes = "住宅";
              } else if (res.estateUse == "02") {
                this.planningPurposes = "公寓";
              } else if (res.estateUse == "03") {
                this.planningPurposes = "别墅";
              } else {
                this.planningPurposes = "商业";
              }
              this.demoData[0].value = this.cardType;
              this.demoData[1].value = res.estateCode;
              this.demoData[2].value =
                res.estateProvince + res.estateCity + res.estateDomain;
              this.demoData[3].value = res.estateAddress;
              this.demoData[4].value = res.communityName;
              this.demoData[5].value = res.estateArea;

              this.demoData[6].value = this.planningPurposes;

              // var temp = JSON.parse(res.intoDetail);
              // console.log("bbb____" + JSON.stringify(temp));
              this.demoData[7].value = this.homeState;
              this.demoData[8].value = res.propertyUseYear;
              this.demoData[10].value = this.housingOwnership;
              this.demoData3[0].value = this.cardType;
              this.demoData3[1].value = res.estateCode;
              this.demoData3[2].value =
                res.estateProvince + res.estateCity + res.estateDomain;
              this.demoData3[3].value = res.estateAddress;
              this.demoData3[4].value = res.communityName;
              this.demoData3[5].value = res.estateArea;
              this.demoData3[6].value = this.planningPurposes;
              // var temp = JSON.parse(res.intoDetail);
              // console.log("bbb____" + JSON.stringify(temp));
              this.demoData3[7].value = this.homeState;
              this.demoData3[8].value = res.propertyUseYear;
              this.timeBefore = res.propertyEndTime.split("");
              this.timeBefore.splice(4, 0, "-");
              this.timeBefore.splice(7, 0, "-");
              this.demoData[9].value = this.timeBefore.join("");
              this.demoData3[9].value = this.timeBefore.join("");
              this.demoData3[10].value = this.housingOwnership;
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
      } else if (this.type == "sxjs") {
        ajaxPostPlus(apiUrl.queryEstateInfoByCreditApplyId, {
          creditApplyId: this.creditApplyId,
        })
          .then((res) => {
            try {
              if (res.estateStatus == "01") {
                this.homeState = "出租";
              } else if (res.estateStatus == "02") {
                this.homeState = "自住";
              } else {
                this.homeState = "闲置";
              }
              if (res.estateUnder == "01") {
                this.housingOwnership = "本人单独所有";
              } else if (res.estateUnder == "02") {
                this.housingOwnership = "配偶单独所有";
              } else if (res.estateUnder == "03") {
                this.housingOwnership = "夫妻双方共同所有";
              } else {
                this.housingOwnership = "第三人所有";
              }
              if (res.warrType == "01") {
                this.cardType = "不动产权证";
              } else {
                this.cardType = "房屋所有权证";
              }
              if (res.estateUse == "01") {
                this.planningPurposes = "住宅";
              } else if (res.estateUse == "02") {
                this.planningPurposes = "公寓";
              } else if (res.estateUse == "03") {
                this.planningPurposes = "别墅";
              } else {
                this.planningPurposes = "商业";
              }
              this.demoData2[0].value = res.estateCode;
              this.demoData2[1].value = res.communityName;
              this.demoData2[2].value =
                res.estateProvince + res.estateCity + res.estateDomain;
              this.demoData2[3].value = res.estateAddress;
              this.demoData2[4].value = res.ownerName;
              this.demoData2[5].value = this.planningPurposes;
              this.demoData2[6].value = res.estateArea;
              // var temp = JSON.parse(res.intoDetail);
              // console.log("bbb____" + JSON.stringify(temp));
              this.demoData2[7].value = this.housingOwnership;
              this.timeAfter = res.propertyStartTime.split("");
              this.timeAfter.splice(4, 0, "-");
              this.timeAfter.splice(7, 0, "-");
              this.demoData2[8].value = this.timeAfter.join("");
              this.timeBefore = res.propertyEndTime.split("");
              this.timeBefore.splice(4, 0, "-");
              this.timeBefore.splice(7, 0, "-");
              this.demoData2[9].value = this.timeBefore.join("");
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
      } else if (
        this.type == "zycx" &&
        (this.currentNodeCode == "zh-shenpi" ||
          this.currentNodeCode == "fh-fuhe")
      ) {
        ajaxPostPlus(apiUrl.queryEstateInfoByLoanApplyId, {
          loanApplyId: this.loanApplyId,
        })
          .then((res) => {
            try {
              if (res.estateStatus == "01") {
                this.homeState = "出租";
              } else if (res.estateStatus == "02") {
                this.homeState = "自住";
              } else {
                this.homeState = "闲置";
              }
              if (res.estateUnder == "01") {
                this.housingOwnership = "本人单独所有";
              } else if (res.estateUnder == "02") {
                this.housingOwnership = "配偶单独所有";
              } else if (res.estateUnder == "03") {
                this.housingOwnership = "夫妻双方共同所有";
              } else {
                this.housingOwnership = "第三人所有";
              }
              if (res.warrType == "01") {
                this.cardType = "不动产权证";
              } else {
                this.cardType = "房屋所有权证";
              }
              if (res.estateUse == "01") {
                this.planningPurposes = "住宅";
              } else if (res.estateUse == "02") {
                this.planningPurposes = "公寓";
              } else if (res.estateUse == "03") {
                this.planningPurposes = "别墅";
              } else {
                this.planningPurposes = "商业";
              }
              this.demoData2[0].value = res.estateCode;
              this.demoData2[1].value = res.communityName;
              this.demoData2[2].value =
                res.estateProvince + res.estateCity + res.estateDomain;
              this.demoData2[3].value = res.estateAddress;
              this.demoData2[4].value = res.ownerName;
              this.demoData2[5].value = this.planningPurposes;
              this.demoData2[6].value = res.estateArea;
              // var temp = JSON.parse(res.intoDetail);
              // console.log("bbb____" + JSON.stringify(temp));
              this.demoData2[7].value = this.housingOwnership;
              this.timeAfter = res.propertyStartTime.split("");
              this.timeAfter.splice(4, 0, "-");
              this.timeAfter.splice(7, 0, "-");
              this.demoData2[8].value = this.timeAfter.join("");
              this.timeBefore = res.propertyEndTime.split("");
              this.timeBefore.splice(4, 0, "-");
              this.timeBefore.splice(7, 0, "-");
              this.demoData2[9].value = this.timeBefore.join("");
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
      } else {
        ajaxPostPlus(apiUrl.queryEstateInfoByLoanApplyId, {
          loanApplyId: this.loanApplyId,
        })
          .then((res) => {
            try {
              if (res.estateStatus == "01") {
                this.homeState = "出租";
              } else if (res.estateStatus == "02") {
                this.homeState = "自住";
              } else {
                this.homeState = "闲置";
              }
              if (res.estateUnder == "01") {
                this.housingOwnership = "本人单独所有";
              } else if (res.estateUnder == "02") {
                this.housingOwnership = "配偶单独所有";
              } else if (res.estateUnder == "03") {
                this.housingOwnership = "夫妻双方共同所有";
              } else {
                this.housingOwnership = "第三人所有";
              }
              if (res.warrType == "01") {
                this.cardType = "不动产权证";
              } else {
                this.cardType = "房屋所有权证";
              }
              if (res.estateUse == "01") {
                this.planningPurposes = "住宅";
              } else if (res.estateUse == "02") {
                this.planningPurposes = "公寓";
              } else if (res.estateUse == "03") {
                this.planningPurposes = "别墅";
              } else {
                this.planningPurposes = "商业";
              }
              this.demoData2[0].value = res.estateCode;
              this.demoData2[1].value = res.communityName;
              this.demoData2[2].value =
                res.estateProvince + res.estateCity + res.estateDomain;
              this.demoData2[3].value = res.estateAddress;
              this.demoData2[4].value = res.ownerName;
              this.demoData2[5].value = this.planningPurposes;
              this.demoData2[6].value = res.estateArea;
              // var temp = JSON.parse(res.intoDetail);
              // console.log("bbb____" + JSON.stringify(temp));
              this.demoData2[7].value = this.housingOwnership;
              this.timeAfter = res.propertyStartTime.split("");
              this.timeAfter.splice(4, 0, "-");
              this.timeAfter.splice(7, 0, "-");
              this.demoData2[8].value = this.timeAfter.join("");
              this.timeBefore = res.propertyEndTime.split("");
              this.timeBefore.splice(4, 0, "-");
              this.timeBefore.splice(7, 0, "-");
              this.demoData2[9].value = this.timeBefore.join("");
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
    getRisk() {
      ajaxPostPlus(apiUrl.productInformationSelectPage, {
        creditApplyId: this.creditApplyId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      })
        .then((res) => {
          this.$toast.clear();
          res.list.forEach((element) => {
            this.demoData[11].value = element.evalValue;
            this.demoData[12].value = element.rmEvalValue;
            this.demoData[13].value = element.outCltId;
            this.demoData3[11].value = element.evalValue;
            this.demoData3[12].value = element.rmEvalValue;
            this.demoData3[13].value = element.outCltId;
          });
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
    disableWebViewScreenShot();
    console.log("接收页面传参" + JSON.stringify(this.$route.query));
    // this.getDictionary();
    // this.getData();
    if (this.type == "sxcx") {
      this.getRisk();
    }
    this.getList();
  },
  computed: {},

  destroyed() {
    // 取消截屏（只在Android手机有用）
    cancelNoScreenShot();
  },
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
/*.margin_style {
  margin: 0 15px;
}*/
</style>