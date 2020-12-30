import { data } from "autoprefixer"
import axios from "axios"
import url from "postcss-url"
import qs from "qs"
import Vue from "vue"
import { erroralert } from "./alert"

// 开发环境
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"

//生产环境使用 打包
// let baseUrl=""
// Vue.prototype.$pre=""


// post 带有文件，参数转换
function dataToFormData(user) {
    let data = new FormData()
    for (let i in user) {
        data.append(i, user[i])
    }
    return data
}

//响应拦截
axios.interceptors.response.use(res => {
    console.group("本次请求地址是：" + res.config.url)
    console.log(res);
    console.groupEnd()
    return res
})

// 添加
export const reqMenuAdd = (user) => {
    return axios({
        url: baseUrl + '/api/menuadd',
        method: 'post',
        // 一定记住转化
        data: qs.stringify(user)
    })
}

// 列表
export let reqMenulist = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        params: {
            istree: true
        }
    })
}

// 删除
export let reqMenuDel = (obj) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify(obj)
    })
}

// 数据
export let reqMenuDetail = (obj) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        params: obj
    })
}

// 修改接口
export let reqMenuUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(user)
    })
}
// ........................................
// 角色管理
// 角色添加
export let reqRoleAdd = (user) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: 'post',
        data: qs.stringify(user)
    })
}

// 角色列表
export let reqRolelist = () => {
    return axios({
        url: baseUrl + "/api/rolelist"
    })
}

// 角色获取一条
// user(id:1)
export let reqRoleDetail = (id) => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: 'get',
        params: id
    })
}

// 修改
// user(id 必填)
export let reqRoleUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: 'post',
        data: qs.stringify(user)
    })
}

// 删除
// user(id:1)
export let reqRoleDel = (user) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: 'post',
        data: qs.stringify(user)
    })
}
// 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。

// 管理员管理
// 添加管理
export let reqManageAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: 'post',
        data: qs.stringify(user)
    })
}

// 管理员总数
export let reqManageCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get"
    })
}

// 管理员列表
export let reqManagelist = (user) => {
    return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: user
    })
}

// 一条数据
export let reqManageDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: uid
    })
}

// 修改
export let reqManageUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: 'post',
        data: qs.stringify(user)
    })
}

// 管理员删除
export let reqManageDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: 'post',
        data: qs.stringify(uid)
    })
}
// ................管理员管理....................................


// .................商品分类管理.................................
// 商品添加
// 有图片传File
export let reqCateAdd = (user) => {
    let data = new FormData()
    for (let i in user) {
        data.append(i, user[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: 'post',
        data: data
    })
}

// 商品列表
// user (istree:true pid:)
export let reqCatelist = (user) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: user
    })
}

// 一条数据
export let reqCateDetail = (id) => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params: id
    })
}

// 修改
// user(id 分类编号必填 pid 上级分类编号 catename 商品分类名称 img Flie statue 1)
export let reqCateUpdate = (user) => {
    let data = new FormData()
    for (let i in user) {
        data.append = (i, user[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: 'post',
        data: data
    })
}

// 商品删除
export let reqCateDel = (id) => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: 'post',
        data: qs.stringify(id)
    })
}

// .................商品规格管理.................................
// 商品添加
export let reqspecsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//列表 p={page:1,size:500}
export let reqspecslist = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        params: p
    })
}

//详情 user={id:1}
export let reqspecsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,specsname:""}
export let reqspecsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除 user={id:1}
export let reqspecsDel = (user) => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export let reqspecsCount = () => {
    return axios({
        url: baseUrl + "/api/specscount"
    })
}


/************商品管理**************************/

//添加 user={}
export let reqgoodsAdd = (user) => {

    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: dataToFormData(user)
    })
}

//列表 p={page:1,size:500}
export let reqgoodslist = (p) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        params: p
    })
}

//详情 user={id:1}
export let reqgoodsDetail = (user) => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: user
    })
}

//修改 user={id:"必填",img:file,goodsname:""}
export let reqgoodsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: dataToFormData(user)
    })
}

//删除 user={id:1}
export let reqgoodsDel = (user) => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(user)
    })
}

//总数
export let reqgoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount"
    })
}


// 。。。。。。。。。。。。。。。会员管理。。。。。。。。。。
// 会员列表
export let reqmemberlist = () => {
    return axios({
        url: baseUrl + "/api/memberlist"
    })
}

// 一条数据
export let reqmemberDetail = (uid) => {
    return axios({
        url: baseUrl + "/api/memberinfo",
        method: "get",
        params: uid
    })
}

// 修改
export let reqmemberUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/memberedit",
        method: "post",
        data: qs.stringify(user)
    })
}

// 。。。。。。。。。。。。。轮播图管理。。。。。。。。。。。。。。

// 轮播图添加
// 有图片传File
export let reqBannerAdd = (user) => {
    let data = new FormData()
    for (let i in user) {
        data.append(i, user[i])
    }
    return axios({
        url: baseUrl + "/api/banneradd",
        method: 'post',
        data: data
    })
}

// 轮播图列表
// user (istree:true pid:)
export let reqBannerlist = (user) => {
    return axios({
        url: baseUrl + "/api/bannerlist",
        method: "get",
        params: user
    })
}

// 一条数据
export let reqBannerDetail = (id) => {
    return axios({
        url: baseUrl + "/api/bannerinfo",
        method: "get",
        params: id
    })
}

// 修改
// user(id 分类编号必填 pid 上级分类编号 Bannername 商品分类名称 img Flie statue 1)
export let reqBannerUpdate = (user) => {
    let data = new FormData()
    for (let i in user) {
        data.append = (i, user[i])
    }
    return axios({
        url: baseUrl + "/api/banneredit",
        method: 'post',
        data: data
    })
}

// 轮播图删除
export let reqBannerDel = (id) => {
    return axios({
        url: baseUrl + "/api/bannerdelete",
        method: 'post',
        data: qs.stringify(id)
    })
}

// ..................秒杀活动........................
//添加 user={}
export let reqseckillAdd = (user) => {
    return axios({
        url: baseUrl + "/api/seckadd",
        method: "post",
        data: qs.stringify(user)
    })
}

//详情
export let reqseckilllist = () => {
    return axios({
        url: baseUrl + "/api/secklist",
    })
}

//一条数据
export let reqseckillDetail = (id) => {
    return axios({
        url: baseUrl + "/api/seckinfo",
        method: "get",
        params: id
    })
}

//修改 
export let reqseckillUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/seckedit",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除 user={id:1}
export let reqseckillDel = (id) => {
    return axios({
        url: baseUrl + "/api/seckdelete",
        method: "post",
        data: qs.stringify(id)
    })
}