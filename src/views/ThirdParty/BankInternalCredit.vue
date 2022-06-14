<template>
    
  <div>
    <item-nav-bar title="行内征信信息"></item-nav-bar>
    <div class="body-margin-top">
      <van-tabs
        v-model="activeName"
        line-width="50%"
        color="var(--color-orange-selected)"
        title-active-color="var(--color-orange-selected)"
        title-inactive-color="var(--tab-color-unselect)"
        sticky
        offset-top="var(--body-margin-top)"
      >
        <van-tab
          :title="enterprise.name"
          name="a"
          title-style="font-size: var(--tab-font-size)"
        >
          <div>
            <item-cutting-line></item-cutting-line>
            <item-client-list-card
              :list="enterprise.array"
            ></item-client-list-card>
          </div>
        </van-tab>
        <van-tab
          :title="personal.name"
          name="b"
          title-style="font-size: var(--tab-font-size)"
        >
          <div>
            <item-cutting-line></item-cutting-line>
            <item-client-list-card
              :list="personal.array"
            ></item-client-list-card>
          </div>
        </van-tab>
      </van-tabs>
    </div>
      
  </div>
</template>

<script>
import ItemCuttingLine from "./components/ItemCuttingLine.vue";
import ItemNavBar from "./components/ItemNavBar.vue";
import ItemClientListCard from "./components/ItemClientListCard.vue";

export default {
  name: "BankInternalCredit", //行内征信信息
  components: { ItemNavBar, ItemCuttingLine, ItemClientListCard },
  data() {
    return {
      activeName: "a",
      enterprise: {
        name: "企业",
        array: [
          { name: "客户编号", value: "" },
          { name: "客户名称", value: "" },
          { name: "系统编号", value: "" },
          { name: "数据日期", value: "" },
          { name: "企业存在逾期", value: "" },
          { name: "企业存在不良余额", value: "" },
          { name: "企业对外担保为不良", value: "" },
          { name: "企业存在核销记录", value: "" },
          { name: "企业命中黑名单", value: "" },
        ],
      },
      personal: {
        name: "个人",
        array: [
          { name: "客户编号", value: "" },
          { name: "客户名称", value: "" },
          { name: "证件类型", value: "" },
          { name: "证件号码", value: "" },
          { name: "系统编号", value: "" },
          { name: "数据日期", value: "" },
          { name: "个人存在逾期", value: "" },
          { name: "个人存在不良余额", value: "" },
          { name: "个人担保为不良", value: "" },
          { name: "个人有核销记录", value: "" },
          { name: "个人在黑名单", value: "" },
        ],
      },
    };
  },
  methods: {},
  mounted() {},
  activated() {},
};
</script>
<style scoped>
.title-class {
  font-weight: bold !important;
}
</style>