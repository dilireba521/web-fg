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

// 基金经理
export const fundManagerOptions: LabelValueOptions = [
  {
    label: '首字母A-H',
    value: 'A-H'
  },
  {
    label: '首字母J-L',
    value: 'J-L'
  },
  {
    label: '首字母M-T',
    value: 'M-T'
  }
]

// 产品风险等级
export const riskLevelOptions2: LabelValueOptions = [
  {
    label: '低风险(R1)',
    value: '1'
  },
  {
    label: '中低风险(R2)',
    value: '2'
  },
  {
    label: '中风险(R3)',
    value: '3'
  },
  {
    label: '中高风险(R4)',
    value: '4'
  },
  {
    label: '高风险(R5)',
    value: '5'
  }
]

// 成立年限
export const establishOptions: LabelValueOptions = [
  {
    label: '1年以内',
    value: '0-1'
  },
  {
    label: '1-2年',
    value: '1-2'
  },
  {
    label: '2-3年',
    value: '2-3'
  },
  {
    label: '3-5年',
    value: '3-5'
  },
  {
    label: '5年以上',
    value: '5'
  }
]

// 基金标签
export const fundTagOptions: LabelValueOptions = [
  {
    label: 'CTA',
    value: '1'
  },
  {
    label: '混合',
    value: '2'
  },
  {
    label: '中性',
    value: '3'
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
  }
]

// 产品公告
export const productNoticeOptions: LabelValueOptions = [
  {
    value: '定期公告',
    label: '定期公告'
  },
  {
    value: '临时公告',
    label: '临时公告'
  }
]

// 承受风险等级
export const riskLevelOptions: LabelValueOptions = [
  {
    label: 'C1',
    value: '1'
  },
  {
    label: 'C2',
    value: '2'
  },
  {
    label: 'C3',
    value: '3'
  },
  {
    label: 'C4',
    value: '4'
  },
  {
    label: 'C5',
    value: '5'
  }
]
