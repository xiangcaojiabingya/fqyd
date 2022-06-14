<template>
  <!-- 关联人信息 -->
  <div class="main_relation">
    <item-nav-bar :title="title" :rightSet="rightSet" @onClickRight="onClickRight"></item-nav-bar>
    <div class="relation_message">
      <div class="content">
        <item-picker
          :necessary="true"
          :title="'关联人类型'"
          :pickerTitle="'关联人类型'"
          :columns="dictItemMap.conn_person_type"
          :currentValue="itemInfo.connPersonType"
          :readonly="readonly"
          :isGrayBg="'true'"
          @change="change"
        />
        <input-assemble
          v-model="itemInfo.liveAddress"
          :label="'居住地址'"
          :readonly="disable"
          :necessary="!disable"
        ></input-assemble>
        <item-picker
          :title="'婚姻状况'"
          :pickerTitle="'婚姻状况'"
          :columns="dictItemMap.marriage_status"
          :currentValue="itemInfo.marriageStatus"
          :readonly="disable"
          :necessary="!disable"
          :isGrayBg="'true'"
          @change="change"
        />
        <input-assemble
          v-model="itemInfo.workName"
          :label="'工作单位'"
          v-resetPage
          :readonly="disable"
          :necessary="!disable"
        ></input-assemble>
        <input-assemble
          v-model="itemInfo.workAddress"
          :label="'单位地址'"
          v-resetPage
          :readonly="disable"
          :necessary="!disable"
        ></input-assemble>
        <input-assemble
          v-model="itemInfo.workPhone"
          :label="'单位电话'"
          v-resetPage
          :readonly="disable"
          :necessary="false"
          maxlength="16"
        ></input-assemble>
        <item-picker
          :necessary="!disable"
          :title="'通讯/送达地址'"
          v-resetPage
          :pickerTitle="'通讯/送达地址'"
          :columns="dictItemMap.mailAddressCode"
          :currentValue="itemInfo.mailAddress"
          :readonly="disable"
          :isGrayBg="'true'"
          @change="change"
        />
        <input-assemble
          v-model="itemInfo.mailAddressCode"
          maxlength="6"
          :label="'通讯/送达地址邮编'"
          :readonly="disable"
          :necessary="!disable"
        ></input-assemble>
        <item-picker
          :necessary="true"
          :title="'与借款人关系'"
          :pickerTitle="'与借款人关系'"
          :columns="dictItemMap.loan_relation_type"
          :currentValue="itemInfo.relation"
          :readonly="readonly"
          :isGrayBg="'true'"
          @change="change"
        />
      </div>
    </div>
    <!-- 按钮 -->
    <div class="btn">
      <button class="cancel primary" @click="submit(false)">取消</button>
      <button class="confirm primary" @click="submit(true)">确定</button>
    </div>
  </div>
</template>

<script>
import ItemNavBar from "@/components/module/ItemNavBar.vue";
import InputAssemble from "@/components/common/InputAssemble.vue";
import ItemPicker from "@/views/Result/components/ItemPicker.vue"; // 引入选择器组件
import { codeToValue } from "@/utils/index.js"; //数据字典码值转换
import eventBus from "@/utils/eventBus.js";
export default {
  name: "RelationMessage",
  components: {
    ItemNavBar,
    InputAssemble,
    ItemPicker,
  },
  props: {},
  data() {
    return {
      title: "关联人信息",
      rightSet: "FINISH",
      readonly: false, // 关联人类型和借款人关系是否可编辑
      disable: true, // 除关联人类型和与借款人关系外的内容是否可编辑
      relationshipText: "", //与借款人关系
      dictItemMap: {}, //数据字典
      itemInfo: {}, //最终展示的关联人信息
      selfInfo: {}, //本人信息
      otherInfo: {}, //传进来的信息
      position: "", //当前信息在列表中的位置
    };
  },
  watch: {},
  computed: {},
  methods: {
    getData() {
      this.position = this.$route.query.index;
      this.dictItemMap = this.$route.query.dictItemMap;
      this.otherInfo = JSON.parse(JSON.stringify(this.$route.query.info)); //防止修改原值
      this.itemInfo = JSON.parse(JSON.stringify(this.$route.query.info)); //单纯赋值，防止修改原值
      this.selfInfo = this.$route.query.selfInfo;
      this.relationshipText = this.getKindType(this.itemInfo.relation, this.dictItemMap.loan_relation_type)
        == "" ? this.itemInfo.relation : this.getKindType(this.itemInfo.relation, this.dictItemMap.loan_relation_type);
      console.log(
        "关联人信息=" + this.relationshipText + "--" + JSON.stringify(this.itemInfo)
      );
      this.judgeRelation();
    },
    onClickRight() { },
    // 判断与借款人关系
    judgeRelation() {
      if (this.relationshipText == "本人") {
        this.disable = true; //不可修改，只读
        this.otherInfo=JSON.parse(JSON.stringify(this.itemInfo))
        this.itemInfo.liveAddress = this.selfInfo.liveAddress; //居住地址
        this.itemInfo.marriageStatus = this.selfInfo.marriageStatus; //婚姻状态
        this.itemInfo.workName = this.selfInfo.workName; //工作单位
        this.itemInfo.workAddress = this.selfInfo.workAddress; //单位地址
        this.itemInfo.workPhone = this.selfInfo.workPhone; //单位电话
        this.itemInfo.mailAddress = this.selfInfo.mailAddress; //通讯/送达地址
        this.itemInfo.mailAddressCode = this.selfInfo.mailAddressCode; //通讯/送达地址邮编
      } else {
        if (this.disable) {
          this.itemInfo.liveAddress = this.otherInfo.liveAddress; //居住地址
          this.itemInfo.marriageStatus = this.otherInfo.marriageStatus; //婚姻状态
          this.itemInfo.workName = this.otherInfo.workName; //工作单位
          this.itemInfo.workAddress = this.otherInfo.workAddress; //单位地址
          this.itemInfo.workPhone = this.otherInfo.workPhone; //单位电话
          this.itemInfo.mailAddress = this.otherInfo.mailAddress; //通讯/送达地址
          this.itemInfo.mailAddressCode = this.otherInfo.mailAddressCode; //通讯/送达地址邮编
        }
        this.disable = false;
      }
    },
    change(value) {
      switch (value.dictKey) {
        case "marriage_status": //婚姻状态
          this.itemInfo.marriageStatus = value.itemKey;
          break;
        case "conn_person_type": //关联人类型
          this.itemInfo.connPersonType = value.itemKey;
          break;
        case "loan_relation_type": //与借款人关系
          this.itemInfo.relation = value.itemKey;
          this.relationshipText = value.itemName;
          this.judgeRelation();
          break;
        case "mailAddressCode": //通讯/送达地址
          this.itemInfo.mailAddress = value.itemKey;
          break;
      }
    },
    // 获取类型、类别
    getKindType(code, list) {
      let str = "";
      if (list.length == 0) {
        this.getDictionary();
        return;
      } else {
        str = codeToValue(list, code);
      }
      return str;
    },
    //提交
    submit(type) {
      //确定
      if (type) {
        if (!this.disable) {  //不是只读
          if (this.checkNull(this.itemInfo.liveAddress)) {
            this.$toast("居住地址不能为空");
            return;
          }
          if (this.checkNull(this.itemInfo.marriageStatus)) {
            this.$toast("婚姻状况不能为空");
            return;
          }
          if (this.checkNull(this.itemInfo.workName)) {
            this.$toast("工作单位不能为空");
            return;
          }
          if (this.checkNull(this.itemInfo.mailAddress)) {
            this.$toast("通讯/送达地址不能为空");
            return;
          }
          if (this.checkNull(this.itemInfo.mailAddressCode)) {
            this.$toast("通讯/送达地址邮编不能为空");
            return;
          }
        }
        if (this.checkNull(this.itemInfo.connPersonType)) {
          this.$toast("关联人类型不能为空");
          return;
        }
        if (this.checkNull(this.itemInfo.relation)) {
          this.$toast("与借款人关系不能为空");
          return;
        }
        eventBus.$emit("updateRelation", {
          index: this.position,
          contactsItem: this.itemInfo,
        });
      }
      this.$router.go(-1);
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
  created() { },
  mounted() {
    this.getData();
  },
  directives: {
    //解决ios手机键盘隐藏后页面卡顿白屏问题
    resetPage: {
      inserted: function (el) {
        document.body.addEventListener("focusout", () => {
          if (device.platform.toLowerCase() == "ios") {
            // 软键盘收起的事件处理
            setTimeout(() => {
              const scrollHeight =
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0;
              window.scrollTo(0, Math.max(scrollHeight - 1, 0));
            }, 100);
          }
        });
      },
    },
  },
};
</script>

<style scoped>
/* 外层样式 */
.main_relation {
  width: 100%;
  height: 100%;
  background-color: var(--color-Lightgray-bg);
}
/* 内容 */
.relation_message {
  padding-top: 46px;
}
.content {
  background-color: #ffffff;
  margin-top: 12px;
}
.content:last-child {
  margin-bottom: 12px;
}
/* 按钮 */
.btn {
  text-align: center;
}
.btn :first-child {
  margin-right: 12px;
}
.primary {
  border-radius: 30px;
  margin: 20px 0;
  font-size: 16px;
  width: 150px;
  height: 40px;
}
/* 确定按钮 */
.confirm {
  background: var(--color-orange-text);
  border: 1px solid var(--color-orange-text);
  color: white;
}
/* 取消按钮 */
.cancel {
  background: white;
  border: 1px solid var(--color-orange-text);
  color: var(--color-orange-text);
  /* font-weight: 700; */
}
</style>