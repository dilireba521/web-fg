import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup(props, ctx) {
    onMounted(() => {
      console.log('mounted--info33333');
    })
    return () => <div class="container">info</div>
  }
})
