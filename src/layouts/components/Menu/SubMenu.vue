<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
      <template #title>
        {{ subItem.menuName }}
      </template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="subItem.path" @click="handleClickMenu(subItem)">
      <template #title>
        {{ subItem.menuName }}
      </template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
import SubMenu from '@/layouts/components/Menu/SubMenu.vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

defineProps<{
  menuList: any[]
}>()

const route = useRoute()
const router = useRouter()
const handleClickMenu = (subItem: any) => {
  console.log('route', route)

  router.push(subItem.path)
}
</script>

<style lang="scss" scoped></style>
