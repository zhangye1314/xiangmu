<template>
  <div>
    <el-dialog
      :title="info.isadd ? '商品分类添加' : '编辑商品分类'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="100px">
          <el-select v-model="user.pid">
            <el-option label="--请选择--" value="" disabled></el-option>
             <el-option label="顶级分类" :value="0" ></el-option>
            <!-- 5.遍历数据 -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-upload action="#" list-type="picture-card" :auto-upload="false"
        :on-change="changeImg"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>

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
      </div>{{user}}
    </el-dialog>
    
  </div>
</template>

<script>
import {
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate,
  reqRolelist,
  reqCateAdd,
  reqCateDetail,
  reqCateUpdate,
  reqCatelist
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      roleList: [],
      //3.初始化user
      user: {
       pid:'',
       catename:'',
       img:'',
       status:1
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  mounted() {
    // 一进来就要获取角色列表
    reqRolelist().then((res) => {
      if (res.data.code == 200) {
        this.roleList = res.data.list;
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
    //获取图片
    changeImg(e){
      this.user.img=e.raw
    },
    empty() {
      this.user = {
      
       pid:"",
       catename:'',
       img:'',
       status:1
      };
    },
    // 添加
    add() {
       reqCateAdd(this.user).then((res) => {
        //  console.log(res)
        if ((res.data.code = 200)) {
          // console.log(this.user)
          successalert(res.data.msg)
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      });
    },
    //修改了顶级菜单
    changePid() {
      if (this.user.pid == 0) {
        this.user.type = 1;
      } else {
        this.user.type = 2;
      }
    },
    //10.获取详情
    getOne(id) {
      reqCateDetail({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //密码置空
          this.user.password = "";
        }
      });
    },
    // 修改
    update() {
     reqCateUpdate(this.user).then((res) => {
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