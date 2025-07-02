import { defineComponent, ref } from 'vue'
import { Button } from 'ant-design-vue'
import FundModal from './fundModal'
import { riskLevelOptions2 } from '@/utils/options/basicOptions'
export default defineComponent({
  components: {
    FundModal
  },
  props: {
    hasFund: {
      // 是否有基金
      type: Boolean,
      default: false
    },
    record: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, ctx) {
    const fundModalref = ref(null)
    const type = ref('in')
    function openModal(params: string) {
      fundModalref.value?.openModal()
      type.value = params
    }

    return () => {
      const _level: any = riskLevelOptions2?.find(
        (i) => i.value == props.record?.riskLevel || i.value == props.record?.risk_level
      )?.label
      return (
        <div class="h-[146px] bg-#C1272DFF sticky top-11 z-1">
          <div class="container pl-18 pt-12 flex justify-between items-center">
            <div>
              <div class="font-h5 text-white/88">{props.record?.name}</div>
              <div class="flex pt-4 font-h7 text-white/88">
                <div class="mr-6">{props.record?.code || props.record?.fund_code}</div>
                <div>{_level}</div>
              </div>
            </div>
            <div>
              {props.record?.allowSubscribe && (
                <Button
                  onClick={() => openModal('in')}
                  class="min-w-18 text-#2FB97BFF !hover:text-#2FB97BFF"
                >
                  申购
                </Button>
              )}
              {props.hasFund && props.record?.allowRedeem && (
                <Button onClick={() => openModal('out')} class="min-w-18 ml-4">
                  <div class=" text-#C1272DFF">赎回</div>
                </Button>
              )}
            </div>
          </div>
          <FundModal hasFund={props.hasFund} type={type.value} record={props.record} ref={fundModalref}></FundModal>
        </div>
      )
    }
  }
})
