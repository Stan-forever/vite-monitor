export namespace API {
  export interface List<T> {
    currentPage: number
    dataList: T
    totalPage: number
    totalCount: number
  }
  type RuleItem = import('async-validator').RuleItem & {
    trigger?: 'blur' | 'change'
  }
  // 表单验证规则
  type Rules = { [key: string]: RuleItem | RuleItem[] }
}
