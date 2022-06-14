<template>
  <!--详情之个人客户信息ycm-->
  <div class="main">
    <item-nav-bar :title="title" :rightSet="rightSet" @onClickRight="onClickRight" />
    <div class="container">
      <div class="container_head">
        <div class="vertical_bar"></div>
        <div class="container_title">基本信息</div>
      </div>
      <div class="container_content">
        <single-line-item label="核心客户号" :value="content.coreCustId" />
        <single-line-item label="客户类型" :value="content.customerType" />
        <single-line-item label="客户子类型" :value="content.customerSubType" />
        <single-line-item label="客户姓名" :value="content.userName" />
        <single-line-item label="证件类型" :value="content.certificateKind" />
        <single-line-item label="证件号码" :value="content.certificateNo" />
        <single-line-item label="手机号码" :value="content.mobileNo" />
        <single-line-item label="性别" :value="content.gender" />
        <single-line-item label="婚姻状态" :value="content.marriageStatus" />
        <single-line-item label="户籍地址签发机关" :value="content.regSignOrg" />
        <single-line-item label="户籍地址" :value="content.pmtAddress" />
        <single-line-item label="居住地址" :value="content.liveAddress" />
        <single-line-item label="单位地址" :value="content.workAddrAddress" />
        <single-line-item label="通讯地址" :value="content.mailAddress" />
        <single-line-item label="最高学历" :value="content.highestEducation" />
        <single-line-item label="最高学位" :value="content.highestDegree" />
        <single-line-item label="通讯地址邮编" :value="content.mailAddressCode" />
        <single-line-item label="居住地址邮编" :value="content.liveAddressCode" />
        <single-line-item label="单位所属行业" :value="content.occupation" />
        <single-line-item label="职务" :value="content.fq_position" />
        <single-line-item label="职称" :value="content.competent" />
        <single-line-item label="民族" :value="content.idNation" />
        <single-line-item label="出生日期" :value="content.birthday" />
        <single-line-item label="是否个体工商户" :value="isSelfEmployed" />
        <single-line-item label="是否农户标识" :value="isPeasant" :isShowLine="false" />
      </div>
    </div>

    <div class="container">
      <div class="container_head">
        <div class="vertical_bar"></div>
        <div class="container_title">关联人信息</div>
      </div>
      <div class="container_content2">
        <personal-info-right
          v-for="(item, index) in personalInfo"
          :key="index"
          :itemInfo="item"
          :isShowLine="index == personalInfo.length - 1 ? false : true"
        ></personal-info-right>
      </div>
    </div>
  </div>
</template>

<script>
import PersonalInfoRight from "@/components/common/PersonalInfoRight.vue";
import SingleLineItem from "@/components/common/SingleLineItem.vue";
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
import { codeToValue } from "@/utils/index.js";
export default {
  name: "EntCustomers", //客户信息
  components: {
    SingleLineItem,
    PersonalInfoRight,
    ItemNavBar,
  },
  props: {
    //     creditApplyId: String, // 申请编号
  },
  data() {
    return {
      entName: "超级长的内容显示样式vdfknvdfb,s多方面vdnvnsdfkv,sdvndfinkvd.",
      title: "个人客户信息",
      rightSet: "rightSet",
      personalInfo: [],
      content: {
        userName: '--',
        certificateNo: '--',
        mobileNo: '--',
        pmtAddress: '--',
        liveAddress: '--',
        workAddrAddress: '--',
        coreCustId: '--',
        regSignOrg: '--',
        liveAddressCode: '--',
        mailAddress: '--',
        mailAddressCode: '--',
        birthday: '--',
        liveAddressCode: '--',
        certificateKind: '--',
        gender: '--',
        marriageStatus: '--',
        mailAddress: '--',
        highestEducation: '--',
        highestDegree: '--',
        occupation: '--',
        position: '--',
        competent: "--",
        idNation: "--",
        customerType: "--",
        customerSubType: "--",
      },
      fq_dataSourc: {},
      certificateType: "--",
      isSelfEmployed: "--",
      isPeasant: "--",
      dictKeys: [
        "certificate_type",
        "gender",
        "marriage_status",
        "customerType",
        "customerSubType",
        "edu_level",
        "degree",
        "industry_type",
        "headShip",
        "occupation_level",
        "mailAddressCode",
        "conn_person_type",
        "nation",
        "loan_relation_type",
      ],
      certificate_type: [], //证件类型
      gender: [], // 性别
      marriage_status: [], // 婚姻状况
      customerType: [], //客户类型
      customerSubType: [], //客户子类型
      edu_level: [], //最高学历
      degree: [], //最高学位
      industry_type: [], //单位所属行业
      headShip: [], //职务
      occupation_level: [], //职称
      mailAddressCode: [],///通讯/送达地址
      conn_person_type: [],// 关联人类型
      nation: [], // 民族
      loan_relation_type: [], // 关系类型
      imageData: [],
      creditApplyId: this.$route.query.creditApplyId,
      flowId: this.$route.query.flowId,
      loanApplyId: this.$route.query.loanApplyId,
    };
  },
  computed: {},
  created() {
    console.log("aaaaa" + this.flowId);

  },
  methods: {
    getDictionary() {
      var reqBody = {
        dictKeys: this.dictKeys,
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, reqBody)
        .then((res) => {
          console.log(" -数据字典列表-" + JSON.stringify(res));
          try {
            var dist = res.dictItemMap;
            this.certificate_type = dist.certificate_type;
            this.gender = dist.gender;
            this.marriage_status = dist.marriage_status;
            this.customerType = dist.customerType;
            this.customerSubType = dist.customerSubType;
            this.edu_level = dist.edu_level;
            this.degree = dist.degree;
            this.industry_type = dist.industry_type;
            this.headShip = dist.headShip;
            this.occupation_level = dist.occupation_level;
            this.mailAddressCode = dist.mailAddressCode;
            this.conn_person_type = dist.conn_person_type;
            this.nation = dist.nation;
            this.loan_relation_type = dist.loan_relation_type;
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
    getKindType(code, flag) {
      let str = "";
      let list = [];
      if (flag == "type1") {
        list = this.certificate_type;
      } else if (flag == "type2") {
        list = this.gender;
      } else if (flag == "type3") {
        list = this.marriage_status;
      } else if (flag == "type4") {
        list = this.customerType;
      } else if (flag == "type5") {
        list = this.customerSubType;
      } else if (flag == "type6") {
        list = this.edu_level;
      } else if (flag == "type7") {
        list = this.degree;
      } else if (flag == "type8") {
        list = this.industry_type;
      } else if (flag == "type9") {
        list = this.headShip;
      } else if (flag == "type10") {
        list = this.occupation_level;
      } else if (flag == "type11") {
        list = this.nation;
      } else if (flag == "type12") {
        list = this.conn_person_type;
      } else if (flag == "type13") {
        list = this.mailAddressCode;
      } else if (flag = "type14") {
        list = this.loan_relation_type;
      }
      if (list.length == 0) {
        this.getDictionary();
        return;
      } else {
        str = codeToValue(list, code);
      }
      return str;
    },
    getData() {
      let marriageStatus = '';
      let mailAddress = '';
      let highestEducation = '';
      let highestDegree = '';
      let occupation = '';
      let position = '';
      ajaxPostPlus(apiUrl.queryOrderContent, {
        flowId: this.flowId,
      })
        .then((res) => {
          try {
            this.content = JSON.parse(res.orderContent);
            highestEducation = this.content.fq_highestEducation || this.content.highestEducation;
            this.content.highestEducation = this.getKindType(
              highestEducation,
              "type6"
            ); // 学历
            highestDegree = this.content.fq_highestDegree || this.content.highestDegree;
            this.content.highestDegree = this.getKindType(
              highestDegree,
              "type7"
            ); // 学位

            occupation = this.content.fq_occupation || this.content.occupation;
            this.content.occupation = this.getKindType(
              occupation,
              "type8"
            ); // 单位所属行业

            this.content.customerType2 = this.getKindType(
              this.content.customerType,
              "type4"
            );
            this.content.customerSubType2 = this.getKindType(
              this.content.customerSubType,
              "type5"
            );

            position = this.content.fq_position || this.content.position;
            this.content.fq_position = this.getKindType(
              position,
              "type9"
            );

            this.content.competent = this.getKindType(this.content.competent, "type10");

            this.content.idNation = this.getKindType(this.content.idNation, "type11");
            // if (this.content.isSelfEmployed == 0) {
            //   this.isSelfEmployed = "否";
            // } else {
            //   this.isSelfEmployed = "是";
            // }
            // if (this.content.isPeasant == 0) {
            //   this.isPeasant = "否";
            // } else {
            //   this.isPeasant = "是";
            // }
            this.content.certificateKind = this.getKindType(
              this.content.certificateKind,
              "type1"
            );
            this.content.gender = this.getKindType(this.content.gender, "type2");
            marriageStatus = this.content.fq_marriageStatus || this.content.marriageStatus;
            this.content.marriageStatus = this.getKindType(
              marriageStatus,
              "type3"
            );//婚姻状况
            this.content.liveAddress = this.content.fq_liveAddress || this.content.liveAddress;
            // this.content.liveAddress=liveAddress;//居住地址
            this.content.workAddrAddress = this.content.fq_workAddrAddress || this.content.workAddrAddress;
            mailAddress = this.content.fq_mailAddress || this.content.mailAddress;
            this.content.mailAddress = this.getKindType(
              mailAddress,
              "type13"
            );
            this.content.mailAddressCode = this.content.fq_mailAddressCode || this.content.mailAddressCode;
            this.fq_dataSource = JSON.parse(this.content.fq_dataSource);
            this.fq_dataSource.forEach((item) => {
              this.personalInfo.push({
                name: item.name,
                relation: this.getKindType(item.relation, "type14"),
                connPersonType: this.getKindType(item.connPersonType, "type12"),
                liveAddress: item.liveAddress,
                marriageStatus: this.getKindType(item.marriageStatus, "type3"),
                workName: item.workName,
                workAddress: item.workAddress,
                workPhone: item.workPhone,
                mailAddress: this.getKindType(item.mailAddress, "type13"),
                mailAddressCode: item.mailAddressCode,
                idType: this.getKindType(item.certificateType, "type1"),
                idCard: item.certificateNo,
                phoneNum: item.mobileNo,
              });
            });
            console.log("关联人信息-----" + JSON.stringify(this.personalInfo));
          } catch (error) {
            this.$toast("获取数据失败");
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
      // }, 1000);
    },
    onClickRight() {
      this.$router.push({
        name: "ImageData",
        params: {
          flag: "2", //标志
          creditApplyId: this.creditApplyId,
          flowId: this.flowId,
          loanApplyId: this.loanApplyId,
        },
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
    this.getDictionary();
    // this.getData();
  },
};
</script>

<style  scoped>
.main {
  padding: 46px 0 12px;
}
.container {
  background: #ffffff;
  margin: 12px 0 0;
}
.container_head {
  padding: var(--form-padding-top) 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
.container_title {
  color: #ff6619;
  font-size: 14px;
  margin-left: 12px;
}
/*竖杠*/
.vertical_bar {
  width: 3px;
  height: 20px;
  background: #ff6619;
}
.container_content2 {
  margin: 0 15px;
}
</style>
