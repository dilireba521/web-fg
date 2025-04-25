import type { ColumnsType } from 'ant-design-vue/es/table'
import { Button } from 'ant-design-vue'
import { useGo } from '@/hooks/web/usePage'
import type { ColumnProps } from 'ant-design-vue/es/table'

export function basicColumns(): ColumnProps[] {
  const { go } = useGo()

  return [
    {
      title: '操作时间',
      align: 'center',
      dataIndex: 'createTime'
    },

    {
      title: '操作类型',
      align: 'center',
      dataIndex: 'action',
      ellipsis: true
    },
    {
      title: 'ip',
      align: 'center',
      dataIndex: 'ip'
    }
    // {
    //   title: '确认结果',
    //   align: 'center',
    //   dataIndex: 'name1'
    // }
  ]
}
