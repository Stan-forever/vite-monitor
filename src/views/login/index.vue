<template>
  <div class="flex appTest">
    <div class="child">App1</div>
    <div class="child">App2</div>
    <el-button type="primary" @click="handleIncrease">{{ currrentCount }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCounterStore } from '@/stores/modules/counter'

const couter = useCounterStore()

const currrentCount = computed(() => {
  return couter.count
})

const handleIncrease = () => {
  couter.increment()
}
</script>

<style lang="scss" scoped>
.appTest {
  .child {
    color: blue;
  }
}
</style>
