<template>
  <!--带title的list卡片的item-->
  <div class="mains">
    <div class="company_info_item">
      <div class="top_div" v-if="itemInfo.title != ''">
        <span>{{ top_title }}</span>
        <div class="right_to_div" v-if="itemInfo.state != ''">
          <span class="state_sapn">{{ top_state }}</span>
          <img
            src="@/assets/img/lb_jr_icon.png"
            class="margin_img"
            v-if="itemInfo.isShowToRight"
          />
        </div>
      </div>
      <div class="info_div">
        <span class="title_spans">{{ itemInfo.title1 }}：</span>
        <span>{{ value1 }}</span>
      </div>
      <div class="info_div" v-if="itemInfo.title2 != ''">
        <span class="title_spans">{{ itemInfo.title2 }}：</span>
        <span>{{ value2 }}</span>
      </div>
      <div class="info_div" v-if="itemInfo.title3 != ''">
        <span class="title_spans">{{ itemInfo.title3 }}：</span>
        <span>{{ value3 }}</span>
      </div>
      <div class="info_div" v-if="itemInfo.title4 != '' ? true : false">
        <span class="title_spans">{{ itemInfo.title4 }}：</span>
        <span>{{ value4 }}</span>
      </div>
    </div>
    <img src="@/assets/img/lb_jr_icon.png" v-if="isShow" />
  </div>
</template>

<script>
export default {
  name: "TitleListCardItem",
  components: {},
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {
          title: "title",
          title1: "title1",
          title2: "title2",
          title3: "title3",
          title4: "title4",
          isShowToRight: "true",
          state: "",
        };
      },
    },
    title: { type: String, default: "" },
    value1: { type: String, default: "-" },
    value2: { type: String, default: "-" },
    value3: { type: String, default: "-" },
    state: { type: String, default: "-" },
    value4: { type: String, default: "-" },
  },
  data() {
    return {};
  },
  computed: {
    top_title() {
      return this.title == "" ? this.itemInfo.title : this.title;
    },
    top_state() {
      return this.title == "" ? this.itemInfo.state : this.state;
    },
    isShow() {
      if (this.itemInfo.state == "" && this.itemInfo.isShowToRight == true) {
        return true;
      }
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
.company_info_item {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  padding-bottom: 12px;
}
.top_div {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 0px 0px 12px;
  box-sizing: border-box;
  font-size: 16px;
}
.state_sapn {
  color: #8d8d8d;
  font-size: 14px;
  text-align: end;
}
.info_div {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 5px 0px 12px;
  display: flex;
  font-size: 14px;
  align-items: center;
  color: #8d8d8d;
}
.info_div span:last-child {
  word-break: break-all;
  word-wrap: break-word;
}
.line_div {
  width: 100%;
  height: 8px;
  background: var(--color-Lightgray-bg);
  margin-top: 12px;
}
.title_spans {
  min-width: 70px;
}
.mains {
  width: 100%;
  padding-right: 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: white;
  margin: 12px 0;
}
img {
  height: 14px;
}
.right_to_div {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.margin_img {
  margin-left: 6px;
}
</style>
