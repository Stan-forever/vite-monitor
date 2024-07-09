import { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { useMenuStore } from '@/stores/modules/menu'
import router from '..'
import { LOGIN_URL } from '@/config'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

export const initDynamicRouter = async () => {
  const userStore = useUserStore()
  const menuStore = useMenuStore()

  try {
    await menuStore.setMenuList()

    if (!menuStore.menuList.length) {
      userStore.setToken('')
      router.replace(LOGIN_URL)
      return Promise.reject('No permission')
    }
    menuStore.flatMenuListGet.forEach((item) => {
      item.component = modules['/src/views' + item.path.replace('#', '') + '/index' + '.vue']
      router.addRoute('layout', item as RouteRecordRaw)
    })
  } catch (error) {
    return
  }
}
