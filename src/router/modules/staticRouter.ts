import { RouteRecordRaw } from 'vue-router'
import { HOME_URL } from '@/config/index'

export const staticRouter: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: HOME_URL
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import('@/views/Login/index.vue')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layouts/index.vue'),
    // component: () => import("@/layouts/indexAsync.vue"),
    redirect: HOME_URL,
    children: []
  }
]

export const errorRouter = [
  {
    path: '/403',
    name: '403',
    component: () => import('@/components/ErrorPage/403.vue'),
    meta: {
      title: '403页面'
    }
  },
  {
    path: '/404',
    // name: '404',
    component: () => import('@/components/ErrorPage/404.vue'),
    meta: {
      title: '404页面'
    }
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/components/ErrorPage/500.vue'),
    meta: {
      title: '500页面'
    }
  },
  // Resolve refresh page, route warnings
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/ErrorPage/404.vue')
  }
]
