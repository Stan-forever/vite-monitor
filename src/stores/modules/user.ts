import { defineStore } from 'pinia'
import { UserInfo } from '@/services/modules/login'

interface State {
  token: string
  userInfo: UserInfo
}
export const useUserStore = defineStore({
  id: 'user',
  state: (): State => {
    return {
      token: '',
      userInfo: {
        modType: 'bydata',
        userType: 1
      }
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo
    }
  },
  persist: true
  //   persist: {
  //     paths: ['token']
  //   }
})
