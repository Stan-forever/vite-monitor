export interface Result {
  msg: string
  code: string
}

export interface ResultData<T = any> extends Result {
  data: T
}

export namespace API {
  export interface List<T> {
    currentPage: number
    dataList: T
    totalPage: number
  }
}

export namespace Dept {
  export interface ReqDeptTreeParams {
    currentPage: number
    pageSize: number
    deptName?: string
  }
  export interface DeptTree {
    id: string
    createdTime: string
    modifiedTime: string
    params: null
    parentId: string
    ancestors: string
    deptName: string
    orderNum: string
    leader: string
    phone: string
    email: string
    status: string
    parentName: null
    children: DeptTree[]
    user: null
    usercount: number
    creatorId: string
    creatorName: string
    operatorId: string
    operatorName: string
  }
}
