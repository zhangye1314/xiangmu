<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="编号" sortable width="180"></el-table-column>
      <el-table-column prop="title" label="轮播图标题" sortable width="180"></el-table-column>
      <el-table-column  label="图片" width="180">
        <template slot-scope="scope">
         <img class="box" :src="$pre+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  <script>
import { mapActions, mapGetters } from "vuex";
import { reqBannerDel } from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props:["list"],
  data() {
    return {};
  },
  computed: {
  },
  methods: {
    //删除
    del(id) {
      reqBannerDel({ id: id }).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
           this.$emit("init");
        }
      });
    },
    //编辑
    edit(id) {
      this.$emit("edit", id);
    }
  },
};
</script>

<style scoped>
.box{
  width: 100px;
  height: 100px;
}
</style>