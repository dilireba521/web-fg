import { defineComponent, reactive, watch, ref } from 'vue'
import Banner from './components/banner'
import { Form, Input, List ,Button, message } from 'ant-design-vue'
import { BasicButtonForm } from '@/components/button'
import { fundTypeOptions } from "@/utils/options/basicOptions"
import { BasicList } from '@/components/list'

export default defineComponent({
  setup(props, ctx) {
    const labelCol = { style: { width: '78px' } }
    const searchInfo = reactive({
      typeId: [],
      queryInfo: ''
    })
    const searchOptions = {
      man: fundTypeOptions
    }
    const searchFormRef = ref()
    watch(() => searchInfo, (val,oldVal) => {
      // console.log(val,oldVal)
    },{deep: true})
    // 列表
    const listRef = ref()
    const loading = ref(false)
    const dataSource = ref([{
      id: 1,
    },{
      id:2,
    }])
    function renderItem(name: string, value: string) {
      return (<div class='flex'>
        <div class='color-secondary'>{name}</div>
        <div>{value}</div>
      </div>)
    }
    return () => <div>
      <Banner />
      <div class='pt-25 container'>
22
      </div>
    </div>
  }
})
