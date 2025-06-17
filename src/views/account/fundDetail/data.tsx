export function basicColumns() {
  return [
    {
      title: '日期',
      dataIndex: 'date'
    },
    {
      title: '单位净值（元）',
      align: 'center',
      dataIndex: 'netWorth'
    },
    {
      title: '涨跌幅',
      align: 'center',
      dataIndex: 'yesterdayEarnings'
    },
    {
      title: '累计净值',
      align: 'center',
      dataIndex: 'totalEarnings'
    }
  ]
}
