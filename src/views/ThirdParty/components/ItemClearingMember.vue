<template>
  <!-- 清算负责人 -->
  <div>
    <item-cutting-line v-if="lineShow"></item-cutting-line>
    <div class="clearing-div" @click="onClick">
      <div class="clearing-title">{{ item.title }}</div>
      <div class="clearing-subhead">{{ item.subhead }}</div>
      <van-row type="flex">
        <van-col span="4" v-for="(it, ii) in item.member" :key="ii">
          <div class="clearing-icon">
            <img :src="it.img" />
            <div>{{ it.name }}</div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import ItemCuttingLine from "./ItemCuttingLine";
export default {
  name: "ItemClearingMember",
  components: { ItemCuttingLine },
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
      default: {
        title: "清算负责人",
        subhead: "清算组成员",
        member: [
          { img: require("@/assets/img/heard_icon.png"), name: "小红" },
          { img: require("@/assets/img/heard_icon.png"), name: "小红" },
          { img: require("@/assets/img/heard_icon.png"), name: "小红" },
        ],
      },
    },
    lineShow: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
  computed: {},
};
</script>

<style scoped>
.fixfloat::after {
  overflow: hidden;
  content: "";
  display: block;
  clear: both;
}
.clearing-div {
  font-size: 15px;
  padding: 15px 12px;
  background: white;
}
.clearing-title {
  color: #272727;
}
.clearing-subhead {
  color: #8d8d8d;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 15px;
}
.clearing-icon {
  text-align: center;
}
.clearing-icon img {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
.clearing-icon {
  color: #5a5a5a;
}
</style>