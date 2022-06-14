<template>
  <div class="TuneRefuse">
    <item-nav-bar :title="title"></item-nav-bar>
    <div class="content">
      <Top />
      <!-- <div class="content2">
        <p>
          拒绝原因
          <span class="necessarily">*</span>
        </p>
        <van-field
          v-model="message"
          rows="3"
          autosize
          type="textarea"
          placeholder="请输入"
          class="neirong"
        />
      </div>-->
      <my-textarea myTitle="拒绝原因" placeholder="请输入" v-model="message"></my-textarea>
    </div>
    <div class="bottom_div" @click="resSubmit">
      <van-button class="button" round type="info" color="#ff6619" size="large">提交</van-button>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import MyTextarea from './components/MyTextarea.vue';
import Top from "@/components/module/Top.vue";
import { apiUrl, ajaxPostPlus } from "@/api.js";
export default {
  name: "TuneRefuse",
  components: { "item-nav-bar": ItemNavBar, Top, MyTextarea },
  data() {
    return {
      title: "审批结果",
      message: "",
      item: {},
      orderContent: {},
      orderAttachment: {},
      orderOther: {},
    };
  },
  mounted() {
    // var itemTemp = this.$route.query.item;
    // this.item = JSON.parse(itemTemp);
    this.item.flowId = this.$route.query.flowId;
    this.item.currentNodeTaskId = this.$route.query.currentNodeTaskId;

    this.$toast.loading({
      duration: 0, // 持续展示 this.$toast
      forbidClick: true,
      message: "加载中...",
      loadingType: "spinner",
    });

    this.getOrderContent();
  },
  methods: {
    resSubmit() {
      if (this.checkNull(this.message)) {
        this.$toast("请填写拒绝原因");
        return;
      }
      this.$toast.loading({
        duration: 0, // 持续展示
        forbidClick: true,
        message: "加载中...",
        loadingType: "spinner",
      });

      var data = {
        // flowIdList: [this.item.flowId], //	流程编号List<String>
        orderContent: this.orderContent, //进件详情
        reply: "1", //审批结果 拒绝
        orderId: this.item.flowId, //工作流编号
        taskId: this.item.currentNodeTaskId, //	任务编号
        operator: localStorage.getItem("operatorId"), //	操作人
        orderAttachment: this.orderAttachment,
        orderOther: this.orderOther,
        fraudPost: "0",
        context: this.message,
        refuseCode: 'undefined'
      };
      console.log("提交请求参数=" + JSON.stringify(data));

      ajaxPostPlus(apiUrl.submit, data)
        .then((res) => {
          this.$toast.clear();
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
          this.orderContent = res.orderContent;
          this.orderAttachment = res.orderAttachment;
          this.orderOther = res.orderOther;
          this.$toast.clear();
        })
        .catch((err) => {
          this.$toast.clear();
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
  padding: 0;
  padding: 15px 0 0 15px;
  font-size: var(--size-text-small);
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
.button {
  height: 40px;
}
.neirong {
  padding: 10px 16px;
  color: var(--color-edit-text);
}
.necessarily {
  color: rgba(255, 0, 0);
}
</style>