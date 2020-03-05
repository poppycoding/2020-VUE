import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "font-awesome/css/font-awesome.min.css";
import {
  deleteRequest,
  getRequest,
  postKVRequest,
  postRequest,
  putRequest
} from "./util/api";
import { initMenu } from "./util/menu";

// 封装api.js请求方法插件,可以通过this全局调用
Vue.prototype.postKVRequest = postKVRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

Vue.config.productionTip = false;

Vue.use(ElementUI);

// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
// 全局前置守卫,类似于后端拦截器,当发生路由跳转时进行初始化菜单,防止用户f5刷新菜单栏消失
router.beforeEach((to, from, next) => {
  if (to.path === "/") {
    next();
    // 当登录之后才能请求菜单(请求后端接口),否则直接跳转到登录页面,防止权限不足,后端返回错误消息,影响用户体验
  } else if (window.sessionStorage.getItem("user")) {
    initMenu(router, store);
    next();
  } else {
    // 记录未登录请求的路径to,然后跳转到登陆页面,同时把路径封装成query的路径参数,在登陆完成的时候,判断如果有这个参数,则在登陆完成后直接访问这个页面
    next("/?wantGo=" + to.path);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
