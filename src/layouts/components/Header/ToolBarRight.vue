<template>
  <el-dropdown trigger="click">
    <!-- <Avatar /> -->
    <div>欢迎你，{{ nickName }}</div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="loginOut"> 退出登录 </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import router from '@/router'
import Avatar from './components/Avatar.vue'
import { useUserStore } from '@/stores/modules/user'
import { LOGIN_URL } from '@/config'
import { ElMessage } from 'element-plus'
import { computed } from 'vue'

const userStore = useUserStore()
const nickName = computed(() => {
  return userStore.userInfo.nickName
})
const loginOut = () => {
  userStore.setToken('')
  router.replace(LOGIN_URL)
  ElMessage.success('退出登录成功')
}
</script>

<style scoped></style>
