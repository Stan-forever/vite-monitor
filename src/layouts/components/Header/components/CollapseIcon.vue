<template>
  <el-icon class="collapse-icon" @click="changeCollapse">
    <component :is="isCollapse ? Fold : Expand"></component>
  </el-icon>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGlobalStore } from '@/stores/modules/global'
import { Fold, Expand } from '@element-plus/icons-vue'

const globalStore = useGlobalStore()
const isCollapse = computed(() => {
  return globalStore.isCollapse
})

const changeCollapse = () => {
  globalStore.setGlobalState('isCollapse', !globalStore.isCollapse)
}
</script>

<style lang="scss" scoped>
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  color: var(--el-header-text-color);
  cursor: pointer;
}
</style>
