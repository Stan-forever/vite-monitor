<template>
  <el-dialog :model-value="visible" @close="handleCancel" width="800" destroy-on-close>
    <template #title>
      <div class="font-bold">新建指标</div>
    </template>
    <div class="flex gap-10 p-10">
      <div
        class="flex flex-col items-center justify-center flex-1 p-6 border border-solid rounded border-slate-200 hover:bg-[#f8f8f8]"
      >
        <div class="w-28 h-28 bg-[#d6e3f4] flex items-center justify-center">
          <div class="w-8 h-8 bg-[#6186ef]"></div>
        </div>
        <div class="my-3">基础指标</div>
        <div class="text-xs">基于业务度量字段进行聚合，</div>
        <div class="text-xs">如: 交易金额</div>
      </div>
      <div
        class="flex flex-col items-center justify-center flex-1 p-6 border border-solid rounded border-slate-200 hover:bg-[#f8f8f8]"
      >
        <div class="w-28 h-28 bg-[#d6e3f4] flex items-center justify-center">
          <div class="w-8 h-8 bg-[#6186ef]"></div>
        </div>
        <div class="my-3">基础指标</div>
        <div class="text-xs">基于业务度量字段进行聚合，</div>
        <div class="text-xs">如: 交易金额</div>
      </div>
      <div
        class="flex flex-col items-center justify-center flex-1 p-6 border border-solid rounded border-slate-200 hover:bg-[#f8f8f8]"
      >
        <div class="w-28 h-28 bg-[#d6e3f4] flex items-center justify-center">
          <div class="w-8 h-8 bg-[#6186ef]"></div>
        </div>
        <div class="my-3">基础指标</div>
        <div class="text-xs">基于业务度量字段进行聚合，</div>
        <div class="text-xs">如: 交易金额</div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const handleCancel = () => {
  emit('update:visible', false)
}
</script>

<style scoped></style>
