<template>
  <!-- 申请信息 -->
  <div class="content" @click="btn">
    <p class="left">{{ title }}</p>
    <p class="right">
      <!-- <img src="@/assets/img/lb_jr_icon.png" alt=""> -->
      <van-image
        width="7px"
        height="12px"
        fit="contain"
        :src="require('@/assets/img/lb_jr_icon.png')"
      />
    </p>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    title: String,
    href: String,
    type: String,
    certificateNo: String,
    creditApplyId: String,
    loanApplyId: String,
    flowId: String,
    randomID: String,
    flag: String,
    currentNodeCode: String,
    loanApplyId: String,
    applyId: String,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    btn() {
      if (this.href == "ImageData") {
        this.$router.push({
          name: `${this.href}`,
          params: {
            flag: this.flag,
            flowId: this.flowId,
            title: this.title,
            loanApplyId: this.loanApplyId,
          }, //flag 支用申请2  授信里面 1
        });
      } else {
        this.$router.push({
          path: `/${this.href}`,
          query: {
            title: this.title,
            type: this.type,
            certificateNo: this.certificateNo,
            creditApplyId: this.creditApplyId,
            loanApplyId: this.loanApplyId,
            flowId: this.flowId,
            applyId: this.applyId,
            randomID: this.randomID,
            loanApplyId: this.loanApplyId,
            currentNodeCode: this.currentNodeCode,
          },
        });
      }
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
  background-color: #fff;
  /* border: 1px solid #eeeeee; */
  border-bottom: 1px solid var(--color-Lightgray-bg);
  font-size: var(--size-text-small);
}

p {
  padding: 0;
  margin: 0;
}
/* p.right {
  display: flex;
} */
span.cunt {
  display: table-cell;
  padding-right: 10px;
  color: blue;
}
</style>