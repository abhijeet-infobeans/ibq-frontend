import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from './components/frontend/layout/Layout'

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

export default router
