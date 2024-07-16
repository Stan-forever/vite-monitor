<template>
  <div class="card">
    <el-table :data="tableData" height="90%">
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="index"
        :label="item"
        :prop="index.toString()"
      />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { mockData, headData } from './mock/1'

const tableData = ref<any[]>(mockData)
const tableHeader = ref(headData)
</script>

<style scoped></style>
