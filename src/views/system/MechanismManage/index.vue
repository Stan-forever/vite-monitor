<template>
  <el-button type="primary" @click="setKeywords">关键词维护</el-button>
  <VueCodemirror v-model="codeRef" default-value="let test='abc'" :keywords-list="keywordsList" />
  <Keywords ref="keywordsRef" @setKeywordsList="setKeywordsList" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import VueCodemirror from './components/CodeMirror.vue'
import Keywords from './components/Keywords.vue'

const codeRef = ref('')
const keywordsRef = ref()
const keywordsList = ref(['aaa', 'bbb', 'ccc'])

const setKeywords = () => {
  const params = {
    visible: true,
    title: '关键词维护',
    keywordsList
  }
  keywordsRef.value && keywordsRef.value.acceptParams(params)
}

const setKeywordsList = (val: any) => {
  console.log('val', val)

  keywordsList.value = val
  console.log('keywordsList', keywordsList.value)
}
</script>
