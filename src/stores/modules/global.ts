import { defineStore } from 'pinia'
import { GlobalState } from '../interface'

export const useGlobalStore = defineStore({
  id: 'global',
  state: (): GlobalState => {
    return {
      isCollapse: false
    }
  },
  actions: {
    setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
      this.$patch({ [args[0]]: args[1] })
    }
  }
})
