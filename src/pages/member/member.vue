<template>
  <div>

    <!-- 数据展示表格 -->
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <!-- 添加弹框 -->
    <v-add :info="info" @init="init" :list="list" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
import {  reqmemberlist } from "../../utils/http";

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
       reqmemberlist().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
          if(!this.list){
            this.list=[];
          }
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