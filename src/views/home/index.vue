<template>
  <div>home</div>
  <el-button type="primary" @click="handlePush">Push</el-button>
</template>

<script setup lang="ts">
import router from '@/router'

const handlePush = () => {
  router.push('/login')
}
</script>

<style scoped></style>
