// import componentSetting from '@/settings/componentSetting';
// import { tableSetting } from './table'
import type { SorterResult } from './types/type'

export const tableSetting = {
  fetchSetting: {
    pageField: 'pageIndex',
    sizeField: 'pageSize',
    listField: 'data',
    totalField: 'total'
  },
  defaultPageSize: 10,
  defaultSize: 'middle',
  pageSizeOptions: ['10', '50', '80', '100'],
  defaultSortFn: (sortInfo: SorterResult) => {
    const { field, order } = sortInfo
    if (field && order) {
      return {
        // The sort field passed to the backend you
        field,
        // Sorting method passed to the background asc/desc
        order
      }
    } else {
      return {}
    }
  },
  // Custom general filter function
  defaultFilterFn: (data: Partial<Recordable<string[]>>) => {
    return data
  }
}
// const { table } = componentSetting;

const {
  pageSizeOptions,
  defaultPageSize,
  fetchSetting,
  defaultSize,
  defaultSortFn,
  defaultFilterFn
} = tableSetting

export const ROW_KEY = 'key'

// Optional display number per page;
export const PAGE_SIZE_OPTIONS = pageSizeOptions

// Number of items displayed per page
export const PAGE_SIZE = defaultPageSize

// Common interface field settings
export const FETCH_SETTING = fetchSetting

// Default Size
export const DEFAULT_SIZE = defaultSize

// Configure general sort function
export const DEFAULT_SORT_FN = defaultSortFn

export const DEFAULT_FILTER_FN = defaultFilterFn

//  Default layout of table cells
export const DEFAULT_ALIGN = 'center'

export const INDEX_COLUMN_FLAG = 'INDEX'

export const ACTION_COLUMN_FLAG = 'ACTION'
