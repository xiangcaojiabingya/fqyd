<template>
<!-- 审批的输入意见的组件(已用) -->
  <div class="card_div">
    <div class="card_title">{{ myTitle }}
      <span class="necessarily">*</span>
    </div>
    <textarea
      :value="value"
      class="input_text"
      rows="3"
      cols="3"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "MyTextarea", //审批的输入意见的组件
  components: {},
  model: {
    prop: "value",
    event: "input",
  },
  props: ["value", "placeholder", "myTitle"],
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style  scoped>
.card_div {
  font-size: var(--size-text-small);
  background: #ffffff;
  margin: 12px 0;
}
.card_title {
  padding: 15px;
  font-size: var(--size-text-small);
}
.input_text {
  padding: 0 15px 15px;
  border: none;
  width: 100%;
  box-sizing: border-box;
  color: var(--color-edit-text);
}
textarea::-webkit-input-placeholder {
  /* WebKit browsers */
  font-size: var(--size-text-small);
  color: var(--color-edit-text);
}
textarea:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-size: var(--size-text-small);
  color: var(--color-edit-text);
}
textarea::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-size: var(--size-text-small);
  color: var(--color-edit-text);
}
textarea:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-size: var(--size-text-small);
  color: var(--color-edit-text);
}
.necessarily {
  color: rgba(255, 0, 0);
}
</style>
