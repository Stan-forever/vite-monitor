<template>
  <el-pagination
    v-model:current-page="pageable.current"
    v-model:page-size="pageable.pageSize"
    :page-sizes="[10, 20, 30, 40, 50, 100]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageable.totalCount"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    class="mt-4"
    background
  />
</template>

<script setup lang="ts">
interface Pageable {
  current: number
  pageSize: number
  totalCount: number
}

interface PaginationProps {
  pageable: Pageable
  handleSizeChange: (pageSize: number) => void
  handleCurrentChange: (current: number) => void
}

defineProps<PaginationProps>()
</script>

<style scoped></style>
