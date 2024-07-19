import { computed, reactive, toRefs } from 'vue'
import { Table } from './interface'

export const useTable = (
  api: (params: any) => Promise<any>,
  searchParams: {
    [key: string]: any
  }
) => {
  const state = reactive<Table.StateProps>({
    tableData: [],
    tableLoading: false,
    pageable: {
      current: 1,
      pageSize: 10,
      totalCount: 0
    }
  })

  const pageParam = computed({
    get: () => {
      return {
        current: state.pageable.current,
        pageSize: state.pageable.pageSize
      }
    },
    set: () => {}
  })

  const getTableData = async () => {
    if (!api) return
    try {
      state.tableLoading = true
      const { data } = await api({ ...searchParams, ...pageParam.value })
      state.tableData = data.dataList
      state.pageable.totalCount = data.totalCount
      state.tableLoading = false
    } catch (error) {
      state.tableLoading = false
    }
  }

  const handleCurrentChange = (val: number) => {
    state.pageable.current = val
    getTableData()
  }

  const handleSizeChange = (val: number) => {
    state.pageable.pageSize = val
    getTableData()
  }

  const resetPagination = () => {
    state.pageable.current = 1
    state.pageable.pageSize = 10
    getTableData()
  }

  return {
    ...toRefs(state),
    getTableData,
    handleCurrentChange,
    handleSizeChange,
    resetPagination
  }
}
