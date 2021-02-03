import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '@/store'
import { getLocal } from '@/utils/local.js'
import { auInfo } from '@/api/my.js'

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
        component: () => import('@/views/home/company/company.vue'),
        meta: {
          needTab: true
        }
      },
      {
        path: '/home/question',
        component: () => import('@/views/home/question/question.vue'),
        meta: {
          needLogin: true,
          needTab: true
        }
      },
      {
        path: '/home/find',
        component: () => import('@/views/home/find/find.vue'),
        meta: {
          needTab: true
        }
      },
      {
        path: '/home/shareList',
        component: () => import('@/views/home/find/shareList.vue')
      },
      {
        path: '/home/shareInfo/:id?',
        component: () => import('@/views/home/find/shareInfo.vue')
      },
      {
        path: '/home/my',
        component: () => import('@/views/home/my/my.vue'),
        meta: {
          needLogin: true,
          needTab: true
        }
      },
      {
        path: '/home/myInfo',
        component: () => import('@/views/home/my/myInfo.vue'),
        meta: {
          needLogin: true
        }
      },
      {
        path: '/home/editInfo',
        component: () => import('@/views/home/my/editInfo.vue'),
        meta: {
          needLogin: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 这段代码不但能解决路由重复跳转的问题，还能解决路由的很多问题，一定要记得加上
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  /**
  // 1.判断页面是否需要登录才能访问
    // 需要登录
          // 判断有没有登录
              // 登陆了 放行
              // 没有登录
                    // 判断有没有token
                        // 有token， 那么就调用接口去获取用户信息，并修改登录状态，最后放行
                        // 没有token ，返回到登录页。
    // 不需要登录
        // 直接next（）
   */
  window.cancelEvent('', true)
  if (to.meta.needLogin) {
    if (Store.state.isLogin) {
      next()
    } else {
      if (getLocal()) {
        auInfo()
          .then(res => {
            // console.log(res)
            Store.commit('setUserInfo', res.data.data)
            Store.commit('setIsLogin', true)
            next()
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        // 这里在回去登录的时候，要考虑下用户来的页面（即登录完成回到用户想要去的页面）  注意点：fullPath的使用
        // 在这里给login页面传参，那么就要到login页面去接收
        // next('/login')
        // 这里的redirect参数就是用户想要进入的网址
        next('/login?redirect=' + to.fullPath)
      }
    }
  } else {
    next()
  }
})

export default router
