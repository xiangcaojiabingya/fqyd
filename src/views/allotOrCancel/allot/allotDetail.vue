<template>
  <div class="queryDetail">
    <item-nav-bar :title="titleMap.title1" class="header"></item-nav-bar>
    <van-tabs
      v-model="active"
      line-width="50%"
      title-active-color="#ff6619"
      title-inactive-color="#737373"
      color="#ff6619"
      sticky
      @change="change"
      class="tab-padding"
    >
      <van-tab title="业务详情" title-style="font-size:15px">
        <!-- 业务详情 -->
        <div class="jindiao_div">
          <jin-diao-detail
            title="申请信息"
            href="Application"
            :flowId="flowId"
            :creditApplyId="creditApplyId"
            :currentNodeCode="currentNodeCode"
            :randomID="randomID"
            flag="1"
          ></jin-diao-detail>
          <jin-diao-detail
            title="个人客户信息"
            href="EntCustomers"
            :flowId="flowId"
            :creditApplyId="creditApplyId"
            :currentNodeCode="currentNodeCode"
            :randomID="randomID"
            flag="1"
          ></jin-diao-detail>
        </div>
      </van-tab>
      <van-tab title="审批记录" title-style="font-size:15px">
        <!-- 审批记录 -->
        <div class="record_div">
          <sp-record
            :currentNodeName="currentNodeName"
            :currentOperatorName="currentOperatorName"
            :currentNodeCode="currentNodeCode"
            :orderId="flowId"
          ></sp-record>
          <!-- <img
            src="@/assets/img/tg_icon.png"
            class="result_img"
            v-if="type2 == 0 && approveResult == '2'"
          />
          <img
            src="@/assets/img/yjj_icon.png"
            class="result_img"
            v-if="type2 == 0 && approveResult == '1'"
          /> -->
        </div>
      </van-tab>
    </van-tabs>

    <div class="bottom_div">
      <van-button
        round
        plain
        type="info"
        color="#ff6619"
        size="large"
        class="btn1"
        @click="fpjl"
      >分配客户经理</van-button>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import Pull from "@/components/module/Pull.vue";
import Risk from "@/components/module/Risk.vue";
import JinDiaoDetail from "@/components/common/JinDiaoDetail.vue";
import SpRecord from "@/components/common/SpRecord.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
export default {
  components: { Risk, JinDiaoDetail, Pull, SpRecord, ItemNavBar },
  name: "QueryDetail",
  data() {
    return {
      randomID: "id" + new Date(), //随机的id,用于刷新页面
      titleMap: {
        title1: this.$route.query.title //标题显示
      },
      certificateNo: this.$route.query.certificateNo,
      currentNodeCode: this.$route.query.currentNodeCode,
      creditApplyId: this.$route.query.applyId,
      processId:this.$route.query.processId,
      taskId:this.$route.query.currentNodeTaskId,
      currentNodeTaskId: this.$route.query.currentNodeTaskId,
      currentNodeCode: this.$route.query.currentNodeCode,
      currentNodeName: this.$route.query.currentNodeName,
      currentOperatorName: this.$route.query.currentOperatorName,
      img: require("@/assets/img/delete_icon.png"),
      active: 0,
      detailRecord: "",
      flowId: this.$route.query.flowId,
      riskList: [],
      tabTitle: "审批详情",
      empNo:'',
      orgId:'',


    };
  },
  mounted() {
    this.detailRecord = localStorage.getItem("detail-record");
    if (this.detailRecord == "record") {
      this.active = 0;
    } else if (this.detailRecord == "detail") {
      this.active = 1;
    } else {
      this.active = 0;
    }
    this.getData();
  },
  methods: {
    //监听tab的改变
    change(name, title) {
      if (name == 0) {
        localStorage.setItem("detail-record", "record");
      } else if (name == 1) {
        localStorage.setItem("detail-record", "detail");
      }
    },
    fpjl() {
      this.$router.push({
        path: "/allotPeople",
        query: {
          empNo:this.empNo,
          orgId:this.orgId,
          applyId:this.creditApplyId,
          processId:this.processId,
          taskId:this.taskId,
          flowId:this.flowId,
        }
      });
    },
    getData() {
      let orderContent={};
      ajaxPostPlus(apiUrl.queryOrderContent, {
        flowId: this.flowId,
      })
      .then((res) => {
        try {
          console.log('---------------业务分配1-------',res.orderContent)
          orderContent=JSON.parse(res.orderContent)          
          this.empNo = orderContent.recommendOperateId;
          this.orgId = orderContent.orgId;
        } catch (error) {
          this.$toast("获取数据失败");
        }
        this.$toast.clear();
      })
      .catch((err) => {
        this.$toast.clear();
        console.log("请求错误" + JSON.stringify(err));
      });
      // let intoDetail={};
      // ajaxPostPlus(apiUrl.CreditApplicationDetails, {
      //   creditApplyId: this.creditApplyId,
      // })
      // .then((res) => {
      //   try {
      //     console.log('---------------业务分配-------',JSON.stringify(res))
      //     intoDetail=JSON.parse(res.intoDetail)
      //     this.empNo = intoDetail.recommendOperateId;
      //   } catch (error) {
      //     this.$toast("获取数据失败");
      //   }
      //   this.$toast.clear();
      // })
      // .catch((err) => {
      //   this.$toast.clear();
      //   console.log("请求错误" + JSON.stringify(err));
      // });
   },
  },
  computed: {}
};
</script>

<style scoped>
.queryDetail {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
.three_div {
  margin-top: 12px;
}
.btn1 {
  margin-right: 12px;
  height: 40px;
}
.next_btn {
  height: 40px;
}

/* 审批记录 */
.record_div {
  width: 100%;
  /* padding-top: 90px; */
  padding-bottom: 40px;
}
.record_div1 {
  width: 100%;
  padding-top: 46px;
  padding-bottom: 40px;
}
/* 审批详情 */
.jindiao_div {
  width: 100%;
  padding-top: 13px;
  /* padding-top: 103px; */
  padding-bottom: 80px;
  background-color: var(--color-Lightgray-bg);
}
.jindiao_div1 {
  width: 100%;
  padding-top: 59px;
  padding-bottom: 80px;
  background-color: var(--color-Lightgray-bg);
}
.header {
  z-index: 99;
}
.fx_risk {
  margin-top: 46px;
  position: fixed;
  left: 0;
  top: 0px;
  z-index: 99;
}
.bottom_div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: fixed;
  z-index: 99;
  left: 0;
  bottom: 20px;
  box-sizing: border-box;
  padding: 0 12px;
  z-index: 9;
}
.result_img {
  position: fixed;
  right: 15px;
  top: 140px;
  z-index: 99;
  width: 80px;
}
.tab-padding {
  padding-top: 46px;
}
</style>