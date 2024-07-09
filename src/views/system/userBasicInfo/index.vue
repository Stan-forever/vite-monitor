<template>
  <div class="flex h-full gap-2">
    <div class="w-1/4 h-full card">
      <el-scrollbar>
        <el-tree :data="treeData" :props="defaultProps" default-expand-all></el-tree>
      </el-scrollbar>
    </div>
    <div class="flex-1 h-full card">456</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { deptTreeApi } from '@/services/modules/system/dept'

interface Tree {
  label: string
  children?: Tree[]
}

const defaultProps = {
  children: 'children',
  label: 'deptName'
}
const treeData = ref<Tree[]>([])
const getTreeData = async () => {
  await deptTreeApi({ currentPage: 1, pageSize: 999 }).then((res) => {
    const { data } = res
    treeData.value = data.dataList
    console.log(' treeData.value', treeData.value)
  })
}

onMounted(() => {
  getTreeData()
})
</script>

<style scoped></style>
