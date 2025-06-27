import { defineComponent, ref } from 'vue'
import { Modal, Button } from 'ant-design-vue'
import { useUserStore } from '@/store/modules/user'

export default defineComponent({
  setup(props, { expose }) {
    const userStore = useUserStore()

    const open = ref(false)
    function openModal() {
      open.value = true
    }
    function closeModal() {
      open.value = false
    }
    expose({
      openModal
    })
    return () => {
      return (
        <Modal centered={true} v-model:open={open.value} closable={false} width={400}>
          {{
            default: () => (
              <div class="p-2 text-center">
                <div class="text-18px font-500">确认退出登录吗？</div>
                <div class="pt-6 color-secondary">退出登录后，你将无法收到消息</div>
              </div>
            ),
            footer: () => (
              <div class="flex justify-center pt-28px">
                <Button onClick={closeModal} type="primary" class="w-30 h-36px is-gray">
                  返回
                </Button>
                <Button onClick={userStore.loginOut} type="primary" class="w-30 h-36px">
                  退出
                </Button>
              </div>
            )
          }}
        </Modal>
      )
    }
  }
})
