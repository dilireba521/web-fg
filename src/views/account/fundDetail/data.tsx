import { getTextColor } from '@/utils/color'
import { formateNumStr } from '@/utils/formate'

export function basicColumns() {
  return [
    {
      title: '日期',
      dataIndex: 'date'
    },
    {
      title: '份额',
      dataIndex: 'shares'
    },
    {
      title: '单位净值（CNY）',
      dataIndex: 'netWorth'
    },
    {
      title: '涨跌幅（%）',
      dataIndex: 'yesterdayEarningsRate',
      customRender({ text }) {
        return <div class={[getTextColor(text)]}>{formateNumStr(text * 100, { decimals: 2 })}%</div>
      }
    },
    {
      title: '累计净值',
      dataIndex: 'netWorth',
      // customRender({ text }) {
      //   return text ? formateNumStr(text,{ keepZero: true}) : '0'
      // }
    }
  ]
}
