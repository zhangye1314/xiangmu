<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加角色' : '编辑角色'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <!-- 14.数据绑定到页面 -->
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="100px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="100px">
          <!-- 树形控件 
          data：展示的数据 
          show-checkbox：展示选择框
          node-key:每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
          default-expanded-keys :默认展开
          default-checked-keys：默认选中
          :props="{children: '用来判断有没有下一个子节点的字段',label: '展示的内容的字段'}"
          this.$refs.tree.getCheckedNodes() 取到选中的数据的所有信息
          this.$refs.tree.getCheckedKeys() 取到选中的数据的node-key拼成的数组
          -->
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title' }"
          ></el-tree>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqRoleAdd,
  reqMenuDetail,
  reqMenuUpdate,
  reqMenulist,
  reqRoleDetail,
  reqRoleUpdate,
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      menuList: [],
      //3.初始化user
      user: {
        rolename: "",
        menus: "",
        status: 1,
      },
    };
  },
  mounted() {
    reqMenulist().then((res) => {
      if (res.data.code == 200) {
        this.menuList = res.data.list;
        console.log(this.menuList);
      }
    });
  },
  methods: {
    //点了取消
    cancel() {
      //编辑清空数据
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    edit(id) {
      this.$emit("edit", id);
    },
    // 添加
    add() {
      // console.log(this.$refs.tree.getCheckedKeys())
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      console.log(this.user.menus);
      reqRoleAdd(this.user).then((res) => {
        if ((res.data.code = 200)) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    // 清空user
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    changePid() {
      if (this.user.pid == 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    //.获取详情
    getOne(id) {
      reqRoleDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //补id
          this.user.id = id;
          //给树形控件赋值
          this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        }
      });
    },
    //修改
    update() {
      //先取出树形控件的数据给menus，再发请求
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          //弹成功
          successalert(res.data.msg);
          //弹框消失
          this.cancel();
          //数据清空
          this.empty();
          //刷新list
          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style>
</style>