import { defineComponent } from 'vue'
import logoImg from '@/assets/icons/logo.svg'

export default defineComponent({
    setup(props, ctx) {
        const OSSURL = import.meta.env.VITE_GLOB_OSS
        return () => <div class='relative h-140'>
            <img class='h-140 w-full' src={OSSURL + '/fund/home-brief.png'} alt="" onError={(e) => (e.target.src = logoImg)} />
            <div class='absolute w-full top-0'>
                <div class='container pl-15 pt-24'>
                    <div class='font-h3 font-500'>平台简介</div>
                    <div class='font-h5 w-200 mt-8'>
                        诺言（湖北）私募基金管理有限公司成立于 2025年，致力于为多元化的客户群体提供高质量金融增值服务，建立了以数据驱动的基金投资、资产管理和托管等全方位发展的均衡业务结构。<br /><br />
                        公司总部位于厦门，业务涵盖了证券、基金、期货、外汇和大宗商品等多个领域，为国内企业客户、机构客户、高净值客户提供各类金融服务解决方案，公司将秉持以客户为中心，协助客户实现其资产可持续发展目标。</div>
                </div>
            </div>
        </div>
    }
})