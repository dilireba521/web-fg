import { formatToDateTime } from '@/utils/dateUtil'
import { formatNumberWithCommas } from '@/utils/formate'
import { useGo } from '@/hooks/web/usePage'

export function basicColumns() {
    const { go } = useGo()
    function handleClick(data: any) {
        go({
            path: '/account/detail',
            query: data
        })
        console.log('点击了', data)
    }

    return [
        {
            title: '基金名称',
            dataIndex: 'name',
            customRender: ({ text }) => (text ? formatToDateTime(text) : '- -')
        },
        {
            title: '基金代码',
            dataIndex: 'name',
        },
        {
            title: '币种',
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
                const { record } = opt
                const _params = {
                    path: 'detail',
                    query: {
                        id: record.id
                    }
                }
                return (
                    <div onClick={() => handleClick(_params)} class='text-[#1677FF] cursor-pointer'>详情
                    </div>
                )
            }
        }
    ]
}