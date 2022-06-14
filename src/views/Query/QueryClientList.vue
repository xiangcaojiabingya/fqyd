<!--客户查询列表-->
<template>
  <div class="main">
    <item-nav-bar title="客户查询" class="navbar" />
    <div class="query_head">
      <div class="query_trem_div">
        <gary-input v-model.trim="value1" class="query_term11" placeholder="请输入客户名称" maxlength="60"
          type="text"></gary-input>
        <gary-input v-model.trim="value2" class="query_term11" placeholder="请输入证件号码" maxlength="18"
          type="tel"></gary-input>
      </div>
      <div class="btn_query_div" @click="query_btn">
        <van-image class="btn_query" :src="require('@/assets/img/khcx_cx_bg.png')"></van-image>
        <div class="btn_text">查询</div>
      </div>
    </div>
    <!--搜索内容-->
    <template v-if="showNoMsg == false">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div class="query_content">
          <van-list v-model="loading" :finished="finished" :finished-text="finished_text"
            :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
            <div class="card_div" v-for="(item, index) in list" :key="index"
              :class="{ click_item_active: index === clickItem }" @click="clickItemFun(index)">
              <div class="card_head">
                <span>{{ item.clientName }}</span>
              </div>
              <div class="card_body">
                <div class="card_item">
                  <span>证件类型：</span>
                  <span>{{ item.certificateKindDesc }}</span>
                </div>
                <div class="card_item">
                  <span>证件号码：</span>
                  <span>{{ item.certificateNo }}</span>
                </div>
              </div>
            </div>
          </van-list>
        </div>
      </van-pull-refresh>
    </template>
    <!--未输入搜索条件时-->
    <template v-else>
      <div class="no_input">
        <van-image class="no_input_img" :src="require('@/assets/img/cx_qxy_pic.png')" />
        <div class="no_input_tips">{{ tips }}</div>
      </div>
    </template>
    <!--底部按钮-->
    <div class="bottom_btn" v-if="hideshow">
      <div v-for="(item, index) in selectAction" :key="index" class="bottom_item"
        :class="{ select_btn_active: selectBtn == item.value }" @click="selectBtnFun(item)">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import GaryInput from "@/views/Query/components/GaryInput.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
import { isPoneAvailable, isHasData } from "@/utils/index.js";
export default {
  name: "QueryClientList", //客户查询列表
  components: { ItemNavBar, GaryInput },
  props: {},
  data() {
    return {
      showNoMsg: true, //展示tips图片
      tips: "请先输入您的搜索条件哦~",
      refreshing: false, //下拉刷新
      loading: false, //上拉加载
      finished: false, //上拉加载
      finished_text: "没有更多了",
      error: false, //上拉加载请求失败
      pageNumM: "1", //页码
      pageSizeM: "10", //条数
      total: "", //总数
      selectBtn: "", //底部被选中按钮
      clickItem: "", //选中数据
      selectAction: [
        //底部tab按钮
        { text: "客户信息", value: "btn1" },
        { text: "授信信息", value: "btn2" },
        { text: "支用信息", value: "btn3" },
        { text: "借据信息", value: "btn4" },
      ],
      value1: "", //输入客户名
      value2: "", //输入手机号
      list: [], //客户信息列表
      docmHeight: window.innerHeight, //默认屏幕高度
      showHeight: window.innerHeight, //实时屏幕高度
      hideshow: true, //显示
    };
  },
  computed: {},
  created() {},
  mounted() {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = window.innerHeight;
      })();
    };
  },
  watch: {
    showHeight: function (newValue) {
      if (this.docmHeight > newValue) {
        this.hideshow = false;
      } else {
        this.hideshow = true;
      }
    },
  },
  methods: {
    // 查询按钮
    query_btn() {
      this.onRefresh();
    },
    //下拉刷新
    onRefresh() {
      if (this.value1 == "" && this.value2 == "") {
        this.$toast("请先输入您的搜索条件哦~");
        this.tips = "请先输入您的搜索条件哦~";
        this.showNoMsg = true;
        return;
      }
      if (this.value1 == "" && this.value2 != "") {
        this.$toast("请输入您的姓名哦~");
        this.tips = "请输入您的姓名哦~";
        this.showNoMsg = true;
        return;
      }
      if (this.value1 != "" && this.value2 == "") {
        this.$toast("请输入您的证件号码哦~");
        this.tips = "请输入您的证件号码哦~";
        this.showNoMsg = true;
        return;
      }
      if (this.value2 != "" && this.value2.length != 18) {
        this.$toast("请输入有效的证件号码");
        return;
      }
      this.list = []; // 清空列表数据
      this.loading = true;
      this.finished = true;
      this.finished_text = "";
      this.pageNumM = "1";
      this.selectBtn = ""; //底部被选中按钮
      this.clickItem = ""; //选中数据
      this.showNoMsg = true;
      this.tips = "请先输入您的搜索条件哦~";
      this.onLoad();
    },
    //上拉加载
    onLoad() {
      this.getData();
    },
    // 网络请求获取查询客户列表
    getData() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      let reqBody = {
        pageNum: this.pageNumM,
        pageSize: this.pageSizeM,
        clientCategory: "200",
      };
      if (this.value1 != "") {
        reqBody.clientName = this.value1;
      }
      //为空不能传
      if (this.value2 != "") {
        reqBody.idNo = this.value2;
      }
      console.log("客户列表请求报文=" + JSON.stringify(reqBody));
      ajaxPostPlus(apiUrl.customerList, reqBody)
        .then((res) => {
          this.error = false;
          if (this.refreshing) {
            this.refreshing = false;
          }
          if (isHasData(res.list)) {
            this.showNoMsg = false;
            if (this.pageNumM === "1") {
              this.list = res.list;
            } else {
              this.list.push(...res.list);
            }
            // 加载状态结束
            this.loading = false;
            if (this.list.length >= this.pageSizeM) {
              this.pageNumM++;
              this.finished = false;
            } else {
              this.finished = true;
            }
          } else {
            // 加载状态结束
            this.loading = false;
            this.finished = true;
            this.showNoMsg = true;
            this.tips = "暂时没有搜索到信息~";
          }
          this.$toast.clear();
          if (this.list.length == 0) {
            this.finished_text = "暂无数据";
            this.showNoMsg = true;
            this.tips = "暂时没有搜索到信息~";
          } else {
            this.showNoMsg = false;
            this.finished_text = "没有更多了";
          }
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.refreshing = false;
          this.showNoMsg = true;
          this.tips = "网络请求错误~";
          this.$toast.clear();
          console.log("客户列表请求错误" + JSON.stringify(err));
        });
    },
    // 选中数据
    clickItemFun(index) {
      this.clickItem = index;
    },
    // 选择底部功能按钮
    selectBtnFun(selBtn) {
      console.log("选中数据" + this.clickItem);
      console.log("底部数据  ", selBtn.value)
      if (this.clickItem === "") {
        this.$toast("请选择一条数据");
      } else {
        this.selectBtn = selBtn.value;
        let itemData = this.list[this.clickItem];
        console.log(" 选中数据=" + JSON.stringify(itemData));
        this.goQuery(itemData);
      }
    },
    // 选中底部tab按钮后跳转页面
    goQuery(itemData) {
      let data = {
        //客户具体信息所需的请求报文
        userId: itemData.userId, //网贷中台客户ID
        custManagerName: itemData.custManagerName, //客户经理
        custManagerOrganId: itemData.custManagerOrganId, //所属组织ID
        custManagerOrganName: itemData.custManagerOrganName, //所属组织名称
        idType: itemData.certificateKindCode, //证件类型
        idNo: itemData.certificateNo, //证件号
      };
      if (this.selectBtn == "btn1") {
        this.$router.push({
          path: "/ClientsList",
          query: { data: JSON.stringify(data) }, //对象转为字符串才能传递
        });
      } else if (this.selectBtn == "btn2") {
        this.$router.push({
          path: "/doubleSearch",
          query: { name: itemData.clientName, type: "sxcx" },
        });
      } else if (this.selectBtn == "btn3") {
        this.$router.push({
          path: "/doubleSearch",
          query: { name: itemData.clientName, type: "zycx" },
        });
      } else {
        this.$router.push({
          path: "/QueryIOUList",
          query: { name: itemData.clientName, randomID: "id" + new Date() },
        });
      }
    },
  },
};
</script>

<style scoped>
.main {
  /*加上底部按钮的高度*/
  padding: 46px 0 62px;
  font-size: 14px;
  position: relative;
}
.navbar {
  z-index: 9;
}
.query_head {
  background: #ffffff;
  width: 100%;
  padding: 24px 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: rgba(188, 188, 188, 0.5) 1px solid; /* #bcbcbc的50% */
  /* position: fixed; */
}
.query_trem_div {
  width: calc(100% - 89px - 12px);
}

/* 查询条件 */
.query_term11 {
  padding: 6px 0;
}

/* 查询按钮 */
.btn_query_div {
  /* 178*152 */
  width: 89px;
  height: 76px;
  margin: 6px 0 0;
  position: relative;
}
.btn_query {
  width: 100%;
}
.btn_text {
  position: absolute;
  top: 47px;
  left: 30px;
  color: #ffffff;
}

/* 请先输入搜索条件 */
.no_input {
  text-align: center;
  margin-top: 80px;
}
.no_input_img {
  /* 298*196 */
  width: 149px;
}
.no_input_tips {
  font-size: 12px;
  margin-top: 12px;
  color: #999999;
}

/* 查询出的结果*/
.query_content {
  width: 100%;
  min-height: calc(100vh- 46px -62px -48px - 76px - 24px - 1px);
}
/**/
.card_div {
  margin-top: 12px;
  background: #ffffff;
  padding: 15px 0 0;
}
.card_head {
  padding: 0px 15px;
  font-size: 16px;
  word-break: break-all;
  word-wrap: break-word;
}
.card_body {
  padding: 0 0 15px;
  padding-left: 15px;
  width: 100%;
  box-sizing: border-box;
}
.card_item {
  width: 100%;
  margin-top: 15px;
  color: var(--color-gray-text);
  font-size: 14px;
}
.card_item span:nth-child(2) {
  color: var(--color-black-text);
  margin-left: 30px;
}

/* 底部按钮 */
.bottom_btn {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background: #ffffff;
  display: flex;
  width: 100%;
  font-size: var(--tab-font-size);
  justify-content: space-around;
  height: 50px;
  align-items: center;
  text-align: center;
  border-top: 1px solid #e5e5e5;
}
.bottom_item {
  width: 25%;
  color: var(--tab-color-unselect);
}
/* 底部按钮被选中 */
.select_btn_active {
  color: #ff6619;
}
/* 数据被选中 */
.click_item_active {
  background: #fff5f0;
}
</style>

