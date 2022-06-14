<template>
  <!-- 可输入编辑和只读输入框 -->
  <div class="inputAssemble">
    <!-- <div class="inputAssemble" :class="{ showLine: isShowLine }">-->
    <div class="input_div">
      <span class="input_label">
        {{ label }}
        <span class="necessarily" v-show="necessary">*</span>
      </span>
      <input
        type="text"
        :readonly="readonly"
        :value="value"
        class="input_text"
        :placeholder="placeholder"
        :maxlength="maxlength"
        @input="$emit('input', $event.target.value)"
      />
    </div>
    <div class="line" v-if="isShowLine"></div>
  </div>
</template> 

<script>
export default {
  name: "InputAssemble",
  components: {},
  props: {
    label: {
      type: String,
      default: "--",
    },
    // 输入框内容
    value: {
      type: String,
      default: "",
    },
    // 是否必填
    necessary: {
      type: Boolean,
      default: true,
    },
    // 输入框是否只读
    readonly: {
      type: Boolean,
      default: false,
    },
    // 是否展示下框线
    isShowLine: {
      type: Boolean,
      default: true,
    },
    maxlength: String, //限制input最大长度
  },
  data() {
    return {
      placeholder: "请输入",
      data: "",
    };
  },
  watch: {
    readonly(val) {
      this.readonly = val;
      if (this.readonly) {
        this.placeholder = "";
      } else {
        this.placeholder = "请输入";
      }
    },
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {
    if (this.readonly) {
      this.placeholder = "";
    }
  },
};
</script>
<style scoped>
.inputAssemble {
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  flex-direction: column;
}
.input_div {
  width: 100%;
  padding: var(--form-padding-top) 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.input_label {
  width: 100%;
}
.input_div span {
  font-size: var(--size-text-small);
  word-break: break-all;
  word-wrap: break-word;
}
.necessarily {
  color: rgba(255, 0, 0);
}
/* .SingleLineItem input {
  margin-left: 5px;
} */
.input_text {
  font-size: var(--size-text-small);
  text-align: right;
  border: none;
  color: var(--color-edit-text);
}
input[readonly] {
  color: #333333 !important;
  border: none;
}
.showLine {
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
input::-webkit-input-placeholder {
  color: var(--color-orange-text);
}
input:-moz-placeholder {
  color: var(--color-orange-text);
}
input:-ms-input-placeholder {
  color: var(--color-orange-text);
}
input::-moz-placeholder {
  color: var(--color-orange-text);
}
.line {
  height: 1px;
  border-bottom: 1px solid var(--color-Lightgray-bg);
}
</style>