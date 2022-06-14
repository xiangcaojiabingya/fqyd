<template>
  <div class="correlationInfo">
    <item-nav-bar :title="title"></item-nav-bar>
    <van-tabs
      v-model="active"
      line-width="25%"
      title-active-color="#ff6619"
      title-inactive-color="#737373"
      color="#ff6619"
      offset-top="46px"
      sticky
      class="tabs_class"
    >
      <van-tab title="收入信息" title-style="font-size:15px">
        <div class="top_size">
          <div class="emptytxt" v-if="shouRuShow">暂无数据</div>
          <div class="card_div">
            <div class="card_item">
              <span>税前收入</span>
              <span>{{ pretaxIncome }}</span>
            </div>
            <div class="card_item">
              <span>收入来源</span>
              <span>{{ incomeSource }}</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="房产信息" title-style="font-size:15px">
        <div class="top_size">
          <div class="emptytxt" v-if="fangChanShow">暂无数据</div>
          <div
            class="card_div"
            v-for="(item, index) in netWorkData.userRealEstateResourcesBoList"
            :key="index"
            v-show="!fangChanShow"
          >
            <div class="card_item">
              <span>购房时间</span>
              <span>{{ item.getDate==null?"--":item.getDate.substring(0,10) }}</span>
            </div>
            <div class="card_item">
              <span>总价</span>
              <span>{{ item.payCost }}</span>
            </div>
            <div class="card_item">
              <span>面积</span>
              <span>{{ item.areaCovered }}</span>
            </div>
            <div class="card_item">
              <span>地址</span>
              <span>{{ item.address }}</span>
            </div>
            <div class="card_item">
              <span>房产所有人</span>
              <span>{{ item.resourceOwner }}</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="车辆信息" title-style="font-size:15px">
        <div class="top_size">
          <div class="emptytxt" v-if="cheLiangShow">暂无数据</div>
          <div
            class="card_div"
            v-for="(item, index) in netWorkData.userVehicleInfoBoList"
            :key="index"
            v-show="!cheLiangShow"
          >
            <div class="card_item">
              <span>购车时间</span>
              <span>{{ item.purchaseTime==null?"--":item.purchaseTime.substring(0,10) }}</span>
            </div>
            <div class="card_item">
              <span>总价</span>
              <span>{{ item.purchasePrice }}</span>
            </div>
            <div class="card_item">
              <span>车牌号</span>
              <span>{{ item.plateNumber }}</span>
            </div>
            <div class="card_item">
              <span>车辆品牌</span>
              <span>{{ item.vehicleBrand }}</span>
            </div>
            <div class="card_item">
              <span>车辆型号</span>
              <span>{{ item.vehicleTypeSpecification }}</span>
            </div>
            <div class="card_item">
              <span>车辆所有人</span>
              <span>{{ item.vehicleOwner }}</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="金融资产" title-style="font-size:15px">
        <div class="top_size">
          <div class="emptytxt" v-if="jinRongShow">暂无数据</div>
          <div
            class="card_div"
            v-for="(item, index) in netWorkData.userFinancialAssetsBoList"
            :key="index"
            v-show="!jinRongShow"
          >
            <div class="card_item">
              <span>资产类型</span>
              <span>{{ item.assetType }}</span>
            </div>
            <div class="card_item">
              <span>资产金额</span>
              <span>{{ item.assetAmount }}</span>
            </div>
            <div class="card_item">
              <span>资产到期日</span>
              <span>{{ item.assetValidityPeriod==null?"--":item.assetValidityPeriod.substring(0,10) }}</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import { ajaxPostPlus, apiUrl } from "@/api.js";
export default {
  components: { ItemNavBar },
  name: "Contact",
  data() {
    return {
      requestData: {
        //请求报文
        dimension: "1",
        dimensionId: JSON.parse(this.$route.query.info).userId,
        resourceTypeList: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
        ],
      },
      active: 0,
      netWorkData: {},
      title: "资产信息",
      shouRuShow: false,
      fangChanShow: false,
      cheLiangShow: false,
      jinRongShow: false,
      pretaxIncome: "",
      incomeSource: "",
    };
  },
  methods: {
    getData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0, // 持续展示 toast
      });
      ajaxPostPlus(apiUrl.queryResource, this.requestData)
        .then((result) => {
          this.netWorkData = result;
          console.log("资产信息" + JSON.stringify(this.netWorkData));
          if (
            this.netWorkData.userIncomeFundInfoBoList != null &&
            this.netWorkData.userIncomeFundInfoBoList.length > 0
          ) {
            //收入信息
            this.netWorkData.userIncomeFundInfoBoList.forEach((element) => {
              this.pretaxIncome = element.pretaxIncome;
              this.incomeSource = element.incomeSource;
              console.log("aaa" + JSON.stringify(this.pretaxIncome));
              if (element.pretaxIncome == null) {
                this.pretaxIncome = "--";
              }
              if (element.incomeSource == null) {
                this.incomeSource = "--";
              }
            });
          } else {
            this.pretaxIncome = "--";
            this.incomeSource = "--";
          }
          if (
            this.netWorkData.userRealEstateResourcesBoList != null &&
            this.netWorkData.userRealEstateResourcesBoList.length > 0
          ) {
            //房产信息
            this.fangChanShow = false;
          } else {
            this.fangChanShow = true;
          }
          if (
            this.netWorkData.userVehicleInfoBoList != null &&
            this.netWorkData.userVehicleInfoBoList.length > 0
          ) {
            //车辆信息
            this.cheLiangShow = false;
          } else {
            this.cheLiangShow = true;
          }
          if (
            this.netWorkData.userFinancialAssetsBoList != null &&
            this.netWorkData.userFinancialAssetsBoList.length > 0
          ) {
            //金融资产
            this.jinRongShow = false;
          } else {
            this.jinRongShow = true;
          }
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
  },
  computed: {},
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
.correlationInfo {
  font-size: 14px;
  padding: 0px 0 12px 0;
}
.top_size {
  padding-top: 46px;
  padding-bottom: 12px;
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
.tabs_class {
  z-index: 9999;
}
.emptytxt {
  padding: 15px;
  font-size: 14px;
  color: #999999;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  box-sizing: border-box;
}
</style>
