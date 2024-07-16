import { UnwrapNestedRefs, reactive } from 'vue'

const useSearchForm = <T extends Record<string, unknown>>(
  initFormData: T
): {
  searchForm: UnwrapNestedRefs<T>
  resetSearchForm: () => void
  getFilterForm: () => UnwrapNestedRefs<T>
} => {
  const initSearchForm = () => {
    return { ...initFormData }
  }
  const searchForm = reactive(initSearchForm())
  const resetSearchForm = () => Object.assign(searchForm, initSearchForm())

  const getFilterForm = () => {
    const form = JSON.parse(JSON.stringify(searchForm))
    Object.keys(form).forEach((item) => {
      switch (form[item]) {
        case '':
        case null:
        case undefined:
          delete form[item]
          break
        default:
          break
      }
    })
    return form
  }
  return { searchForm, resetSearchForm, getFilterForm }
}

export default useSearchForm
