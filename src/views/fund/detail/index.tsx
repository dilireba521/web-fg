import { defineComponent, watch, reactive, onMounted, ref } from 'vue'
import BannerElm from './components/banner'
import { renderBaseInfo, renderStrate, renderRisk } from './components/modules'
import ManagerElm from './components/manager'
import CostElm from './components/cost'
import { useRoute } from 'vue-router'
import { useGetInfo } from '@/api/fund'
export default defineComponent({
  components: {
    BannerElm,
    CostElm,
    ManagerElm
  },
  setup(props, ctx) {
    const dataSource = ref()
    const route = useRoute()

    onMounted(() => {
      useGetInfoFn()
    })
    async function useGetInfoFn() {
      if (!route.query.id) return
      const { data } = await useGetInfo({ id: route.query.id })
      console.log('data-----', data.value?.data)
      if (data.value?.retCode == 0) {
        dataSource.value = data.value?.data
      }
    }

    return () => (
      <div>
        <BannerElm record={dataSource.value}></BannerElm>
        <div class="container pb-8">
          {/* 基本信息 */}
          {renderBaseInfo(dataSource.value)}
          {/* 基金经理 */}
          <ManagerElm record={dataSource.value?.managers}/>
          {/* 投资策略 */}
          {renderStrate(dataSource.value)}
          {/* 费用信息 */}
          <CostElm  record={dataSource.value?.fees}/>
          {/* 风险提示函 */}
          {renderRisk()}
        </div>
      </div>
    )
  }
})
