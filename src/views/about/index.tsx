import { defineComponent, onMounted, onUnmounted } from 'vue'
import MapVue from '@/components/map';
export default defineComponent({
  setup(props, ctx) {
    return () => <div class="container">
      <MapVue></MapVue>
    </div>
  }
})
