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
      align: 'center',
      dataIndex: 'shares'
    },
    {
      title: '单位净值（CNY）',
      align: 'center',
      dataIndex: 'netWorth'
    },
    {
      title: '涨跌幅（%）',
      align: 'center',
      dataIndex: 'yesterdayEarningsRate',
      customRender({ text }) {
        return <div class={[getTextColor(text)]}>{formateNumStr(text * 100, { decimals: 2 })}%</div>
      }
    },
    {
      title: '累计净值',
      align: 'center',
      dataIndex: 'netWorth',
      // customRender({ text }) {
      //   return text ? formateNumStr(text,{ keepZero: true}) : '0'
      // }
    }
  ]
}
