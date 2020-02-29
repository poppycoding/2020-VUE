import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {deleteRequest, getRequest, postKVRequest, postRequest, putRequest} from "./util/api";
import {initMenu} from "./util/menu";

// 封装api.js请求方法插件,可以通过this全局调用
Vue.prototype.postKVRequest = postKVRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

Vue.config.productionTip = false

Vue.use(ElementUI);

// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
// 全局前置守卫,类似于后端拦截器,当发生路由跳转时进行初始化菜单,防止用户f5刷新菜单栏消失
router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next();
    } else {
        initMenu(router, store);
        next();
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
