import { computed, ref } from 'vue'

export const useSelection = (rowKey: string = 'id') => {
  const selectedRows = ref<{ [key: string]: any }[]>([])

  const selectedIds = computed(() => {
    let ids: string[] = []
    selectedRows.value.forEach((item) => ids.push(item[rowKey]))
    return ids
  })

  const selectionChange = (rowArr: { [key: string]: any }[]) => {
    selectedRows.value = rowArr
  }

  return {
    selectedIds,
    selectionChange
  }
}
