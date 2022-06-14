<template>
  <div class="TuneRefuse">
    <item-nav-bar :title="title"></item-nav-bar>
    <div class="content">
      <Top />
      <div>
        <div class="item_content">
          <span class="word">
            驳回原因
            <span id="icon">*</span>
          </span>
          <div class="right_div" @click="showPicker = true">
            <span
              class="word"
              :class="[cont.name == '请选择' ? 'gray_col' : 'black_col']"
              >{{ cont.name }}</span
            >
            <img src="@/assets/img/lb_jr_icon.png" />
          </div>
        </div>
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            title="驳回原因"
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
            value-key="itemName"
          />
        </van-popup>
      </div>
      <Top />
      <div class="content2">
        <!-- <p class="word">
          备注
          <span class="necessarily">*</span>
        </p>
        <van-field
          class="fied"
          v-model="message"
          rows="3"
          autosize
          type="textarea"
          placeholder="请输入"
          size="14px"
        /> -->
        <my-textarea
          myTitle="备注"
          placeholder="请输入"
          v-model="message"
        ></my-textarea>
      </div>
    </div>
    <div class="bottom_div" @click="resSubmit">
      <van-button class="button" round type="info" color="#ff6619" size="large"
        >提交</van-button
      >
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import Top from "@/components/module/Top.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
import MyTextarea from "./components/MyTextarea.vue";

export default {
  name: "shenpiRefuse",
  components: { "item-nav-bar": ItemNavBar, Top, MyTextarea },
  data() {
    return {
      title: "审批结果",
      message: "",
      cont: {
        name: "请选择",
        code: "",
      },
      showPicker: false,
      columns: [],
      item: {},
      orderContent: {},
      closeNum: 0, //计数器
      closeTag: 2, //拦截固定值，请求次数
      orderAttachment: "",
      orderOther: "",
    };
  },
  mounted() {
    // var itemTemp = this.$route.query.item;
    // this.item = JSON.parse(itemTemp);
    // console.log("this.$route.query.item = " + JSON.stringify(this.item));
    this.item.flowId = this.$route.query.flowId;
    this.item.currentNodeTaskId = this.$route.query.currentNodeTaskId;

    this.$toast.loading({
      duration: 0, // 持续展示 this.$toast
      forbidClick: true,
      message: "加载中...",
      loadingType: "spinner",
    });

    this.getOrderContent();
    this.getDictCode();
  },
  methods: {
    onConfirm(value) {
      this.cont = {
        name: value.itemName,
        code: value.itemKey,
      };
      this.showPicker = false;
    },
    resSubmit() {
      if (this.checkNull(this.cont.code)) {
        this.$toast("请选择驳回原因");
        return;
      }
      if (this.checkNull(this.message)) {
        this.$toast("请填写备注");
        return;
      }
      this.$toast.loading({
        duration: 0, // 持续展示
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });

      var data = {
        creditApproveCode: this.cont.code, //驳回原因
        flowIdList: [this.item.flowId], //	流程编号List<String>
        orderAttachment: this.orderAttachment, //进件附件
        orderOther: this.orderOther,
        orderContent: this.orderContent, //进件详情
        reply: "7", //审批结果 驳回
        orderId: this.item.flowId, //工作流编号
        taskId: this.item.currentNodeTaskId, //	任务编号
        operator: localStorage.getItem("operatorId"), //	操作人
        fraudPost: "0",
        context: this.message,
      };
      ajaxPostPlus(apiUrl.submit, data)
        .then((res) => {
          this.$toast.clear();
          //{"responseType":"HSJRY_SUCCESS","data":null,"httpStatus":200,"errorMessage":null,"errorCode":null,"rpcResult":"000000","parentIdemSerialId":null}
          this.$toast("审批成功");
          setTimeout(() => {
            this.$router.go(-2);
          }, 500);
        })
        .catch((err) => {
          this.$toast.clear();
          this.$toast("审批失败");
        });
    },
    getOrderContent() {
      var data = {
        flowId: this.item.flowId,
      };
      ajaxPostPlus(apiUrl.queryOrderContent, data)
        .then((res) => {
          this.closeLoading();
          this.orderContent = res.orderContent;
          this.orderAttachment = res.orderAttachment;
          this.orderOther = res.orderOther;
          // this.$toast.clear();
        })
        .catch((err) => {
          this.closeLoading();
          // this.$toast.clear();
        });
    },
    getDictCode() {
      var data = {
        dictKeys: ["overrule_code"],
      };
      ajaxPostPlus(apiUrl.QueryDictKeys, data)
        .then((res) => {
          this.closeLoading();
          this.columns = res.dictItemMap.overrule_code;
        })
        .catch((err) => {
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
    },
  },

  computed: {},
};
</script>
<style>
.van-field__control {
  font-size: var(--size-text-small);
}
</style>
<style scoped>
.TuneRefuse {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
.content {
  padding-top: 46px;
  width: 100%;
}
.content2 {
  width: 100%;
  height: 150px;
  border-top: 1px solid var(--color-Lightgray-bg);
  border-bottom: 1px solid var(--color-Lightgray-bg);
  background-color: #fff;
}
.content2 p {
  margin: 0;
  padding: 15px 0 0 15px;
  /* font-size: 14px; */
}
.bottom_div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: fixed;
  left: 0;
  bottom: 20px;
  box-sizing: border-box;
  padding: 0 12px;
}
.item_content {
  padding: 0 18px;
  background-color: white;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  font-size: var(--size-text-small);
  align-items: center;
}
.item_content > span {
  color: #333333;
}
.right_div {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 200px;
  align-items: center;
  justify-content: flex-end;
}
.right_div img {
  height: 14px;
  margin-left: 6px;
}
.right_div span {
  font-size: var(--size-text-small);
}
.black_col {
  color: var(--color-edit-text);
}
.gray_col {
  color: var(--color-edit-text);
}
.button {
  height: 40px;
}
#icon {
  color: red;
}
span.word {
  font-size: var(--size-text-small);
}
p.word {
  font-size: var(--size-text-small);
}
.fied {
  color: var(--color-edit-text);
  padding: 5px 15px;
}
.necessarily {
  color: rgba(255, 0, 0);
}
</style>