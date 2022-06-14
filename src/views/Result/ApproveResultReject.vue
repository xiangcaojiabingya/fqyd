<template>
  <div>
    <item-nav-bar title="审批结果"></item-nav-bar>

    <div class="body-margin-top">
      <item-cutting-line :lineColor="'#F5F6F7'"></item-cutting-line>
      <item-one-row
        v-for="(item, index) in resCode"
        :key="index"
        :item="item"
        :arrow="true"
        :textColor="
          item.content == '请选择'
            ? 'var(--color-edit-text)'
            : 'var(--color-edit-text)'
        "
        @click.native="selectCode(index)"
      ></item-one-row>
      <van-popup v-model="show" position="bottom">
        <!-- :style="{ height: '30%' }" round -->
        <van-picker
          title="拒绝码"
          show-toolbar
          :columns="actions"
          @confirm="onConfirm"
          @cancel="onCancel"
          @change="onChange"
          value-key="itemName"
        />
      </van-popup>

      <my-textarea myTitle="备注" placeholder="请输入" v-model="suggestion"></my-textarea>
      <div class="div-submit" @click="resSubmit">提交</div>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import ItemCuttingLine from "@/components/common/ItemCuttingLine.vue";
import ItemOneRow from "@/views/Result/components/ItemOneRow.vue";
import MyTextarea from "@/views/Result/components/MyTextarea.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
export default {
  name: "ApproveResultReject", //审批结果 - 拒绝
  components: { ItemNavBar, ItemCuttingLine, ItemOneRow, MyTextarea },
  data() {
    return {
      resCode: [
        {
          title: "拒绝码",
          content: "请选择",
          code: ""
        },
        {
          title: "拒绝码",
          content: "请选择",
          code: ""
        },
        {
          title: "拒绝码",
          content: "请选择",
          code: ""
        }
      ],
      show: false,
      actionsArray: {
        actions0: [],
        actions1: [],
        actions2: []
      },
      actions: [],
      suggestion: "",
      indexTag: 0,
      item: {},
      orderContent: {},
      closeNum: 0, //计数器
      closeTag: 2, //拦截固定值，请求次数
      orderAttachment: "",
      orderOther: ""
    };
  },
  mounted() {
    // console.log(this.$router.history.current.name);

    // var itemTemp = this.$route.query.item;
    // this.item = JSON.parse(itemTemp);
    this.item.flowId = this.$route.query.flowId;
    this.item.currentNodeTaskId = this.$route.query.currentNodeTaskId;

    this.$toast.loading({
      duration: 0, // 持续展示 this.$toast
      forbidClick: true,
      message: "加载中...",
      loadingType: "spinner"
    });

    this.getOrderContent();
    this.getDictCode();
  },
  methods: {
    selectCode(index) {
      this.indexTag = index;
      switch (index) {
        case 0:
          this.actions = this.actionsArray.actions0;
          break;
        case 1:
          this.actions = this.actionsArray.actions1;
          break;
        default:
          this.actions = this.actionsArray.actions2;
          break;
      }
      this.show = true;
    },

    onConfirm(value, index) {
      this.show = false;
      this.resCode[this.indexTag].content = value.itemName;
      this.resCode[this.indexTag].code = value.itemKey;
    },
    onChange(picker, value, index) { },
    onCancel() {
      this.show = false;
    },
    resSubmit() {
      if (
        this.checkNull(this.resCode[0].code) ||
        this.checkNull(this.resCode[1].code) ||
        this.checkNull(this.resCode[2].code)
      ) {
        this.$toast("请选择拒绝码");
        return;
      }
      if (this.checkNull(this.suggestion)) {
        this.$toast("请填写申请意见");
        return;
      }
      this.$toast.loading({
        duration: 0, // 持续展示 this.$toast
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner"
      });
      var refuseCode =
        this.resCode[0].code +
        "," +
        this.resCode[1].code +
        "," +
        this.resCode[2].code;
      var data = {
        refuseCode: refuseCode, //拒绝码 //"HC,JC3,JB03"
        flowIdList: [this.item.flowId], //	流程编号List<String>
        orderAttachment: this.orderAttachment, //进件附件
        orderOther: this.orderOther,
        orderContent: this.orderContent, //进件详情
        reply: "1", //审批结果 拒绝
        orderId: this.item.flowId, //工作流编号
        taskId: this.item.currentNodeTaskId, //	任务编号
        operator: localStorage.getItem("operatorId"), //	操作人
        fraudPost: "0",
        context: this.suggestion
      };
      console.log("提交请求参数=" + JSON.stringify(data));

      ajaxPostPlus(apiUrl.submit, data)
        .then(res => {
          this.$toast.clear();
          //{"responseType":"HSJRY_SUCCESS","data":null,"httpStatus":200,"errorMessage":null,"errorCode":null,"rpcResult":"000000","parentIdemSerialId":null}
          this.$toast("审批成功");
          setTimeout(() => {
            this.$router.go(-2);
          }, 500);
        })
        .catch(err => {
          this.$toast.clear();
          this.$toast("审批失败");
        });
    },
    getOrderContent() {
      var data = {
        flowId: this.item.flowId
      };
      ajaxPostPlus(apiUrl.queryOrderContent, data)
        .then(res => {
          this.orderContent = res.orderContent;
          this.orderAttachment = res.orderAttachment;
          this.orderOther = res.orderOther;
          // this.$toast.clear();
          this.closeLoading();
        })
        .catch(err => {
          // this.$toast.clear();
          this.closeLoading();
        });
    },
    getDictCode() {
      var data = {
        dictKeys: [
          "CREDIT_JJDM", //
          "CREDIT_JJDM_2", //
          "CREDIT_JJDM_3" //
        ]
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, data)
        .then(res => {
          this.closeLoading();
          this.actionsArray.actions0 = res.dictItemMap.CREDIT_JJDM;
          this.actionsArray.actions1 = res.dictItemMap.CREDIT_JJDM_2;
          this.actionsArray.actions2 = res.dictItemMap.CREDIT_JJDM_3;
        })
        .catch(err => {
          this.closeLoading();
          console.log("QueryDictKeysErr = " + JSON.stringify(err));
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
    closeLoading() {
      this.closeNum += 1;
      if (this.closeNum >= this.closeTag) {
        this.$toast.clear();
      }
    }
  },

  activated() { }
};
</script>

<style scoped>
.title-class {
  font-size: 14px;
}
.div-submit {
  position: fixed;
  bottom: 0;
  background: var(--color-orange-text);
  width: calc(
    100% - var(--size-margin-leftright) - var(--size-margin-leftright)
  );
  margin: 0 var(--size-margin-leftright) var(--size-margin-bottom)
    var(--size-margin-leftright);
  color: white;
  text-align: center;
  font-size: 16px;
  line-height: var(--size-bottom-btn);
  border-radius: 22px;
}
</style>