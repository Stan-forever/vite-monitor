import http from '@/services/index'

export interface LoginParamsType {
  code: string
  password: string
  username: string
  uuid: string
}
export type ModType = 'console' | 'bydata'
export interface UserInfo {
  modType: ModType
  userType: 1 | 2
}
export interface LoginResType {
  token: string
  userInfo: UserInfo
}
export const loginApi = (params: LoginParamsType, loadingLoader: string) => {
  return http.post<LoginResType>('/bydata-auth/auth/login', params, loadingLoader)
}

export interface CodeRes {
  img: string
  uuid: string
}
export const getCodeApi = () => {
  return http.get<CodeRes>('/bydata-auth/auth/code')
}

export const getMenuApi = (params: { modType: ModType }) => {
  return http.get<any>('/bydata-auth/auth/user/menu/loginUserMenutree', params)
}
