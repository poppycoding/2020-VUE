import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import t1 from "../views/t1.vue";
import t2 from "../views/t2.vue";

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
    }, {
        path: '/home',
        name: '导航',
        component: Home,
        isNavigation: true,
        children: [
            {
                path: '/t1',
                name: 't1',
                component: t1
            }, {
                path: '/t2',
                name: 't2',
                component: t2
            },
        ]
    }
]

const router = new VueRouter({
    routes
})


export default router
