<template>
  <div class="gary_input">
    <input
      class="input_style"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :readonly="readonly"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "GaryInput",
  components: {},
  model: {
    prop: "value",
    event: "input",
  },
  props: ["value", "placeholder", "readonly", "type"],
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
.gary_input {
  width: 100%;
  height: 32px;
}

.input_style {
  width: 100%;
  height: 32px;
  border-radius: 5px;
  background: #f1f1f1;
  border: none;
  padding: 0px 30px 0px 30px;
  box-sizing: border-box;
}

input::-webkit-input-placeholder {
  /* WebKit browsers */
  font-size: 14px;
  color: #bdbdbd;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-size: 14px;
  color: #bdbdbd;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-size: 14px;
  color: #bdbdbd;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-size: 14px;
  color: #bdbdbd;
}
</style>
