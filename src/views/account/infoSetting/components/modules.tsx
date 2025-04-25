import { ExclamationCircleFilled, CheckCircleFilled } from '@ant-design/icons-vue'



// 安全等级
export const renderLevel = (level: number) => {
  const list = [
    {
      value: 1,
      label: '低',
      color: 'text-[#ff4d4f]',
      bg: 'bg-[#ff4d4f]'
    },
    {
      value: 2,
      label: '中',
      color: 'text-[#FF8600]',
      bg: 'bg-[#FF8600]'
    },
    {
      value: 3,
      label: '高',
      color: 'text-[#2FB97B]',
      bg: 'bg-[#2FB97B]'
    }
  ]
  return () => {
    const item = list.find((item) => item.value === level)
    return (
      <div class="flex items-center">
        {level == 3 ? (
          <CheckCircleFilled class={['text-40px', item?.color]} />
        ) : (
          <ExclamationCircleFilled class={['text-40px', item?.color]}></ExclamationCircleFilled>
        )}
        <div class="flex ml-4">
          <div class="color-tertiary mr-3">安全等级</div>
          <div class="flex items-center gap-[6px]">
            {new Array(3).fill(0).map((_, index) => {
              return (
                <div
                  class={[
                    'w-10 h-1 rounded-sm',
                    `bg-[${item?.color}]`,
                    index < level ? item?.bg : 'bg-[#D8D8D8]'
                  ]}
                ></div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

