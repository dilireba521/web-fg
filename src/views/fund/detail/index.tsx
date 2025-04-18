import { defineComponent } from 'vue'
import BannerElm from './components/banner'
import { renderBaseInfo, renderStrate, renderRisk } from './components/modules'
export default defineComponent({
  components: {
    BannerElm
  },
  setup(props, ctx) {
    return () => <div>

      <BannerElm></BannerElm>
      <div class='container'>
        {/* 基本信息 */}
        {renderBaseInfo({})}
        {/* 投资策略 */}
        {renderStrate({})}
        {/* 风险提示函 */}
        {renderRisk()}
      </div>

    </div>
  }
})