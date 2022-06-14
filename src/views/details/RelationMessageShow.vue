<template>
  <!--详情之关联人信息ycm-->
  <div class="main">
    <item-nav-bar
      :title="title"
      :rightSet="rightSet"
    />
    <div class="container">
      <div class="container_content">
        <single-line-item label="关联人类型" :value="info.connPersonType" />
        <single-line-item label="客户姓名" :value="info.name" />
        <single-line-item label="证件类型" :value="info.idType" />
        <single-line-item label="证件号码" :value="info.idCard" />
        <single-line-item label="手机号码" :value="info.phoneNum" />
        <single-line-item label="居住地址" :value="info.liveAddress" />
        <single-line-item label="婚姻状况" :value="info.marriageStatus" />
        <single-line-item label="工作单位" :value="info.workName" />
        <single-line-item label="单位地址" :value="info.workAddress" />        
        <single-line-item label="单位电话" :value="info.workPhone" />
        <single-line-item label="通讯/送达地址" :value="info.mailAddress" />
        <single-line-item label="通讯/送达地址邮编" :value="info.mailAddressCode" />
        <single-line-item label="与借款人关系" :value="info.relation" />
      </div>
    </div>
  </div>
</template>

<script>
import SingleLineItem from "@/components/common/SingleLineItem.vue";
import ItemNavBar from "@/components/module/ItemNavBar.vue";
export default {
  name: "RelationMessageShow", //关联人信息详情
  components: {
    SingleLineItem,
    ItemNavBar,
  },
  props: [],
  data() {
    return {
      title: "关联人信息",
      rightSet: "FINISH",
      info:{}
    };
  },
  computed: {},
  created() {},
  methods: {},
  mounted() {
    this.info=this.$route.query.item
  },
};
</script>

<style  scoped>
.main {
  padding: 46px 0 12px;
}
.container {
  background: #ffffff;
  margin: 12px 0 0;
}
.container_head {
  padding: 15px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
.container_title {
  color: #ff6619;
  font-size: 14px;
  margin-left: 12px;
}
/*竖杠*/
.vertical_bar {
  width: 3px;
  height: 20px;
  background: #ff6619;
}
.container_content2 {
  margin: 0 15px;
}
</style>