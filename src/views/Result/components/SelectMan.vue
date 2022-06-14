<template>
  <!-- 选择下一处理人组件（已用） -->
  <div class="card_div">
    <div class="card_title">{{ cardTitle }}</div>
    <div class="man_list" v-if="manList.length <= 0 ? false : true">
      <div
        class="man_item"
        v-for="(item, index) in manList"
        :key="index"
        @click="(custIndex==-1)&& selectFun(index)"
      >
        <van-image class="select_img" :src="index === isSelect ? selectImg[0] : selectImg[1]" />
        <div class="select_name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectMan",
  components: {},
  props: { cardTitle: String, manList: Array, custIndex: Number },
  data() {
    return {
      isSelect: "", //被选中
      selectImg: [
        require("@/assets/img/selected_icon.png"),
        require("@/assets/img/unselected_icon.png"),
      ],
    };
  },
  computed: {},
  created() {},
  mounted() {
    console.log("------custIndex----select---", this.custIndex);
    //fh-fuhe岗位选择下一审批人时，默认选中客户经理，其他置灰选项
    if (this.custIndex != -1) {
      var disabled_select_name = document.getElementsByClassName("select_name");
      for (let i = 0; i < disabled_select_name.length; i++) {
        const element = disabled_select_name[i];
        element.className = "select_name disabled_select_name";
      }
      this.selectFun(this.custIndex);
    }
  },
  methods: {
    selectFun(index) {
      console.log("------Index--select-", index);
      // if(this.custIndex!=-1){
      //   index=this.custIndex
      //   this.isSelect = index;
      //   this.$emit("selectManFun", index);
      //   console.log("index------------",index)
      // }else{
      this.isSelect = index;
      this.$emit("selectManFun", index);
      // }
    },
  },
};
</script>

<style  scoped>
.card_div {
  background: #ffffff;
  margin: 12px 0 0;
  font-size: var(--size-text-small);
}
.card_title {
  padding: 15px;
}
.man_list {
  padding: 0 15px;
}
.man_item {
  display: flex;
  vertical-align: middle;
  padding: 0 0 15px;
}
.select_img {
  width: 16px;
  height: 16px;
}
.select_name {
  margin: 0 6px;
}
.disabled_select_name {
  color: #ccc;
}
</style>
