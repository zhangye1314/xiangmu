<template>
  <div>
   <!-- 添加按钮 -->
    <el-button type="primary"  @click="willAdd">添加</el-button>
    <!-- 数据展示表格 -->
       <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <!-- 添加弹框 -->
    <v-add :info="info" @init="init" :list="list" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list"
import vAdd from "./components/add"
import { reqMenulist, reqRolelist,reqManagelist } from "../../utils/http";
export default {
  components:{
    vList,
    vAdd
  }, data() {
    return {
      //2.弹框状态
      info: {
        isshow: false,
        isadd:true
      },
      //20.初始化列表数据
      list: []
    };
  },
  methods: {
    //5.点了添加按钮
    willAdd() {
      this.info.isshow = true;
      //42.是添加
      this.info.isadd=true
    },
    //获取列表
     init() {
      reqManagelist({page:1,size:50}).then(res => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    //36.编辑触发
    edit(id){
      //弹框出现
      this.info.isshow=true;

      this.info.isadd=false

      this.$refs.add.getOne(id)
    }
  },
  mounted() {
    //21.获取list
    this.init();
  }
}
</script>

<style>

</style>