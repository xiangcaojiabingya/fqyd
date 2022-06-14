<template>
  <div>
    <div v-if="isOk==true" @click="change">
      <van-collapse v-model="activeName" class="content2">
        <van-collapse-item class="nr" name="index" :title="title" value="请填写尽调信息">
          <div class="childs" v-for="(item, index) in content" :key="index" :value="item.title">
            <div class="resultChild" @click="btn2(item)">
              <span class="left">{{item.title}}</span>
              <span class="result_child">
                <span class="child2">去填写</span>
                <van-image
                  width="7px"
                  height="12px"
                  fit="contain"
                  :src="require('@/assets/img/lb_jr_icon.png')"
                />
              </span>
            </div>
            <!-- <van-divider class="line" /> -->
          </div>
        </van-collapse-item>
        <img class="tubiao" v-if="!show" src="@/assets/img/jdxx_xlq_icon.png" alt />
        <img class="tubiao" v-if="show" src="@/assets/img/jdxx_xlh_icon.png" alt />
      </van-collapse>
    </div>
    <!-- </div> -->
    <div v-else class="content" @click="btn">
      <p class="left">{{title}}</p>
      <p class="right">
        {{text}}
        <van-image
          width="7px"
          height="12px"
          fit="contain"
          :src="require('@/assets/img/lb_jr_icon.png')"
        />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  // props: ["title", "href", "isOk", "content"],
  props: {
    title: String,
    href: String,
    isOk: Boolean,
    content: Array,
    info: Object,
    flowId: String,
    creditApplyId: String,
    currentNodeTaskId: String,
    text: String,
    type: {
      type: String,
      default: "1",
    },
    randomID: String, //随机的id,用于刷新页面
    isDirectSkip: {
      type: Boolean,
      default: true,
    }, //是否直接跳转
  },
  data() {
    return {
      activeName: ["1"],
      show: false,
    };
  },
  created() { },
  methods: {
    btn() {
      if (this.isDirectSkip != undefined && this.isDirectSkip == false) {
        this.$emit("beforeSkip");
      } else {
        this.$router.push({
          path: `/${this.href}`,
          query: {
            flowId: this.flowId,
            creditApplyId: this.creditApplyId,
            currentNodeTaskId: this.currentNodeTaskId,
            type: this.type,
            randomID: this.randomID, //用于页面缓存时，刷新页面的随机id
          },
        });
      }
    },
    btn2(e) {
      this.$router.push({
        path: `/${e.href}`,
        // name: `${e.href}`,
        query: {
          name: e.name,
        },
      });
    },
    change() {
      this.show = !this.show;
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style>
/* .van-cell {
  color: black;
  padding: 13px 40px 13px 20px;
  background-color: #fff;
  font-size: 14px;
  line-height: 30px;
  color: #333333;
}
.van-cell__right-icon {
  color: black;
  font-size: 14px;
  display: none;
}
.van-cell__value {
  color: #ff6619;
  font-size: 12px;
}
.van-collapse-item__content {
  background-color: #fef6ef;
  padding: 0;
  margin: 0 20px 20px 20px;
}
.van-collapse-item__wrapper {
  background-color: #fff;
}
.van-image__img {
  margin-top: 2px;
} */
</style>
<style scoped>
.content {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
  background-color: #fff;
  border-bottom: 1px solid var(--color-Lightgray-bg);
  font-size: var(--size-text-small);
  color: #333333;
}
.resultChild {
  display: flex;
  justify-content: space-between;
}
.resultChild span.left {
  color: #333333;
}
.resultChild span.result_child {
  color: #ff6619;
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
.childs {
  padding: 20px 12px;
  font-size: 12px;
}
.tubiao {
  position: absolute;
  right: 20px;
  top: 24px;
  width: 12px !important;
}
.child2 {
  margin-right: 6px;
}
.right {
  color: #ff6619;
}
</style>