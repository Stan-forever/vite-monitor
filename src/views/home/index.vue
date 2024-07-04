<template>
  <div>home</div>
  <el-button type="primary" @click="handlePush('/login')">PushLogin</el-button>
  <el-button type="primary" @click="handlePush('/about')">PushAbout</el-button>
</template>

<script setup lang="ts">
import router from '@/router'

const handlePush = (path: string) => {
  router.push(path)
}
</script>

<style scoped></style>
