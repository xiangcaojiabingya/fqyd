// 借据查询列表
<template>
  <div class="query_iou_list">
    <item-nav-bar title="借据查询" class="navbar" />
    <div class="query_head">
      <div class="query_trem_div">
        <gary-input
          v-model.trim="value1"
          class="query_term11"
          placeholder="请输入客户名称"
          maxlength="60"
          type="text"
        ></gary-input>
        <gary-input
          v-model.trim="value2"
          class="query_term11"
          placeholder="请输入客户手机号码"
          maxlength="11"
          type="tel"
        />
        <div class="query_trem_div2">
          <div
            class="query_input_div"
            @click="selectbtn('1')"
            :class="{ query_term2_active: isActive1 }"
          >
            <van-popover
              v-model="showTime"
              trigger="click"
              :actions="arrActions.arrTime"
              @select="onSelect"
            >
              <template #reference>
                <div class="query_term2">
                  {{ value3.text }}
                  <van-image class="img_select" :src="srcFun(isActive1)" />
                </div>
              </template>
            </van-popover>
          </div>
          <div
            class="query_input_div"
            @click="selectbtn('2')"
            :class="{ query_term2_active: isActive2 }"
          >
            <van-popover
              v-model="showResult"
              trigger="click"
              :actions="arrActions.arrResult"
              @select="onSelect"
            >
              <template #reference>
                <div class="query_term2">
                  {{ value4.text }}
                  <van-image class="img_select" :src="srcFun(isActive2)" />
                </div>
              </template>
            </van-popover>
          </div>
        </div>
      </div>
      <div class="btn_query_div" @click="submitQuery">
        <van-image class="btn_query" :src="require('@/assets/img/sxcx_cx_bg.png')"></van-image>
        <div class="btn_text">查询</div>
      </div>
    </div>
    <!--搜索内容-->
    <template v-if="showNoMsg == false">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <div class="query_content">
          <van-list
            v-model="loading"
            :finished="finished"
            :finished-text="finished_text"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
          >
            <jjitem
              class="query_content_list"
              v-for="(item, index) in list"
              :key="index"
              :itemInfo="item"
              @click.native="item_click(index)"
            ></jjitem>
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
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import Jjitem from "@/views/Query/components/Jjitem.vue";
import GaryInput from "@/views/Query/components/GaryInput.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
import { isPoneAvailable, getDateFor, isHasData } from "@/utils/index.js";

export default {
  name: "QueryIOUList", //借据查询列表
  components: { Jjitem, ItemNavBar, GaryInput },
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
      pageNum: "1", //页码
      pageSize: "10", //条数
      total: "", //总数
      showResult: false, //是否展示借据状态选项
      showTime: false, //是否展示放款时间选项
      arrActions: {
        //放款时间选项
        arrTime: [
          {
            text: "放款时间",
            value: "",
            valueEnd: ""
          },
          {
            text: "一个月内",
            value: getDateFor("M").startTime,
            valueEnd: getDateFor("M").endTime
          },
          {
            text: "半年内",
            value: getDateFor("HY").startTime,
            valueEnd: getDateFor("HY").endTime
          },
          {
            text: "一年内",
            value: getDateFor("Y").startTime,
            valueEnd: getDateFor("Y").endTime
          }
        ],
        arrResult: [
          //借据状态选项
          { text: "借据状态", value: "" },
          { text: "使用中", value: "1" },
          { text: "已逾期", value: "2" },
          { text: "已结清", value: "3" }
        ],
        reqData: {}
      },
      value1: "", //客户名称
      value2: "", //客户手机号
      value3: { text: "放款时间" }, //放款时间
      value4: { text: "借据状态" }, //借据状态
      flag: "0", //区分放款时间和借据状态选值的点击事件
      isActive1: false,
      isActive2: false,
      list: [], //借据列表
      name: "" //客户查询页跳转传的客户名
    };
  },
  computed: {},
  created() {
    if (this.$route.query.name != undefined) {
      this.value1 = this.$route.query.name;
      this.submitQuery();
    }
  },
  mounted() {},
  methods: {
    // 跳转到详情
    item_click(index) {
      this.$router.push({
        path: "/LoanDetail",
        query: {
          loanInvoiceId: this.list[index].loanInvoiceId,
          overdueDailyInterestRate: this.list[index].overdueDailyInterestRate //借据信息详情所需
        }
      });
    },
    // 点击选择数据
    selectbtn(flag) {
      this.show = true;
      if (flag == "1") {
        this.flag = "1";
        this.showTime = true;
      } else {
        this.flag = "2";
        this.showResult = true;
      }
    },
    // 列表中选中数据
    onSelect(item) {
      console.log(item.text);
      if (this.flag == "1") {
        this.value3 = item;
        if (item.text == "放款时间") {
          this.isActive1 = false;
        } else {
          this.isActive1 = true;
        }
      } else {
        this.value4 = item;
        if (item.text == "借据状态") {
          this.isActive2 = false;
        } else {
          this.isActive2 = true;
        }
      }
    },
    //选中数据后的样式
    srcFun(isActive) {
      if (isActive == true) {
        return require("@/assets/img/sxcx_xlh_icon.png");
      }
      return require("@/assets/img/sxcx_xl_icon.png");
    },
    // 提交查询
    submitQuery() {
      this.onRefresh();
    },
    //下拉刷新
    onRefresh() {
      if (
        this.value1 == "" &&
        this.value2 == "" &&
        this.value3.text == "放款时间" &&
        this.value4.text == "借据状态"
      ) {
        this.$toast("请先输入您的搜索条件哦~");
        this.showNoMsg = true;
        this.tips = "请先输入您的搜索条件哦~";
        return;
      }
      if (this.value2 != "" && !isPoneAvailable(this.value2)) {
        this.$toast("请输入有效的手机号码");
        return;
      }
      if (this.value4.text != "已逾期") {
        if (this.value1 == "" && this.value2 == "") {
          this.$toast("请先输入客户姓名或手机号~");
          this.list = [];
          this.showNoMsg = true;
          this.tips = "请先输入您的搜索条件哦~";
          return;
        }
      }
      this.list = []; // 清空列表数据
      this.pageNum = "1";
      this.loading = true;
      this.finished = true;
      this.finished_text = "";
      this.showNoMsg = true;
      this.tips = "请先输入您的搜索条件哦~";
      this.onLoad();
    },
    //上拉加载
    onLoad() {
      this.getData();
    },

    // 网络请求
    getData() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner"
      });
      this.reqData = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        productIdList: ["FQD001"] //税云贷
      };
      if (this.value1 != "") {
        this.reqData.userName = this.value1;
      }
      if (this.value2 != "") {
        this.reqData.userTel = this.value2;
      }
      if (this.value3.text != "放款时间") {
        this.reqData.loanPayTimeBegin = this.value3.value;
        this.reqData.loanPayTimeEnd = this.value3.valueEnd;
      }
      if (this.value4.text != "借据状态") {
        this.reqData.status = this.value4.value;
      }
      console.log("借据列表请求报文=" + JSON.stringify(this.reqData));
      ajaxPostPlus(apiUrl.LoanList, this.reqData)
        .then(res => {
          this.error = false;
          this.total = res.total;
          if (this.refreshing) {
            this.refreshing = false;
          }
          if (isHasData(res.list)) {
            if (this.pageNum === "1") {
              this.list = res.list;
            } else {
              this.list.push(...res.list);
            }
            // 加载状态结束
            this.loading = false;
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
          console.log("借据列表" + JSON.stringify(this.list));
        })
        .catch(err => {
          this.loading = false;
          this.error = true;
          this.refreshing = false;
          this.$toast.clear();
          this.showNoMsg = true;
          this.tips = "网络请求错误~";
          console.log("借据请求错误" + JSON.stringify(err));
        });
    }
  }
};
</script>

<style  scoped>
.query_iou_list {
  font-size: 14px;
  padding-top: 46px;
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
.query_trem_div2 {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 6px;
}
.query_input_div {
  width: calc(50% - 8px);
  color: #bdbdbd;
  background: #f1f1f1;
  border: 1px solid #f1f1f1;
  border-radius: 5px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.query_term2 {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 14px;
  border-radius: 5px;
}
.query_term2_active {
  border: 1px solid #ff6619;
  color: #ff6619;
  background: #fef6ef;
  border-radius: 5px;
}
/*图片13*6*/
.img_select {
  margin-left: 5px;
  width: 9px;
}

/* 查询按钮 */
.btn_query_div {
  width: 89px;
  height: 120px;
  margin: 6px 0 0;
  position: relative;
}
.btn_query {
  width: 100%;
}
.btn_text {
  position: absolute;
  top: 68px;
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

/* 查询出的结果 */
.query_content {
  margin-top: 12px;
  min-height: calc(100vh - 227px - 12px);
}
</style>
