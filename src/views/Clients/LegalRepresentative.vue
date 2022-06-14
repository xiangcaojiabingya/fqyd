<template>
  <div class="main">
    <item-nav-bar title="其他征信" />
    <div v-if="isShowEmpty" class="emptytxt">暂无数据</div>
    <div
      class="card_div"
      v-for="(item, index) in netWorkData.userCreditInfoBoList"
      v-if="!isShowEmpty"
    >
      <div class="card_item">
        <span>信息来源</span>
        <span>{{ item.infoSource }}</span>
      </div>
      <div class="card_item">
        <span>信息类别</span>
        <span>{{getInfo(item.infoType) }}</span>
      </div>
      <div class="card_item">
        <span>信息描述</span>
        <span>{{ item.infoDescribe }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import { ajaxPostPlus, apiUrl } from "@/api.js";
import { codeToValue } from "@/utils/index.js";
export default {
  name: "Memorabilia", //客户信息-》其他征信
  components: { ItemNavBar },
  props: {},
  data() {
    return {
      netWorkData: {},
      requestData1: {
        //数据字典接口
        //请求报文
        dictKeys: ["credit_info_type"],
      },
      requestData2: {
        //网络数据
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
      typeList: [],
      isShowEmpty: false,
    };
  },
  computed: {
    //处理数据字典
    getInfo() {
      return function (code) {
        return codeToValue(this.typeList, code);
      };
    },
  },
  created() {},
  mounted() {
    this.getCodeList();
  },
  methods: {
    //获取网络数据
    getData() {
      ajaxPostPlus(apiUrl.queryResource, this.requestData2)
        .then((result) => {
          console.log("其他征信信息：" + JSON.stringify(result));
          this.netWorkData = result;
          if (
            this.netWorkData.userCreditInfoBoList != null &&
            this.netWorkData.userCreditInfoBoList.length > 0
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
          this.typeList = result.dictItemMap.credit_info_type;
          this.getData();
        })
        .catch((err) => {
          this.$toast.clear();
        });
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
