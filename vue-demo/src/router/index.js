import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    }, {
        path: '/home',
        name: 'Home',
        component: Home,
    }
    // 静态写死导航栏数据: {path: '/home', name: '导航', component: Home, isNavigation: true, children: []}
]

const router = new VueRouter({
    routes
})


export default router
