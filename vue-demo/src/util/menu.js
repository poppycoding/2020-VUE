import { getRequest } from "./api";

// 初始化menu
export const initMenu = (router, store) => {
  // 存在就不需要再次初始化,如果用户f5刷新就会清空vuex中的store缓存,这个时候就需要重新请求,正常路由跳转时不会清空store缓存,
  // 全局前置守卫会转发到这init,发现有缓存直接return,减少不必要的请求次数
  if (store.state.routes.length > 0) {
    return;
  }
  // 把menu格式化放到router,store中
  getRequest("/sys/menus").then(response => {
    if (response.data) {
      // 格式化后端返回的data,因为后端的component是字符串,需要转换成vue组件,之后封装成router使用
      let formatRoutes = transformToRoutes(response.data);
      // 添加到router中
      router.addRoutes(formatRoutes);
      // commit第一个参数是方法名,第二个参数是initRoutes的参数值,默认的state不需要传
      store.commit("initRoutes", formatRoutes);
    }
  });
};
// 转换后端返回的component字符串为vue组件对象,封装成一个route
export const transformToRoutes = menus => {
  let formatRoutes = [];
  menus.forEach(menu => {
    // 批量赋值,从menu中一一对应获取参数值
    let { path, component, name, iconCls, meta, children } = menu;

    // 证明是一级菜单包含的二级菜单,递归调用同样把二级菜单转为route
    if (children && children instanceof Array) {
      children = transformToRoutes(children);
    }
    // route赋值
    let formatRoute = {
      path: path,
      name: name,
      iconCls: iconCls,
      meta: meta,
      children: children,
      // es5写法,把字符串component动态转换为vue组件
      component(resolve) {
        if (component === "Home") {
          require(["../views/Home.vue"], resolve);
        } else {
          require([
            "../views/" + path.split("/")[1] + "/" + component + ".vue"
          ], resolve);
        }
      }
      // 也可以使用import动态加载组件,但是好像不支持加if-else判断 ???
      // component: () => import('../views/' + path.split('/')[1] + '/' + component + '.vue')
    };
    formatRoutes.push(formatRoute);
  });
  return formatRoutes;
};
