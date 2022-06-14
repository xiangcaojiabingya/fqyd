<template>
  <div class="queryDetail">
    <item-nav-bar :title="titleMap.title1" class="header"></item-nav-bar>
    <risk class="fx_risk" v-if="showRisk()" @click.native="goToRisk"></risk>
    <van-tabs
      v-model="active"
      line-width="50%"
      title-active-color="#ff6619"
      title-inactive-color="#737373"
      color="#ff6619"
      sticky
      :class="{ 'tab-padding': !showRisk(), 'tab-padding1': showRisk() }"
      :offset-top="showRisk() ? '90px' : '47px'"
      @change="change"
    >
      <van-tab :title="getTitle()" title-style="font-size:15px">
        <!-- 尽调详情 -->
        <div class="jindiao_div">
          <jin-diao-detail
            title="申请信息"
            v-if="type == 'sxcx' || type == 'sxjs'"
            href="Application"
            :flowId="flowId"
            :creditApplyId="creditApplyId"
            :currentNodeCode="currentNodeCode"
            :randomID="randomID"
            :id="id"
            flag="1"
          ></jin-diao-detail>
          <jin-diao-detail
            title="申请信息"
            v-if="type == 'zycx'"
            href="Application2"
            :loanApplyId="loanApplyId"
            :currentOperatorId="currentOperatorId"
            :flowId="flowId"
            :randomID="randomID"
            :id="id"
            flag="2"
          ></jin-diao-detail>
          <pull
            :isOk="false"
            v-if="
              (currentNodeCode == 'fh-manager' && type == 'sxcx') ||
              (currentNodeCode == 'fh-manager-one' && type == 'sxcx')
            "
            title="客户信息"
            text="请填写客户信息"
            :creditApplyId="creditApplyId"
            :flowId="flowId"
            :currentNodeTaskId="currentNodeTaskId"
            :randomID="randomID"
            href="SingleCustom"
            flag="1"
          ></pull>
          <jin-diao-detail
            v-else-if="type == 'sxcx' || type == 'sxjs'"
            title="客户信息"
            href="EntCustomers"
            :creditApplyId="creditApplyId"
            :flowId="flowId"
            :randomID="randomID"
            flag="1"
          ></jin-diao-detail>
          <jin-diao-detail
            v-else
            title="客户信息"
            href="LoanCustomer"
            :flowId="flowId"
            :randomID="randomID"
            :loanApplyId="loanApplyId"
            flag="2"
          ></jin-diao-detail>
          <pull
            :isOk="false"
            v-if="
              (currentNodeCode == 'fh-manager' && type == 'sxcx') ||
              (currentNodeCode == 'fh-manager-one' && type == 'sxcx')
            "
            title="房产信息"
            text="请填写房产信息"
            :creditApplyId="creditApplyId"
            :currentNodeTaskId="currentNodeTaskId"
            :flowId="flowId"
            href="RealEstate"
          ></pull>
          <jin-diao-detail
            v-else
            title="房产信息"
            :type="type"
            :currentNodeCode="currentNodeCode"
            :creditApplyId="creditApplyId"
            :loanApplyId="loanApplyId"
            href="RealEstateSpan"
            :flowId="flowId"
            flag="1"
            :randomID="randomID"
          ></jin-diao-detail>
          <jin-diao-detail
            title="历史授信信息"
            href="HistorySxList"
            type="sxcx"
            :certificateNo="certificateNo"
          ></jin-diao-detail>
          <jin-diao-detail
            title="历史支用信息"
            href="HistorySxList"
            type="zycx"
            :certificateNo="certificateNo"
          ></jin-diao-detail>
          <!-- <pull
            :isOk="false"
            v-if="
              type == 'sxjs' || 
              (type == 'zycx' || (currentNodeCode == 'fh-manager' && type == 'sxcx') || (currentNodeCode == 'fh-manager-one' && type == 'sxcx')) && type2 != '0'
            "
            title="影像资料"
            text="上传影像资料"
            :currentNodeTaskId="currentNodeTaskId"
            :flowId="flowId"
            href="JinDiaoImageUp"
          ></pull>-->
          <pull
            :isOk="false"
            v-if="
              type == 'sxjs' ||
              ((type == 'zycx' ||
                (currentNodeCode == 'fh-manager' && type == 'sxcx') ||
                (currentNodeCode == 'fh-manager-one' && type == 'sxcx')) &&
                type2 != '0')
            "
            title="影像资料"
            text="上传影像资料"
            href="AttachmentUpload"
            :currentNodeTaskId="currentNodeTaskId"
            :flowId="flowId"
            :randomID="randomID"
          ></pull>
          <pull
            :isOk="false"
            v-else-if="
              (type2 != '0' &&
                currentNodeCode == 'zh-managerypctl' &&
                type == 'sxcx') ||
              (currentNodeCode == 'fh-managerypctl' && type == 'sxcx')
            "
            title="合同资料"
            text="上传合同资料"
            :currentNodeTaskId="currentNodeTaskId"
            :flowId="flowId"
            :randomID="randomID"
            :isDirectSkip="false"
            @beforeSkip="beforeSkip"
          ></pull>
          <jin-diao-detail
            title="影像资料"
            href="ImageData"
            :type="type"
            :flowId="flowId"
            :flag="flag"
            :randomID="randomID"
            :loanApplyId="loanApplyId"
            v-else-if="
              (status == '02' && type == 'sxcx') ||
              (status == '06' && type == 'zycx')
            "
          ></jin-diao-detail>
          <!-- <jin-diao-detail
            title="第三方信息"
            href="ThiredPartyList"
            class="three_div"
          ></jin-diao-detail> -->
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
            :bottomType="type2"
          ></sp-record>
          <img
            src="@/assets/img/tg_icon.png"
            class="result_img"
            v-if="type2 == 0 && approveResult == '2'"
          />
          <img
            src="@/assets/img/yjj_icon.png"
            class="result_img"
            v-if="type2 == 0 && approveResult == '1'"
          />
        </div>
      </van-tab>
    </van-tabs>

    <!-- 授信结束 -->
    <div class="bottom_div" v-if="currentNodeCode == 'zh-consumer_manager'">
      <van-button
        round
        type="info"
        plain
        color="#ff6619"
        size="large"
        class="btn1"
        @click="rejectSpBtn"
        >拒绝</van-button
      >
      <van-button
        round
        type="info"
        color="#ff6619"
        size="large"
        class="next_btn"
        @click="commitSp"
        >同意</van-button
      >
    </div>

    <!-- 授信审批-业务调查阶段或授信审批-审批岗 -->
    <div
      class="bottom_div"
      v-if="
        (type == 'sxcx' && currentNodeCode == 'fh-manager') ||
        currentNodeCode == 'fh-shenpi'
      "
    >
      <van-button
        round
        plain
        type="info"
        color="#ff6619"
        size="large"
        class="btn1"
        @click="boHuiBtn"
        >驳回</van-button
      >
      <van-button
        round
        type="info"
        plain
        color="#ff6619"
        size="large"
        class="btn1"
        @click="rejectSpBtn"
        >拒绝</van-button
      >
      <van-button
        round
        type="info"
        color="#ff6619"
        size="large"
        class="next_btn"
        @click="commitSp"
        >同意</van-button
      >
    </div>

    <!-- 授信审批-审核岗或授信审批-合同复核 -->
    <div
      class="bottom_div"
      v-if="
        (type == 'sxcx' && currentNodeCode == 'fh-shencha') ||
        (type == 'sxcx' && currentNodeCode == 'fh-fuhe')
      "
    >
      <van-button
        round
        plain
        type="info"
        color="#ff6619"
        size="large"
        class="btn1"
        @click="boHuiBtn"
        >驳回</van-button
      >
      <van-button
        round
        type="info"
        color="#ff6619"
        size="large"
        class="next_btn"
        @click="commitSp"
        >同意</van-button
      >
    </div>

    <!-- 授信审批-合同签订 -->
    <div
      class="bottom_div"
      v-if="
        (type == 'sxcx' && currentNodeCode == 'zh-managerypctl') ||
        (type == 'sxcx' && currentNodeCode == 'fh-managerypctl') ||
        (type == 'zycx' && currentNodeCode == 'zh-shenpi') ||
        (currentNodeCode == 'fh-manager-one' && type == 'sxcx')
      "
    >
      <van-button
        round
        type="info"
        plain
        color="#ff6619"
        size="large"
        class="btn1"
        @click="rejectSpBtn"
        >拒绝</van-button
      >
      <van-button
        round
        type="info"
        color="#ff6619"
        size="large"
        class="next_btn"
        @click="commitSp"
        >同意</van-button
      >
    </div>

    <!-- 授信审批-额度生效 -->
    <div
      class="bottom_div"
      v-if="type == 'sxcx' && currentNodeCode == 'zh-managerypstore'"
    >
      <van-button
        round
        plain
        type="info"
        color="#ff6619"
        size="large"
        class="btn1"
        @click="boHuiBtn"
        >驳回</van-button
      >
      <van-button
        round
        type="info"
        color="#ff6619"
        size="large"
        class="next_btn"
        @click="edEffectiveBtn"
        >额度生效</van-button
      >
    </div>

    <!-- 支用审批-支用审批 -->
    <div
      class="bottom_div"
      v-if="type == 'zycx' && currentNodeCode == 'fh-fuhe'"
    >
      <van-button
        round
        plain
        type="info"
        color="#ff6619"
        size="large"
        class="btn1"
        @click="boHuiBtn"
        >驳回</van-button
      >
      <van-button
        round
        type="info"
        plain
        color="#ff6619"
        size="large"
        class="btn1"
        @click="rejectSpBtn"
        >拒绝</van-button
      >
      <van-button
        round
        type="info"
        color="#ff6619"
        size="large"
        class="next_btn"
        @click="commitSp"
        >确认放款</van-button
      >
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
import { isHasData, findElem } from "@/utils/index.js";
export default {
  components: { Risk, JinDiaoDetail, Pull, SpRecord, ItemNavBar },
  name: "QueryDetail",
  data() {
    return {
      randomID: "id" + new Date(), //随机的id,用于刷新页面
      titleMap: {
        title1: this.$route.query.title, //标题显示
      },
      type: this.$route.query.type, //判断是支用还是授信还是授信结束
      type2: this.$route.query.type2, //判断是查询、审批、尽调进入详情页面
      stageType: this.$route.query.stageType, //判断是授信审批-业务调查阶段还是其他审批阶段 1是调查阶段,2是审批岗 3是合同签订 4是合同符合 5是额度生效
      certificateNo: this.$route.query.certificateNo,
      creditApplyId: this.$route.query.applyId,
      loanApplyId: this.$route.query.loanApplyId,
      orderContentData: {},
      city: "",
      pageNum: "1",
      pageSize: "10",
      outCltId: "",
      ownerList: [],
      limitsNum: "",
      approveResult: "", //审批结果
      currentNodeTaskId: this.$route.query.currentNodeTaskId,
      currentNodeCode: this.$route.query.currentNodeCode,
      currentNodeName: this.$route.query.currentNodeName,
      currentOperatorName: this.$route.query.currentOperatorName,
      id: this.$route.query.id,
      status: this.$route.query.status,
      img: require("@/assets/img/delete_icon.png"),
      active: 0,
      detailRecord: "",
      flowId: "",
      riskList: [],
      tabTitle: "支用详情",
      custMgrId: "", //客户经理编号
      custMgrName: "",
      organId: "",
      organName: "",
      orderContent: "",
      orderOther: "",
      orderAttachment: "",
      relationPeople: [], //关联人信息
      flag: "", //影像资料跳转的标志：1授信2支用，5客户查询
      permissionData: {},
    };
  },
  mounted() {
    if (
      this.currentNodeCode == "fh-manager" ||
      this.currentNodeCode == "fh-manager-one"
    ) {
      this.getList();
    }
    if (this.type2 == "0") {
      console.log("vvvvvvvvvvvvvvvvv");
      this.getFlowId();
    } else {
      this.flowId = this.$route.query.flowId;
      this.getData();
    }
    console.log("---传参query-----------", JSON.stringify(this.$route.query));
    if (this.$route.query.currentNodeName != null) {
      if (this.$route.query.currentNodeName.indexOf("客户经理") != -1) {
        this.titleMap.title1 = this.$route.query.currentNodeName.substr(6);
      } else {
        this.titleMap.title1 = this.$route.query.currentNodeName.substr(17);
      }
    }
    if (this.type == "sxcx") {
      this.flag = "1";
    } else if (this.type == "zycx") {
      this.flag = "2";
    }
    //缓存tab点击，是在详情还是记录
    this.detailRecord = localStorage.getItem("detail-record");
    if (this.detailRecord == "record") {
      this.active = 0;
    } else if (this.detailRecord == "detail") {
      this.active = 1;
    } else {
      this.active = 0;
    }
    //授信结束节点没有风险提示
    if (this.type != "sxjs") {
      this.getRiskInfo(); //风险提示请求数据
    }
  },
  methods: {
    getTitle() {
      if (this.type == "sxcx" || this.type == "sxjs") {
        this.tabTitle = "授信详情";
      }
      return this.tabTitle;
    },
    getFlowId() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      if (this.type == "sxcx") {
        this.permissionData = {
          applyId: this.creditApplyId,
          id: this.id,
        };
      } else if (this.type == "zycx") {
        this.permissionData = {
          applyId: this.loanApplyId,
          id: this.id,
        };
      }
      console.log(
        "-----queryApprovalResultWithoutPermission请求参数-----" +
          JSON.stringify(this.permissionData)
      );
      ajaxPostPlus(
        apiUrl.queryApprovalResultWithoutPermission,
        this.permissionData
      )
        .then((res) => {
          try {
            res.applyList.list.forEach((element) => {
              localStorage.setItem("flowId", element.flowId);
              this.flowId = localStorage.getItem("flowId");

              // this.flowId = element.flowId;
              console.log("gggggggggggggg" + this.flowId);
              this.approveResult = element.approveResult; //审批结果
            });
            this.getData();
          } catch (error) {
            this.$toast("获取数据失败");
            console.log("error = " + error.message);
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
    //判断风险提示信息那一栏是否展示
    showRisk() {
      let isShow = false;
      if (this.riskList != null && this.riskList.length > 0) {
        isShow = true;
      } else {
        isShow = false;
      }
      return isShow;
    },
    //监听tab的改变
    change(name, title) {
      if (name == 0) {
        localStorage.setItem("detail-record", "record");
      } else if (name == 1) {
        localStorage.setItem("detail-record", "detail");
      }
    },

    //审批驳回
    boHuiBtn() {
      if (this.type == "sxcx") {
        this.$router.push({
          path: "/shenpiRefuse", // 驳回原因及备注
          query: {
            flowId: this.flowId,
            currentNodeTaskId: this.$route.query.currentNodeTaskId,
          },
        });
      } else if (this.type == "zycx") {
        this.$router.push({
          path: "/shenpiRefuse",
          query: {
            flowId: this.flowId,
            currentNodeTaskId: this.$route.query.currentNodeTaskId,
          },
        });
      }
    },
    //审批拒绝
    rejectSpBtn() {
      if (
        this.currentNodeCode == "zh-consumer_manager" ||
        (this.type == "zycx" && this.currentNodeCode == "zh-shenpi") ||
        (this.type == "zycx" && this.currentNodeCode == "fh-fuhe") ||
        this.type == "sxjs"
      ) {
        this.$router.push({
          path: "/ApproveResultReject", // 拒绝吗
          query: {
            flowId: this.flowId,
            currentNodeTaskId: this.$route.query.currentNodeTaskId,
          },
        });
      } else if (
        this.currentNodeCode == "fh-manager" ||
        this.currentNodeCode == "fh-manager-one" ||
        this.currentNodeCode == "fh-shenpi" ||
        this.currentNodeCode == "zh-managerypctl" ||
        this.currentNodeCode == "fh-managerypctl" ||
        this.currentNodeCode == "fh-shencha"
      ) {
        this.$router.push({
          path: "/TuneRefuse", // 拒绝原因
          query: {
            flowId: this.flowId,
            currentNodeTaskId: this.$route.query.currentNodeTaskId,
          },
        });
      }
    },
    //审批提交-同意
    commitSp() {
      if (
        (this.type == "zycx" && this.currentNodeCode == "fh-fuhe") ||
        this.currentNodeCode == "zh-shenpi"
      ) {
        this.$router.push({
          path: "/ResultsOf", // 房产状态
          query: {
            item: this.$route.query.item,
            flag: "sp",
            flowId: this.flowId,
            applyAmount: this.$route.query.applyAmount,
            applyPeriod: this.$route.query.applyPeriod,
            currentNodeTaskId: this.$route.query.currentNodeTaskId,
            processId: this.$route.query.processId,
            loanApplyId: this.$route.query.applyId,
            type: this.type,
            applyId: this.$route.query.applyIdapplyId,
            currentNodeCode: this.currentNodeCode,
          },
        });
      } else if (
        this.currentNodeCode == "fh-shenpi" ||
        this.currentNodeCode == "fh-shencha" //授信审批/授信审查
      ) {
        this.$router.push({
          path: "/ApprovalSubmitComplex", //抵质押物
          query: {
            flag: "sp",
            item: this.$route.query.item,
            flowId: this.flowId,
            creditApplyId: this.$route.query.applyId,
            applyAmount: this.$route.query.applyAmount,
            applyPeriod: this.$route.query.applyPeriod,
            currentNodeTaskId: this.$route.query.currentNodeTaskId,
            processId: this.$route.query.processId,
            applyId: this.$route.query.applyIdapplyId,
            currentNodeCode: this.currentNodeCode,
            creditApplyId: this.creditApplyId,
            custMgrId: this.custMgrId, //当前客户经理
          },
        });
      } else if (
        this.currentNodeCode == "fh-manager" ||
        this.currentNodeCode == "fh-manager-one" //客户经理补录
      ) {
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 0,
        });
        ajaxPostPlus(apiUrl.productInformationSelectPage, {
          creditApplyId: this.$route.query.applyId,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        })
          .then((res) => {
            res.list.forEach((element) => {
              this.outCltId = element.outCltId;
            });
            this.$toast.clear();
            if (this.outCltId == "" || this.outCltId == null) {
              this.$toast("请先去推送风险缓释");
            } else if (this.outCltId != "" && this.outCltId != null) {
              this.$toast.loading({
                message: "加载中...",
                forbidClick: true,
                loadingType: "spinner",
                duration: 0,
              });
              ajaxPostPlus(apiUrl.valueinfoQuery, {
                creditApplyId: this.$route.query.applyId,
              })
                .then((res) => {
                  this.limitsNum = res.evaVal;
                  console.log(
                    "ccccccccccccccccccccccccccccccccccc" + this.limitsNum
                  );
                  this.$toast.clear();
                  if (this.limitsNum != "" && this.limitsNum != null) {
                    {
                      this.$router.push({
                        path: "/ApprovalSubmitComplex", //抵质押物
                        query: {
                          flag: "jd",
                          item: this.$route.query.item,
                          flowId: this.flowId,
                          applyAmount: this.$route.query.applyAmount,
                          applyPeriod: this.$route.query.applyPeriod,
                          currentNodeTaskId:
                            this.$route.query.currentNodeTaskId,
                          processId: this.$route.query.processId,
                          applyId: this.$route.query.applyIdapplyId,
                          currentNodeCode: this.currentNodeCode,
                          creditApplyId: this.creditApplyId,
                        },
                      });
                    }
                  } else {
                  }
                })
                .catch((err) => {
                  this.$toast.clear();
                  console.log("请求错误" + JSON.stringify(err));
                });
            }
            //  else if (
            //   this.outCltId != "" &&
            //   this.outCltId != null &&
            //   this.limitsNum != "" &&
            //   this.limitsNum != null
            // ) {
            //   this.$router.push({
            //     path: "/ApprovalSubmitComplex", //抵质押物
            //     query: {
            //       flag: "jd",
            //       item: this.$route.query.item,
            //       flowId: this.flowId,
            //       applyAmount: this.$route.query.applyAmount,
            //       applyPeriod: this.$route.query.applyPeriod,
            //       currentNodeTaskId: this.$route.query.currentNodeTaskId,
            //       processId: this.$route.query.processId,
            //       applyId: this.$route.query.applyIdapplyId,
            //       currentNodeCode: this.currentNodeCode,
            //       creditApplyId: this.creditApplyId,
            //     },
            //   });
            // }
          })
          .catch((err) => {
            this.$toast.clear();
            console.log("请求错误" + JSON.stringify(err));
          });
      } else if (this.currentNodeCode == "zh-shenpi" || this.type == "sxjs") {
        this.$router.push({
          path: "/ApprovalSubmitEasy", // 审批意见
          query: {
            type: this.type,
            item: this.$route.query.item,
            flowId: this.flowId,
            applyAmount: this.$route.query.applyAmount,
            applyPeriod: this.$route.query.applyPeriod,
            currentNodeTaskId: this.$route.query.currentNodeTaskId,
            processId: this.$route.query.processId,
            applyId: this.$route.query.applyIdapplyId,
            currentNodeCode: this.currentNodeCode,
          },
        });
      } else if (this.type == "sxcx" && this.currentNodeCode == "fh-fuhe") {
        //授信合同复核
        this.$toast.loading({
          message: "加载中...",
          forbidClick: true,
          loadingType: "spinner",
          duration: 0,
        });
        ajaxPostPlus(apiUrl.CreditApplicationDetails, {
          creditApplyId: this.creditApplyId,
        })
          .then((res) => {
            this.custMgrId = res.custMgrEmpNo;
            this.custMgrName = res.custMgrName;
            this.organId = res.ownOrganId;
            this.organName = res.organName;
            this.$router.push({
              path: "/ApprovalSubmitEasy", // 审批意见
              query: {
                type: this.type,
                item: this.$route.query.item,
                flowId: this.flowId,
                applyAmount: this.$route.query.applyAmount,
                applyPeriod: this.$route.query.applyPeriod,
                currentNodeTaskId: this.$route.query.currentNodeTaskId,
                processId: this.$route.query.processId,
                applyId: this.$route.query.applyIdapplyId,
                currentNodeCode: this.currentNodeCode,
                custMgrId: this.custMgrId,
                custMgrName: this.custMgrName,
                organId: this.organId,
                organName: this.organName,
                orderContent: this.orderContent,
              },
            });
          })
          .catch((err) => {
            console.log(" 请求错误" + JSON.stringify(err));
            this.$toast.clear();
          });
      } else if (
        (this.type == "sxcx" && this.currentNodeCode == "zh-managerypctl") ||
        (this.type == "sxcx" && this.currentNodeCode == "fh-managerypctl")
      ) {
        //客户经理签合同
        //合同签订
        let netWorkImgData = []; //影像资料
        if (this.orderAttachment != null) {
          netWorkImgData = JSON.parse(this.orderAttachment);
        }
        if (findElem(netWorkImgData, "fileKind", "400") == -1) {
          this.$toast("请上传“最高额债权合同”");
          return;
        } else if (findElem(netWorkImgData, "fileKind", "401") == -1) {
          this.$toast("请上传“本金最高额抵押合同”");
          return;
        }
        //关联人信息有保证人【03保证人/04抵押人+保证人】必须上传保证合同
        let ordertemp = JSON.parse(this.orderContent);
        if (isHasData(ordertemp.fq_dataSource)) {
          this.relationPeople = JSON.parse(ordertemp.fq_dataSource);
          if (
            findElem(this.relationPeople, "connPersonType", "03") != -1 ||
            findElem(this.relationPeople, "connPersonType", "04") != -1
          ) {
            if (findElem(netWorkImgData, "fileKind", "402") == -1) {
              this.$toast("请上传“本金最高额保证合同”");
              return;
            }
          }
        }
        this.$router.push({
          path: "/ApprovalSubmitEasy", // 审批意见
          query: {
            item: this.$route.query.item,
            flowId: this.flowId,
            applyAmount: this.$route.query.applyAmount,
            applyPeriod: this.$route.query.applyPeriod,
            currentNodeTaskId: this.$route.query.currentNodeTaskId,
            processId: this.$route.query.processId,
            applyId: this.$route.query.applyIdapplyId,
            currentNodeCode: this.currentNodeCode,
          },
        });
      }
    },
    // 审批额度生效
    edEffectiveBtn() {
      this.$toast.loading({
        duration: 0, // 持续展示 this.$toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      var query = {
        creditApplyId: this.creditApplyId,
      };
      ajaxPostPlus(apiUrl.warrantQuery, query)
        .then((res) => {
          if (res == null) {
            this.$toast("押品没入库");
          } else {
            // 额度生效
            var requestData = {
              flowIdList: [this.flowId], //	流程编号List<String>
              fraudPost: "0",
              orderAttachment: this.orderAttachment, //进件附件
              orderOther: this.orderOther,
              orderContent: this.orderContent, //进件详情
              reply: "2", //审批结果 通过
              orderId: this.flowId, //工作流编号
              taskId: this.currentNodeTaskId, //	任务编号
            };
            console.log("dddddddddddddddddd" + JSON.stringify(requestData));
            ajaxPostPlus(apiUrl.submit, requestData)
              .then((res) => {
                this.$toast.clear();
                //{"responseType":"HSJRY_SUCCESS","data":null,"httpStatus":200,"errorMessage":null,"errorCode":null,"rpcResult":"000000","parentIdemSerialId":null}
                this.$toast("审批成功");
                localStorage.removeItem("estateUse"); //移除缓存
                setTimeout(() => {
                  this.$router.go(-2);
                }, 500);
              })
              .catch((err) => {
                this.$toast.clear();
                this.$toast("审批失败");
              });
          }
        })
        .catch((error) => {
          this.$toast.clear();
        });
    },
    //尽调拒绝
    rejectJdBtn() {
      this.$router.push({
        path: "/ApproveResultReject",
        query: {
          item: this.$route.query.item,
          flowId: this.flowId,
          applyAmount: this.$route.query.applyAmount,
          applyPeriod: this.$route.query.applyPeriod,
          currentNodeTaskId: this.$route.query.currentNodeTaskId,
          processId: this.$route.query.processId,
          applyId: this.$route.query.applyIdapplyId,
        },
      });
    },
    //获取风险提示
    getRiskInfo() {
      let query = {};
      if (this.type == "sxcx") {
        query = {
          applyId: this.creditApplyId,
          bizType: "SX",
        };
      } else if (this.type == "zycx") {
        query = {
          applyId: this.loanApplyId,
          bizType: "ZY",
        };
      }
      ajaxPostPlus(apiUrl.queryRiskDecisionResult, query)
        .then((result) => {
          if (result) {
            this.riskList = result.riskRuleDtoList;
          } else {
            this.riskList = [];
          }
        })
        .catch((error) => {});
    },
    //点击跳转到风险提示页面
    goToRisk() {
      var query = {};
      if (this.type == "sxcx") {
        query = {
          applyId: this.creditApplyId,
          bizType: "SX",
        };
      } else if (this.type == "zycx") {
        query = {
          applyId: this.creditApplyId,
          bizType: "ZY",
        };
      }
      this.$router.push({
        path: "/RiskWarning",
        query: query,
      });
    },
    getData() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      ajaxPostPlus(apiUrl.queryOrderContent, {
        flowId: this.flowId,
      })
        .then((res) => {
          try {
            this.orderAttachment = res.orderAttachment;
            this.orderOther = res.orderOther;
            this.orderContent = res.orderContent;
            this.custMgrId = JSON.parse(this.orderContent).manageId;
          } catch (error) {
            this.$toast("获取数据失败");
            console.log("error = " + error.message);
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
    //上传合同跳转之前的逻辑处理
    beforeSkip() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });
      var requestData = {
        contractType: ["30", "31", "22", "32"], //30=最高额债权合同，31=最高额抵押合同，22=最高额保证合同，32=同意抵押声明
        productId: "FQD001",
        relationId: this.creditApplyId, //授信id
        relationIdType: "credit",
      };
      ajaxPostPlus(apiUrl.queryContractFileInfo, requestData)
        .then((res) => {
          this.$toast.clear();
          //3个合同的情况：没有保证人时没有保证合同
          if (
            res != null &&
            res.contractParam != null &&
            res.contractParam.length >= 3
          ) {
            this.$router.push({
              path: "/DataUploadNew",
              query: {
                flowId: this.flowId,
                creditApplyId: this.creditApplyId,
                currentNodeTaskId: this.currentNodeTaskId,
                type: this.type,
                randomID: this.randomID, //用于页面缓存时，进入页面刷新页面的随机id
              },
            });
          } else {
            this.$toast("请先到电脑生成合同");
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
    getList() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });

      ajaxPostPlus(apiUrl.queryEstateInfoByCreditApplyId, {
        creditApplyId: this.creditApplyId,
      })
        .then((res) => {
          try {
            localStorage.setItem("startTime", res.propertyEndTime);
          } catch (error) {
            this.$toast("获取数据失败");
            console.log("error = " + error.message);
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
  },
  computed: {},
};
</script>

<style scoped>
.queryDetail {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
/*
.three_div {
  margin-top: 12px;
}
*/
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
.tab-padding1 {
  padding-top: 89px;
}
</style>