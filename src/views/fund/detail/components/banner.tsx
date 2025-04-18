import { defineComponent } from "vue";
import { Button } from "ant-design-vue";

export default defineComponent({
    setup(props, ctx) {
        return () => <div class='h-[146px] bg-#C1272DFF'>
            <div class='container pl-18 pt-12 flex justify-between items-center'>
                <div>
                    <div class='font-h5 text-white/88'>经典CTA-2号私募投资基金</div>
                    <div class='flex pt-4 font-h7 text-white/88'>
                        <div class='mr-6'>QAZ123</div>
                        <div>中高风险(R4)</div>
                    </div>
                </div>
                <div>
                    <Button class='min-w-18 text-#C1272DFF'>申购</Button>
                </div>
            </div>

        </div>
    }
})