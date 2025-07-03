import { formatToDateTime } from '@/utils/dateUtil'
import { formateNumStr } from '@/utils/formate'
import { useGo } from '@/hooks/web/usePage'
import { getTextColor } from '@/utils/color'

export function basicColumns() {
  const { go } = useGo()
  function handleClick(data: any) {
    go(data)
    // console.log('点击了', data)
  }

  return [
    {
      title: '基金名称',
      dataIndex: 'fundName'
    },
    {
      title: '基金代码',
      dataIndex: 'fundCode'
    },
    // {
    //     title: '币种',
    //     dataIndex: 'name',
    // },
    {
      title: '持有份额',
      dataIndex: 'shares',
      customRender({ text }) {
        return text ? formateNumStr(text) : '0'
      }
    },
    {
      title: '单位净值',
      dataIndex: 'netWorth'
      // sorter: true,
    },
    {
      title: '持有价值',
      dataIndex: 'totalValue',
      customRender({ text }) {
        return text ? formateNumStr(text) : '0'
      }
    },
    {
      title: '收益率（%）',
      dataIndex: 'earningRate',
      customRender({ text }) {
        let _class = ''
        const _num = parseFloat(text)
        if (_num < 0) {
          _class = 'text-[#2FB97B]'
        } else if (_num > 0) {
          _class = 'text-[#C1272D]'
        }
        return <div class={_class}>{text ? parseFloat((text * 100).toFixed(2)) : '0'}</div>
      }
      // sorter: true,
    },
    {
      title: '涨跌幅（%）',
      dataIndex: 'chg',
      customRender({ text }) {
        return (
          <div class={[getTextColor(text)]}>{text ? parseFloat((text * 100).toFixed(2)) : '0'}</div>
        )
      }
      // sorter: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 200,
      customRender(opt) {
        const { record } = opt
        const _params = {
          path: '/account/detail',
          query: {
            id: record.id,
            redirect: JSON.stringify({
              activeKey: 'fund'
            })
          }
        }
        return (
          <div onClick={() => handleClick(_params)} class="text-[#1677FF] cursor-pointer">
            详情
          </div>
        )
      }
    }
  ]
}
