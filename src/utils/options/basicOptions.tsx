// 快速将数组转换为 LabelValueOptions 格式
export function toLabelValueOptions(arr: any[], params: any): LabelValueOptions {
  const { label = 'label', value = 'value' } = params
  return arr.map((item) => ({ ...item, label: item[label], value: item[value] }))
}
// 基础选项
export const basicOptions = [
  {
    label: '全部',
    value: 'all'
  }
]
// 基金类型
export const fundTypeOptions: LabelValueOptions = [
  {
    label: '被动型',
    value: '1',
    color: '#00AE93'
  },
  {
    label: '主动型',
    value: '2',
    color: '#00AE93'
  },
  {
    label: '指数型',
    value: '3',
    color: '#00AE93'
  }
]
// 申赎状态
export const applyStatusOptions: LabelValueOptions = [
  {
    label: '待审核',
    value: '1',
    color: '#FAAD14FF'
  },
  {
    label: '成功',
    value: '2',
    color: '#2FB97BFF'
  },
  {
    label: '失败',
    value: '3',
    color: '#FF4D4FFF'
  },
]
