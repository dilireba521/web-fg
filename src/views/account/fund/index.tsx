import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup(props, ctx) {
    const isInitialized = ref(false)
    onMounted(() => {
      console.log('mounted--fund33333');
    })
    return () => <div class="container">fund</div>
  }
})
