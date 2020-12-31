import { reqseckilllist } from "../../utils/http";

// 定义变量
let state = {
    //列表
    list: [],
}
// 修改变量
let mutations = {
    changeList(state, arr) {
        state.list = arr;
    },
}
// 输出变量
let getters = {
    list(state) {
        return state.list
    },
}
// 逻辑
let actions = {
    // 3.4 处理list的逻辑
    reqList(context) {
        console.log("reqList");
        //发请求 成功之后 修改  
        reqseckilllist({ istree: true }).then(res => {
            if (res.data.code == 200) {
                context.commit("changeList", res.data.list)
                state.list = res.data.list
            }
        })
    }
}


export default {
    state, mutations, getters, actions,
    namespaced: true
}