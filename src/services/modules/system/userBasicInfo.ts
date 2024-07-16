import http from '@/services/index'
import { UserBasicInfo } from '@/services/interface'
import { API } from '@/services/typings'

export const TableApi = (params: UserBasicInfo.ReqTableParams) => {
  return http.get<API.List<UserBasicInfo.Table[]>>('/bydata-auth/auth/user/userInfo/page', params)
}

export const PostListApi = () => {
  return http.get<API.List<UserBasicInfo.Post[]>>('/bydata-auth/auth/user/post/list', {})
}

export const AddUserApi = (params: UserBasicInfo.EditorUserParams) => {
  return http.post<boolean>('/bydata-auth/auth/user/userInfo/insert', params)
}

export const UpdateUserApi = (params: UserBasicInfo.EditorUserParams) => {
  return http.post<boolean>('/bydata-auth/auth/user/userInfo/update', params)
}
