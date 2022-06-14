<template>
  <div class="relation">
    <item-nav-bar title="关联信息"></item-nav-bar>
    <div class="card_div" v-for="(item, index) in list">
      <div class="card_item">
        <span>关系</span>
        <span>
          {{
          getRelationType(item.userCustomerRelationPojo.clientRelation, "1")
          }}
        </span>
      </div>
      <div class="card_item">
        <span>类型</span>
        <span>
          {{
          getRelationType(item.userCustomerInfoPojoBo.clientCategory, "2")
          }}
        </span>
      </div>
      <div class="card_item">
        <span>姓名</span>
        <span>{{ item.userPersonalBasicInfoBo.clientName }}</span>
      </div>
      <div class="card_item">
        <span>证件类型</span>
        <span>{{ getCertificateName(item.userCertificateInfoBoList)}}</span>
      </div>
      <div class="card_item">
        <span>证件号码</span>
        <span>{{ getCertificateNo(item.userCertificateInfoBoList)}}</span>
      </div>
      <div class="card_item">
        <span>联系方式</span>
        <span>{{ getTelephone(item.userTelContactStationInfoBoList)}}</span>
      </div>
    </div>
    <div v-if="noMsg" class="no_message">暂无数据</div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
import { codeToValue, isHasData } from "@/utils/index.js";

export default {
  name: "FinancialInformation", //关联信息
  components: { ItemNavBar },
  data() {
    return {
      info: JSON.parse(this.$route.query.info),
      list: [], //数据列表
      relation_type: [], //客户关系
      user_type: [], //客户类别
      noMsg: false,
    };
  },
  methods: {
    getCertificateName(list) {
      if (list != null && list.length > 0) {
        return list[0].certificateName;
      } else {
        return "--";
      }
    },
    getCertificateNo(list) {
      if (list != null && list.length > 0) {
        return list[0].certificateNo;
      } else {
        return "--";
      }
    },
    getTelephone(list) {
      if (list != null && list.length > 0) {
        return list[0].telephone;
      } else {
        return "--";
      }
    },
    // 查询数据字典
    getDictKeys() {
      console.log("查询数据字典");
      let reqBody = {
        dictKeys: ["relation_type", "user_type"], //客户关系，客户类别
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, reqBody)
        .then((res) => {
          console.log(" -数据字典列表-" + JSON.stringify(res));
          let distMap = res.dictItemMap;
          this.user_type = distMap.user_type;
          this.relation_type = distMap.relation_type;
          this.getData();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log(" -数据字典请求错误" + JSON.stringify(err));
        });
    },
    // 获取关系、类型
    getRelationType(code, flag) {
      let str = "";
      let list = [];
      if (flag == "1") {
        list = this.relation_type;
      } else {
        list = this.user_type;
      }
      if (!list) {
        this.getDictKeys();
        return;
      } else {
        str = codeToValue(list, code);
      }
      return str;
    },
    // 网络请求获取查询客户列表
    getData() {
      let reqBody = {
        //请求报文
        userId: this.info.userId,
        clientRelationList: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "71",
          "72",
          "8",
          "9",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "81",
          "82",
          "83",
          "84",
          "85",
          "86",
        ],
      };
      ajaxPostPlus(apiUrl.queryCustomerRelation, reqBody)
        .then((res) => {
          if (isHasData(res.queryCustomerRelationBoList)) {
            console.log(
              " -关联信息列表-" +
                JSON.stringify(res.queryCustomerRelationBoList)
            );
            let temp = res.queryCustomerRelationBoList;
            //过滤掉配偶信息,配偶数据在基本信息展示了
            this.list = temp.filter((element) => {
              return element.userCustomerRelationPojo.clientRelation != "1";
            });
            this.$toast.clear();
            this.noMsg = false;
          } else {
            this.$toast.clear();
            this.$toast("暂无数据");
            this.noMsg = true;
          }
          if (!isHasData(this.list)) {
            this.$toast("暂无数据");
            this.noMsg = true;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
  },
  mounted() {
    this.$toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: "加载中...",
      loadingType: "spinner",
    });
    this.getDictKeys();
  },
  activated() {},
};
</script>

<style scoped>
.relation {
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
</style>