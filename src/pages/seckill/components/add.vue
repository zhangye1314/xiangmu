<template>
  <div>
    <el-dialog
      :title="info.isadd ? '添加秒杀活动' : '编辑秒杀活动'"
      :visible.sync="info.isshow"
      @closed="cancel"
    >
      <!-- 2.v-model绑定user -->
      <el-form :model="user">
        <div>user:{{ user }}</div>
        <div>{{ value1 }}</div>

        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="100px">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
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
        <el-form-item
          label="二级分类"
          label-width="100px"
          
        >
          <el-select v-model="user.second_cateid" @change="changeSecondCateid">
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
          <el-select v-model="user.goodsid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secomdgoodsList"
              :key="item.id"
              :label="item.goodsname"
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
  reqseckillAdd,
  reqseckillDetail,
  reqseckillUpdate,
  reqgoodslist,
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      // 时间戳
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      value1: [],

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
      //4.二级分类的列表
      secondCateList: [],

      secomdgoodsList: [],

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
      // 商品管理的list
      goodList: "good/list",
    }),
  },
  methods: {
    ...mapActions({
      //3.2分类列表的获取
      reqCateList: "cate/reqList",
      //7.2 规格列表的获取
      reqSpecsList: "specs/reqList",
      reqList: "seckill/reqList",
    }),
    //5.修改了一级分类
    changeFirstCateId() {
      //二级分类选中的要清除
      this.user.second_cateid = "";

      this.getSecondList();
    },
    //根据一级分类，计算出二级分类的list
    getSecondList() {
      reqCatelist({
        pid: this.user.first_cateid,
      }).then((res) => {
        if ((res.data.code = 200)) {
          this.secondCateList = res.data.list;
        }
      });
    },
    //根据一级分类，二级分类获取商品
    changeSecondCateid() {
      console.log(1111)
      reqgoodslist({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      }).then((res) => {
        if ((res.data.code == 200)) {
          console.log(res.data.list)
          this.secomdgoodsList = res.data.list;
        }
      });
    },
    //取消
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
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
      //二级分类的列表
      this.secondCateList = [];
      // 三级分类的列表
      this.secomdgoodsList = [];
      // 规格属性展示的所有选项的列表
      this.showSpecsAttr = [];
      this.value1 = [];
    },
    //10.点了添加
    add() {
      this.user.begintime = this.value1[0].getTime();
      this.user.endtime = this.value1[1].getTime();

      //发请求
      reqseckillAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          //1.弹框消失
          this.cancel();
          //2.数据清空
          this.empty();
          //3.弹成功
          successalert(res.data.msg);
          //4.刷新list
          this.reqList();
          // this.reqTotal();
        }
      });
    },
    //获取一条数据
    getOne(id) {
      reqseckillDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.$set(this.value1, 0, Number(this.user.begintime));
          this.$set(this.value1, 1, Number(this.user.endtime));
          console.log(this.value1);
          //重新获取二级分类的list
          this.getSecondList();
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

      reqseckillUpdate(data).then((res) => {
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