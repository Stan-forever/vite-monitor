<template>
  <div class="card">
    <el-tabs></el-tabs>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
// import { indicatorTableApi } from '@/services/modules/system/indicator'

const getData = async () => {
  const params = {
    pageType: '0',
    keywords: '',
    status: '',
    catalogId: '',
    caliberId: '',
    pageSize: 10,
    currentPage: 1
  }
  await indicatorTableApi({ ...params })
}

onMounted(() => {
  getData()
})
</script>

<style scoped></style>
