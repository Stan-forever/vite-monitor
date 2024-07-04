<template>
  <div>关于</div>
  <el-button type="primary" @click="handlePush">PushHome</el-button>
</template>

<script setup lang="ts">
import router from '@/router'

const handlePush = () => {
  router.push('/home')
}
</script>

<style scoped></style>
