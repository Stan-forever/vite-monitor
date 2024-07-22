import { reactive, ref } from 'vue'
import { FormInstance } from 'element-plus'

export const useForm = (data: { [key: string]: any }) => {
  const initForm = () => ({
    ...data
  })

  const form = reactive(initForm())
  const formRef = ref<FormInstance>()

  const validateField = () => {
    formRef.value?.validateField()
  }

  const resetFields = () => {
    formRef.value?.resetFields()
    Object.assign(form, initForm())
  }

  return {
    form,
    formRef,
    validateField,
    resetFields
  }
}
