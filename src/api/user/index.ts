import request from '@/utils/request'
import type { LoginParams, RegisterParams, UserInfo } from '@/api/user/type'

/**
 * 登录
 * @param data 登录参数
 */
export function loginApi(data: LoginParams) {
  return request<UserInfo>('/user/login', 'post', data)
}

/**
 * 退出登录
 */
export function logoutApi() {
  return request<boolean>('/user/logout', 'post')
}

/**
 * 注册
 * @param data 注册参数
 */
export function registerApi(data: RegisterParams) {
  return request<number>('/user/register', 'post', data)
}

/**
 * 获取用户信息
 */
export function getUserInfoApi() {
  return request<UserInfo>('/user/current')
}

/**
 * 获取用户列表
 * @param userName 用户名
 */
export function getUserListApi(userName: string) {
  return request<UserInfo[]>('/user/search', 'get', { userName })
}

/**
 * 删除用户
 * @param id 用户id
 */
export function deleteUserApi(id: string) {
  return request<boolean>(`/user/delete/${id}`, 'delete')
}
