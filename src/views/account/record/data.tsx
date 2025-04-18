import { formatToDateTime } from '@/utils/dateUtil'
import { formatNumberWithCommas } from '@/utils/formate'
import { ref } from 'vue'
export function basicColumns(cb,expandedRowKeys) {
    function handleClick(data: any) {
        cb?.(data)
        console.log('点击了', data,expandedRowKeys)
    }

    return [
        {
            title: '基金代码/基金名称',
            dataIndex: 'name',
            customRender: ({ text }) => (text ? formatToDateTime(text) : '- -')
        },
        {
            title: '申请日期',
            dataIndex: 'name',
        },
        {
            title: '类型',
            dataIndex: 'name',
        },
        {
            title: '持有份额',
            dataIndex: 'amount',
            customRender({ text }) {
                return text ? formatNumberWithCommas(text) : '0'
            }
        },
        {
            title: '单位净值',
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: '持有价值',
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: '收益率',
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: '涨跌幅',
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: 200,
            customRender(opt) {
                return (
                    <div onClick={() => handleClick(opt)} class='text-[#1677FF] cursor-pointer'>
                        {expandedRowKeys?.value?.includes(opt.record.key) ? '收起' : '展开'}
                    </div>
                )
            }
        }
    ]
}