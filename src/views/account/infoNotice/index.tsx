import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { Switch, List } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'

export default defineComponent({
  setup(props, ctx) {
    const userStore = useUserStore()
    const userinfo = userStore.getUserInfo
    const noticeConfig = computed(() => userStore.getUserInfo?.noticeConfig)
    // const curNoticeConfig = reactive({
    //   arNotice: false,
    //   emailNotice: false,
    //   messageNotice: false,
    //   networthNotice: false,
    //   noticeNotice: false,
    //   webNotice: false,
    // })

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
              <Switch checked={noticeConfig.value?.arNotice}></Switch>
            </div>
          </div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>净值预警</div>
            <div>
              <Switch checked={noticeConfig.value?.networthNotice}></Switch>
            </div>
          </div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>公告提醒</div>
            <div>
              <Switch checked={noticeConfig.value?.noticeNotice}></Switch>
            </div>
          </div>
        </div>
        {/* 通知渠道 */}
        <div class="mt-6 p-12 bg-black/3 rounded-xs">
          <div class="font-h7 color-secondary">通知渠道</div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>站内信</div>
            <div>
              <Switch checked={noticeConfig.value?.webNotice}></Switch>
            </div>
          </div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>邮件</div>
            <div>
              <Switch checked={noticeConfig.value?.emailNotice}></Switch>
            </div>
          </div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>手机短信</div>
            <div>
              {
                userinfo?.phone ? <Switch checked={noticeConfig.value?.messageNotice}></Switch> : <div class='text-[#C1272DFF] text-xs cursor-pointer'>未绑定手机号，去绑定</div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
})
