<template>
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <div class="h-full">
          <component :is="Component" :key="route.fullPath" v-if="isRouterShow" />
        </div>
      </transition>
    </router-view>
  </el-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isRouterShow = ref(true)
</script>

<style lang="scss" scoped>
.el-main {
  box-sizing: border-box;
  padding: 10px 12px;
  overflow-x: hidden;
  background-color: var(--el-bg-color-page);
}
</style>
