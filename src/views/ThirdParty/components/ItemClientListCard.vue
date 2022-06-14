<template>
  <div>
    <div class="content">
      <ul>
        <li class="content2" v-for="(item ,index) in list" :key="index">
          <p class="p_left">{{ item.name }}</p>
          <p class="p_right">{{ item.value }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemClientListCard", //客户信息的条目
  components: {},
  data() {
    return {};
  },
  props: {
    list: Array,
  },
  methods: {},
  mounted() {},
  activated() {},
};
</script>

<style scoped>
.content {
  background-color: #ffffff;
  padding: 10px 0;
}
p {
  margin: 0;
  padding: 0;
  font-size: 14px;
  min-width: 25%;
  max-width: 75%;
}
.p_right{
  text-align: right;
}
li.content2 {
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
}
</style>