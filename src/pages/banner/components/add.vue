<template>
  <div>
    <el-dialog
      :title="info.isadd ? '轮播图添加' : '编辑轮播图'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <el-form :model="user">
        <el-form-item label="标题" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
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
              <span class="el-upload-list__item-preview">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete">
                <i class="el-icon-download"></i>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete">
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
      </div>
      {{ user }}
    </el-dialog>
  </div>
</template>

<script>
import {
  reqRoleAdd,
  reqRoleDetail,
  reqRoleUpdate,
  reqRolelist,
  reqBannerAdd,
  reqBannerDetail,
  reqBannerUpdate,
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      roleList: [],
      //3.初始化user
      user: {
        title: "",
        img: "",
        status: 1,
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
    // 验证
     checkProps() {
      return new Promise((resolve) => {
        if (this.user.title === "") {
          erroralert("标题不能为空");
          return;
        }
         if (this.file.url === "") {
          erroralert("图片不能为空");
          return;
        }
        resolve();
      });
    },
    //点了取消
    cancel() {
      //编辑清空数据
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //获取图片
    changeImg(e) {
      this.user.img = e.raw;
    },
    empty() {
      this.user = {
        title: "",
        img: "",
        status: 1,
      };
      this.dialogImageUrl = "";
    },
    // 添加
    add() {
      reqBannerAdd(this.user).then((res) => {
        if ((res.data.code = 200)) {
          successalert(res.data.msg);
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
      reqBannerDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
         this.user.id = id;
          //处理图片
          this.imgUrl = this.$pre + this.user.img;
        }
      });
    },
    // 修改
    update() {
      reqBannerUpdate(this.user).then((res) => {
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