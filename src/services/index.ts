import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse
} from 'axios'
import axios from 'axios'
import type { ResultData } from './interface'
import { useUserStore } from '@/stores/modules/user'
import { AxiosCanceler } from './helper/axiosCancel'

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean
  cancel?: boolean
}

const config = {
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 30000
}

const axiosCanceler = new AxiosCanceler()

class RequesHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)
    this.service.interceptors.request.use((config: CustomAxiosRequestConfig) => {
      const userStore = useUserStore()
      // 重复请求不需要取消，在 api 服务中通过指定的第三个参数: { cancel: false } 来控制
      config.cancel ??= true
      config.cancel && axiosCanceler.addPending(config)
      if (config.headers && typeof config.headers.set === 'function') {
        config.headers.set('Authorization', userStore.token)
      }
      return config
    })
    this.service.interceptors.response.use((response: AxiosResponse) => {
      const { data, config } = response

      return data
    })
  }
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object | string, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }
}

export default new RequesHttp(config)
