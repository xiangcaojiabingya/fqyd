<template>
  <div class="bj">
    <top />
    <item-nav-bar
      :title="title"
      :rightSet="rightSet"
      @onClickRight="onClickRight"
    ></item-nav-bar>
    <div class="Application">
      <div class="content" v-if="powerCard == '不动产权证'">
        <item-pickers
          v-model="powerCard"
          :currentValue="netWorkData.powerCard"
          :columns="dictItemMap.enterprise_scale"
          @change="change"
          title="权力证类型"
          pickerTitle="权力证类型"
        ></item-pickers>
        <item-inputs :title="homeType" v-model="value7"></item-inputs>

        <item-city
          title="房产所在地"
          v-model="city"
          showData="shandong"
          @chooseCityChange="chooseCityChange"
        ></item-city>
        <item-inputs title="详细地址" v-model="value1"></item-inputs>
        <item-inputs title="小区名称" v-model="value2"></item-inputs>
        <item-inputs title="建筑面积(平方米)" v-model="value3"></item-inputs>
        <item-pickers
          :currentValue="netWorkData.planning"
          :columns="dictItemMap.planning"
          v-model="planning"
          @change="change"
          title="规划用途"
          pickerTitle="规划用途"
        ></item-pickers>
        <item-pickers
          v-model="state"
          :currentValue="netWorkData.state"
          :columns="dictItemMap.state"
          @change="change"
          title="房屋状态"
          pickerTitle="房屋状态"
        ></item-pickers>
        <item-inputs title="产权年限" v-model="value4"></item-inputs>
        <item-date-choose
          title="使用到期日"
          v-model="times"
          @chooseDateChange="chooseDateChange"
        ></item-date-choose>
        <item-pickers
          v-model="owner"
          :currentValue="netWorkData.owner"
          :columns="dictItemMap.owner"
          @change="change"
          title="房屋所有权人"
          pickerTitle="房屋所有权人"
        ></item-pickers>
        <div
          v-for="(item, index) in demoData3"
          :key="index.id"
          class="margin_style"
        >
          <single-line-item
            :label="item.label"
            :value="item.value"
            :isShowLine="index == demoData3.length - 1 ? false : true"
          ></single-line-item>
        </div>
      </div>
      <div class="content" v-else>
        <item-pickers
          v-model="powerCard"
          :currentValue="netWorkData.powerCard"
          :columns="dictItemMap.enterprise_scale"
          @change="change"
          title="权力证类型"
          pickerTitle="权力证类型"
        ></item-pickers>
        <item-inputs :title="homeTypeEnd" v-model="value7"></item-inputs>

        <item-city
          title="房产所在地"
          v-model="city"
          showData="shandong"
          @chooseCityChange="chooseCityChange"
        ></item-city>
        <item-inputs title="详细地址" v-model="value1"></item-inputs>
        <item-inputs title="小区名称" v-model="value2"></item-inputs>
        <item-inputs title="建筑面积(平方米)" v-model="value3"></item-inputs>
        <item-pickers
          :currentValue="netWorkData.planning"
          :columns="dictItemMap.planning"
          v-model="planning"
          @change="change"
          title="规划用途"
          pickerTitle="规划用途"
        ></item-pickers>
        <item-pickers
          v-model="state"
          :currentValue="netWorkData.state"
          :columns="dictItemMap.state"
          @change="change"
          title="房屋状态"
          pickerTitle="房屋状态"
        ></item-pickers>
        <item-inputs
          title="产权年限"
          v-model="value4"
          v-resetPage
        ></item-inputs>
        <item-date-choose
          title="使用到期日"
          v-model="times"
          @chooseDateChange="chooseDateChange"
        ></item-date-choose>
        <item-pickers
          v-model="owner"
          :columns="dictItemMap.owner"
          @change="change"
          title="房屋所有权人"
          pickerTitle="房屋所有权人"
        ></item-pickers>
        <div
          v-for="(item, index) in demoData3"
          :key="index.id"
          class="margin_style"
        >
          <single-line-item
            :label="item.label"
            :value="item.value"
            :isShowLine="index == demoData3.length - 1 ? false : true"
          ></single-line-item>
        </div>
      </div>
      <div class="finish">
        <button class="finish_button" @click="save">保存</button>
        <button class="push" @click="push">推送风险缓释</button>
      </div>
    </div>
  </div>
</template>

<script>
import SingleLineItem from "@/components/common/SingleLineItem.vue";
import ItemInputs from "@/components/common/ItemInputs.vue";
import ItemCity from "@/components/common/ItemCity.vue";
import ItemDateChoose from "@/components/common/ItemDateChoose.vue";
import ItemPickers from "@/views/Result/components/ItemPickers";
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import { setWebViewTitle } from "@/utils/index.js";
import Top from "@/components/module/Top.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
import { codeToValue } from "@/utils/index.js";
export default {
  name: "RealEstate",
  components: {
    "item-nav-bar": ItemNavBar,
    ItemPickers,
    ItemDateChoose,
    Top,

    ItemCity,
    ItemInputs,
    SingleLineItem,
  },
  props: {},
  data() {
    return {
      dictItemMap: {
        enterprise_scale: ["不动产权证", "房屋所有权证"],
        planning: ["公寓", "住宅", "别墅", "商业"],
        state: ["出租", "自住", "闲置"],
        owner: [
          "本人单独所有",
          "配偶单独所有",
          "夫妻双方共同所有",
          "第三人所有",
        ],
      },
      netWorkData: {},
      homeTypeEnd: "房屋所有权证号",
      homeType: "不动产权证",
      demoData3: [{ label: "风控押品认定价值", value: "" }],
      fc: ["不动产权证", "房屋所有权证"],
      title: "房产信息",
      rightSet: "rightSet",
      housingOwnership: "",
      planningPurposes: "",
      homeState: "",
      cardType: "",
      cityCodeList: "",
      timeAfter: "",
      year: "",
      month: "",
      endTime: "",
      day: "",
      timeBefore: "",
      cityList: "",
      codeList: "",
      dateTime: "",
      warrType: "",
      dateList: "",
      timeList: "",
      warrTypeStart: "",
      estateUnder: "", //房屋所有权人
      estateStatus: "", //
      estateUse: "", //规划用途
      estateId: "", //房产编号
      estateCode: "", //房产证编号
      estateCityCode: "", //房产所在城市编码
      estateProvinceCode: "", //房产所在省份编码
      estateDomainCode: "", //房产所在区域编码
      estateProvince: "", //房产所在省份
      estateCity: "", //房产所在城市
      estateDomain: "", //房产所在区域
      pageSize: "10",
      pageNum: "1",
      term_unit: [], //期限单位
      loan_purpose: [], // 借款用途
      image_kind: [], // 附件类型
      imageData: [],
      orderContentData: {}, //客户信息-网络请求结果
      orderContentTemp: {}, // //客户信息涉及内容orderContent
      creditApplyId: this.$route.query.creditApplyId,
      flowId: this.$route.query.flowId,
      pullData: {}, //推送提交信息
      ownerList: [], //推送提交信息-抵质押列表
      managerId: "",
    };
  },
  methods: {
    //改变时间
    chooseDateChange(value) {
      this.dateList = value.time;
      this.timeList = this.dateList.split("-");
      this.year = this.timeList[0];
      this.month = this.timeList[1];
      this.day = this.timeList[2];
      this.times = this.year + this.month + this.day;
    },
    //改变所在地
    chooseCityChange(value) {
      this.code = value.code;
      this.city = value.city;
      this.codeList = this.code.split("/");
      this.estateProvinceCode = this.codeList[0];
      this.estateCityCode = this.codeList[1];
      this.estateDomainCode = this.codeList[2];
      this.cityList = this.city.split("/");
      this.estateProvince = this.cityList[0];
      this.estateCity = this.cityList[1];
      this.estateDomain = this.cityList[2];
    },
    //获取列表
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
            if (res.estateStatus == "01") {
              this.homeState = "出租";
            } else if (res.estateStatus == "02") {
              this.homeState = "自住";
            } else {
              this.homeState = "闲置";
            }
            if (res.estateUnder == "01") {
              this.housingOwnership = "本人单独所有";
            } else if (res.estateUnder == "02") {
              this.housingOwnership = "配偶单独所有";
            } else if (res.estateUnder == "03") {
              this.housingOwnership = "夫妻双方共同所有";
            } else {
              this.housingOwnership = "第三人所有";
            }
            if (res.warrType == "01") {
              this.cardType = "不动产权证";
            } else {
              this.cardType = "房屋所有权证";
            }
            if (res.estateUse == "01") {
              this.planningPurposes = "住宅";
            } else if (res.estateUse == "02") {
              this.planningPurposes = "公寓";
            } else if (res.estateUse == "03") {
              this.planningPurposes = "别墅";
            } else {
              this.planningPurposes = "商业";
            }
            console.log("申请信息" + JSON.stringify(res));
            this.dictItemMap.enterprise_scale = this.fc;
            this.powerCard = this.cardType;
            this.city = res.estateProvince + res.estateCity + res.estateDomain;
            this.value1 = res.estateAddress;
            this.value2 = res.communityName;
            this.value3 = res.estateArea;
            this.warrTypeStart = res.warrType;
            this.planning = this.planningPurposes;

            // var temp = JSON.parse(res.intoDetail);
            // console.log("bbb____" + JSON.stringify(temp));
            this.state = this.homeState;
            this.value4 = res.propertyUseYear;
            this.endTime = res.propertyEndTime;
            this.owner = this.housingOwnership;
            this.estateId = res.estateId;
            this.value7 = res.estateCode;
            this.estateProvinceCode = res.estateProvinceCode;
            this.estateCityCode = res.estateCityCode;
            this.estateDomainCode = res.estateDomainCode;
            this.estateDomain = res.estateDomain;
            this.estateProvince = res.estateProvince;
            this.estateCity = res.estateCity;
            if (res.propertyEndTime != null && res.propertyEndTime != "") {
              this.timeBefore = res.propertyEndTime.split("");
              this.timeBefore.splice(4, 0, "-");
              this.timeBefore.splice(7, 0, "-");
              this.times = this.timeBefore.join("");
              this.timeAfter = this.timeBefore.join("");
            }
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
    //获取风险缓释
    getRisk() {
      ajaxPostPlus(apiUrl.productInformationSelectPage, {
        creditApplyId: this.creditApplyId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      })
        .then((res) => {
          this.$toast.clear();
          res.list.forEach((element) => {
            this.demoData3[0].value = element.evalValue;
          });
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
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
    change(value) {
      console.log("数据333=======" + JSON.stringify(value));
      if (this.powerCard == "不动产权证") {
        this.homeType = "不动产权证";
      } else {
        this.homeType = "房屋所有权证号";
      }
      if (this.powerCard == "不动产权证") {
        this.homeTypeEnd = "不动产权证";
      } else {
        this.homeTypeEnd = "房屋所有权证号";
      }
      switch (value) {
        case "enterprise_scale": //权力证类型
          this.netWorkData.powerCard = value;
          break;
        case "planning": //规划用途
          this.netWorkData.planning = value;
          break;
        case "state": //房屋状态
          console.log("核心证件类型");
          this.netWorkData.state = value;
          break;
        case "owner": //房屋权所有人
          this.netWorkData.owner = value;
          break;
      }
    },
    // 点击提交按钮
    save() {
      if (this.checkNull(this.powerCard)) {
        this.$toast("请选择权力证类型");
        return;
      }
      if (this.checkNull(this.value7)) {
        if (this.powerCard == "不动产权证") {
          this.$toast("请填写不动产权证");
          return;
        } else {
          this.$toast("请填写房屋所有权证号");
          return;
        }
      }
      if (this.checkNull(this.city)) {
        this.$toast("请选择房产所在地");
        return;
      }
      if (this.checkNull(this.value1)) {
        this.$toast("请填写详细地址");
        return;
      }
      if (this.checkNull(this.value2)) {
        this.$toast("请填写小区名称");
        return;
      }
      if (this.checkNull(this.value3)) {
        this.$toast("请填写建筑面积");
        return;
      }
      if (this.checkNull(this.planning)) {
        this.$toast("请选择规划用途");
        return;
      }
      if (this.checkNull(this.state)) {
        this.$toast("请选择房屋状态");
        return;
      }
      if (this.checkNull(this.value4)) {
        this.$toast("请填写产权年限");
        return;
      }
      if (this.checkNull(this.times)) {
        this.$toast("请选择使用到期日");
        return;
      }
      if (this.checkNull(this.owner)) {
        this.$toast("请选择房屋所有权人");
        return;
      }

      if (this.powerCard == "不动产权证") {
        this.warrType = "01";
      } else {
        this.warrType = "02";
      }
      if (this.planning == "住宅") {
        this.estateUse = "01";
      } else if (this.planning == "公寓") {
        this.estateUse = "02";
      } else if (this.planning == "别墅") {
        this.estateUse = "03";
      } else {
        this.estateUse = "04";
      }
      if (this.state == "出租") {
        this.estateStatus = "01";
      } else if (this.state == "自住") {
        this.estateStatus = "02";
      } else {
        this.estateStatus = "03";
      }
      if (this.owner == "本人单独所有") {
        this.estateUnder = "01";
      } else if (this.owner == "配偶单独所有") {
        this.estateUnder = "02";
      } else if (this.owner == "夫妻双方共同所有") {
        this.estateUnder = "03";
      } else {
        this.estateUnder = "04";
      }
      if (this.times == this.timeAfter) {
        this.times = this.endTime;
      }
      var reqData = {
        creditApplyId: this.creditApplyId,
        warrType: this.warrType,
        estateId: this.estateId,
        estateCode: this.value7,
        estateProvinceCode: this.estateProvinceCode,
        estateProvince: this.estateProvince,
        estateCityCode: this.estateCityCode,
        estateCity: this.estateCity,
        estateDomainCode: this.estateDomainCode,
        estateDomain: this.estateDomain,
        estateAddress: this.value1,
        estateUnder: this.estateUnder,
        estateUse: this.estateUse,
        estateArea: this.value3,
        estateStatus: this.estateStatus,
        communityName: this.value2,
        propertyEndTime: this.times,
        propertyUseYear: this.value4,
      };
      console.log("保存数据=" + JSON.stringify(reqData));
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      ajaxPostPlus(apiUrl.modifyCreditEstateAndContactInfo, reqData)
        .then((res) => {
          this.$toast.clear();
          this.$toast("保存成功");
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },

    checkNull(obj) {
      console.log("checkNull = " + obj);
      if (obj == null || obj == "") {
        return true;
      }
      if (obj.length == 0) {
        return true;
      }
      return false;
    },
    //点击推送风险缓释按钮
    push() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });

      if (this.checkNull(this.powerCard)) {
        this.$toast("请选择权力证类型");
        return;
      }
      if (this.checkNull(this.value7)) {
        if (this.powerCard == "不动产权证") {
          this.$toast("请填写不动产权证");
          return;
        } else {
          this.$toast("请填写房屋所有权证号");
          return;
        }
      }
      if (this.checkNull(this.city)) {
        this.$toast("请选择房产所在地");
        return;
      }
      if (this.checkNull(this.value1)) {
        this.$toast("请填写详细地址");
        return;
      }
      if (this.checkNull(this.value2)) {
        this.$toast("请填写小区名称");
        return;
      }
      if (this.checkNull(this.value3)) {
        this.$toast("请填写建筑面积");
        return;
      }
      if (this.checkNull(this.planning)) {
        this.$toast("请选择规划用途");
        return;
      }
      if (this.checkNull(this.state)) {
        this.$toast("请选择房屋状态");
        return;
      }
      if (this.checkNull(this.value4)) {
        this.$toast("请填写产权年限");
        return;
      }
      if (this.checkNull(this.times)) {
        this.$toast("请选择使用到期日");
        return;
      }
      if (this.checkNull(this.owner)) {
        this.$toast("请选择房屋所有权人");
        return;
      }

      if (this.powerCard == "不动产权证") {
        this.warrType = "01";
      } else {
        this.warrType = "02";
      }
      if (this.planning == "住宅") {
        this.estateUse = "01";
      } else if (this.planning == "公寓") {
        this.estateUse = "02";
      } else if (this.planning == "别墅") {
        this.estateUse = "03";
      } else {
        this.estateUse = "04";
      }
      if (this.state == "出租") {
        this.estateStatus = "01";
      } else if (this.state == "自住") {
        this.estateStatus = "02";
      } else {
        this.estateStatus = "03";
      }
      if (this.owner == "本人单独所有") {
        this.estateUnder = "01";
      } else if (this.owner == "配偶单独所有") {
        this.estateUnder = "02";
      } else if (this.owner == "夫妻双方共同所有") {
        this.estateUnder = "03";
      } else {
        this.estateUnder = "04";
      }

      if (this.times == this.timeAfter) {
        this.times = this.endTime;
      }
      var reqData = {
        creditApplyId: this.creditApplyId,
        warrType: this.warrType,
        estateId: this.estateId,
        estateCode: this.value7,
        estateProvinceCode: this.estateProvinceCode,
        estateProvince: this.estateProvince,
        estateCityCode: this.estateCityCode,
        estateCity: this.estateCity,
        estateDomainCode: this.estateDomainCode,
        estateDomain: this.estateDomain,
        estateAddress: this.value1,
        estateUnder: this.estateUnder,
        estateUse: this.estateUse,
        estateArea: this.value3,
        estateStatus: this.estateStatus,
        communityName: this.value2,
        propertyEndTime: this.times,
        propertyUseYear: this.value4,
      };
      console.log("保存数据=" + JSON.stringify(reqData));
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0,
      });
      ajaxPostPlus(apiUrl.modifyCreditEstateAndContactInfo, reqData)
        .then((res) => {
          this.$toast.clear();
          this.$toast("保存成功");
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
      //详情页进来，客户信息的非空校验
      if (this.$route.query.routerFlag == null) {
        ajaxPostPlus(apiUrl.queryOrderContent, {
          flowId: this.flowId,
        })
          .then((res) => {
            this.$toast.clear();
            this.orderContentData = res;
            this.orderContentTemp = JSON.parse(res.orderContent);

            /* 推送请求参数赋值  start*/
            if (this.orderContentTemp.fq_dataSource != null) {
              var contacts = JSON.parse(this.orderContentTemp.fq_dataSource);
              if (contacts.length > 0) {
                contacts.forEach((item) => {
                  this.ownerList.push({
                    name: item.name,
                    certificateType: item.certificateType,
                    certificateNo: item.certificateNo,
                    connPersonType: item.connPersonType,
                  });
                });
              }
            }
            this.getManager();
            console.log("ddddddddddddddddddddddddddddddd");

            this.pullData = {
              creditApplyId: this.creditApplyId,
              coreCustId: this.orderContentTemp.coreCustId, //核心客户号
              userName: this.orderContentTemp.userName, //客户姓名
              certificateNo: this.orderContentTemp.certificateNo, //客户证件号码
              userId: this.orderContentTemp.userId, //客户编号
              organId: JSON.parse(this.orderContentTemp.hsjryUserRequest)
                .organId, //业务机构号-非必填
              organName: JSON.parse(this.orderContentTemp.hsjryUserRequest)
                .organName, //业务机构名-非必填
              guarantyType: "", //抵质押类型-非必填
              ownerList: this.ownerList, //抵质押列表
              productId: this.orderContentTemp.productId, //产品编码
              managerId: this.managerId,
            };
            console.log(
              "推送请求信息nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn=" +
                JSON.stringify(this.pullData)
            );
            /* 推送请求参数赋值--end */
            console.log(
              "ashdjfasdhfdjgfwafdgsfhdjf" +
                JSON.stringify(this.orderContentTemp)
            );
            if (this.checkNull(this.orderContentTemp.fq_liveAddress)) {
              this.$toast("客户信息-居住地址不能为空");
              return;
            }
            if (this.checkNull(this.orderContentTemp.fq_marriageStatus)) {
              this.$toast("客户信息-婚姻状况不能为空");
              return;
            }
            if (this.checkNull(this.orderContentTemp.fq_highestEducation)) {
              this.$toast("客户信息-最高学历不能为空");
              return;
            }
            if (this.checkNull(this.orderContentTemp.fq_highestDegree)) {
              this.$toast("客户信息-最高学位不能为空");
              return;
            }
            if (this.checkNull(this.orderContentTemp.fq_workName)) {
              this.$toast("客户信息-工作单位不能为空");
              return;
            }
            if (this.checkNull(this.orderContentTemp.fq_occupation)) {
              this.$toast("客户信息-单位所属行业不能为空");
              return;
            }
            if (this.checkNull(this.orderContentTemp.fq_vocationCode)) {
              this.$toast("客户信息-职业不能为空");
              return;
            }
            if (this.checkNull(this.orderContentTemp.fq_position)) {
              this.$toast("客户信息-职务不能为空");
              return;
            }
            if (this.checkNull(this.orderContentTemp.fq_mailAddress)) {
              this.$toast("客户信息-通讯/送达地址不能为空");
              return;
            }
            if (this.checkNull(this.orderContentTemp.fq_mailAddressCode)) {
              this.$toast("客户信息-通讯/送达地址邮编不能为空");
              return;
            }
            setTimeout(() => {
              this.$toast.loading({
                message: "加载中...",
                forbidClick: true,
                loadingType: "spinner",
                duration: 0,
              });
              ajaxPostPlus(apiUrl.collateralBuildFlow, this.pullData)
                .then((res) => {
                  this.$toast.clear();
                  this.$toast("推送风险缓释成功，请前往电脑端操作");
                })
                .catch((err) => {
                  this.$toast.clear();
                  console.log("请求错误" + JSON.stringify(err));
                });
            }, 1500);
          })
          .catch((err) => {
            this.$toast.clear();
            console.log("请求错误" + JSON.stringify(err));
          });
      } else {
        //客户信息跳进来不需要校验
        this.pullData = this.$route.query.pullData;
        console.log(
          "推送传参vvvvvvvvvvvvvvvvvvvvvvvv=" + JSON.stringify(this.pullData)
        );

        setTimeout(() => {
          this.$toast.loading({
            message: "加载中...",
            forbidClick: true,
            loadingType: "spinner",
            duration: 0,
          });
          ajaxPostPlus(apiUrl.collateralBuildFlow, this.pullData)
            .then((res) => {
              this.$toast.clear();
              this.$toast("推送风险缓释成功，请前往电脑端操作");
            })
            .catch((err) => {
              this.$toast.clear();
              console.log("请求错误" + JSON.stringify(err));
            });
        }, 1000);
      }
      //房产信息非空校验
      //推送风险缓释
    },
    getManager() {
      ajaxPostPlus(apiUrl.CreditApplicationDetails, {
        creditApplyId: this.creditApplyId,
      })
        .then((res) => {
          console.log("qqqqq" + JSON.stringify(res));
          this.managerId = res.custMgrId;
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
          console.log("请求错误" + JSON.stringify(err));
        });
    },
  },
  mounted() {
    // this.getData();
    console.log("aaaaa--" + this.creditApplyId);

    this.$toast.loading({
      duration: 0, // 持续展示 toast
      forbidClick: true,
      message: "加载中...",
      loadingType: "spinner",
    });

    console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvv" + this.creditApplyId);
    this.getRisk();
    this.getList();
    console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm" + this.flowId);
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
.bj {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
.Application {
  margin-top: 46px;
}
.content {
  background-color: #ffffff;
  margin-top: 12px;
}
/* 按钮 */
.finish {
  padding: 48px;
  display: flex;
  flex-direction: row;
}
.push {
  width: 40%;
  background: var(--color-orange-text);
  color: #ffffff;
  font-size: var(--size-text-small);
  height: 40px;
  border-radius: 50px;
  border: none;
}
.finish_button {
  margin-right: 30px;
  width: 40%;
  background: var(--color-orange-text);
  color: #ffffff;
  font-size: var(--size-text-small);
  height: 40px;
  border-radius: 50px;
  border: none;
}
/*.margin_style {
  margin: 0 15px;
}*/
</style>