<template>
  <div class="shenpi">
    <item-nav-bar :title="title"></item-nav-bar>
    <!-- 列表 -->
    <div class="list">
      <Top />
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :disabled="disabled">
        <div style="min-height: 80vh">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="finished_text"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
          >
            <jditem
              v-for="(item, index) in list"
              :itemInfo="item"
              :key="index"
              @click.native="toDetail(item)"
            ></jditem>
          </van-list>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import Jditem from "@/views/allotOrCancel/components/Jditem.vue";
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import Top from "@/components/module/Top.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
import { codeToValue, moneyFormat } from "@/utils/index.js";
export default {
  name: "shenpi",
  components: {
    jditem: Jditem,
    "item-nav-bar": ItemNavBar,
    Top,
  },
  data() {
    return {
      refreshing: false, //下拉刷新
      loading: false, //上拉加载
      finished: false, //上拉加载
      finished_text: "没有更多了",
      error: false,
      pageNum: "1", //页码
      pageSize: "10", //条数
      list: [],
      list2: [],
      tempList: [],
      title: "业务分配",
      type: this.$route.query.type,
      dictKeys: ["jinjian_status", "jinjian_biz_type"],
      jinjian_status: [],
      jinjian_biz_type: [],
      disabled: false,
    };
  },
  methods: {
    toDetail(item) {
      if (this.type == "ywfp") {
        this.$router.push({
          path: "/allotDetail",
          query: {
            title: this.title, //标题
            type: this.type, //类型，sxjs
            type2: "2", //按钮显示 0,2,3 //显示数量
            id: item.id,
            certificateNo: item.certificateNo,
            applyId: item.applyId,
            currentNodeTaskId: item.currentNodeTaskId,
            currentNodeName: item.currentNodeName,
            currentOperatorId: item.currentOperatorId,
            currentOperatorName: item.currentOperatorName,
            currentNodeCode: item.currentNodeCode,
            item: JSON.stringify(item.item),
            flowId: item.flowId,
            applyAmount: item.applyAmount,
            applyPeriod: item.applyPeriod,
            processId: item.processId,
          },
        });
      } else {
        this.$router.push({
          path: "/QueryDetail",
          query: {
            title: this.title, //标题
            type: this.type, //类型，授信 & 支用
            type2: "2", //按钮显示 0,2,3 //显示数量
            id: item.id,
            certificateNo: item.certificateNo,
            applyId: item.applyId,
            applyIdapplyId: item.applyId,
            currentNodeTaskId: item.currentNodeTaskId,
            currentNodeName: item.currentNodeName,
            currentOperatorId: item.currentOperatorId,
            currentOperatorName: item.currentOperatorName,
            currentNodeCode: item.currentNodeCode,
            item: JSON.stringify(item.item),
            flowId: item.flowId,
            applyAmount: item.applyAmount,
            applyPeriod: item.applyPeriod,
            processId: item.processId,
          },
        });
      }

    },
    //下拉刷新
    onRefresh() {
      // 清空列表数据
      this.list = [];
      this.pageNum = "1";
      this.loading = true;
      this.finished = true;
      this.finished_text = "";
      this.onLoad();
    },
    //上拉加载
    onLoad() {
      this.getDictionary();
    },
    getDictionary() {
      // this.$toast.loading({
      //   duration: 0, // 持续展示 toast
      //   forbidClick: true,
      //   message: "加载中...",
      //   loadingType: "spinner",
      // });
      var reqBody = {
        dictKeys: this.dictKeys,
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, reqBody)
        .then((res) => {
          // console.log(" -数据字典列表-" + JSON.stringify(res));
          try {
            var dist = res.dictItemMap;
            this.jinjian_status = dist.jinjian_status;
            this.jinjian_biz_type = dist.jinjian_biz_type;
            this.getData();
          } catch (error) {
            this.$toast("获取数据失败");
            this.$toast.clear();
          }
        })
        .catch((res) => {
          this.loading = false;
          this.error = true;
          this.refreshing = false;
          this.disabled = true;
          this.finished = false;
          this.$toast.clear();
        });
    },
    // 获取类型、类别
    getKindType(code, flag) {
      let str = "";
      let list = [];
      if (flag == "type") {
        list = this.jinjian_status;
      } else {
        list = this.jinjian_biz_type;
      }
      str = codeToValue(list, code);
      return str;
    },
    getData() {
      var requestData = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      if (this.type == "ywfp") {
        //业务分配
      } else {
        requestData.bizType = "15"; //授信结束
      }
      ajaxPostPlus(apiUrl.CreditTune, requestData)
        .then((res) => {
          this.disabled = false;
          // this.list = [];
          this.list2 = [];
          this.tempList = res.applyList.list;
          res.applyList.list.forEach((item) => {
            if (this.type == "ywfp") {
              if (item.currentNodeCode == "fh-managectl") {
                this.list2.push({
                  typeName: this.title,
                  status: this.getKindType(item.status, "type"),
                  time: item.applyTime,
                  khNameVal: item.customerName,
                  applyJeVal: moneyFormat(item.applyAmount),
                  id: item.flowId,
                  certificateNo: item.certificateNo,
                  applyId: item.applyId,
                  currentNodeTaskId: item.currentNodeTaskId,
                  currentNodeName: item.currentNodeName,
                  currentOperatorId: item.currentOperatorId,
                  currentOperatorName: item.currentOperatorName,
                  currentNodeCode: item.currentNodeCode,
                  item: item,
                  flowId: item.flowId,
                  currentNodeTaskId: item.currentNodeTaskId,
                  applyId: item.applyId,
                  applyAmount: item.applyAmount,
                  applyPeriod: item.applyPeriod,
                  processId: item.processId,
                });
              }
            } else {
              this.list2.push({
                typeName: this.title,
                status: this.getKindType(item.status, "type"),
                time: item.applyTime,
                khNameVal: item.customerName,
                applyJeVal: moneyFormat(item.applyAmount),
                id: item.flowId,
                certificateNo: item.certificateNo,
                applyId: item.applyId,
                currentNodeTaskId: item.currentNodeTaskId,
                currentNodeName: item.currentNodeName,
                currentOperatorId: item.currentOperatorId,
                currentOperatorName: item.currentOperatorName,
                currentNodeCode: item.currentNodeCode,
                item: item,
                flowId: item.flowId,
                currentNodeTaskId: item.currentNodeTaskId,
                applyId: item.applyId,
                applyAmount: item.applyAmount,
                applyPeriod: item.applyPeriod,
                processId: item.processId,
              });
            }
          });
          if (this.refreshing) {
            this.refreshing = false;
          }
          if (res.applyList.list != undefined) {
            if (this.pageNum === "1") {
              this.list = this.list2;
            } else {
              this.list = [...this.list, ...this.list2];
            }
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            if (this.tempList.length >= this.pageSize) {
              this.pageNum++;
              this.finished = false;
            } else {
              this.finished = true;
            }
          } else {
            // 加载状态结束
            this.loading = false;
            this.finished = true;
          }
          this.$toast.clear();
          if (this.list.length == 0) {
            this.finished_text = "暂无数据";
          } else {
            this.finished_text = "没有更多了";
          }
        })
        .catch((err) => {
          this.disabled = true;
          this.finished = false;
          this.loading = false;
          this.error = true;
          this.refreshing = false;
          this.$toast.clear();
          console.log(this.title + "列表请求错误" + JSON.stringify(err));
        });
    },
  },
  computed: {},
  mounted() {
    //保存详情页面的状态  查看审批记录还是审批详情ty
    localStorage.setItem("detail-record", "");
    this.type = this.$route.query.type;
    if (this.type == "ywfp") {
      this.title = "业务分配";
    } else {
      this.title = "授信结束";
    }
  },
};
</script>

<style scope>
.shenpi {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
.list {
  padding-top: 46px;
  /* min-height: 80%; */
}
</style>