// 个人客户
<template>
  <div class="bj">
    <top />
    <item-nav-bar :title="title" />
    <div class="Application">
      <div class="content">
        <div class="title">
          <div class="left"></div>
          <div class="top">个人信息</div>
        </div>

        <div
          v-for="(item, index) in demoData"
          :key="index"
          class="margin_style"
        >
          <single-line-item
            :label="item.label"
            :value="item.value"
            :isShowLine="index == demoData.length - 1 ? false : true"
          ></single-line-item>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <div class="left"></div>
          <div class="top">营销信息</div>
        </div>
        <div
          v-for="(item, index) in demoData2"
          :key="index"
          class="margin_style"
        >
          <single-line-item
            :label="item.label"
            :value="item.value"
            :isShowLine="index == demoData2.length - 1 ? false : true"
          ></single-line-item>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <div class="left"></div>
          <div class="top">教育信息</div>
        </div>
        <div
          v-for="(item, index) in demoData3"
          :key="index"
          class="margin_style"
        >
          <single-line-item
            :label="item.label"
            :value="item.value"
            :isShowLine="index == demoData3.length - 1 ? false : true"
          ></single-line-item>
        </div>
      </div>
      <div class="content">
        <div class="title">
          <div class="left"></div>
          <div class="top">配偶信息</div>
        </div>
        <div
          v-for="(item, index) in demoData4"
          :key="index"
          class="margin_style"
        >
          <single-line-item
            :label="item.label"
            :value="item.value"
            :isShowLine="index == demoData4.length - 1 ? false : true"
          ></single-line-item>
        </div>
        <div v-if="show">
          <div
            v-for="(item, index) in demoData6"
            :key="index"
            class="margin_style_content margin_style"
            id="margin_style_content"
          >
            <single-line-item
              :label="item.label"
              :value="item.value"
              :isShowLine="index == demoData6.length - 1 ? false : true"
            ></single-line-item>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="title">
          <div class="left"></div>
          <div class="top">居住地址</div>
        </div>
        <div class="card_div" v-for="(item, index) in demoData5" :key="index">
          <div class="card_item">
            <span>类型</span>
            <span>{{ item.value1 }}</span>
          </div>
          <div class="card_item">
            <span>居住地址</span>
            <span>{{ item.value2 }}</span>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="title">
          <div class="left"></div>
          <div class="top">职业信息</div>
        </div>
        <div class="card_div" v-for="(item, index) in demoData7" :key="index">
          <div class="card_item">
            <span>工作单位</span>
            <span>{{ item.value1 }}</span>
          </div>
          <div class="card_item">
            <span>单位地址</span>
            <span>{{ item.value2 }}</span>
          </div>
          <div class="card_item">
            <span>职业</span>
            <span>{{ item.value3 }}</span>
          </div>
          <div class="card_item">
            <span>行业</span>
            <span>{{ item.value4 }}</span>
          </div>
          <div class="card_item">
            <span>职务</span>
            <span>{{ item.value5 }}</span>
          </div>
          <div class="card_item">
            <span>职称</span>
            <span>{{ item.value6 }}</span>
          </div>
          <div class="card_item">
            <span>工作年限</span>
            <span>{{ item.value7 }}</span>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="title">
          <div class="left"></div>
          <div class="top">社交信息</div>
        </div>
        <div class="card_div" v-for="(item, index) in demoData8" :key="index">
          <div class="card_item">
            <span>社交平台</span>
            <span>{{ item.value1 }}</span>
          </div>
          <div class="card_item">
            <span>社交账号</span>
            <span>{{ item.value2 }}</span>
          </div>
          <div class="card_item">
            <span>昵称</span>
            <span>{{ item.value3 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleLineItem from "@/components/common/SingleLineItem.vue";
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import { setWebViewTitle, hideWebViewTitle } from "@/utils/index.js";
import Top from "@/components/module/Top.vue";
import { ajaxPostPlus, apiUrl } from "@/api.js";
import { codeToValue } from "@/utils/index.js";

export default {
  name: "Application",
  components: {
    "single-line-item": SingleLineItem,
    "item-nav-bar": ItemNavBar,
    Top,
  },
  data() {
    return {
      requeatData: JSON.parse(this.$route.query.info), //请求报文JSON（query传递的info是String）
      demoData: [
        // 个人信息
        { label: "客户名称", value: "" },
        { label: "性别", value: "" },
        { label: "年龄", value: "" }, //?
        { label: "出生年月", value: "" },
        { label: "居民身份证", value: "" },
        { label: "手机号", value: "" },
        { label: "通讯地址", value: "" },
        { label: "户籍地址", value: "" },
      ],
      demoData2: [
        // 营销信息
        { label: "客户经理", value: "" },
        { label: "所属机构", value: "" },
      ],
      demoData3: [
        // 教育信息
        { label: "教育水平", value: "" },
        { label: "毕业学校", value: "" },
      ],
      demoData4: [
        // 婚姻状况
        { label: "婚姻状况", value: "" },
      ],
      demoData6: [
        // 婚姻状况
        { label: "配偶姓名", value: "" },
        { label: "居民身份证", value: "" },
        { label: "手机号码", value: "" },
      ],
      demoData5: [],
      demoData7: [
        // { label: "工作单位", value: "" },
        // { label: "单位地址", value: "" },
        // { label: "职业", value: "" },
        // { label: "行业", value: "" },
        // { label: "职务", value: "" },
        // { label: "职称", value: "" },
        // { label: "工作年限", value: "" }
      ], // 职业信息 社交信息
      demoData8: [
        // { label: "社交平台", value: "" },
        // { label: "社交账号", value: "" },
        // { label: "昵称", value: "" },
      ], // 社交信息
      title: "基本信息",
      show: true, // 婚姻状况展示
      dictItemMap: {},
      userCard: 0,
      dictKeys: [
        "edu_level", // 学历
        "marriage_status", // 婚姻状况
        "certificate_type", // 证件类型
        "ADDRESS_CLASS_CODE", //  地址分类
        "gender", // 性别
        "house_situation", // 居住地址类型
        "industry_type", //行业类别
        "occupation_level", //职称
        "occupation", // 职业
        "job_position", // 职务
        "socialType", //社交平台
        "certificate_type_personal", // 个人证件类型
      ],
      edu_level: [],
      house_situation: [],
      industry_type: [],
      occupation_level: [],
      occupation: [],
      socialType: [],
      marriage_status: [],
      job_position: [],
      certificate_type_personal: [],
      vocation: "",
      industryCode: "",
      positionalTitles: "",
      socialType1: "",
    };
  },
  methods: {
    getDictionary() {
      ajaxPostPlus(apiUrl.QueryDictKeys, {
        dictKeys: this.dictKeys,
      })
        .then((res) => {
          try {
            this.dictItemMap = res.dictItemMap;
            this.edu_level = res.dictItemMap.edu_level;
            this.house_situation = res.dictItemMap.house_situation;
            this.industry_type = res.dictItemMap.industry_type;
            this.occupation_level = res.dictItemMap.occupation_level;
            this.occupation = res.dictItemMap.occupation;
            this.socialType = res.dictItemMap.socialType;
            this.job_position = res.dictItemMap.job_position;
            this.marriage_status = res.dictItemMap.marriage_status;
            this.certificate_type_personal =
              res.dictItemMap.certificate_type_personal;
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
    // 获取类型
    getKindType(code, flag) {
      let str = "";
      let list = [];
      if (flag == "type1") {
        list = this.house_situation;
      } else if (flag == "type2") {
        list = this.industry_type;
      } else if (flag == "type3") {
        list = this.occupation_level;
      } else if (flag == "type4") {
        list = this.occupation;
      } else if (flag == "type5") {
        list = this.edu_level;
      } else if (flag == "type6") {
        list = this.job_position;
      } else if (flag == "type7") {
        list = this.socialType;
      } else if (flag == "type8") {
        list = this.marriage_status;
      } else if (flag == "type9") {
        list = this.certificate_type_personal;
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
      // this.$toast.loading({
      //   message: "加载中...",
      //   forbidClick: true,
      //   loadingType: "spinner"
      // });
      ajaxPostPlus(apiUrl.getClientInformation, {
        userId: this.requeatData.userId,
      })
        .then((res) => {
          console.log("基本信息" + JSON.stringify(res));
          try {
            var temp = res.userPersonalBasicInfoBo;
            this.demoData[0].value = temp.clientName;

            this.dictItemMap.gender.forEach((item, index) => {
              if (item.itemKey == temp.sex) {
                this.demoData[1].value = item.itemName;
              }
            });
            this.dictItemMap.edu_level.forEach((item, index) => {
              if (item.itemKey == temp.eduLevel) {
                this.demoData3[0].value = item.itemName;
              }
            });
            var arr3 = res.userTelContactStationInfoBoList;
            arr3.forEach((element) => {
              this.demoData[5].value = element.telephone;
            });
            var marriage = temp.marriageStatus;
            console.log("aaa" + JSON.stringify(marriage));
            if (marriage == 10) {
              console.log("婚姻状况----" + JSON.stringify(marriage));
              this.demoData4[0].value = this.getKindType(marriage, "type8"); // 婚姻状况
              this.show = false;
            } else {
              console.log("婚姻状况----" + JSON.stringify(marriage));
              this.demoData4[0].value = this.getKindType(marriage, "type8"); // 婚姻状况
              this.show = true;
            }
            // this.dictItemMap.marriage_status.forEach((item, index) => {
            //   if (item.itemKey == marriage && item.itemKey == 10) {
            //     this.demoData4[0].value = item.itemName;
            //     this.show = false;
            //   }
            // });
            var arr = res.userCustomerRelationBoList;
            console.log("bbb" + JSON.stringify(arr));
            arr.forEach((item, index) => {
              if (item.clientRelation == 1) {
                this.demoData6[0].value = item.clientName;
                this.demoData6[1].value =
                  item.userCertificateInfoBo.certificateNo;
                this.demoData6[2].value =
                  item.userTelContactStationInfoPojo.telephone;
              }
            });
            var temp3 = res.userCertificateBoList;
            temp3.forEach((item, index) => {
              if (item.certificateKind == 0) {
                this.demoData[4].value = item.certificateNo;
              }
            });
            this.userCard = this.demoData[4].value;
            var myDate = new Date();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            var age = myDate.getFullYear() - this.userCard.substring(6, 10);
            // if (
            //   this.userCard.substring(10, 12) < month ||
            //   (this.userCard.substring(10, 12) == month &&
            //     this.userCard.substring(12, 14) <= day)
            // ) {
            //   age++;
            // }
            this.demoData[2].value = age;
            var birthday = this.userCard.substr(6, 8);
            this.demoData[3].value = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
            var arr2 = res.userAddressContactStationInfoBoList;
            arr2.forEach((item, index) => {
              if (item.addressClassCode == 32) {
                this.demoData[6].value = item.address;
              } else if (item.addressClassCode == 23) {
                this.demoData[7].value = item.address;
              } else if (item.addressClassCode == 22) {
                console.log("居住地址" + JSON.stringify(item.address));
                console.log("居住地址" + JSON.stringify(item.liveCondition));

                this.demoData5.push({
                  value1: item.liveCondition == null ? '--' : this.getKindType(item.liveCondition, "type1"),
                  value2: item.address == null ? '--' : item.address,
                });
              }
            });
            if (res.userEducationInfoBo == null) {
              this.demoData3[1].value = "";
            } else {
              this.demoData3[1].value = res.userEducationInfoBo.university;
            }
            this.demoData2[0].value = this.requeatData.custManagerName;
            this.demoData2[1].value = this.requeatData.custManagerOrganName;
            var array = res.userProfessionalInfoBoList;
            if (array == null) {
              this.demoData7.push({
                value1: "--",
                value2: "--",
                value3: "--",
                value4: "--",
                value5: "--",
                value6: "--",
                value7: "--",
              });
            } else {
              array.forEach((item, index) => {
                console.log("aaa----" + JSON.stringify(item));
                console.log("职业----" + JSON.stringify(item.vocation));
                this.vocation = this.getKindType(item.vocation, "type4"); // 职业
                console.log("行业----" + JSON.stringify(item.industryCode));
                this.industryCode = this.getKindType(
                  item.industryCode,
                  "type2"
                ); // 行业
                console.log("职务----" + JSON.stringify(item.post));
                this.post = this.getKindType(item.post, "type6"); // 职务
                console.log("职称----" + JSON.stringify(item.positionalTitles));
                this.positionalTitles = this.getKindType(
                  item.positionalTitles,
                  "type3"
                ); // 职称
                this.demoData7.push({
                  value1: item.companyName == null ? '--' : item.companyName,
                  value2: item.companyAddress == null ? '--' : item.companyAddress,
                  value3: item.vocation == null ? '--' : this.vocation,
                  value4: item.industryCode == null ? '--' : this.industryCode,
                  value5: item.post == null ? '--' : this.post,
                  value6: item.positionalTitles == null ? '--' : this.positionalTitles,
                  value7: item.workingYears == null ? '--' : item.workingYears,
                });
              });
            }
            var array1 = res.userSocialContactStationInfoBoList;
            array1.forEach((item, index) => {
              console.log("社交平台----" + JSON.stringify(item.socialType));
              this.socialType1 = this.getKindType(item.socialType, "type7"); // 社交平台
              this.demoData8.push({
                value1: item.socialType == null ? '--' : this.socialType1,
                value2: item.account == null ? '--' : item.account,
                value3: item.nickName == null ? '--' : item.nickName,
              });
            });
          } catch (error) {
            this.$toast("获取数据失败");
            console.log("error = " + error.message);
          }
          this.$toast.clear();
        })
        .catch((res) => {
          this.$toast.clear();
        });
    },
  },
  created() {
    console.log("经理==" + JSON.stringify(this.requeatData));
  },
  mounted() {
    this.$toast.loading({
      duration: 0, // 持续展示 toast
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
    });
    // this.getData();
    this.getDictionary();
  },
  computed: {},
};
</script>

<style scoped>
.bj {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
.Application {
  margin-top: 46px;
  margin-bottom: 12px;
}
.content {
  background-color: #ffffff;
  margin-top: 10px;
}
div.title {
  padding: 15px 0;
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

/*
.margin_style {
  margin: 0 15px;
} 
margin_style_content {
    display: block;
} */
.main {
  font-size: 14px;
  margin-top: 10px;
}
.main .title {
  background: #ffffff;
}
.card_div {
  background: #ffffff;
  margin-top: 12px;
  padding: 0px 15px 15px 0px;
  font-size: 14px;
}

div.card_div:nth-child(2) {
  margin: 0;
}
.card_item {
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px 0px 0 15px;
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