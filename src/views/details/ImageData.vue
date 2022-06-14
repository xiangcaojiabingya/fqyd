<template>
  <!-- 详情之影像资料展示公共页 ,具体是哪个看上页传值flag，flag的值对应见@/assets/js/ImageData.js-->
  <div class="main">
    <item-nav-bar :title="title" />
    <div class="card">
      <image-data-show
        v-for="(item, index) in imgData"
        :key="index"
        :imagetype="flag == '5' ? item.imageKind : getTypeInfo(item.imageKind)"
        :imgList="item.imgList"
      />
    </div>
    <div v-if="noMsg" class="no_message">暂无数据</div>
  </div>
</template>

<script>
import { disableWebViewScreenShot, cancelNoScreenShot } from "@/utils/index.js";
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import ImageDataShow from "@/components/common/ImageDataShow.vue";
import { getImageData, dealImgList } from "@/utils/ImageData.js";
import { codeToValue, isHasData } from "@/utils/index.js";
import { ajaxPostPlus, apiUrl } from "@/api.js";

export default {
  name: "ImageData",
  components: { ImageDataShow, ItemNavBar },
  props: {},
  data() {
    return {
      flag: "", //上页传过来的哪页影像资料的标志flag,flag的值对应见@/assets/js/ImageData.js
      creditApplyId: "", //授信申请Id
      netWorkImgData: {}, //网络请求获得的数据
      imgData: [],
      typeList: [],
      noMsg: false,
      flowId: "",
      info: "",
      loanApplyId: "",
      title: "影像资料",
    };
  },
  computed: {},
  created() {
    console.log("从审批或查询进入=" + JSON.stringify(this.$route.params));
    console.log("从客户查询=" + this.$route.query.type);
    console.log("cc==" + this.$route.params.loanApplyId);

    // 从审批跳转过来
    if (this.$route.params.flag != undefined) {
      this.flag = this.$route.params.flag;
    }
    //flag 支用申请2  授信里面 1   客户5
    if (this.$route.params.loanApplyId != undefined) {
      this.loanApplyId = this.$route.params.loanApplyId;
    }
    if (this.$route.params.flowId != undefined) {
      this.flowId = this.$route.params.flowId;
    }
    // 从客户查询跳转过来
    if (this.$route.query.type != undefined) {
      console.log("1111111====" + JSON.stringify(this.$route.query));
      this.flag = this.$route.query.type;
    }
    if (this.$route.query.info != undefined) {
      this.info = JSON.parse(this.$route.query.info);
    }
    if (this.$route.params.title != undefined) {
      this.title = this.$route.params.title;
    }
  },
  mounted() {
    this.$toast.loading({
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      duration: 0, // 持续展示 toast
    });
    this.getCodeList();
    disableWebViewScreenShot();
  },
  methods: {
    //处理数据字典
    getTypeInfo(code) {
      return codeToValue(this.typeList, code);
    },
    //获取网络数据
    getData() {
      console.log("flowId=" + this.flowId);
      if (this.flag == "5") {
        ajaxPostPlus(apiUrl.queryResource, {
          //请求报文
          dimension: "1",
          dimensionId: this.info.userId,
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
        })
          .then((res) => {
            console.log(
              " -影像资料：" + JSON.stringify(res.userImageDataBoList)
            );
            if (isHasData(res.userImageDataBoList)) {
              this.netWorkImgData = res.userImageDataBoList;
              this.imgData = dealImgList("YX1", this.netWorkImgData);
              this.noMsg = false;
            } else {
              this.$toast("暂无数据");
              this.noMsg = true;
            }
            this.$toast.clear();
          })
          .catch((err) => {
            console.log(" -影像资料请求错误" + JSON.stringify(err));
            this.$toast.clear();
          });
      }
      // else if (this.flag == "2") {
      //   ajaxPostPlus(apiUrl.ApplicationDetails, {
      //     loanApplyId: this.loanApplyId,
      //   })
      //     .then((res) => {
      //       console.log(" 支用申请=" + JSON.stringify(res));
      //       if (isHasData(res)) {
      //         if (isHasData(res.attachmentDtoList)) {
      //           this.netWorkImgData = res.attachmentDtoList;
      //           console.log(
      //             "this.netWorkImgData=" + JSON.stringify(this.netWorkImgData)
      //           );
      //           this.imgData = dealImgList("YX2", this.netWorkImgData);
      //           console.log("展示列表" + JSON.stringify(this.imgData));
      //           this.noMsg = false;
      //           if (this.imgData != []) {
      //             this.$toast.clear();
      //           }
      //         } else {
      //           this.$toast("暂无数据");
      //           this.noMsg = true;
      //           this.$toast.clear();
      //         }
      //       } else {
      //         this.$toast("暂无数据");
      //         this.noMsg = true;
      //         this.$toast.clear();
      //       }
      //     })
      //     .catch((err) => {
      //       console.log(" -影像资料请求错误" + JSON.stringify(err));
      //       this.$toast.clear();
      //     });
      // }
      else if (this.flag == "1" || this.flag == "2") {
        ajaxPostPlus(apiUrl.queryOrderContent, {
          flowId: this.flowId,
        })
          .then((res) => {
            console.log(" 授信影像资料=" + JSON.stringify(res));
            if (isHasData(res)) {
              if (isHasData(res.orderAttachment)) {
                this.netWorkImgData = JSON.parse(res.orderAttachment);
                console.log(
                  "this.netWorkImgData=" + JSON.stringify(this.netWorkImgData)
                );
                this.imgData = dealImgList("YX2", this.netWorkImgData);
                console.log("授信展示列表" + JSON.stringify(this.imgData));
                this.noMsg = false;
                if (this.imgData != []) {
                  this.$toast.clear();
                }
              } else {
                this.$toast("暂无数据");
                this.noMsg = true;
                this.$toast.clear();
              }
            } else {
              this.$toast("暂无数据");
              this.noMsg = true;
              this.$toast.clear();
            }
          })
          .catch((err) => {
            console.log(" -影像资料请求错误" + JSON.stringify(err));
            this.$toast.clear();
          });
      }
    },
    //获取数据字典---信息类别
    getCodeList() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0, // 持续展示 toast
      });
      ajaxPostPlus(apiUrl.QueryDictKeys, {
        //请求报文
        dictKeys: ["image_kind"],
      })
        .then((result) => {
          // console.log("信息类别：" + JSON.stringify(result));
          this.typeList = result.dictItemMap.image_kind;
          this.getData();
        })
        .catch((err) => {
          console.log("-数据字典请求错误" + err);
          this.$toast.clear();
        });
    },
  },

  destroyed() {
    // 取消截屏（只在Android手机有用）
    cancelNoScreenShot();
  },
};
</script>

<style scoped>
.main {
  padding: 46px 0 12px;
}
.card {
  margin-top: 12px;
}
</style>
