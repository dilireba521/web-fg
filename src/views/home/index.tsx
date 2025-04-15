import { defineComponent } from 'vue'
import Banner from './components/banner'
import Brief from './components/brief'
import Info from './components/info'


export default defineComponent({
  setup(props, ctx) {
    return () => <div>
      <Banner />
      {/* 平台简介 */}
      <Brief />
      {/* 信息披露 */}
      <Info />

    </div>
  }
})
