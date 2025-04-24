import { defineComponent, ref } from "vue";
import { Button } from "ant-design-vue";
import FundModal from './fundModal'
export default defineComponent({
    components: {
        FundModal
    },
    props: {
      hasFund: { // 是否有基金
        type: Boolean,
        default: false
      }
    },
    setup(props, ctx) {
        const fundModalref = ref(null)
        function openModal() {
            fundModalref.value?.openModal()
        }
        return () => <div class='h-[146px] bg-#C1272DFF sticky top-11 z-1'>
            <div class='container pl-18 pt-12 flex justify-between items-center'>
                <div>
                    <div class='font-h5 text-white/88'>经典CTA-2号私募投资基金</div>
                    <div class='flex pt-4 font-h7 text-white/88'>
                        <div class='mr-6'>QAZ123</div>
                        <div>中高风险(R4)</div>
                    </div>
                </div>
                <div>
                    <Button onClick={openModal} class='min-w-18 text-#C1272DFF'>申购</Button>
                    <Button onClick={openModal} class='min-w-18 ml-4'>
                        <div class=' text-#2FB97BFF'>赎回</div>
                    </Button>
                </div>
            </div>
            <FundModal ref={fundModalref}></FundModal>
        </div>
    }
})