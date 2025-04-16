import {
  computed,
  unref,
  ref,
  watch,
  reactive,
  onMounted,
  type ComputedRef,
  type Ref,
  watchEffect,
  isRef
} from 'vue'
import type { BaseTableProps, SorterResult, FetchParams } from '../types/type'
import type { PaginationProps } from '../types/pagination'
import { useTimeoutFn } from '@vueuse/core'
import { isFunction, isBoolean } from '@/utils/is'
import { tableSetting } from '../const'
import { buildUUID } from '@/utils/uuid'
import { get, cloneDeep, merge } from 'lodash-es'
import { filterEmptyKey } from '@/utils'
interface ActionType {
  getPaginationInfo: ComputedRef<boolean | PaginationProps>
  setPagination?: (info: Partial<PaginationProps>) => void
  setLoading?: (loading: boolean) => void
  getFieldsValue?: () => Recordable
  clearSelectedRowKeys?: () => void
  tableData: Ref<Recordable[]>
}
interface SearchState {
  sortInfo: Recordable
  filterInfo: Record<string, string[]>
}
export function useDataSource(
  propsRef: ComputedRef<BaseTableProps>,
  {
    getPaginationInfo,
    setPagination,
    setLoading,
    // getFieldsValue,
    clearSelectedRowKeys,
    tableData
  }: ActionType,
  emit: EmitType
) {
  const ROW_KEY = 'key'
  const searchState = reactive<SearchState>({
    sortInfo: {},
    filterInfo: {}
  })
  const dataSourceRef = ref<Recordable[]>([])
  const rawDataSourceRef = ref<Recordable>({})
  watchEffect(() => {
    tableData.value = unref(dataSourceRef)
  })

  watch(
    () => unref(propsRef).dataSource,
    () => {
      const { dataSource, api } = unref(propsRef)
      !api && dataSource && (dataSourceRef.value = dataSource)
    },
    {
      immediate: true
    }
  )
  function handleTableChange(
    pagination: PaginationProps,
    filters: Partial<Recordable<string[]>>,
    sorter: SorterResult
  ) {
    const { clearSelectOnPageChange, sortFn, filterFn } = unref(propsRef)
    // if (clearSelectOnPageChange) {
    //   clearSelectedRowKeys();
    // }
    setPagination?.(pagination)

    const params: Recordable = {}
    if (sorter && isFunction(sortFn)) {
      const sortInfo = sortFn?.(sorter)
      searchState.sortInfo = sortInfo
      params.sortInfo = sortInfo
    }

    if (filters && isFunction(filterFn)) {
      const filterInfo = filterFn?.(filters)
      searchState.filterInfo = filterInfo
      params.filterInfo = filterInfo
    }
    const { isOnlyCurrentData = false } = unref(propsRef)
    isOnlyCurrentData ? dealCurTableData() : fetch(params)
  }
  function setTableKey(items: any[]) {
    if (!items || !Array.isArray(items)) return
    items.forEach((item) => {
      if (!item[ROW_KEY]) {
        item[ROW_KEY] = buildUUID()
      }
      if (item.children && item.children.length) {
        setTableKey(item.children)
      }
    })
  }
  const getAutoCreateKey = computed(() => {
    // return unref(propsRef).autoCreateKey && !unref(propsRef).rowKey;
    return true
  })

  const getDataSourceRef = computed(() => {
    const dataSource = unref(dataSourceRef)
    if (!dataSource || dataSource.length === 0) {
      return unref(dataSourceRef)
    }
    if (unref(getAutoCreateKey)) {
      const firstItem = dataSource[0]
      const lastItem = dataSource[dataSource.length - 1]

      if (firstItem && lastItem) {
        if (!firstItem[ROW_KEY] || !lastItem[ROW_KEY]) {
          const data = cloneDeep(unref(dataSourceRef))
          data.forEach((item: any) => {
            if (!item[ROW_KEY]) {
              item[ROW_KEY] = buildUUID()
            }
            if (item.children && item.children.length) {
              setTableKey(item.children)
            }
          })
          dataSourceRef.value = data
        }
      }
    }
    return unref(dataSourceRef)
  })
  async function fetch(opt?: FetchParams) {
    const {
      api,
      beforeFetch,
      afterFetch,
      pagination,
      defSort,
      fetchSetting,
      searchInfo,
      showLoading = true
    } = unref(propsRef)
    if (!api || !isFunction(api)) return
    try {
      showLoading && setLoading?.(true)
      const { pageField, sizeField, listField, totalField } = Object.assign({}, fetchSetting)
      let pageParams: Recordable = {}

      const { current = 1, pageSize = tableSetting.defaultPageSize } = unref(
        getPaginationInfo
      ) as PaginationProps

      if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
        pageParams = {}
      } else {
        pageParams[pageField] = (opt && opt.pageIndex) || current
        pageParams[sizeField] = pageSize
      }

      const { sortInfo = {}, filterInfo } = searchState
      let params: Recordable = filterEmptyKey(
        merge(
          pageParams,
          searchInfo,
          opt?.searchInfo ?? {},
          defSort,
          sortInfo,
          filterInfo,
          opt?.sortInfo ?? {},
          opt?.filterInfo ?? {}
        )
      )
      if (beforeFetch && isFunction(beforeFetch)) {
        params = (await beforeFetch(params)) || params
      }
      const res = await api(params)
      if (isRef(res?.data)) {
        rawDataSourceRef.value = unref(res.data)
      } else {
        rawDataSourceRef.value = res
      }
      const isArrayResult = Array.isArray(rawDataSourceRef.value)
      let resultItems: Recordable[] = isArrayResult ? res : get(rawDataSourceRef.value, listField)
      const resultTotal: number = isArrayResult
        ? res.length
        : get(rawDataSourceRef.value, totalField)
      if (Number(resultTotal)) {
        const currentTotalPage = Math.ceil(resultTotal / pageSize)
        if (current > currentTotalPage) {
          setPagination?.({
            current: currentTotalPage
          })
          return await fetch(opt)
        }
      }

      if (afterFetch && isFunction(afterFetch)) {
        resultItems = (await afterFetch(resultItems, params)) || resultItems
      }

      dataSourceRef.value = resultItems
      setPagination?.({
        total: resultTotal || 0
      })
      if (opt && opt.pageIndex) {
        setPagination?.({
          current: opt.pageIndex || 1
        })
      }
      emit('fetch-success', {
        items: unref(resultItems),
        total: resultTotal
      })
      return resultItems
    } catch (error) {
      emit('fetch-error', error)
      dataSourceRef.value = []
      setPagination?.({
        total: 0
      })
    } finally {
      setLoading?.(false)
    }
  }
  async function reload(opt?: FetchParams) {
    return await fetch(opt)
  }
  onMounted(() => {
    useTimeoutFn(() => {
      unref(propsRef).immediate && fetch()
    }, 16)
  })
  function getRawDataSource<T = Recordable>() {
    return rawDataSourceRef.value as T
  }
  // 无需调用后端接口时,仅对已有数据做处理，(仅支持排序)
  async function dealCurTableData() {
    const { searchInfo, beforeFetch, afterFetch } = unref(propsRef)
    const { sortInfo = {}, filterInfo } = searchState

    let params: Recordable = merge(sortInfo, searchInfo, filterInfo)
    if (beforeFetch && isFunction(beforeFetch)) {
      params = (await beforeFetch(params)) || params
    }
    let resultItems = []
    if (afterFetch && isFunction(afterFetch)) {
      resultItems = (await afterFetch(dataSourceRef.value, params)) || dataSourceRef.value
    }
    dataSourceRef.value = resultItems
  }

  return {
    getDataSourceRef,
    reload,
    getRawDataSource,
    handleTableChange,
    fetch
  }
}
