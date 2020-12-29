<template>
  <div>
    <el-table :data="list" stripe style="width: 100%"
    row-key="id"
      border
      :tree-props="{ children: 'children' }">
      <el-table-column prop="id" label="编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="轮播图" width="180">
      </el-table-column>
      <el-table-column  label="图片" width="180">
        <template slot-scope="scope">
         <img class="box" :src="$pre+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <el-button type="primary">启用</el-button>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqCateDel, reqRoleDel,reqManagelist} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["list"],
  methods: {
    // 删除
    del(id) {
      reqCateDel({id}).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.$emit("init");
        }
      });
    },
    // 点了编辑
    edit(id) {
      this.$emit("edit", id);
    },
  },
};
</script>

<style scoped>
.box{
  width: 100px;
  height: 100px;
}
</style>