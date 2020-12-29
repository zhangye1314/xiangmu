<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 数据展示表格 -->
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <!-- 添加弹框 -->
    <v-add :info="info" @init="init" :list="list" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqMenulist } from "../../utils/http";

export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
      list: [],
    };
  },
  methods: {
    willAdd() {
      console.log(1111);
      this.info.isshow = true;
      this.info.isadd = true;
    },
    init() {
      reqMenulist().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.getOne(id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>