import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './components/frontend/layout/Layout'
import store from "@/store/store";

Vue.use(VueRouter)
const routes = [{
    path: '/',
    component: Layout,
    children: [
        {
            path: '/',
            name: 'Dashboard',
            component: () => import('../src/components/frontend/dashboard/Dashboard.vue')
        },
        {
            path: 'login',
            name: 'Login',
            component: () => import('../src/components/frontend/login/Login.vue')
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('../src/components/frontend/dashboard/Dashboard.vue')
        },
    ]
    },
    {
        // catch all 404 - define at the very end
        path: '*',
        component: () => import('../src/components/pagenotfound/PageNotFound.vue')
    }
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    /**
     * The validation and route guard
     */
    let isUserLogin = store.getters['AuthModule/isLoggedIn']
    /**
     * user is not login and page is not login page and page is not forgot password and page is not reset password
     */
    if (!isUserLogin && to.path !== '/login' && to.path !== '/forgotpassword' && to.path !== '/resetpassword/' && to.path !== '/resetpassword') {
        next('/login')
    } else if (isUserLogin && (to.path === '/login' || to.path === '/forgotpassword' || to.path === '/resetpassword' || to.path === '/resetpassword/')) { // admin tring to access login page after login
        next('/dashboard')
    } else if (isUserLogin && to.path === '/') { // If admin user is login and trying to access only admin of admin/ route
        next('/dashboard')
    } else {
        next()
    }
})

export default router
