import request from '@/utils/request'
import type { LoginParams, UserInfo } from '@/api/user/type'

/**
 * 登录
 * @param data 登录参数
 */
export function loginApi(data: LoginParams) {
  return request<UserInfo>('/user/login', 'post', data)
}
