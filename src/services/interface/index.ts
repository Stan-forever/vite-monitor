export interface Result {
  msg: string
  code: string
}

export interface ResultData<T = any> extends Result {
  data: T
}

export namespace UserBasicInfo {
  export interface ReqTableParams {
    current: number
    pageSize: number
    deptId: string
    keyword?: string
    groupCode?: number
  }
  export interface Post {
    id: string
    createdTime: string
    modifiedTime: string
    params: null
    postCode: string
    postName: string
    postSort: string
    status: string
    creatorId: string
    creatorName: string
    operatorId: string
    operatorName: string
    remark: string
  }
  export interface Table {
    id: string
    createdTime: string
    modifiedTime: string
    params: null
    deptId: string
    userId: null
    userName: string
    nickName: string
    userType: null
    email: null
    phoneNumber: string
    sex: string
    avatar: null
    password: string
    status: string
    loginIp: null
    loginDate: null
    creatorId: string
    creatorName: null
    operatorId: string
    operatorName: null
    remark: null
    roles: null
    dept: null
    posts: Post[]
    postIds: null
    lockmark: null
    deptName: string
    admin: boolean
  }
  export interface EditorUserParams {
    id?: string
    avatar?: string
    createBy?: string
    createdTime?: string
    deptId?: string
    email?: string
    loginDate?: string
    loginIp?: string
    modifiedTime?: string
    nickName: string
    password: string
    phoneNumber: string
    posts?: string
    remark?: string
    roles?: string[]
    sex: string
    status: string
    updateBy?: string
    userName: string
    userType?: string
    postIds?: string
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
