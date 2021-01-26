import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/home',
    component: () => import('@/views/home/home.vue'),
    redirect: '/home/my',
    children: [
      {
        path: '/home/company',
        component: () => import('@/views/home/company/company.vue')
      },
      {
        path: '/home/question',
        component: () => import('@/views/home/question/question.vue')
      },
      {
        path: '/home/find',
        component: () => import('@/views/home/find/find.vue')
      },
      {
        path: '/home/my',
        component: () => import('@/views/home/my/my.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
