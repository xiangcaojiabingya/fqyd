<template>
  <!-- 企业信息 -->
  <div class="content">
    <ul>
      <li class="content2" v-for="item in infomation">
        <p class="left">{{item.name}}</p>
        <p class="right">{{item.value}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Check",
  props: {
    infomation: Array,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.content {
  background-color: #ffffff;
  padding-top: 10px;
  padding-bottom: 10px;
}
p {
  margin: 0;
  padding: 0;
  font-size: var(--size-text-small);
}
p.left {
  min-width: 80px;
  line-height: 20px;
  padding-right: 5px;
}
p.right {
  min-width: 0px;
  word-wrap: break-word;
  line-height: 20px;
}
li.content2 {
  display: flex;
  justify-content: space-between;
  padding: 5px 12px;
  /* height: 20px; */
  min-height: 20px;
}
</style>