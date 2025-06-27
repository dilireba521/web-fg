import { defineComponent } from 'vue'
import logoImg from '@/assets/icons/logo.svg'

export default defineComponent({
    setup(props, ctx) {
        const OSSURL = import.meta.env.VITE_GLOB_OSS
        return () => <div class='relative h-135'>
            <img class='h-135 w-full' src={OSSURL + '/fund/home-brief.png'} alt="" onError={(e) => (e.target.src = logoImg)} />
            <div class='absolute w-full top-0'>
                <div class='container pl-15 pt-24'>
                    <div class='font-h4 font-500'>平台定位</div>
                    <div class='text-18px w-200 mt-4'>
                        本平台严格遵循《私募投资基金监督管理暂行办法》及中国证券投资基金业协会自律规则，专为合格投资者打造安全、高效、透明的全流程业务管理服务，覆盖基金产品申赎、信息披露、资产监控等核心场景，助力合规化运营与精准化决策。
                    </div>
                    <div class='font-h4 font-500 pt-8'>准入声明</div>
                    <div class='text-18px w-200 mt-4'>
                        本平台严格遵循《私募投资基金募集行为管理办法》：<br/>
                        <ul>
                            <li class='pt-2'>仅向符合法定条件的合格投资者开放；</li>
                            <li class='pt-2'>不展示历史业绩排名，不提供收益预期测算；</li>
                            <li class='pt-2'>所有产品信息需通过投资者适当性匹配后方可查看详情。</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    }
})