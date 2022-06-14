<template>
  <!-- 申请信息 -->
  <div class="content" @click="btn">
    <p class="left">{{ title }}</p>
    <p class="right">
      <!-- <img src="../../assets/img/lb_jr_icon.png" alt=""> -->
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
  props: { title: String, href: String, info: Object, type: String },
  data() {
    return {};
  },
  created() { },
  methods: {
    btn() {
      this.$store.commit("setPassInfo", {
        info: this.info,
      });
      if (this.href) {
        this.$router.push({
          path: `/${this.href}`,
          query: {
            title: this.title,
            type: this.type,
            info: JSON.stringify(this.info),//对象转为字符串才能传递
          },
        });
      }

    },
  },
  computed: {},
  mounted() { },
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 20px;
  background-color: #fff;
  border-bottom: 1px solid var(--color-Lightgray-bg);
  font-size: var(--size-text-small);
  min-height: 30px;
  color: #333333;
}

p {
  padding: 0;
  margin: 0;
}
span.cunt {
  display: table-cell;
  padding-right: 10px;
  color: blue;
}
</style>