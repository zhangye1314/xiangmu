import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import { actions } from "./actions"
import { state, getters, mutations } from "./mutations"
import specs from './modules/specs'
import goods from  './modules/good'


export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        // cate,
        // banner,
        specs,
        goods,
    }
})