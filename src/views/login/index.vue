<template>
  <div class="flex items-center justify-center w-full h-full">
    <el-card class="p-10 w-96">
      <el-form :model="form" :rules="formRules" label-width="70px" ref="formRef">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <div class="flex items-center">
            <el-input v-model="form.code" />
            <el-image :src="codeData.img" @click="getCodeData" class="flex w-full h-full">
              <template #error>
                <el-image class="items-center w-full h-full" />
              </template>
            </el-image>
          </div>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="w-full" @click="handleLogin(formRef)">登录</el-button>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { LoginParamsType, loginApi, CodeRes, getCodeApi } from '@/services/modules/login'
import JSEncrypt from 'jsencrypt'
import { PUBLIC_KEY } from '@/config'
import { useUserStore } from '@/stores/modules/user'
import { useMenuStore } from '@/stores/modules/menu'
import router from '@/router'

const form = ref<LoginParamsType>({
  username: '',
  password: '',
  code: '9999',
  uuid: ''
})
const formRef = ref<FormInstance>()
const formRules = reactive<FormRules<LoginParamsType>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
})

const codeData = ref<CodeRes>({
  img: '',
  uuid: ''
})

const getCodeData = async () => {
  const res = await getCodeApi()
  const { img, uuid } = res.data
  codeData.value.img = 'data:image/png;base64,' + img
  codeData.value.uuid = uuid
}

const encryptPublic = (value: string) => {
  // 使用公钥加密，default_key_size可为512，1024，2048等
  let encrypt = new JSEncrypt({ default_key_size: '2048' })
  encrypt.setPublicKey(PUBLIC_KEY)
  let encrypted = encrypt.encrypt(value)
  return encrypted as string
}

const userStore = useUserStore()

const defaultActive = computed(() => {
  return userStore.userInfo.userType === 1 ? '/system/userBasicInfo' : '/home'
})

const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { username, password } = form.value
      const res = await loginApi(
        {
          ...form.value,
          username: encryptPublic(username),
          password: encryptPublic(password)
        },
        'loginApiLoader'
      )
      const { token, userInfo } = res.data
      userStore.setUserInfo(userInfo)
      userStore.setToken(token)
      router.push(defaultActive.value)
    } else {
      console.log('error submit!', fields)
    }
  })
}

onMounted(() => {
  getCodeData()
})
</script>

<style scoped></style>
