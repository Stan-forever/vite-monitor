import { createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { useMenuStore } from '@/stores/modules/menu'
import NProgress from '@/config/ngprogress'
import { staticRouter, errorRouter } from './modules/staticRouter'
import { initDynamicRouter } from './modules/dynamicRouter'
import { LOGIN_URL } from '@/config'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...errorRouter],
  strict: false
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const meneStore = useMenuStore()

  //NProgress开始
  NProgress.start()

  //判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
  if (to.path.toLocaleLowerCase() === LOGIN_URL) {
    if (userStore.token) return next(from.fullPath)
    return next()
  }

  //判断是否有token,没有则重定向到登录页
  if (!userStore.token) {
    meneStore.menuList = []
    return next({ path: LOGIN_URL, replace: true })
  }

  if (meneStore.menuList.length === 0) {
    await initDynamicRouter()
    return next({ ...to, replace: true })
  }

  //正常访问页面
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
