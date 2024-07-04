import { defineStore } from 'pinia'
import { getMenuApi } from '@/services/modules/login'
import { useUserStore } from './user'

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
  actions: {
    async setMenuList() {
      const userStore = useUserStore()
      const res = await getMenuApi({
        modType: userStore.userInfo.userType === '1' ? 'console' : 'bydata'
      })
      if (res) {
        this.menuList = res.data ? res.data.dataList : []
      }
    }
  }
  //   persist: true
})
