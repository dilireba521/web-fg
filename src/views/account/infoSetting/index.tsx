import { defineComponent, onMounted, h, ref } from 'vue'
import { renderLevel } from './components/modules'
import { MobileFilled, LockFilled, MailFilled } from '@ant-design/icons-vue'
export default defineComponent({
  setup(props, ctx) {
    onMounted(() => {
      console.log('mounted--info33333')
    })
    const level = ref(1)
    onMounted(() => {
      setTimeout(() => {
        level.value = 2
      }, 3000)
    })
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
          <div class="text-xs color-tertiary flex-1">上次登录时间 2024-06-18 15:12:23</div>
          <div class="color-secondary cursor-pointer">修改</div>
        </div>
        {/* 手机号码 */}
        <div class="flex h-16 items-center">
          <div class="w-26 flex items-center">
            <LockFilled class="text-[#888888] text-24px" />
            <div class="ml-2">手机号码</div>
          </div>
          <div class="text-xs color-tertiary flex-1">未绑定</div>
          <div class="cursor-pointer text-[#C1272D]">绑定</div>
        </div>
        {/* 邮箱设置 */}
        <div class="flex h-16 items-center">
          <div class="w-26 flex items-center">
            <LockFilled class="text-[#888888] text-24px" />
            <div class="ml-2">邮箱设置</div>
          </div>
          <div class="text-xs color-tertiary flex-1">未绑定</div>
          <div class="cursor-pointer text-[#C1272D]">绑定</div>
        </div>
      </div>
    )
  }
})
