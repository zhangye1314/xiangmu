<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加商品' : '编辑商品'"
      :visible.sync="info.isshow"
      @closed="cancel"
      @opened="opened"
    >
      <!-- 2.v-model绑定user -->
      <el-form :model="user">
        <div>user:{{ user }}</div>

        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="100px">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirstCateId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="100px">
          <el-select v-model="user.second_cateid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
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
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import {
  reqCatelist,
  reqgoodsAdd,
  reqgoodsDetail,
  reqgoodsUpdate,
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      // 1.初始化数据
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      imgUrl: "",
      //4.二级分类的列表
      secondCateList: [],
      // 8.规格属性展示的所有选项的列表
      showSpecsAttr: [],
    };
  },
  computed: {
    ...mapGetters({
      //3.1 分类的list
      cateList: "cate/list",
      //7.1 规格的list
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      //3.2分类列表的获取
      reqCateList: "cate/reqList",
      //7.2 规格列表的获取
      reqSpecsList: "specs/reqList",
      reqList: "goods/reqList",
      reqTotal: "goods/reqTotal",
    }),
    //5.修改了一级分类
    changeFirstCateId() {
      //二级分类选中的要清除
      this.user.second_cateid = "";

      this.getSecondList();
    },
    //根据一级分类，计算出二级分类的list
    getSecondList() {
      reqCatelist({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    //9.规格变了
    changeSpecsId() {
      //将之前的规格属性清空
      this.user.specsattr = [];

      //计算出规格属性展示的所有选项的列表
      this.getShowSpecsAttr();
    },
    //获取规格属性的展示列表
    getShowSpecsAttr() {
      let obj = this.specsList.find((item) => item.id == this.user.specsid);
      this.showSpecsAttr = obj ? obj.attrs : [];
    },

    //取消
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    //6.上传文件
    changeImg(e) {
      let file = e.target.files[0];
      //判断 略
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },

    //11.清空
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.imgUrl = "";
      //二级分类的列表
      this.secondCateList = [];
      // 规格属性展示的所有选项的列表
      this.showSpecsAttr = [];
    },
    //10.点了添加
    add() {
      //取出富文本编辑器的内容，赋值给user
      this.user.description = this.editor.txt.html();

      let data = {
        ...this.user,
        specsattr: JSON.stringify(this.user.specsattr),
      };

      //发请求
      reqgoodsAdd(data).then((res) => {
        if (res.data.code == 200) {
          //1.弹框消失
          this.cancel();
          //2.数据清空
          this.empty();
          //3.弹成功
          successalert(res.data.msg);
          //4.刷新list
          this.reqList();
          this.reqTotal();
        }
      });
    },
    //获取一条数据
    getOne(id) {
      reqgoodsDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //重新获取二级分类的list
          this.getSecondList();
          //图片
          this.imgUrl = this.$pre + this.user.img;
          //规格属性展示list
          this.getShowSpecsAttr();
          //规格属性选中的list
          this.user.specsattr = JSON.parse(this.user.specsattr);
          //补id
          this.user.id = id;
        }
      });
    },
    //修改
    update() {
      let data = {
        ...this.user,
        specsattr: JSON.stringify(this.user.specsattr),
      };

      reqgoodsUpdate(data).then((res) => {
        if (res.data.code == 200) {
          //1.弹框消失
          this.cancel();
          //2.数据清空
          this.empty();
          //3.弹成功
          successalert(res.data.msg);
          //4.刷新list
          this.reqList();
        }
      });
    },
  },
  mounted() {
    //3.3如果没有请过分类数据，就发一下请求
    if (this.cateList.length === 0) {
      this.reqCateList();
    }

    //7.3 请求规格list
    this.reqSpecsList(true);
  },
};
</script>

<style>
</style>