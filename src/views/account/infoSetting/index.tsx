import { defineComponent, onMounted, h, ref, defineAsyncComponent, computed } from 'vue'
import { renderLevel } from './components/modules'
import { MobileFilled, LockFilled, MailFilled } from '@ant-design/icons-vue'
import { ClickType } from './enums'
import { useUserStore } from '@/store/modules/user'
import { formatPhone } from '@/utils/formate'
import { useApiBasic } from '@/utils/hook/useApi'
import { message } from 'ant-design-vue'
export default defineComponent({
  setup(props, ctx) {
    const userStore = useUserStore()
    const userInfo = userStore.getUserInfo

    onMounted(() => {
      console.log('mounted--info33333')
    })
    const level = computed(() => {
      let _level = 1
      if(userInfo?.phone) {
        _level += 1
      }
      if(userInfo?.email) {
        _level += 1
      }
      return _level
    })
    // 密码
    const passwordRef = ref()
    // 手机号
    const phoneRef = ref()
    // 邮箱
    const emailRef = ref()
    
    function onSubmit(params: any) {
      console.log(params)
    }
    const AsyncCom = {
      Password: defineAsyncComponent(() =>
        import('./components/modules').then((modules) => modules.Password)
      ),
      Phone: defineAsyncComponent(() =>
        import('./components/modules').then((modules) => modules.Phone)
      ),
      Email: defineAsyncComponent(() =>
        import('./components/modules').then((modules) => modules.Phone)
      )
    }
    function handleClick(params: any) {
      switch (params.type) {
        case ClickType.PASSWORD:
          passwordRef.value.visible = true
          break
        case ClickType.PHONE:
          phoneRef.value.visible = true
          break
        case ClickType.EMAIL:
          emailRef.value.visible = true
          break
      }
    }
    
    return () => (
      <div class="bg-black/3 rounded-xs p-12 min-h-665px  mt-6">
        {/* 安全等级 */}
        {h(renderLevel(level.value))}
        {/* 密码 */}
        <div class="flex h-16 items-center mt-10">
          <div class="w-26 flex items-center">
            <LockFilled class="text-[#888888] text-24px" />
            <div class="ml-2">密码</div>
          </div>
          <div class="text-xs color-tertiary flex-1">上次登录时间 { userInfo?.lastLoginTime ? formatToDateTime(userInfo?.lastLoginTime) : '- -'}</div>
          <div
            onClick={() => handleClick({ type: ClickType.PASSWORD })}
            class="color-secondary cursor-pointer hover:text-[#C1272D]"
          >
            修改
          </div>
        </div>
        {/* 手机号码 */}
        <div class="flex h-16 items-center">
          <div class="w-26 flex items-center">
            <MobileFilled class="text-[#888888] text-24px" />
            <div class="ml-2">手机号码</div>
          </div>
          <div class="text-xs color-tertiary flex-1">{userInfo?.phone ? formatPhone(userInfo?.phone) : '未绑定'}</div>
          <div
            onClick={() => handleClick({ type: ClickType.PHONE })}
            class="cursor-pointer color-secondary hover:text-[#C1272D]"
          >
            {userInfo?.phone ? '修改' :'绑定'}
          </div>
        </div>
        {/* 邮箱设置 */}
        <div class="flex h-16 items-center">
          <div class="w-26 flex items-center">
            <MailFilled class="text-[#888888] text-24px" />
            <div class="ml-2">邮箱设置</div>
          </div>
          <div class="text-xs color-tertiary flex-1">{userInfo?.email || '未绑定'}</div>
          <div
            onClick={() => handleClick({ type: ClickType.EMAIL })}
            class="cursor-pointer color-secondary hover:text-[#C1272D]"
          >
            {userInfo?.email ? '修改' :'绑定'}
          </div>
        </div>
        <AsyncCom.Password onSubmit={onSubmit} ref={passwordRef}></AsyncCom.Password>
        <AsyncCom.Phone onSubmit={onSubmit} ref={phoneRef}></AsyncCom.Phone>
        <AsyncCom.Email onSubmit={onSubmit} ref={emailRef}></AsyncCom.Email>
      </div>
    )
  }
})
