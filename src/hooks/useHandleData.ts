import { ElMessage, ElMessageBox } from 'element-plus'
import { HandleData } from './interface'

export const useHandleData = (
  title: string,
  api: (params: any) => Promise<any>,
  message: string,
  params: any,
  confirmType: HandleData.MessageType = 'warning'
) => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(`是否${title}`, '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: confirmType
    })
      .then(async () => {
        const res = await api(params)
        if (!res) return reject(false)
        ElMessage.success(`${message}成功！`)
        resolve(true)
      })
      .catch(() => {})
  })
}
