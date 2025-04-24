import { defineComponent } from 'vue'
import BannerElm from '@/views/fund/detail/components/banner'
import { renderPanel } from '@/views/account/index/components/modules'
import { Col, Row } from 'ant-design-vue'
import { formatNumberWithCommas } from '@/utils/formate'
import { renderFund } from './components/modules'
import { useRenderTotalEchart } from "./components/echarts"
import fundElm from "./components/fund"
import noticeElm from "./components/notice"
import noteElm from "./components/note"
export default defineComponent({
    components: {
        noteElm,
        noticeElm,
        BannerElm,
        fundElm
    },
    setup() {
        const { render: renderEchart } = useRenderTotalEchart([])
        return () => (
            <div>
                <BannerElm hasFund={true} />
                <div class="container pt-12">
                    {renderFund({})}
                    {/* 净值曲线 */}
                    <div class='pt-10'>
                        {renderEchart()}
                    </div>
                    {/* 基金净值 */}
                    <fundElm class='mt-10' />
                     {/* 产品公告 */}
                    <noticeElm class='mt-10' />
                    {/* 重要提示 */}
                    <noteElm class='mt-10'></noteElm>
                </div>
            </div>
        )
    }
})
