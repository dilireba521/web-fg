import { computed, defineComponent, toRaw, unref, ref } from 'vue'
import { Table } from 'ant-design-vue'
import type { SorterResult } from './types/type'
import { usePagination } from './hook/usePagination'
import { isFunction } from '@/utils/is'
import { baseTableProps } from './props'
import { useDataSource } from './hook/useDataSource'
import { useLoading } from './hook/useLoading'
import { useColumns } from './hook/useColumns'
import { useSearch } from './hook/useSearch'

export default defineComponent({
  props: baseTableProps,
  emits: ['change', 'fetch-success'],
  setup(props, { attrs, slots, emit, expose }) {
    const tableData = ref([])

    const getProps = computed(() => {
      return {
        ...props
      }
    })
    const { getLoading, setLoading } = useLoading(getProps)
    const { getPaginationInfo, setPagination } = usePagination(getProps)

    const {
      handleTableChange: onTableChange,
      getDataSourceRef,
      fetch
    } = useDataSource(
      getProps,
      {
        setLoading,
        getPaginationInfo,
        tableData,
        setPagination
      },
      emit
    )
    const { handleSearchInfoChange } = useSearch(getProps, fetch)
    function handleTableChange(pagination: any, filters: any, sorter: any, extra: any) {
      console.log('handleTableChange', pagination)

      onTableChange(pagination, filters, sorter)
      emit('change', pagination, filters, sorter, extra)
      // 解决通过useTable注册onChange时不起作用的问题
      const { onChange } = unref(getProps)
      onChange && isFunction(onChange) && onChange(pagination, filters, sorter, extra)
    }
    const {
      getViewColumns,
      getColumns,
      setCacheColumnsByField,
      setCacheColumns,
      setColumnWidth,
      setColumns,
      getColumnsRef,
      getCacheColumns
    } = useColumns(getProps, getPaginationInfo)

    const getBindValues = computed(() => {
      const dataSource = unref(getDataSourceRef)

      return {
        ...attrs,
        ...slots,
        ...unref(getProps),
        loading: unref(getLoading),
        columns: toRaw(unref(getViewColumns)),
        pagination: toRaw(unref(getPaginationInfo)),
        dataSource
      }
    })

    expose({
      fetch
    })
    console.log('slots----',getBindValues);
    
    return () => {
      return (
        <Table
          {...getBindValues.value}
          row-class-name={(_record: any, index: number) => (index % 2 === 1 ? '' : 'table-striped')}
          class="ant-table-striped"
          onChange={handleTableChange}
        >
          {slots}
        </Table>
      )
    }
  }
})
