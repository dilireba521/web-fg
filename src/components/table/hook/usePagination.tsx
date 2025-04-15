import { computed, unref, ref, watch, type ComputedRef } from 'vue'
import type { BaseTableProps } from '../types/type'
import { isBoolean } from '@/utils/is'
import { tableSetting } from '../const'
import type { PaginationProps } from '../types/pagination'

// @ts-ignore
export function usePagination(refProps: ComputedRef<BaseTableProps>) {
  const configRef = ref<any>({})

  watch(
    () => unref(refProps).pagination,
    (pagination) => {
      if (!isBoolean(pagination) && pagination) {
        // @ts-ignore
        configRef.value = {
          ...unref(configRef),
          ...(pagination ?? {})
        }
      }
    }
  )
  const getPaginationInfo = computed((): PaginationProps | boolean => {
    const { pagination } = unref(refProps)
    if (isBoolean(pagination) && !pagination) return false

    return {
      hideOnSinglePage: false,
      current: 1,
      size: 'middle',
      defaultPageSize: tableSetting.defaultPageSize,
      // showTotal: (total) => t('component.table.total', { total }),
      // showSizeChanger: true,
      pageSizeOptions: tableSetting.pageSizeOptions,
      //   itemRender: itemRender,
      showQuickJumper: true,
      position: ['bottomCenter'],
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef)
    }
  })
  function setPagination(info: Partial<PaginationProps>) {
    const paginationInfo = unref(getPaginationInfo)
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info
    }
  }
  function getPagination() {
    return unref(getPaginationInfo)
  }
  return {
    getPaginationInfo,
    setPagination,
    getPagination
  }
}
