import { defineComponent, onMounted } from 'vue'
import { Switch, List } from 'ant-design-vue'
export default defineComponent({
  setup(props, ctx) {
    onMounted(() => {
      console.log('mounted--info33333')
    })
    return () => (
      <div>
        <div class="mt-6 p-12 bg-black/3 rounded-xs">
          <div class="font-h7 color-secondary">订阅类型</div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>申购确认</div>
            <div>
              <Switch></Switch>
            </div>
          </div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>净值预警</div>
            <div>
              <Switch></Switch>
            </div>
          </div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>公告提醒</div>
            <div>
              <Switch></Switch>
            </div>
          </div>
        </div>
        {/* 通知渠道 */}
        <div class="mt-6 p-12 bg-black/3 rounded-xs">
          <div class="font-h7 color-secondary">通知渠道</div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>站内信</div>
            <div>
              <Switch></Switch>
            </div>
          </div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>邮件</div>
            <div>
              <Switch></Switch>
            </div>
          </div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>手机短信</div>
            <div>
              <div class='text-[#C1272DFF] text-xs cursor-pointer'>未绑定手机号，去绑定</div>
              {/* <Switch></Switch> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
})
