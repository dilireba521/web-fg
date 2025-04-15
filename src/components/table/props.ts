import { tableSetting } from './const'
import type { FetchSetting, SorterResult } from './types/type'
import type { ColumnProps } from 'ant-design-vue/es/table'
export const baseTableProps = {
  api: {
    type: [Function as PropType<(...arg: any[]) => Promise<any>>, Function as PropType<any>],
    default: null
  },
  beforeFetch: {
    type: Function as PropType<Fn>,
    default: null
  },
  afterFetch: {
    type: Function as PropType<Fn>,
    default: null
  },
  fetchSetting: {
    type: Object as PropType<FetchSetting>,
    default: () => {
      return tableSetting.fetchSetting
    }
  },
  dataSource: {
    type: Array as PropType<Recordable[]>,
    default: null
  },
  columns: {
    type: Array as PropType<ColumnProps[]>,
    default: () => []
  },
  // 额外的请求参数
  searchInfo: {
    type: Object as PropType<Recordable>,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  immediate: {
    type: Boolean,
    default: true
  },
  isHandle: {
    type: Boolean,
    default: false
  },
  // 默认的排序参数
  defSort: {
    type: Object as PropType<Recordable>,
    default: null
  },
  // 在分页改变的时候清空选项
  clearSelectOnPageChange: Boolean,
  sortFn: {
    type: Function as PropType<(sortInfo: SorterResult) => any>,
    default: (_) => tableSetting.defaultSortFn(_)
  },
  filterFn: {
    type: Function as PropType<(data: Partial<Recordable<string[]>>) => any>,
    default: (_) => tableSetting.defaultFilterFn(_)
  }
}
