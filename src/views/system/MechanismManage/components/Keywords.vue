<template>
  <el-dialog :model-value="parameter.visible" @cancel="handleCancel" :title="parameter.title">
    <div class="flex gap-2">
      <el-tag
        v-for="tag in parameter.keywordsList"
        :key="tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        size="large"
      >
        {{ tag }}
      </el-tag>
      <el-input
        v-if="parameter.inputVisible"
        ref="InputRef"
        v-model="parameter.inputValue"
        class="w-20"
        size="small"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      />
      <el-button v-else class="button-new-tag" @click="showInput"> + New Tag </el-button>
    </div>

    <template #footer>
      <el-button @click="handleCancel">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, nextTick, ref } from 'vue'

const emit = defineEmits<{
  (e: 'setKeywordsList', value: any): void
}>()

const InputRef = ref()

const initParameter = () => {
  return {
    visible: false,
    title: '',
    keywordsList: [],
    inputVisible: false,
    inputValue: ''
  }
}
const parameter = reactive<any>(initParameter())
const acceptParams = (params: any) => {
  Object.assign(parameter, params)
  console.log('parameter', parameter)
}

const handleCancel = () => {
  //   Object.assign(parameter, initParameter())
  parameter.visible = false
}

const handleClose = (tag: string) => {
  parameter.keywordsList.splice(parameter.keywordsList.indexOf(tag), 1)
}

const handleInputConfirm = () => {
  if (parameter.inputValue) {
    parameter.keywordsList.push(parameter.inputValue)
  }
  setTimeout(() => {
    emit('setKeywordsList', parameter.keywordsList)
  }, 0)
  parameter.inputVisible = false
  parameter.inputValue = ''
}

const showInput = () => {
  parameter.inputVisible = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

defineExpose({
  acceptParams
})
</script>

<style scoped></style>
