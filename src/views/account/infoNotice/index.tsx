import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { Switch, List } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'
import { usePostUserInfo } from '@/api/user'
import { useApiBasic } from '@/utils/hook/useApi'
export default defineComponent({
  setup(props, ctx) {
    const userStore = useUserStore()
    const userinfo = userStore.getUserInfo
    const noticeConfig = computed(() => userStore.getUserInfo?.noticeConfig)
    enum NoticeType {
      arNotice = 'arNotice',
      emailNotice = 'emailNotice',
      messageNotice = 'messageNotice',
      networthNotice = 'networthNotice',
      noticeNotice = 'noticeNotice',
      webNotice = 'webNotice'
    }

    const noticeConfigLoading = reactive<any>({
      arNotice: false,
      emailNotice: false,
      messageNotice: false,
      networthNotice: false,
      noticeNotice: false,
      webNotice: false
    })

    onMounted(() => {
      console.log('mounted--info33333')
    })
    function changeNoticeConfig(params: any) {
      noticeConfigLoading[params.type] = true
      usePostUserInfoFn({
        type: params.type,
        [params.type]: !noticeConfig.value[params.type]
      })
    }
    async function usePostUserInfoFn(params: any) {
      useApiBasic({
        apiFn: usePostUserInfo(params) as any,
        successFn: () => {
          userStore.setUserInfo({
            ...userinfo,
            noticeConfig: {
              ...noticeConfig.value,
              [params.type]: params[params.type]
            }
          })
        },
        finallyFn: () => {
          noticeConfigLoading[params.type] = false
        }
      })
    }
    return () => (
      <div>
        <div class="mt-6 p-12 bg-black/3 rounded-xs">
          <div class="font-h7 color-secondary">订阅类型</div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>申购确认</div>
            <div>
              <Switch
                onClick={() => changeNoticeConfig({ type: NoticeType.arNotice })}
                loading={noticeConfigLoading.arNotice}
                checked={noticeConfig.value?.arNotice}
              ></Switch>
            </div>
          </div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>净值预警</div>
            <div>
              <Switch
                onClick={() => changeNoticeConfig({ type: NoticeType.networthNotice })}
                loading={noticeConfigLoading.networthNotice}
                checked={noticeConfig.value?.networthNotice}
              ></Switch>
            </div>
          </div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>公告提醒</div>
            <div>
              <Switch
                onClick={() => changeNoticeConfig({ type: NoticeType.noticeNotice })}
                loading={noticeConfigLoading.noticeNotice}
                checked={noticeConfig.value?.noticeNotice}></Switch>
            </div>
          </div>
        </div>
        {/* 通知渠道 */}
        <div class="mt-6 p-12 bg-black/3 rounded-xs">
          <div class="font-h7 color-secondary">通知渠道</div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>站内信</div>
            <div>
              <Switch
                onClick={() => changeNoticeConfig({ type: NoticeType.webNotice })}
                loading={noticeConfigLoading.webNotice}
                checked={noticeConfig.value?.webNotice}></Switch>
            </div>
          </div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>邮件</div>
            <div>
              <Switch
                onClick={() => changeNoticeConfig({ type: NoticeType.emailNotice })}
                loading={noticeConfigLoading.emailNotice}
                checked={noticeConfig.value?.emailNotice}></Switch>
            </div>
          </div>
          <div class="flex justify-between items-center h-54px border-b border-b-solid border-b-black/3">
            <div>手机短信</div>
            <div>
              {userinfo?.phone ? (
                <Switch
                  onClick={() => changeNoticeConfig({ type: NoticeType.messageNotice })}
                  loading={noticeConfigLoading.messageNotice}
                  checked={noticeConfig.value?.messageNotice}></Switch>
              ) : (
                <div class="text-[#C1272DFF] text-xs cursor-pointer">未绑定手机号，去绑定</div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
})
