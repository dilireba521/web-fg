import { formatToDateTime } from '@/utils/dateUtil'
import { formatNumberWithCommas } from '@/utils/formate'
import { ref } from 'vue'
import { applyTypeOptions,applyStatusOptions } from "@/utils/options/basicOptions"
import { TextTranslate } from '@/components/OptionTranslate';

export function basicColumns(cb, expandedRowKeys) {
    function handleClick(data: any) {
        cb?.(data)
        console.log('点击了', data, expandedRowKeys)
    }

    return [
        {
            title: '基金代码',
            dataIndex: 'fundCode',
            // customRender: ({ text, record }) => {
            //     return <div>
            //         {record?.fundCode}/{text}
            //     </div>
            // }
        },
        {
            title: '基金名称',
            dataIndex: 'fundName',
            // customRender: ({ text, record }) => {
            //     return <div>
            //         {record?.fundCode}/{text}
            //     </div>
            // }
        },
        {
            title: '申请日期',
            dataIndex: 'applyTime',
            customRender: ({ text }) => (text ? formatToDateTime(text) : '- -')
        },
        {
            title: '申请类型',
            dataIndex: 'type',
            customRender: ({ text }) => <TextTranslate value={text} options={applyTypeOptions} />,

        },
        {
            title: '持有份额',
            dataIndex: 'shares',
            customRender({ text }) {
                return text ? formatNumberWithCommas(text) : '0'
            }
        },
        // {
        //     title: '单位净值',
        //     dataIndex: 'name',
        //     sorter: true,
        // },
        {
            title: '持有价值',
            dataIndex: 'amount',
            // sorter: true,
        },
        {
            title: '申请状态',
            dataIndex: 'status',
            customRender: ({ text }) => <TextTranslate type="dot"  value={text} options={applyStatusOptions} />,

        },
        // {
        //     title: '收益率',
        //     dataIndex: 'name',
        //     // sorter: true,
        // },
        // {
        //     title: '涨跌幅',
        //     dataIndex: 'name',
        //     // sorter: true,
        // },
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