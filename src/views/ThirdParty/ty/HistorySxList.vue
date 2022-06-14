<template>
  <div class="historySxList">
    <item-nav-bar :title="title"></item-nav-bar>
    <div class="list_div">
      <!-- <div v-for="item in list">
        <item-history :item="item"></item-history>
        <div class="line"></div>
      </div>-->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :immediate-check="false">
        <div style="min-height: 90vh">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="hasDatas()?'暂无数据':'没有更多了'"
            @load="onLoad"
          >
            <div v-for="item in list">
              <item-history :item="item" :title="type=='sxcx'?'授信金额':'支用金额'" :typeList="typeList"></item-history>
              <div class="line"></div>
            </div>
          </van-list>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import ItemHistory from "../components/ItemHistory.vue";
import ItemNavBar from "../components/ItemNavBar.vue";
import { ajaxPostPlus, apiUrl } from "@/api.js";
export default {
  components: { ItemHistory, ItemNavBar },
  name: "HistorySxList",
  data() {
    return {
      title: this.$route.query.title,
      type: this.$route.query.type,
      loading: false,
      finished: false,
      refreshing: false,
      pageNum: 1,
      pageSize: 10,
      certificateNo: this.$route.query.certificateNo,
      list: [],
      typeList: [],
      requestData1: {
        dictKeys: ["loan_apply_status"],
      },
      requestData: {
        dictKeys: ["credit_apply_status"],
      },
    };
  },
  mounted() {
    this.getCodeList();
  },
  methods: {
    onLoad() {
      this.getData();
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.pageNum = 1;
      this.onLoad();
    },
    getData() {
      if (this.type == "sxcx") {
        //授信
        ajaxPostPlus(apiUrl.queryPageWithoutDataPermitSx, {
          certificateNo: this.certificateNo,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
          .then((result) => {
            console.log("列表数据：" + JSON.stringify(result));
            if (this.refreshing) {
              this.list = [];
              this.refreshing = false;
            }
            if (this.pageNum === 1) {
              this.list = result.list;
            } else {
              this.list = [...this.list, ...result.list];
            }
            this.loading = false;
            if (result.list != null && result.list.length == this.pageSize) {
              this.pageNum++;
            } else {
              this.finished = true;
            }
            this.$toast.clear();
          })
          .catch((err) => {
            if (this.refreshing) {
              this.refreshing = false;
            }
            this.loading = false;
            this.$toast.clear();
          });
      } else if (this.type == "zycx") {
        //支用
        ajaxPostPlus(apiUrl.queryPageWithoutDataPermitZy, {
          certificateNo: this.certificateNo,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
          .then((result) => {
            console.log("列表数据1：" + JSON.stringify(result));
            if (this.refreshing) {
              this.list = [];
              this.refreshing = false;
            }
            if (this.pageNum === 1) {
              this.list = result.list;
            } else {
              this.list = [...this.list, ...result.list];
            }
            this.loading = false;
            if (result.list != null && result.list.length == this.pageSize) {
              this.pageNum++;
            } else {
              this.finished = true;
            }
            this.$toast.clear();
          })
          .catch((err) => {
            if (this.refreshing) {
              this.refreshing = false;
            }
            this.loading = false;
            this.$toast.clear();
          });
      }
    },
    //获取数据字典---信息类别
    getCodeList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0, // 持续展示 toast
      });
      ajaxPostPlus(
        apiUrl.QueryDictKeys,
        this.type == "sxcx" ? this.requestData : this.requestData1
      )
        .then((result) => {
          console.log("信息类别：" + JSON.stringify(result));
          if (this.type == "sxcx") {
            this.typeList = result.dictItemMap.credit_apply_status;
          } else {
            this.typeList = result.dictItemMap.loan_apply_status;
          }
          this.getData();
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    hasDatas() {
      if (this.list == null) {
        return true;
      } else {
        if (this.list.length == 0) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
.historySxList {
  width: 100%;
  flex-direction: column;
  display: flex;
}
.header {
  width: 100%;
}
.list_div {
  width: 100%;
  margin-top: 60px;
}
.line {
  width: 100%;
  box-shadow: inset 0 0 0 0.5px var(--color-Lightgray-bg);
  height: 1px;
}
</style>