<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="edit"></v-list>
    <!-- 弹出页面 -->
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>
  <script>
import { mapActions, mapGetters } from "vuex";
import vAdd from "./components/add.vue"
import vList from "./components/list.vue"
export default {
  components:{vList,vAdd},
  data() {
    return {
      info:{
        isshow:false,
        isadd:true
      }
    };
  },
  computed: {
    ...mapGetters({
      list: "seckill/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "seckill/reqList"
    }),
    //点了添加
    willAdd(){
      this.info.isshow=true;
      this.info.isadd=true
    },
    //编辑
    edit(id){
      this.info.isshow=true;
      this.info.isadd=false 
      this.$refs.add.getOne(id)
    }
  },
  mounted() {}
};
</script>

  <style >
</style>