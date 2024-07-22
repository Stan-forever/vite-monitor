<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
      {{ item.menuName }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/modules/menu'

const route = useRoute()
const menuStore = useMenuStore()

const breadcrumbList = computed(() => {
  let breadcrumbData =
    menuStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ?? []
  return [breadcrumbData]
})
</script>
