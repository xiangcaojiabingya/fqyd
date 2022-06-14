<template>
  <!-- 个人客户信息 -->
  <div class="main">
    <item-nav-bar :title="title" :rightSet="rightSet" @onClickRight="onClickRight"></item-nav-bar>
    <div class="single_custom">
      <div class="content">
        <div class="title">
          <div class="left"></div>
          <div class="top">基本信息</div>
        </div>
        <div v-for="(item, index) in demoData" :key="index" class="margin_style">
          <single-line-item :label="item.label" :value="item.value"></single-line-item>
        </div>
        <input-assemble v-model="orderContentTemp.fq_liveAddress" label="居住地址" :necessary="true"></input-assemble>
        <item-picker
          title="婚姻状况"
          pickerTitle="婚姻状况"
          :necessary="true"
          :columns="dictItemMap.marriage_status"
          :currentValue="orderContentTemp.fq_marriageStatus"
          @change="change"
        />
        <item-picker
          title="最高学历"
          pickerTitle="最高学历"
          :necessary="true"
          :columns="dictItemMap.edu_level"
          :currentValue="orderContentTemp.fq_highestEducation"
          @change="change"
        />
        <item-picker
          title="最高学位"
          pickerTitle="最高学位"
          :necessary="true"
          :columns="dictItemMap.degree"
          :currentValue="orderContentTemp.fq_highestDegree"
          @change="change"
        />
        <input-assemble v-model="orderContentTemp.fq_workName" label="工作单位" :necessary="true"></input-assemble>
        <item-picker
          title="单位所属行业"
          pickerTitle="单位所属行业"
          :necessary="true"
          :columns="dictItemMap.industry_type"
          :currentValue="orderContentTemp.fq_occupation"
          @change="change"
        />
        <item-picker
          title="职业"
          pickerTitle="职业"
          :necessary="true"
          :columns="dictItemMap.occupation"
          :currentValue="orderContentTemp.fq_vocationCode"
          @change="change"
        ></item-picker>
        <item-picker
          title="职务"
          pickerTitle="职务"
          :necessary="true"
          :columns="dictItemMap.headShip"
          :currentValue="orderContentTemp.fq_position"
          @change="change"
        ></item-picker>
        <input-assemble
          v-model="orderContentTemp.fq_workAddrAddress"
          v-resetPage
          label="单位地址"
          :necessary="false"
        ></input-assemble>
        <input-assemble
          v-model="orderContentTemp.fq_workPhone"
          maxlength="16"
          v-resetPage
          label="单位电话"
          :necessary="false"
        ></input-assemble>
        <item-picker
          title="通讯/送达地址"
          pickerTitle="通讯/送达地址"
          :necessary="true"
          :columns="dictItemMap.mailAddressCode"
          :currentValue="orderContentTemp.fq_mailAddress"
          @change="change"
        ></item-picker>
        <input-assemble
          v-model="orderContentTemp.fq_mailAddressCode"
          maxlength="6"
          v-resetPage
          label="通讯/送达地址邮编"
          :necessary="true"
        ></input-assemble>
      </div>
      <div class="content">
        <div class="title">
          <div class="left"></div>
          <div class="top">关联人信息</div>
        </div>
        <div class="relevance_assemble">
          <personal-info-right
            v-for="(item, index) in personalInfo"
            :key="index"
            :position="index"
            :itemInfo="item"
            :rightShow="'2'"
            :isShowLine="index == personalInfo.length - 1 ? false : true"
            @itemClick="personalItemClick(index)"
          ></personal-info-right>
        </div>
      </div>

      <!-- 按钮 -->
      <div class="btn">
        <button class="save primary" @click="submit('save')">保存</button>
        <button class="next primary" @click="submit('next')">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue"; // 引入页面标题
import SingleLineItem from "@/components/common/SingleLineItem.vue"; // 引入基础信息组件
import InputAssemble from "@/components/common/InputAssemble.vue"; // 引入输入组件
import PersonalInfoRight from "@/components/common/PersonalInfoRight.vue"; // 引入关联人组件
import ItemPicker from "@/views/Result/components/ItemPicker.vue"; // 引入选择器组件
import { apiUrl, ajaxPostPlus } from "@/api.js";
import { codeToValue } from "@/utils/index.js"; //数据字典码值转换
import eventBus from "@/utils/eventBus.js";
export default {
  name: "SingleCustom",
  components: {
    ItemNavBar,
    SingleLineItem,
    InputAssemble,
    PersonalInfoRight,
    ItemPicker,
  },
  props: {},
  data() {
    return {
      title: "个人客户信息",
      rightSet: "rightSet",
      panel: "ywdc", // 当前流程
      type: 2, // 判断当前审批阶段
      managerId: "",
      demoData: [
        // 个人客户信息基础信息-不可修改部分
        { label: "核心客户号", value: "" },
        { label: "客户类型", value: "" },
        { label: "客户子类型", value: "" },
        { label: "客户姓名", value: "" },
        { label: "证件类型", value: "" },
        { label: "证件号码", value: "" },
        { label: "出生日期", value: "" },
        { label: "性别", value: "" },
        { label: "证件有效期", value: "" },
        { label: "手机号码", value: "" },
        { label: "民族", value: "" },
        { label: "户籍地址", value: "" },
      ],
      orderContentData: {}, //网络请求结果
      orderContentTemp: {},
      contacts: [], //关联人信息
      personalInfo: [], //关联人信息-展示部分
      //个人客户信息接口数据
      caDetail: {
        userName: "--",
        certificateNo: "--",
        userTel: "--",
      },
      //个人客户信息接口-详情数据
      intoDetail: {
        coreCustId: "--",
        birthday: "--",
      },

      //数据字典
      dictKeys: [
        "certificate_type", //证件类型
        "gender", // 性别
        "marriage_status", // 婚姻状况
        "user_type", //客户类型
        "customerSubType", //客户子类型
        "edu_level", //最高学历
        "degree", //最高学位
        "industry_type", //单位所属行业
        "headShip", //职务
        "occupation", //职业
        "nation", // 民族
        "loan_relation_type", // 关系类型,与借款人关系
        "conn_person_type", // 关联人类型
        "mailAddressCode", //通讯/送达地址
      ],
      dictItemMap: {},
      creditApplyId: this.$route.query.creditApplyId,
      flowId: this.$route.query.flowId,
      //房产信息推送接口所需信息
      pullData: {},
      ownerList: [], //推送提交信息-抵质押列表
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 跳转到影像资料页面
    onClickRight() {
      this.$router.push({
        name: "ImageData",
        params: {
          flag: "1", //标志
          creditApplyId: this.loanApplyId,
          flowId: this.flowId,
          loanApplyId: this.loanApplyId,
        },
      });
    },

    change(value) {
      switch (value.dictKey) {
        case "marriage_status": //婚姻状态
          this.orderContentTemp.marriageStatus = value.itemKey;
          break;
        case "edu_level": //最高学历
          this.orderContentTemp.fq_highestEducation = value.itemKey;
          break;
        case "degree": //最高学位
          this.orderContentTemp.fq_highestDegree = value.itemKey;
          break;
        case "industry_type": //单位所属行业
          this.orderContentTemp.fq_occupation = value.itemKey;
          break;
        case "headShip": //职务
          this.orderContentTemp.fq_position = value.itemKey;
          break;
        case "occupation": //职业
          this.orderContentTemp.fq_vocationCode = value.itemKey;
          break;
        case "mailAddressCode": //通讯/送达地址
          this.orderContentTemp.fq_mailAddress = value.itemKey;
          break;
      }
    },
    //查询数据字典
    getDictionary() {
      var reqBody = {
        dictKeys: this.dictKeys,
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, reqBody)
        .then((res) => {
          try {
            this.dictItemMap = res.dictItemMap;
            this.getData();
          } catch (error) {
            this.$toast("获取数据失败");
            this.$toast.clear();
          }
        })
        .catch((res) => {
          this.$toast.clear();
        });
    },
    // 获取类型、类别
    getKindType(code, list) {
      let str = "";
      if (list.length == 0) {
        this.getDictionary();
        return;
      } else {
        str = codeToValue(list, code);
      }
      return str;
    },
    getData() {
      ajaxPostPlus(apiUrl.queryOrderContent, {
        flowId: this.flowId,
      })
        .then((res) => {
          this.$toast.clear();
          this.orderContentData = res;
          this.orderContentTemp = JSON.parse(res.orderContent);
          if (this.orderContentTemp.fq_dataSource != null) {
            this.contacts = JSON.parse(this.orderContentTemp.fq_dataSource);
          }
          if (this.contacts != null && this.contacts.length > 0) {
            this.contacts.forEach((item) => {
              this.personalInfo.push({
                name: item.name,
                connPersonType: this.getKindType(
                  item.connPersonType,
                  this.dictItemMap.conn_person_type
                ),
                idType: this.getKindType(
                  item.certificateType,
                  this.dictItemMap.certificate_type
                ),
                idCard: item.certificateNo, //身份证号码
                phoneNum: item.mobileNo, //手机号码
              });
              //推送提交信息-抵质押列表
              this.ownerList.push({
                name: item.name,
                certificateType: item.certificateType,
                certificateNo: item.certificateNo,
                connPersonType: item.connPersonType,
              });
            });
          }
          // if (this.orderContentTemp.coreCustId != null) {
          this.demoData = [
            // 个人客户信息基础信息-不可修改部分
            { label: "核心客户号", value: this.orderContentTemp.coreCustId },
            {
              label: "客户类型",
              value: this.getKindType(
                this.orderContentTemp.userType,
                this.dictItemMap.user_type
              ),
            },
            {
              label: "客户子类型",
              value: this.getKindType(
                "0302010",
                this.dictItemMap.customerSubType
              ),
            },
            {
              label: "客户姓名",
              value: this.orderContentTemp.userName,
            },
            {
              label: "证件类型",
              value: this.getKindType(
                this.orderContentTemp.certificateKind,
                this.dictItemMap.certificate_type
              ),
            },
            {
              label: "证件号码",
              value: this.orderContentTemp.certificateNo,
            },
            { label: "出生日期", value: this.orderContentTemp.birthday },
            {
              label: "性别",
              value: this.getKindType(
                this.orderContentTemp.gender,
                this.dictItemMap.gender
              ),
            },
            { label: "证件有效期", value: this.orderContentTemp.invalidDate },
            {
              label: "手机号码",
              value: this.orderContentTemp.mobileNo,
            },
            {
              label: "民族",
              value: this.getKindType(
                this.orderContentTemp.idNation,
                this.dictItemMap.nation
              ),
            },
            {
              label: "户籍地址",
              value: this.orderContentTemp.pmtAddress,
            },
          ];
          // } else {
          this.getCreditApplicationDetails();
          // }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
    getCreditApplicationDetails() {
      //orderContent接口中返回的orderContent中有时不包含所需字段，因此需要从下面接口再次请求数据
      ajaxPostPlus(apiUrl.CreditApplicationDetails, {
        creditApplyId: this.creditApplyId,
      })
        .then((res) => {
          this.managerId = res.custMgrId;
          this.caDetail = res;
          this.intoDetail = JSON.parse(res.intoDetail);
          this.userType = JSON.parse(this.caDetail.userType);
          this.demoData = [
            // 个人客户信息基础信息-不可修改部分
            { label: "核心客户号", value: this.intoDetail.coreCustId },
            {
              label: "客户类型",
              value: this.getKindType(
                this.caDetail.userType,
                this.dictItemMap.user_type
              ),
            },
            {
              label: "客户子类型",
              value: this.getKindType(
                "0302010",
                this.dictItemMap.customerSubType
              ),
            },
            {
              label: "客户姓名",
              value: this.caDetail.userName,
            },
            {
              label: "证件类型",
              value: this.getKindType(
                this.caDetail.certificateType,
                this.dictItemMap.certificate_type
              ),
            },
            {
              label: "证件号码",
              value: this.caDetail.certificateNo,
            },
            { label: "出生日期", value: this.intoDetail.birthday },
            {
              label: "性别",
              value: this.getKindType(
                this.intoDetail.gender,
                this.dictItemMap.gender
              ),
            },
            { label: "证件有效期", value: this.intoDetail.invalidDate },
            {
              label: "手机号码",
              value: this.caDetail.userTel,
            },
            {
              label: "民族",
              value: this.getKindType(
                this.intoDetail.idNation,
                this.dictItemMap.nation
              ),
            },
            {
              label: "户籍地址",
              value: this.intoDetail.pmtAddress,
            },
          ];

          if (this.orderContentTemp.fq_liveAddress == null) {
            this.orderContentTemp.fq_liveAddress = this.intoDetail.liveAddress; //居住地址
          }
          if (this.orderContentTemp.fq_marriageStatus == null) {
            this.orderContentTemp.fq_marriageStatus =
              this.caDetail.marriageStatus; //婚姻状态
          }
          if (this.orderContentTemp.fq_highestEducation == null) {
            this.orderContentTemp.fq_highestEducation =
              this.intoDetail.highestEducation; //最高学位
          }
          if (this.orderContentTemp.fq_highestDegree == null) {
            this.orderContentTemp.fq_highestDegree =
              this.intoDetail.highestDegree; //最高学位
          }
          if (this.orderContentTemp.fq_workName == null) {
            this.orderContentTemp.fq_workName = this.intoDetail.workName; //工作单位
          }
          if (this.orderContentTemp.fq_occupation == null) {
            this.orderContentTemp.fq_occupation = this.intoDetail.occupation; //单位所属行业
          }
          if (this.orderContentTemp.fq_vocationCode == null) {
            this.orderContentTemp.fq_vocationCode =
              this.intoDetail.vocationCode; //职业
          }
          if (this.orderContentTemp.fq_position == null) {
            this.orderContentTemp.fq_position = this.intoDetail.position; //职务
          }
          if (this.orderContentTemp.fq_workAddrAddress == null) {
            this.orderContentTemp.fq_workAddrAddress =
              this.intoDetail.workAddrAddress; //单位地址
          }
          if (this.orderContentTemp.fq_workPhone == null) {
            this.orderContentTemp.fq_workPhone = this.intoDetail.workPhone; //单位电话?(押品认定中intoDetail没有workPhone字段)
          }
          if (this.orderContentTemp.fq_mailAddress == null) {
            this.orderContentTemp.fq_mailAddress = this.intoDetail.mailAddress; //通讯/送达地址
            if (this.orderContentTemp.fq_mailAddress == null) {
              this.orderContentTemp.fq_mailAddress =
                this.dictItemMap.mailAddressCode[0].itemKey;
            }
          }
          if (this.orderContentTemp.fq_mailAddressCode == null) {
            this.orderContentTemp.fq_mailAddressCode =
              this.intoDetail.mailAddress; //通讯/送达地址邮编
          }
          if (this.contacts.length == 0) {
            this.contacts = JSON.parse(this.intoDetail.contacts);
            this.contacts.forEach((item) => {
              //workMobile的值赋给workPhone后删掉workMobile
              item["workPhone"] = item["workMobile"];
              delete item["workMobile"];
              this.personalInfo.push({
                name: item.name,
                connPersonType: this.getKindType(
                  item.connPersonType,
                  this.dictItemMap.conn_person_type
                ),
                idType: this.getKindType(
                  item.certificateType,
                  this.dictItemMap.certificate_type
                ),
                idCard: item.certificateNo, //身份证号码
                phoneNum: item.mobileNo, //手机号码
              });
              //推送提交信息-抵质押列表
              this.ownerList.push({
                name: item.name,
                certificateType: item.certificateType,
                certificateNo: item.certificateNo,
                connPersonType: item.connPersonType,
              });
            });
          }
          console.log("关联人=" + JSON.stringify(this.contacts));
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
    personalItemClick(index) {
      //将本人修改信息同步到关联人信息
      let selfInfo = {};
      selfInfo.liveAddress = this.orderContentTemp.fq_liveAddress; //居住地址
      selfInfo.marriageStatus = this.orderContentTemp.fq_marriageStatus; //婚姻状态
      selfInfo.workName = this.orderContentTemp.fq_workName; //工作单位
      selfInfo.workAddress = this.orderContentTemp.fq_workAddrAddress; //单位地址
      selfInfo.workPhone = this.orderContentTemp.fq_workPhone; //单位电话
      selfInfo.mailAddress = this.orderContentTemp.fq_mailAddress; //通讯/送达地址
      selfInfo.mailAddressCode = this.orderContentTemp.fq_mailAddressCode; //通讯/送达地址邮编

      //点击单项 跳转到关联人信息页面
      this.$router.push({
        path: "/relationMessage",
        query: {
          info: this.contacts[index],
          index: index,
          dictItemMap: this.dictItemMap,
          selfInfo: selfInfo,
        },
      });
    },
    submit(flag) {
      if (this.checkNull(this.orderContentTemp.fq_liveAddress)) {
        this.$toast("居住地址不能为空");
        return;
      }
      if (this.checkNull(this.orderContentTemp.fq_marriageStatus)) {
        this.$toast("婚姻状况不能为空");
        return;
      }
      if (this.checkNull(this.orderContentTemp.fq_highestEducation)) {
        this.$toast("最高学历不能为空");
        return;
      }
      if (this.checkNull(this.orderContentTemp.fq_highestDegree)) {
        this.$toast("最高学位不能为空");
        return;
      }
      if (this.checkNull(this.orderContentTemp.fq_workName)) {
        this.$toast("工作单位不能为空");
        return;
      }
      if (this.checkNull(this.orderContentTemp.fq_occupation)) {
        this.$toast("单位所属行业不能为空");
        return;
      }
      if (this.checkNull(this.orderContentTemp.fq_vocationCode)) {
        this.$toast("职业不能为空");
        return;
      }
      if (this.checkNull(this.orderContentTemp.fq_position)) {
        this.$toast("职务不能为空");
        return;
      }
      if (this.checkNull(this.orderContentTemp.fq_mailAddress)) {
        this.$toast("通讯/送达地址不能为空");
        return;
      }
      if (this.checkNull(this.orderContentTemp.fq_mailAddressCode)) {
        this.$toast("通讯/送达地址邮编不能为空");
        return;
      }
      let arrnull = []//关联人信息为空的字段提示
      this.contacts.forEach((item) => {
        //将本人修改信息同步到关联人信息
        if (
          this.getKindType(item.relation, this.dictItemMap.loan_relation_type) == "本人"
        ) {
          item.liveAddress = this.orderContentTemp.fq_liveAddress; //居住地址
          item.marriageStatus = this.orderContentTemp.fq_marriageStatus; //婚姻状态
          item.workName = this.orderContentTemp.fq_workName; //工作单位
          item.workAddress = this.orderContentTemp.fq_workAddrAddress; //单位地址
          item.workPhone = this.orderContentTemp.fq_workPhone; //单位电话
          item.mailAddress = this.orderContentTemp.fq_mailAddress; //通讯/送达地址
          item.mailAddressCode = this.orderContentTemp.fq_mailAddressCode; //通讯/送达地址邮编
        }
        //关联人信息校验
        if (this.checkNull(item.connPersonType)) {
          arrnull.push("关联人类型")
          return;
        };
        if (this.checkNull(item.liveAddress)) {
          arrnull.push("关联人居住地址")
          return;
        }
        if (this.checkNull(item.marriageStatus)) {
          arrnull.push("关联人婚姻状况")
          return;
        }
        if (this.checkNull(item.workName)) {
          arrnull.push("关联人工作单位")
          return;
        }
        if (this.checkNull(item.mailAddress)) {
          arrnull.push("关联人通讯/送达地址")
          return;
        }
        if (this.checkNull(item.mailAddressCode)) {
          arrnull.push("关联人通讯/送达地址邮编")
          return;
        }
        if (this.checkNull(item.relation)) {
          arrnull.push("关联人与借款人关系")
          return;
        }
      });
      if (arrnull.length > 0) {
        this.$toast(arrnull[0] + "不能为空");
        return
      }
      this.orderContentTemp.fq_dataSource = JSON.stringify(this.contacts);
      var reqData = {
        orderAttachment: "[]",
        orderContent: JSON.stringify(this.orderContentTemp),
        orderId: this.orderContentData.orderId,
        orderOther: this.orderContentData.orderOther,
        taskId: this.orderContentData.taskId,
      };
      console.log("保存提交数据=" + JSON.stringify(reqData));
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      ajaxPostPlus(apiUrl.saveUpdate, reqData).then((res) => {
        this.$toast.clear();
        this.$toast("保存成功");
        if (flag == "next") {
          //推送提交信息
          this.pullData = {
            managerId: this.managerId,
            creditApplyId: this.creditApplyId,
            coreCustId: this.orderContentTemp.coreCustId, //核心客户号
            userName: this.orderContentTemp.userName, //客户姓名
            certificateNo: this.orderContentTemp.certificateNo, //客户证件号码
            userId: this.orderContentTemp.userId, //客户编号
            organId: JSON.parse(this.orderContentTemp.hsjryUserRequest).organId, //业务机构号-非必填
            organName: JSON.parse(this.orderContentTemp.hsjryUserRequest)
              .organName, //业务机构名-非必填
            guarantyType: "", //抵质押类型-非必填
            ownerList: this.ownerList, //抵质押列表
            productId: this.orderContentTemp.productId, //产品编码
          };
          //跳转到房产信息
          this.$router.replace({
            path: "/RealEstate",
            query: {
              flowId: this.$route.query.flowId,
              currentNodeTaskId: this.$route.query.currentNodeTaskId,
              creditApplyId: this.$route.query.creditApplyId,
              routerFlag: "customer",
              pullData: this.pullData,
            },
          });
        }
      })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
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
  },
  created() { },
  mounted() {
    console.log("本页接收参数=" + JSON.stringify(this.$route.query));
    this.$toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: "加载中...",
      loadingType: "spinner",
    });
    this.getDictionary();
  },
  activated() {
    //根据key名获取传递回来的参数，data就是map
    eventBus.$off("updateRelation");
    eventBus.$on(
      "updateRelation",
      function (data) {
        console.log("关联人信息修改后传递参数:" + JSON.stringify(data));
        this.contacts[data.index] = data.contactsItem;
        this.orderContentTemp.fq_dataSource = JSON.stringify(this.contacts);
        this.personalInfo[data.index].name = data.contactsItem.name;
        this.personalInfo[data.index].connPersonType = this.getKindType(
          data.contactsItem.connPersonType,
          this.dictItemMap.conn_person_type
        );
        this.personalInfo[data.index].idType = this.getKindType(
          data.contactsItem.certificateType,
          this.dictItemMap.certificate_type
        );
        this.personalInfo[data.index].idCard = data.contactsItem.certificateNo;
        this.personalInfo[data.index].phoneNum = data.contactsItem.mobileNo;
      }.bind(this)
    );
    this.swipeTag = false;
  },
  directives: {
    //解决ios手机键盘隐藏后页面卡顿白屏问题
    resetPage: {
      inserted: function (el) {
        document.body.addEventListener("focusout", () => {
          if (device.platform.toLowerCase() == "ios") {
            // 软键盘收起的事件处理
            setTimeout(() => {
              const scrollHeight =
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0;
              window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            }, 100);
          }
        });
      },
    },
  },
};
</script>
<style scoped>
/* 外层样式 */
.main {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
/* 内容 */
.single_custom {
  padding-top: 46px;
}
.content {
  background-color: #ffffff;
  margin-top: 12px;
}
.content:last-child {
  margin-bottom: 12px;
}
/* 标题 */
div.title {
  padding: var(--form-padding-top) 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
div.top {
  font-size: var(--size-text-small);
  margin-left: 10px;
  color: #ff6619;
}
div.left {
  width: 3px;
  height: 20px;
  background-color: #ff6619;
}
/* 关联人信息外层 */
.relevance_assemble {
  padding: 0 15px;
  background: #ffffff;
  box-sizing: border-box;
}
/* 按钮 */
.btn {
  text-align: center;
}
.btn :first-child {
  margin-right: 12px;
}
.primary {
  border-radius: 30px;
  margin: 20px 0;
  font-size: 16px;
  width: 150px;
  height: 40px;
}
/* 保存按钮 */
.save {
  background: var(--color-orange-text);
  border: 1px solid var(--color-orange-text);
  color: white;
}
/* 下一步按钮 */
.next {
  background: white;
  border: 1px solid var(--color-orange-text);
  color: var(--color-orange-text);
  /* font-weight: 700; */
}
</style>