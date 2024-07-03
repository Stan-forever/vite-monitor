import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import NProgress from '@/config/ngprogress'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
