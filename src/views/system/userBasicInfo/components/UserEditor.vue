<template>
  <el-dialog
    :model-value="visible"
    @close="handleCancel"
    :title="parameter.title"
    width="800"
    destroy-on-close
  >
    <el-form
      :model="parameter.userInfo"
      ref="formRef"
      class="grid grid-cols-2 gap-2"
      label-width="100px"
      :rules="rules"
    >
      <el-form-item prop="userName" label="用户名">
        <el-input v-model="parameter.userInfo.userName" />
      </el-form-item>
      <el-form-item prop="nickName" label="姓名">
        <el-input v-model="parameter.userInfo.nickName" />
      </el-form-item>
      <el-form-item prop="deptId" label="归属部门">
        <el-tree-select
          :data="parameter.deptList"
          check-strictly
          :props="defaultProps"
          node-key="id"
          v-model="parameter.userInfo.deptId"
        />
      </el-form-item>
      <el-form-item prop="postIds" label="所属岗位">
        <el-select v-model="parameter.userInfo.postIds">
          <el-option
            v-for="item in postList"
            :key="item.id"
            :label="item.postName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="phoneNumber" label="手机号码">
        <el-input v-model="parameter.userInfo.phoneNumber" />
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="parameter.userInfo.email" />
      </el-form-item>
      <el-form-item prop="sex" label="用户性别">
        <el-radio-group v-model="parameter.userInfo.sex">
          <el-radio value="0">男</el-radio>
          <el-radio value="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="status" label="状态">
        <el-radio-group v-model="parameter.userInfo.status">
          <el-radio value="1">正常</el-radio>
          <el-radio value="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="" label="备注" class="w-full">
        <el-input type="textarea" row="3"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button @click="handleSubmit" type="primary">确定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { UserBasicInfo, Dept } from '@/services/interface'
import { PostListApi } from '@/services/modules/system/userBasicInfo'
import { FormInstance } from 'element-plus'
import { API } from '@/services/typings'

const visible = ref(false)
const defaultProps = {
  children: 'children',
  label: 'deptName'
}

interface Params {
  title: string
  deptList: Dept.DeptTree[]
  api?: (params: any) => Promise<any>
  userInfo: Partial<UserBasicInfo.Table>
}
//父组件传过来的参数
const parameter = ref<Params>({
  title: '',
  deptList: [],
  userInfo: {}
})
const acceptParams = (params: Params) => {
  visible.value = true
  parameter.value = params
  getPostList()
}

// const initForm = (): UserBasicInfo.EditorUserParams => ({
//   userName: '',
//   nickName: '',
//   deptId: '',
//   postIds: '',
//   phoneNumber: '',
//   email: '',
//   sex: '0',
//   status: '1',
//   password: ''
// })
// const form = reactive(initForm())
const formRef = ref<FormInstance>()
const rules: API.Rules = {
  userName: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  nickName: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'blur'
    }
  ],
  deptId: [
    {
      required: true,
      message: '请选择归属部门',
      trigger: 'change'
    }
  ],
  phoneNumber: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    }
  ]
}

const postList = ref<UserBasicInfo.Post[]>([])
const getPostList = async () => {
  const { data } = await PostListApi()
  postList.value = data.dataList
}

const handleSubmit = () => {
  formRef.value?.validateField()
}

const handleCancel = () => {
  formRef.value?.resetFields()
  visible.value = false
}

defineExpose({
  acceptParams
})
</script>

<style scoped></style>
