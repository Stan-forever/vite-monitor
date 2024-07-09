import { defineStore } from 'pinia'
import { getMenuApi } from '@/services/modules/login'
import { useUserStore } from './user'
import { getFlatMenuList } from '@/utils'
import { LOGIN_URL } from '@/config'
import router from '@/router'

interface State {
  menuList: any[]
}
export const useMenuStore = defineStore({
  id: 'menu',
  state: (): State => {
    return {
      menuList: []
    }
  },
  getters: {
    // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    flatMenuListGet: (state) => getFlatMenuList(state.menuList),
    defaultActive: (state) =>
      getFlatMenuList(state.menuList).find((item) => item.children.length === 0).path ||
      getFlatMenuList(state.menuList)[0].path
  },
  actions: {
    async setMenuList() {
      const userStore = useUserStore()
      try {
        const res = await getMenuApi({
          modType: userStore.userInfo.userType === 1 ? 'console' : 'bydata'
        })
        this.menuList = res.data ? res.data.dataList : []
      } catch (error) {
        userStore.setToken('')
        router.replace(LOGIN_URL)
      }
    }
  }
  //   persist: true
})
