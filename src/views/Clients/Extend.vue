<template>
  <div class="Extend">
    <item-nav-bar title="经营信息"></item-nav-bar>
    <top />
    <div v-for="(item, index) in demoData" :key="index">
      <single-line-item :label="item.label" :value="item.value" :isShowLine=false>
      </single-line-item>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import SingleLineItem from "@/components/common/SingleLineItem.vue";
import Top from "@/components/module/Top.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
import { codeToValue } from "@/utils/index.js";
import { getPcaData } from "@/utils/pcadata.js";
export default {
  name: "Extend",
  components: {
    "item-nav-bar": ItemNavBar,
    "single-line-item": SingleLineItem,
    Top,
  },
  data() {
    return {
      res: {},
      demoData: [
        { label: "商户名称", value: "" },
        { label: "统一社会信用码", value: "" },
        { label: "商户类别", value: "" },
        { label: "行政区域", value: "" },
        { label: "经营地", value: "" },
        { label: "主营业务", value: "" },
        { label: "兼营业务", value: "" },
        { label: "年营业收入", value: "" },
        { label: "商户电话", value: "" },
      ],
      merchant_type: [],
    };
  },
  methods: {
    // 查询数据字典
    getDictKeys() {
      console.log("查询数据字典");
      let reqBody = {
        dictKeys: ["merchant_type"], //商业类别
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, reqBody)
        .then((res) => {
          console.log(" -数据字典列表-" + JSON.stringify(res));
          let distMap = res.dictItemMap;
          this.merchant_type = distMap.merchant_type;
          this.getData();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(" -数据字典请求错误" + JSON.stringify(err));
        });
    },
    merchant_type_dec(code) {
      //商户类别数据字典
      return codeToValue(this.merchant_type, code);
    },
    getData() {
      let userId = JSON.parse(this.$route.query.info).userId;
      console.log("userId==" + userId);
      ajaxPostPlus(apiUrl.queryUserManageInfo, { userId: userId })
        .then((res) => {
          this.$toast.clear();
          console.log(" -经营信息-" + JSON.stringify(res));
          this.res = res;
          this.demoData = [
            { label: "商户名称", value: this.res.merchantName },
            { label: "统一社会信用码", value: this.res.certificateNo },
            {
              label: "商户类别",
              value: this.merchant_type_dec(this.res.merchantType),
            },
            {
              label: "行政区域",
              value: getPcaData(
                this.res.provinceCode,
                this.res.cityCode,
                this.res.area
              ),
            },
            { label: "经营地", value: this.res.address },
            { label: "主营业务", value: this.res.mainBusiness },
            { label: "兼营业务", value: this.res.byworkBusiness },
            {
              label: "年营业收入",
              value: this.addYuan(this.res.annualOperatingRevenue, "元"),
            },
            { label: "商户电话", value: this.res.merchantPhone },
          ];
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("经营信息请求错误" + JSON.stringify(err));
        });
    },
    addYuan(val, txt) {
      console.log("val=" + val);
      if (val == null || val == "" || val == undefined) {
        return "--";
      }
      return val + txt;
    },
  },
  computed: {
    province_dec() {
      //行政区域数据字典
      return this.res.provinceCode;
    },
  },
  created() {},
  mounted() {
    this.$toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: "加载中...",
      loadingType: "spinner",
    });
    this.getDictKeys();
  },
};
</script>

<style scoped>
.Extend {
  padding-top: 46px;
}
</style>