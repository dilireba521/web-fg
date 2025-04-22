import { defineComponent } from 'vue'
import BannerElm from './components/banner'
import { renderBaseInfo, renderStrate, renderRisk } from './components/modules'
import ManagerElm from './components/manager'
import CostElm from './components/cost'
import FundModal from './components/fundModal'
export default defineComponent({
  components: {
    BannerElm,
    CostElm,
    FundModal,
    ManagerElm
  },
  setup(props, ctx) {
    return () => <div>
      <BannerElm></BannerElm>
      <div class='container'>
        {/* 基本信息 */}
        {renderBaseInfo({})}
        {/* 基金经理 */}
        <ManagerElm />
        {/* 投资策略 */}
        {renderStrate({})}
        {/* 费用信息 */}
        <CostElm />
        {/* 风险提示函 */}
        {renderRisk()}
      </div>
      <FundModal />
    </div>
  }
})