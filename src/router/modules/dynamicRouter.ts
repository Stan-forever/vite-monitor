import { RouteRecordRaw } from 'vue-router'
import { useMenuStore } from '@/stores/modules/menu'
import router from '..'

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob('@/views/**/*.vue')

export const initDynamicRouter = async () => {
  const menuStore = useMenuStore()
  await menuStore.setMenuList()
  try {
    menuStore.menuList.forEach((item) => {
      item.component = modules['/src/views' + item.path + '/index' + '.vue']
      router.addRoute('layout', item as RouteRecordRaw)
    })
  } catch (error) {}
}
