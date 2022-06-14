<template>
  <div class="main">
    <item-nav-bar title="征信信息" />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        class="list_height"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        :finished-text="finished_text"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div class="card_div" v-for="(item, index) in list">
          <div class="card_item">
            <span>客户姓名</span>
            <span>{{ item.userName }}</span>
          </div>
          <div class="card_item">
            <span>证件号码</span>
            <span>{{ item.idNo }}</span>
          </div>
          <div class="card_item">
            <span>征信报告编号</span>
            <span>{{ item.creditReportNo }}</span>
          </div>
          <div class="card_item">
            <span>报告获取时间</span>
            <span>{{ item.reportAcquireTime }}</span>
          </div>
          <div class="card_item">
            <span>影像上传标志</span>
            <span>{{ imageUploadFlag(item.imageUploadFlag) }}</span>
          </div>
          <div class="card_item">
            <span>查询机构</span>
            <span>{{ item.queryOrgName }}</span>
          </div>
          <div class="card_item">
            <span>查询人</span>
            <span>{{ item.queryUserName }}</span>
          </div>
          <div class="card_item">
            <span>查询时间</span>
            <span>{{ item.queryDate }}</span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
import {isHasData} from "@/utils/index.js";

export default {
  name: "zhengxin", //客户信息-》征信信息
  components: { ItemNavBar },
  props: {},
  data() {
    return {
      info: JSON.parse(this.$route.query.info),
      refreshing: true, //下拉刷新
      loading: false, //上拉加载
      finished: false, //上拉加载
      error: false,
      finished_text: "没有更多了",
      pageNum: 1, //页码
      pageSize: "10", //条数
      list: [],
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.$toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: "加载中...",
      loadingType: "spinner",
    });
    this.getData();
  },
  methods: {
    imageUploadFlag(flag) {
      if (flag == "1") {
        return "是";
      }
      return "否";
    },
    //下拉刷新
    onRefresh() {
      console.log("加载下一页");
      this.list = [];
      this.pageNum = 1;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.finished = true;
      this.finished_text=""
      this.onLoad();
    },
    //上拉加载
    onLoad() {
      this.getData();
    },
    // 网络请求获取查询客户列表
    getData() {
      this.list = [];
      let reqBody = {
        //请求报文
        idNo: this.info.idNo,
        idType: this.info.idType,
        pageNo: this.pageNum,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      ajaxPostPlus(apiUrl.queryCreditQueryRecordPage, reqBody)
        .then((res) => {
          this.error = false;
          console.log(" -征信信息列表-" + JSON.stringify(res));
          if (this.refreshing) {
            this.refreshing = false;
          }
          if (isHasData(res.list)) {
            if (this.pageNum === "1") {
              this.list = res.list;
            } else {
              this.list.push(...res.list);
            }
            this.loading = false; // 加载状态结束
            // 数据全部加载完成
            if (this.list.length >= this.pageSize) {
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
          this.loading = false;
          this.error = true;
          this.refreshing = false;
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    
    },
  },
};
</script>

<style  scoped>
.main {
  font-size: 14px;
  padding: 46px 0px 12px;
}
.list_height {
  min-height: 100vh;
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
  padding: 15px 0px 0px 15px;
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
