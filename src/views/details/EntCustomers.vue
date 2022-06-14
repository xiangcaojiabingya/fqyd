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
        <single-line-item label="核心客户号" :value="temp.coreCustId" />
        <single-line-item label="客户类型" :value="customerType2" />
        <single-line-item label="客户子类型" :value="customerSubType2" />
        <single-line-item label="客户姓名" :value="content.userName" />
        <single-line-item label="证件类型" :value="certificateType" />
        <single-line-item label="证件号码" :value="content.certificateNo" />
        <single-line-item label="出生日期" :value="temp.birthday" />
        <single-line-item label="性别" :value="gender2" />
        <single-line-item label="证件有效期" :value="orderContentTemp.invalidDate" />
        <single-line-item label="手机号码" :value="content.userTel" />
        <single-line-item label="民族" :value="idNation" />
        <single-line-item label="户籍地址" :value="content.userAddressInfo.pmtAddress" />
        <single-line-item label="居住地址" :value="content.userAddressInfo.liveAddress" />
        <single-line-item label="婚姻状态" :value="marriageStatus" />
        <single-line-item label="最高学历" :value="highestEducation" />
        <single-line-item label="最高学位" :value="highestDegree" />

        <single-line-item label="工作单位" :value="orderContentTemp.workName" />
        <single-line-item label="单位所属行业" :value="occupation" />
        <single-line-item label="职业" :value="fq_vocationCode" />
        <single-line-item label="职务" :value="fq_position" />
        <single-line-item label="单位地址" :value="content.userAddressInfo.workAddrAddress" />
        <single-line-item label="单位电话" :value="orderContentTemp.workPhone" />
        <single-line-item label="通讯/送达地址" :value="fq_mailAddress" />
        <single-line-item label="通讯/送达地址邮编" :value="orderContentTemp.fq_mailAddressCode" />
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
  name: "EntCustomers", //企业客户信息
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
      orderContentTemp: {
        invalidDate: '--',
        userName: '--',
        workPhone: '--',
        fq_mailAddressCode: '--',
        workName: '--',
      },
      content: {
        certificateNo: "--",
        userTel: "--",
        userAddressInfo: {
          pmtAddress: "--",
          liveAddress: "--",
          workAddrAddress: "--",
        },
      },
      temp: {
        coreCustId: "--",
        mailAddress: "--",
        birthday: "--",
      },
      fq_dataSource: {},
      contacts: {},
      certificateType: "--",
      gender2: "--",
      marriageStatus: "--",
      highestEducation: "--",
      fq_mailAddress: "居住地址",
      highestDegree: "--",
      occupation: "--",
      fq_vocationCode: "--",
      customerType2: "--",
      customerSubType2: "--",
      fq_position: "--",
      competent: "--",
      idNation: "--",
      isSelfEmployed: "--",
      isPeasant: "--",
      dictKeys: [
        "certificate_type",
        "gender",
        "marriage_status",
        "user_type",
        "customerSubType",
        "edu_level",
        "degree",
        "industry_type",
        "headShip",
        "loan_relation_type",
        "occupation",
        "nation",
        "conn_person_type",
        "mailAddressCode",
      ],
      certificate_type: [], //证件类型
      gender: [], // 性别
      marriage_status: [], // 婚姻状况
      user_type: [], //客户类型
      customerSubType: [], //客户子类型
      edu_level: [], //最高学历
      degree: [], //最高学位
      industry_type: [], //单位所属行业
      headShip: [], //职务
      loan_relation_type: [], //与借款人关系
      vocationCode: [], //职业
      nation: [], // 民族
      conn_person_type: [], // 关联人类型
      mailAddressCode: [], //通讯/送达地址
      // creditApplyId: "000CA2021050000000093",
      imageData: [],
      creditApplyId: this.$route.query.creditApplyId,
      flowId: this.$route.query.flowId,
      currentNodeCode: this.$route.query.currentNodeCode,
    };
  },
  computed: {},
  created() { },
  methods: {
    getDictionary() {
      var reqBody = {
        dictKeys: this.dictKeys,
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, reqBody)
        .then((res) => {
          try {
            var dist = res.dictItemMap;
            this.certificate_type = dist.certificate_type;
            this.gender = dist.gender;
            this.marriage_status = dist.marriage_status;
            this.user_type = dist.user_type;
            this.customerSubType = dist.customerSubType;
            this.edu_level = dist.edu_level;
            this.degree = dist.degree;
            this.industry_type = dist.industry_type;
            this.headShip = dist.headShip;
            this.loan_relation_type = dist.loan_relation_type;
            this.vocationCode = dist.occupation;
            this.nation = dist.nation;
            this.conn_person_type = dist.conn_person_type;
            this.mailAddressCode = dist.mailAddressCode;
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
        list = this.user_type;
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
        list = this.vocationCode;
      } else if (flag == "type11") {
        list = this.nation;
      } else if (flag == "type12") {
        list = this.conn_person_type;
      } else if (flag == "type13") {
        list = this.mailAddressCode;
      } else if ((flag = "type14")) {
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
      // setTimeout(() => {
      // this.$toast.loading({
      //   duration: 0, // 持续展示 toast
      //   forbidClick: true,
      //   message: "加载中...",
      //   loadingType: "spinner"
      // });
      let fq_highestEducation = ""; //学历
      let fq_highestDegree = ""; //学位
      let fq_occupation = ""; //单位所属行业
      let fq_position = ""; //职务
      let fq_mailAddress = ""; //通讯、送达地址
      let fq_vocationCode = ""; //职业
      let fq_workName = ""; //工作单位
      let fq_workPhone = ""; //单位电话

      ajaxPostPlus(apiUrl.queryOrderContent, {
        flowId: this.flowId,
      })
        .then((res) => {
          try {
            this.orderContent = res;
            console.log(
              "orderContent-res------" +
              JSON.parse(JSON.stringify(this.orderContent.orderContent))
            );
            this.orderContentTemp = JSON.parse(this.orderContent.orderContent);
            if (this.orderContentTemp.fq_highestEducation) {
              fq_highestEducation = this.orderContentTemp.fq_highestEducation;
              this.highestEducation = this.getKindType(
                fq_highestEducation,
                "type6"
              ); // 学历
            }

            if (this.orderContentTemp.fq_highestDegree) {
              fq_highestDegree = this.orderContentTemp.fq_highestDegree;
              this.highestDegree = this.getKindType(fq_highestDegree, "type7"); // 学位
            }

            if (this.orderContentTemp.fq_occupation) {
              fq_occupation = this.orderContentTemp.fq_occupation;
              this.occupation = this.getKindType(fq_occupation, "type8"); // 单位所属行业
            }

            if (this.orderContentTemp.fq_mailAddress) {
              fq_mailAddress = this.orderContentTemp.fq_mailAddress;
              this.fq_mailAddress = this.getKindType(fq_mailAddress, "type13"); // 通讯/送达地址
            }

            if (this.orderContentTemp.fq_position) {
              fq_position = this.orderContentTemp.fq_position;
              this.fq_position = this.getKindType(
                fq_position,
                "type9"
              ); // 职务
            }
            this.marriageStatus = this.getKindType(
              this.orderContentTemp.marriageStatus,
              "type3"
            );
            if (this.orderContentTemp.fq_workName) {
              fq_workName = this.orderContentTemp.fq_workName;
              this.orderContentTemp.workName = fq_workName;//工作单位
            }
            if (this.orderContentTemp.fq_workPhone) {
              fq_workPhone = this.orderContentTemp.fq_workPhone;
              this.orderContentTemp.workPhone = fq_workPhone;//单位电话
            }
            if (this.orderContentTemp.fq_vocationCode) {
              fq_vocationCode = this.orderContentTemp.fq_vocationCode;
              this.fq_vocationCode = this.getKindType(
                fq_vocationCode,
                "type10"
              ); //职业

            }
            if (this.orderContentTemp.fq_dataSource) {
              this.fq_dataSource = JSON.parse(
                this.orderContentTemp.fq_dataSource
              );
              this.personalInfo = [];
              this.fq_dataSource.forEach((item) => {
                // let relation = ""
                // if (item.relation != "" && item.relation != null) {
                //   if (this.getKindType(item.relation, "type14") == "") {
                //     relation = "其他"
                //   } else {
                //     relation = this.getKindType(item.relation, "type14")
                //   }
                // } else {
                //   relation = "--"
                // }
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
            }
          } catch (error) {
            this.$toast("获取数据失败");
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });

      ajaxPostPlus(apiUrl.CreditApplicationDetails, {
        creditApplyId: this.creditApplyId,
      })
        .then((res) => {
          try {
            this.content = res;
            this.temp = JSON.parse(res.intoDetail);
            this.userType = JSON.parse(this.content.userType);
            if (fq_highestEducation === "") {
              fq_highestEducation = this.temp.highestEducation;
              this.highestEducation = this.getKindType(
                fq_highestEducation,
                "type6"
              );
            } // 学历
            if (fq_highestDegree === "") {
              fq_highestDegree = this.temp.highestDegree;
              this.highestDegree = this.getKindType(fq_highestDegree, "type7");
            } // 学位
            if (fq_occupation === "") {
              fq_occupation = this.temp.occupation;
              this.occupation = this.getKindType(fq_occupation, "type8");
            } // 单位所属行业
            this.customerType2 = this.getKindType(this.userType, "type4");
            this.customerSubType2 = this.getKindType("0302010", "type5");
            if (fq_position === "") {
              fq_position = this.temp.position;
              this.fq_position = this.getKindType(fq_position, "type9");
            } // 职务
            if (fq_vocationCode === "") {
              fq_vocationCode = this.temp.vocationCode;
              this.fq_vocationCode = this.getKindType(
                fq_vocationCode,
                "type10"
              );
            } //职业
            if (fq_mailAddress === "") {
              if (this.temp.mailAddress != null) {
                fq_mailAddress = this.temp.mailAddress;
                this.fq_mailAddress = this.getKindType(
                  fq_mailAddress,
                  "type13"
                );
              }
            } // 通讯/送达地址
            if (fq_workName === "") {
              fq_workName = this.temp.workName;
              this.orderContentTemp.workName = fq_workName;
            } //工作单位
            if (fq_workPhone === '') {
              fq_workPhone = this.temp.workPhone;
              this.workPhone = fq_workPhone;
            }//单位电话
            this.idNation =
              this.getKindType(this.temp.idNation, "type11") ||
              this.temp.idNation;
            if (this.temp.isSelfEmployed == 0) {
              this.isSelfEmployed = "否";
            } else {
              this.isSelfEmployed = "是";
            }
            if (this.temp.isPeasant == 0) {
              this.isPeasant = "否";
            } else {
              this.isPeasant = "是";
            }
            this.certificateType = this.getKindType(
              this.content.certificateType,
              "type1"
            );
            this.gender2 = this.getKindType(this.temp.gender, "type2");
            this.marriageStatus = this.getKindType(
              this.content.marriageStatus,
              "type3"
            );
            if (this.personalInfo.length == 0) {
              this.contacts = JSON.parse(this.temp.contacts);
              this.contacts.forEach((item) => {
                // let relation = ""
                // if (item.relation != "" && item.relation != null) {
                //   if (this.getKindType(item.relation, "type14") == "") {
                //     relation = "其他"
                //   } else {
                //     relation = this.getKindType(item.relation, "type14")
                //   }
                // } else {
                //   relation = "--"
                // }
                this.personalInfo.push({
                  name: item.name,
                  relation: this.getKindType(item.relation, "type14"),
                  connPersonType: this.getKindType(
                    item.connPersonType,
                    "type12"
                  ),
                  liveAddress: item.liveAddress,
                  marriageStatus: this.getKindType(
                    item.marriageStatus,
                    "type3"
                  ),
                  workName: item.workName,
                  workAddress: item.workAddress,
                  workPhone: item.workMobile,
                  mailAddress: this.getKindType(item.mailAddress, "type13"),
                  mailAddressCode: item.mailAddressCode,
                  idType: this.getKindType(item.certificateType, "type1"),
                  idCard: item.certificateNo,
                  phoneNum: item.mobileNo,
                });
              });
              console.log("关联人信息2=-----" + JSON.stringify(this.personalInfo));
            }
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
          flag: "1", //标志
          creditApplyId: this.creditApplyId,
          flowId: this.flowId,
        },
      });
    },
  },
  mounted() {
    console.log(" 页面传值=" + JSON.stringify(this.$route.query));
    //业务分配岗不展示影像资料
    if (
      this.currentNodeCode != null &&
      this.currentNodeCode != undefined &&
      this.currentNodeCode == "fh-managectl"
    ) {
      this.rightSet = "FINISH";
    } else {
      this.rightSet = "rightSet";
    }
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
  padding: 18px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
.container_title {
  color: #ff6619;
  font-size: 15px;
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
