<template>
  <div class="main">
    <item-nav-bar title="账户信息" />
    <div v-if="isShowEmpty" class="emptytxt">暂无数据</div>
    <div
      class="card_div"
      v-for="(item, index) in netWorkData.userFinancialInstrumentsBoList"
      :key="index"
      v-show="!isShowEmpty"
    >
      <div class="card_item">
        <span>账户类型</span>
        <span>{{ getZHType(item.accountKind) }}</span>
      </div>
      <div class="card_item">
        <span>开户机构名称</span>
        <span>{{ item.openBrankName }}</span>
      </div>
      <div class="card_item">
        <span>户名</span>
        <span>{{ item.accountName }}</span>
      </div>
      <div class="card_item">
        <span>账户</span>
        <span>{{ item.account }}</span>
      </div>
      <div class="card_item">
        <span>预留手机号</span>
        <span>{{ item.relationMobile }}</span>
      </div>
      <div class="card_item">
        <span>账户绑定日期</span>
        <span>{{ item.buildDate==null?"--":item.buildDate.substring(0,10) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
import { codeToValue } from "@/utils/index.js";
export default {
  name: "Memorabilia", //个人客户信息-》账户信息
  components: { ItemNavBar },
  props: {},
  data() {
    return {
      requestData1: {
        //数据字典接口
        //请求报文
        dictKeys: ["account_kind"],
      },
      requestData: {
        //请求报文
        dimension: "1",
        dimensionId: JSON.parse(this.$route.query.info).userId,
        resourceTypeList: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
        ],
      },
      netWorkData: {},
      typeList: [],
      isShowEmpty: false,
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.getCodeList();
  },
  methods: {
    getData() {
      ajaxPostPlus(apiUrl.queryResource, this.requestData)
        .then((result) => {
          console.log("账户信息：" + JSON.stringify(result));
          this.netWorkData = result;
          if (
            this.netWorkData.userFinancialInstrumentsBoList != null &&
            this.netWorkData.userFinancialInstrumentsBoList.length > 0
          ) {
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
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0, // 持续展示 toast
      });
      ajaxPostPlus(apiUrl.QueryDictKeys, this.requestData1)
        .then((result) => {
          console.log("信息类别：" + JSON.stringify(result));
          this.typeList = result.dictItemMap.account_kind;
          this.getData();
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    getZHType(code) {
      return codeToValue(this.typeList, code);
    },
  },
};
</script>

<style  scoped>
.main {
  font-size: 14px;
  padding: 46px 0 12px;
}
.card_div {
  background: #ffffff;
  margin-top: 12px;
  padding: 0px 15px 15px 0px;
}
.card_item {
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 0px 0 15px;
}
.card_item span:first-child {
  min-width: 70px;
}
.card_item span:last-child {
  margin-left: 12px;
  word-break: break-all;
  word-wrap: break-word;
}
.emptytxt {
  padding: 15px;
  font-size: 14px;
  color: #999999;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  box-sizing: border-box;
}
</style>
