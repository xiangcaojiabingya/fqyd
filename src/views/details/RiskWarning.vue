<template>
    
  <div>
    <div>
      <item-nav-bar :title="titleMap.title1"></item-nav-bar>
    </div>
    <div class="body-margin-top">
      <item-company-info
        v-for="(item, index) in arrs"
        :itemInfo="item"
        :key="index"
        @click="onClick(item)"
      ></item-company-info>
      <!-- 没有信息时的提示 -->
      <item-no-message
        v-if="hintMessage"
        :hintText="hintText"
      ></item-no-message>
    </div>

     
  </div>
</template>

<script>
import ItemCompanyInfo from "@/components/common/ItemCompanyInfo";
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import ItemCuttingLine from "@/components/common/ItemCuttingLine.vue";
import ItemNoMessage from "@/components/common/ItemNoMessage.vue";
import { ajaxPostPlus, apiUrl } from "@/api.js";
export default {
  name: "RiskWarning", //风险提示
  components: { ItemCompanyInfo, ItemNavBar, ItemCuttingLine, ItemNoMessage },
  data() {
    return {
      titleMap: {
        title1: "风险提示",
      },
      type: "sxcx",
      hintMessage: false,
      hintText: "无记录~", //
      arrs: [],
    };
  },
  methods: {
    getData() {
      this.$toast.loading({
        duration: 0, // 持续展示 this.$toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });

      // var data = {
      //   applyId: this.$route.query.applyId, //申请单编号 "000CA2021050000000063", //
      //   bizType: this.type == "sxcx" ? "SX" : "ZY", //申请类型SX-授信 ZY-支用 "SX", //
      // };
      console.log("data = " + JSON.stringify(this.$route.query));
      ajaxPostPlus(apiUrl.queryRiskDecisionResult, this.$route.query)
        .then((res) => {
          console.log("queryRiskDecisionResult = " + JSON.stringify(res));
          if (res == null || res.riskRuleDtoList == null) {
            this.hintMessage = true;
          } else {
            this.hintMessage = false;
            this.arrs = [];
            //TODO 暂时没有信息，后需添加
            res.riskRuleDtoList.forEach((item) => {
              this.arrs.push({
                title: "命中规则详情",
                state: "",
                title1: item.ruleName,
                title2: "",
                title3: "",
                value1: "",
                value2: "",
                value3: "",
              });
            });
          }
          if (this.arrs.length == 0) {
            this.hintMessage = true;
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          this.hintMessage = true;
        });
    },
  },
  mounted() {
    // this.type = this.$route.query.type;
    this.getData();
  },
  activated() {},
};
</script>

<style scoped>
</style>