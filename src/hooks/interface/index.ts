export namespace HandleData {
  export type MessageType = '' | 'success' | 'warning' | 'info' | 'error'
}

export namespace Table {
  export interface Pageable {
    current: number
    pageSize: number
    totalCount: number
  }
  export interface StateProps {
    tableData: any[]
    tableLoading: boolean
    pageable: Pageable
  }
}
