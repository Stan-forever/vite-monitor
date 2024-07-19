<template>
  <div class="card">
    <div class="mb-2 text-sm">大文件切片上传</div>
    <el-upload v-model="currentFile" :on-change="handleFileChange" :auto-upload="false">
      <el-button type="primary">上传文件</el-button>
    </el-upload>
    <el-button type="primary" @click="handleUpload">确定上传</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, UploadFile } from 'element-plus'
import axios from 'axios'
import { AxiosRequestHeaders, AxiosProgressEvent } from 'axios'

const currentFile = ref<File>()
const uploadChunkList = ref<any[]>([])

const handleFileChange = (uploadFile: UploadFile) => {
  currentFile.value = uploadFile.raw //获取上传的文件
}

const handleUpload = () => {
  if (!currentFile.value) return ElMessage.error('请先上传文件！')
  const chunkList = createChunk(currentFile.value)
  uploadChunkList.value = chunkList.map(({ file }, index: Number) => {
    return {
      file,
      size: file.size,
      percent: 0,
      chunkName: `${currentFile.value && currentFile.value.name}-${index}`,
      fileName: currentFile.value && currentFile.value.name,
      index
    }
  })
  uploadChunks()
}

//文件切片函数
const createChunk = (file: File, size: number = 1 * 1024 * 1024) => {
  let chunkList = []
  let cur = 0
  while (cur < file.size) {
    chunkList.push({
      file: file.slice(cur, cur + size)
    })
    cur += size
  }
  return chunkList
}

type RequestUpload = {
  url: string
  method: 'get' | 'post'
  data: any
  headers?: AxiosRequestHeaders
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
}
//请求函数
const requestUpload = (params: RequestUpload) => {
  return new Promise((resolve, reject) => {
    const { method, url, data, headers, onUploadProgress } = params
    axios[method](url, data, { headers, onUploadProgress })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

const uploadChunks = () => {
  const formateList = uploadChunkList.value.map(({ file, fileName, index, chunkName }) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('fileName', fileName)
    formData.append('chunkName', chunkName)
    return { formData, index }
  })
  const requestList = formateList.map(({ formData, index }) => {
    return requestUpload({
      url: '123',
      data: formData,
      onUploadProgress: createProgress(uploadChunkList.value[index]),
      method: 'post'
    })
  })
  Promise.all(requestList).then(mergeChunks)

  console.log('formateList', formateList)
}

const mergeChunks = () => {
  requestUpload({
    url: 'http://localhost:3000/merge',
    data: JSON.stringify({
      fileName: currentFile.value && currentFile.value.name,
      size: 2 * 1024 * 1024
    }),
    method: 'get'
  })
}

const createProgress = (item: any) => {
  return (e) => {
    item.percent = parseInt(String(e.loaded / e.total) * 100)
  }
}
</script>

<style scoped></style>
