import http from '@/services/index'
import { Dept } from '@/services/interface'

export const deptTreeApi = (params: Dept.ReqDeptTreeParams) => {
  return http.get<API.List<Dept.DeptTree>>('/bydata-auth/auth/user/dept/deptTree', params)
}
