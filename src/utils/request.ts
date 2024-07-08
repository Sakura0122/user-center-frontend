import axios from 'axios'
import type { Method, AxiosRequestConfig } from 'axios'
import { hideLoading, showLoading } from '@/utils/loading'
import { message } from 'ant-design-vue'
import router from '@/router'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000
})

service.interceptors.request.use(
  (config) => {
    if (config.showLoading) showLoading()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (res) => {
    hideLoading()
    if (res.data.code === 0) {
      return res.data
    } else {
      if ([40100, 40101].includes(res.data.code)) {
        router.push('/login')
      }

      if (!res.config.showError) {
        return Promise.resolve(res.data)
      }

      message.error(res.data.message || '网络异常')
      return Promise.reject(res.data)
    }
  },
  (error) => {
    hideLoading()
    message.error(error.message || '请求错误')
    return Promise.reject(error)
  }
)

type Data<T> = {
  code: string
  data: T
  message: string
}

const request = <T>(
  url: string,
  method: Method = 'get',
  submitData?: object | string,
  config?: AxiosRequestConfig
) => {
  return service.request<T, Data<T>>({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
    showLoading: true,
    showError: true,
    ...config
  })
}

export default request
