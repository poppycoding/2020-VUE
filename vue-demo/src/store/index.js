import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// vuex是vue提供的组件之间共享数据的状态管理工具,类似于session/local storage,组件之间可以全局共享,但是安全性更高
export default new Vuex.Store({
    state: {
        routes: []
    },
    mutations: {
        // state参数是默认,可以不用写(写了也无需传参),因此最多只能接收两个参数,如果有额外数据,需要封装到data中赋值
        initRoutes(state, data) {
            state.routes = data
        }
    },
    actions: {}
});