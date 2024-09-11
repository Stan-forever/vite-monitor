<template>
  <textarea ref="editQuerySQL"></textarea>
</template>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'
// codemirror基础资源引入
import _CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'

// 折叠资源引入:开始
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/foldgutter.js'
// 折叠资源引入:结束

// 搜索资源引入:开始
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/match-highlighter.js'
import 'codemirror/addon/search/jump-to-line.js'

import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
// 搜索资源引入:结束

// language
import 'codemirror/theme/juejin.css'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/hint/sql-hint.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/keymap/sublime.js'

// 启用placeholder
import 'codemirror/addon/display/placeholder.js'

import 'codemirror/addon/selection/active-line.js' //光标行背景高亮，配置里面也需要styleActiveLine设置为true

const CodeMirror = window.CodeMirror || _CodeMirror

const props = defineProps<{
  modelValue: ''
  defaultValue: ''
  keywordsList: []
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const { defaultValue } = toRefs(props)
const editQuerySQL = ref()
const sqlInstance = ref()
let editor: any

onMounted(() => {
  editor = CodeMirror.fromTextArea(editQuerySQL.value, {
    mode: 'text/x-mysql',
    theme: 'juejin', // Theme
    lineNumbers: true, // Show line number
    smartIndent: true, // Smart indent
    indentUnit: 2, // The smart indent unit is 2 spaces in length
    foldGutter: true, // Code folding
    styleActiveLine: true, // Display the style of the selected row
    keyMap: 'sublime',
    extraKeys: { Tab: 'autocomplete' }, //自定义快捷键
    readOnly: false,
    hintOptions: {
      completeSingle: false // 当匹配只有一项的时候是否自动补全
      // defaultTable: 'aaa',
    }
  })
  //   const keywordsList = ['list', 'jump', 'item', 'want', 'love']
  props.keywordsList.forEach((words) => {
    CodeMirror.resolveMode('text/x-mysql').keywords[words] = true
  })

  console.log('CodeMirror', CodeMirror.resolveMode('text/x-mysql'))

  // 监听编辑器的change事件
  editor.on('change', () => {
    emit('update:modelValue', editor.getValue())
    // 触发v-model的双向绑定
    // context.emit('update:modelValue', editor.getValue())
  })
  if (defaultValue.value) {
    editor.setValue(defaultValue.value)
  }

  nextTick(() => {
    const instance = editor
    sqlInstance.value = instance
    instance.on('inputRead', (e: string, { text }: { text: string[] }) => {
      if (text[text.length - 1].trim()) {
        instance.showHint() //代码提示
      }
    })
    instance.refresh()
  })
})
onBeforeUnmount(() => {
  if (null !== editor) {
    editor.toTextArea()
    editor = null
  }
})
</script>
<style lang="scss">
.CodeMirror pre.CodeMirror-line,
.CodeMirror pre.CodeMirror-line-like {
  font-size: 15px;
}
</style>
