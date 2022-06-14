<template>
  <div>
    <item-nav-bar
      :title="title"
      bordercolor="var(--color-top-cuttingline)"
    ></item-nav-bar>
    <div class="body-margin-top">
      <!-- 查询组件 -->
      <item-search-top
        :clientName="client_name"
        @toSearch="toSearch"
        @toChange="toChange"
        :titleType="type"
        :dictCode="dictCode"
      ></item-search-top>
      <item-cutting-line></item-cutting-line>
      <!-- 刷新组件 -->
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        style="min-height: var(--list-height-ds)"
        :disabled="disabled"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="finished_text"
          @load="onLoad"
          offset="0"
        >
          <!-- 列表 -->
          <sxitem
            v-for="(item, index) in list"
            :itemInfo="item"
            @click.native="toDetail(item)"
            :key="index"
            :itemType="type"
          ></sxitem>
        </van-list>

        <!-- 没有信息时的提示 -->
        <item-no-message
          v-if="hintMessage"
          :hintText="hintText"
        ></item-no-message>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import ItemNoMessage from "@/components/common/ItemNoMessage.vue";
import ItemSearchTop from "@/views/Query/components/ItemSearchTop.vue";
import Sxitem from "@/views/Query/components/Sxitem.vue";
import { hideWebViewTitle, codeToValue } from "@/utils/index.js";
import ItemCuttingLine from "@/components/common/ItemCuttingLine.vue";
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import { GetKey, Encrypt, Decrypt } from "@/assets/js/AESCryptoJS.js";
import { genKeyPair } from "@/assets/js/RSAJSEncrypt.js";
import { ajaxPostPlus, apiUrl } from "@/api.js";

export default {
  name: "doubleSearch", //授信 & 支用 查询
  components: {
    ItemSearchTop,
    ItemNoMessage,
    Sxitem,
    ItemCuttingLine,
    ItemNavBar,
  },
  data() {
    return {
      hintMessage: true,
      title: "授信查询",
      type: "sxcx",
      client_name: "",
      refreshing: false,
      loading: false,
      finished: true,
      hintText: "请先输入您的搜索信息哦~", //暂时没有搜索到信息~
      list: [],
      dataTemp: null,
      pageSize: 10,
      total: 10,
      finished_text: "", //没有更多了
      randomID: "id" + new Date(), //随机的id,用于刷新页面
      dictCode: [],
      disabled: true,
      creditApplyId: "",
      currentNodeCode: "", // 岗位编码
      id: "",
    };
  },
  methods: {
    toChange(data) {
      this.dataTemp = data;
    },
    toSearch(data) {
      this.disabled = false;
      //子组件返回的数据
      data.pop_time, //申请时间
        data.pop_result, //审核状态
        data.client_name, //客户名称
        data.client_tel, //客户电话
        console.log("查询传参 = " + JSON.stringify(data));

      // if (
      //   this.checkNull(data.client_name) &&
      //   this.checkNull(data.client_tel) &&
      //   this.checkNull(data.pop_time.value) &&
      //   this.checkNull(data.pop_time.valueEnd) &&
      //   this.checkNull(data.pop_result.value)
      // ) {
      //   this.$toast("请至少输入一项搜索条件");
      //   this.hintText = "请先输入您的搜索信息哦~";
      //   this.hintMessage = true;
      //   this.list = [];
      //   this.loading = false;
      //   this.refreshing = false;
      //   this.finished_text = "";
      //   return;
      // }
      if (this.checkNull(data.client_name) && this.checkNull(data.client_tel)) {
        this.$toast("请先输入您的姓名或手机号");
        this.hintText = "请先输入您的姓名或手机号哦~";
        this.hintMessage = true;
        this.list = [];
        this.loading = false;
        this.refreshing = false;
        this.finished_text = "";
        return;
      }
      this.dataTemp = data;

      this.$toast.loading({
        duration: 0, // 持续展示 this.$toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });

      var queryData = {
        // customerName: "潍坊圣欣规划管理服务有限公司", //	客户名称 "潍坊圣欣规划管理服务有限公司"data.client_name
        // mobile: data.client_tel, //	手机号码
        // applyStartDate: "", //	申请开始时间
        // applyEndDate: "", //	申请结束时间
        // approveResult: data.pop_result.value, //审批结果
        pageNum: 1, //当前页数
        pageSize: this.pageSize, //每页展示条数
      };
      if (
        !this.checkNull(data.pop_time.value) &&
        !this.checkNull(data.pop_time.valueEnd)
      ) {
        queryData.startApplyTime = data.pop_time.value;
        queryData.endApplyTime = data.pop_time.valueEnd;
      }
      if (!this.checkNull(data.pop_result.value)) {
        if (this.type == "sxcx") {
          queryData.status = data.pop_result.value;
        } else {
          queryData.status = data.pop_result.value;
        }
      }
      if (!this.checkNull(data.client_name)) {
        if (this.type == "sxcx") {
          queryData.userName = data.client_name;
        } else {
          queryData.userName = data.client_name;
        }
      }
      if (!this.checkNull(data.client_tel)) {
        if (this.type == "sxcx") {
          queryData.userTel = data.client_tel;
        } else {
          queryData.userTel = data.client_tel;
        }
      }

      console.log("queryData = " + JSON.stringify(queryData));

      var data = {
        dictKeys: [
          "credit_apply_status", //进件状态
          "loan_apply_status", //进件状态
        ],
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, data)
        .then((res) => {
          console.log("QueryDictKeys = " + JSON.stringify(res));
          this.getData(queryData, res.dictItemMap);
        })
        .catch((err) => {
          this.loading = false;
          this.refreshing = false;
          this.hintText = "网络请求错误~";
          this.$toast.clear();
          console.log("QueryDictKeysErr = " + JSON.stringify(err));
        });
    },
    getData(queryData, dictKeys) {
      var apiUrlTemp = apiUrl.creditApplyResult;
      if (this.type == "sxcx") {
        apiUrlTemp = apiUrl.creditApplyResult;
        queryData.productIdList = ["FQD001"];
      } else {
        apiUrlTemp = apiUrl.queryPage;
        queryData.productIdList = ["FQD001"];
      }
      console.log("queryData = " + JSON.stringify(queryData));
      ajaxPostPlus(apiUrlTemp, queryData)
        .then((res) => {
          console.log("creditApplyResult = " + JSON.stringify(res));
          this.list = [];
          var tempList = [];
          try {
            if (this.type == "sxcx") {
              tempList = res.list;
            } else {
              tempList = res.list;
            }
            console.log("tempList = " + JSON.stringify(tempList));
            tempList.forEach((item) => {
              if (this.type == "zycx") {
                //支用
                this.list.push({
                  typeName: "支用申请",
                  state: item.status,
                  stateName: codeToValue(
                    dictKeys.loan_apply_status,
                    item.status
                  ),
                  productId: item.productId,
                  time: item.applyTime,
                  khNameKey: "客户名称",
                  khNameVal: item.userName,
                  cpNameVal: item.productName,
                  cpNameKey: "产品名称",
                  applyJeKey: "申请金额",
                  applyJeVal: item.applyAmount,
                  nodeName: "当前节点",
                  nodeVal: item.currentNodeName,
                  dealPerson: "处理人",
                  dealPersonVal: item.currentOperatorName,
                  flowId: item.flowId,
                  currentNodeTaskId: item.currentNodeTaskId,
                  loanApplyId: item.loanApplyId,
                  applyAmount: item.applyAmount,
                  applyPeriod: item.applyPeriod,
                  processId: item.processId,
                  item: item,
                  currentNodeName: item.currentNodeName,
                  currentOperatorId: item.currentOperatorId,
                  currentOperatorName: item.currentOperatorName,
                  currentNodeCode: item.currentNodeCode,
                  approveResult: item.approveResult,
                  applyId: item.loanApplyId,
                });
              }
              if (this.type == "sxcx") {
                //房权贷授信
                this.creditApplyId = item.creditApplyId;
                this.list.push({
                  typeName: "授信申请", //this.title == "授信查询" ? "授信申请" : "支用申请",
                  state: item.status,
                  stateName: codeToValue(
                    dictKeys.credit_apply_status,
                    item.status
                  ),
                  productId: item.productId,
                  time: item.applyTime,
                  khNameKey: "客户名称",
                  khNameVal: item.userName,
                  cpNameVal: item.productName,
                  cpNameKey: "产品名称",
                  applyJeKey: "申请金额",
                  applyJeVal: item.applyAmount,
                  // nodeName: "当前节点",
                  // nodeVal: item.currentNodeName,
                  // dealPerson: "处理人",
                  // dealPersonVal: item.currentOperatorName,
                  flowId: item.flowId,
                  currentNodeTaskId: item.currentNodeTaskId,
                  applyId: item.creditApplyId,
                  applyAmount: item.applyAmount,
                  applyPeriod: item.applyPeriod,
                  processId: item.processId,
                  item: item,
                  currentNodeName: item.currentNodeName,
                  currentOperatorId: item.currentOperatorId,
                  currentOperatorName: item.currentOperatorName,
                  currentNodeCode: item.currentNodeCode,
                  approveResult: item.approveResult,
                });
              }
            });
          } catch (error) {
            console.log("error = " + error.message);
          }

          if (this.list.length > 0) {
            this.hintMessage = false;
            if (this.type == "sxcx") {
              this.total = res.total;
            } else {
              this.total = res.total;
            }

            if (this.pageSize > this.total) {
              this.finished = true;
              if (this.total > 0) {
                this.finished_text = "没有更多了";
              } else {
                this.finished_text = "";
              }
            } else {
              this.finished = false;
              this.finished_text = "没有更多了";
            }
          } else {
            this.hintMessage = true;
            this.hintText = "暂时没有搜索到信息~";
            this.finished = true;
            this.finished_text = "";
          }

          this.loading = false;
          this.refreshing = false;
          this.$toast.clear();
        })
        .catch((err) => {
          this.loading = false;
          this.refreshing = false;
          this.hintText = "网络请求错误~";
          this.$toast.clear();
        });
    },
    getId(applyId) {
      this.$toast.loading({
        duration: 0, // 持续展示 this.$toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      var data = {
        applyId: applyId,
      };
      console.log("dataid-----" + JSON.stringify(data));
      ajaxPostPlus(apiUrl.zhCreditTune, data)
        .then((res) => {
          console.log("id-----------" + JSON.stringify(res));
          res.applyList.list.forEach((element) => {
            console.log("element" + JSON.stringify(element));
            if (element.currentNodeCode == "zh-shenpi") {
              var data = element;
              this.id = data.id;
            } else if (element.currentNodeCode == "fh-fuhee") {
              var data2 = element;
              this.id = data2.id;
            } else {
              var data3 = element;
              this.id = data3.id;
            }
          });
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
    toDetail(item) {
      this.type = this.$route.query.type;
      console.log("aaa" + JSON.stringify(item));
      this.getId(item.applyId);
      this.$router.push({
        path: "/QueryDetail",
        query: {
          title: this.title, //标题
          type: this.type, //类型，授信 & 支用
          type2: "0", //按钮显示 0,2,3 //显示数量
          id: this.id,
          certificateNo: item.item.certificateNo,
          applyId: item.item.creditApplyId,
          // approveResult: item.item.approveResult,
          flowId: item.item.flowId,
          loanApplyId: item.item.loanApplyId,
          currentNodeTaskId: item.currentNodeTaskId,
          applyAmount: item.applyAmount,
          applyPeriod: item.applyPeriod,
          processId: item.processId,
          currentNodeName: item.currentNodeName,
          currentOperatorId: item.currentOperatorId,
          currentOperatorName: item.currentOperatorName,
          currentNodeCode: this.currentNodeCode,
          status: item.item.status,
        },
      });
      console.log("waegsrhdtfyug" + item.item.creditApplyId);
    },
    onRefresh() {
      // // 重新加载数据
      // this.finished = false;
      // 将 loading 设置为 true，表示处于加载状态
      if (this.checkNull(this.dataTemp)) {
        this.loading = false;
        if (this.refreshing) {
          this.refreshing = false;
        }
        return;
      }
      this.pageSize = 10;
      this.toSearch(this.dataTemp);
    },
    onLoad() {
      if (this.finished) {
        return;
      }
      this.pageSize += 10;
      console.log("this.pageSize = " + this.pageSize);
      this.toSearch(this.dataTemp);
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
    getDictCode() {
      this.$toast.loading({
        duration: 0, // 持续展示 this.$toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      var data = {
        dictKeys: [
          "loan_apply_status", //进件状态
        ],
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, data)
        .then((res) => {
          var tempArray = res.dictItemMap.loan_apply_status;
          var dictArray = [
            {
              text: "审批结果",
              value: "",
            },
          ];
          if (tempArray != null) {
            tempArray.forEach((item) => {
              dictArray.push({
                text: item.itemName,
                value: item.itemKey,
              });
            });
          }

          this.dictCode = dictArray;

          this.$toast.clear();
        })
        .catch((err) => {
          console.log("QueryDictKeysErr = " + JSON.stringify(err));
          this.$toast.clear();
        });
    },
  },
  mounted() {
    hideWebViewTitle();
    //保存详情页面的状态  查看审批记录还是审批详情ty
    localStorage.setItem("detail-record", "");

    this.type = this.$route.query.type;
    if (this.type == "sxcx") {
      this.title = "授信查询";
    } else {
      this.title = "支用查询";
    }
    console.log("title = " + this.title);
    this.client_name = this.$route.query.name;

    let dsSave = this.$store.getters.getDsSave;
    console.log("dsSave = " + JSON.stringify(dsSave));
    if (dsSave != null && dsSave.type != null) {
      Object.assign(this.$data, dsSave);
      this.randomID = "id" + new Date();
    }

    if (
      this.client_name != null &&
      this.client_name != "" &&
      this.list.length <= 0
    ) {
      var tm = {
        pop_time: { text: "申请时间", value: "", valueEnd: "" },
        pop_result: { text: "审批结果", value: "" },
        client_name: this.client_name,
        client_tel: "",
      };
      this.toSearch(tm);
    }
    if (
      this.type == "zycx" &&
      (this.dictCode == null ||
        this.dictCode == [] ||
        this.dictCode.length <= 0)
    ) {
      this.getDictCode();
    }
  },
  activated() {
    //保存详情页面的状态  查看审批记录还是审批详情ty
    localStorage.setItem("detail-record", "");
  },
  created() {
    // // 加密测试
    // console.log("AES - GetKey() = " + GetKey()); //加密requestData
    // //时间很长 3 ~ 5s
    // console.log("RSA - genKeyPair = " + JSON.stringify(genKeyPair())); //加密key
    // //{"privateKey":"MD4CAQACCQCPHanCxF1msQIDAQABAgh9iobLvIa68QIFAL+5pV0CBQC/GD1lAgRb/CLVAgUAlaDxUQIEOr0UUg==",
    // //"publicKey":"MCQwDQYJKoZIhvcNAQEBBQADEwAwEAIJAI8dqcLEXWaxAgMBAAE="}
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    console.log("beforeRouteLeave - from : " + from.name + " to : " + to.name);
    // //QueryDetail

    if (to.name == "QueryDetail" || to.name == "Application2") {
      this.$store.commit("setDsSave", {
        dsSave: this.$data,
      });
    } else if (to.name == "index") {
      localStorage.removeItem("SEARCH");
      this.$store.commit("deleteDsSave");
    } else if (to.name == "QueryClientList") {
      //客户查询 返回时删除保存
      localStorage.removeItem("SEARCH");
      this.$store.commit("deleteDsSave");
    }
    next();
  },
};
</script>

<style scoped>
html,
body {
  background: var(--color-nomessage-bg);
}
</style>