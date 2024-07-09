<template>
  <el-container class="w-full h-full">
    <el-aside class="h-full" :style="{ width: isCollapse ? 0 : '240px' }">
      <el-scrollbar class="h-full">
        <el-menu
          class="h-full"
          unique-opened
          :router="false"
          :default-active="defaultActive"
          :collapse="isCollapse"
        >
          <SubMenu :menuList="menuList" />
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header class="flex justify-between">
        <ToolBarLeft />
        <ToolBarRight />
      </el-header>
      <Main />
      <el-footer>footer</el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SubMenu from './components/Menu/SubMenu.vue'
import ToolBarLeft from './components/Header/ToolBarLeft.vue'
import ToolBarRight from './components/Header/ToolBarRight.vue'
import Main from './components/Main/index.vue'
import { useMenuStore } from '@/stores/modules/menu'
import { useGlobalStore } from '@/stores/modules/global'

const menuStore = useMenuStore()
const globalStore = useGlobalStore()

const menuList = computed(() => menuStore.menuList)
const defaultActive = computed(() => menuStore.defaultActive)
const isCollapse = computed(() => globalStore.isCollapse)
</script>

<style lang="scss" scoped>
.el-aside {
  .el-menu {
    width: 100%;
  }
}
</style>
