<template>
  <div class="card">
    <div>home</div>
    <el-button type="primary" @click="handlePush('/login')">PushLogin</el-button>
    <el-button type="primary" @click="handlePush('/about')">PushAbout</el-button>
    <el-button type="primary" @click="loginOut">LoginOut</el-button>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'
import { LOGIN_URL } from '@/config'

const userStore = useUserStore()

const handlePush = (path: string) => {
  router.push(path)
}

const loginOut = () => {
  ElMessageBox.confirm('您是否确定要退出登录？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    userStore.setToken('')
    router.replace(LOGIN_URL)
  })
}
</script>

<style scoped></style>
