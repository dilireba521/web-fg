import { computed, defineComponent, ref } from 'vue'
import { riskLevelOptions } from '@/utils/options/basicOptions'
import { useUserStore } from '@/store/modules/user'

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    const userInfo = userStore.getUserInfo
    const list = riskLevelOptions
    const level = computed(()=>{
      return userInfo?.riskLevel || 1
    })
    const curLevelItem = computed(() => list.find((item) => item.value == level.value))
    return () => (
      <div class="bg-black/3 rounded-xs p-12 min-h-665px mt-6">
        <div>您的承受风险等级为：{curLevelItem.value?.label}</div>
        <div class="flex gap-2 pt-3">
          {list.map((item) => {
            return (
              <div
                class={[
                  'text-xs leading-5 w-38px h-5 rounded-sm bg-#D8D8D8FF text-[#00000073] text-center',
                  (curLevelItem.value?.value || 0) >= item.value
                    ? '!bg-[#C1272DFF] text-[#FFFFFFE0]'
                    : ''
                ]}
                key={item.value}
              >
                {item.label}
              </div>
            )
          })}
        </div>
        <div class="text-xs color-secondary pt-10 pb-22 border-b-black/3 border-b-1 border-b-solid">
          如需重新评估，请联系客户经理
        </div>
        <div class="color-secondary pt-8">
          普通投资者风险承受能力和基金产品或者服务的风险等级建立以下适当性匹配原则：
        </div>
        <div class="color-secondary pt-4">
          C1 型（含最低风险承受能力类别）普通投资者可以购买 R1 级基金产品或者服务； <br />
          C2 型普通投资者可以购买 R2 级及以下风险等级的基金产品或者服务； <br />
          C3 型普通投资者可以购买 R3 级及以下风险等级的基金产品或者服务； <br />
          C4 型普通投资者可以购买 R4 级及以下风险等级的基金产品或者服务； <br />
          C5 型普通投资者可以购买所有风险等级的基金产品或者服务。
        </div>
      </div>
    )
  }
})
