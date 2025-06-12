import { ExclamationCircleFilled, CheckCircleFilled } from '@ant-design/icons-vue'
import { Modal, Upload, message, Form, Input, Tabs, TabPane, Button } from 'ant-design-vue'
import { computed, defineComponent, reactive, ref, onMounted, toRaw, watch } from 'vue'
import { ConfigPropType } from '../enums'
import { usePostChangePas } from '@/api/user'
import { useApiBasic } from '@/utils/hook/useApi'
import { useInterval } from '@vueuse/core'
import { useUserStore } from '@/store/modules/user'

const modalFooterBtn: any = {
  class: 'w-74px !ml-4'
}
const modalFooterBtn1: any = {
  class: 'w-74px !ml-4 is-gray'
}
const labelCol = {
  style: {
    width: '94px'
  }
}
// 安全等级
export const renderLevel = (level: number) => {
  const list = [
    {
      value: 1,
      label: '低',
      color: 'text-[#ff4d4f]',
      bg: 'bg-[#ff4d4f]'
    },
    {
      value: 2,
      label: '中',
      color: 'text-[#FF8600]',
      bg: 'bg-[#FF8600]'
    },
    {
      value: 3,
      label: '高',
      color: 'text-[#2FB97B]',
      bg: 'bg-[#2FB97B]'
    }
  ]
  return () => {
    const item = list.find((item) => item.value === level)
    return (
      <div class="flex items-center">
        {level == 3 ? (
          <CheckCircleFilled class={['text-40px', item?.color]} />
        ) : (
          <ExclamationCircleFilled class={['text-40px', item?.color]}></ExclamationCircleFilled>
        )}
        <div class="flex ml-4">
          <div class="color-tertiary mr-3">安全等级</div>
          <div class="flex items-center gap-[6px]">
            {new Array(3).fill(0).map((_, index) => {
              return (
                <div
                  class={[
                    'w-10 h-1 rounded-sm',
                    `bg-[${item?.color}]`,
                    index < level ? item?.bg : 'bg-[#D8D8D8]'
                  ]}
                ></div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

// 修改密码
export const Password = defineComponent({
  emits: ['submit'],
  setup(props, { expose, emit }) {
    const userStore = useUserStore()
    const visible = ref(false)
    const formRef = ref()

    const _count = 10
    const counterMsg = ref(_count)
    const { resume, pause } = useInterval(1000, {
      controls: true,
      immediate: false,
      callback: (count: number) => {
        counterMsg.value--
        if (counterMsg.value < 0) {
          counterMsg.value = _count
          pause()
        }
      }
    })
    const formState = reactive({
      password1: '',
      password2: '',
      newPw2: '',
      code: ''
    })
    const confirmLoading = ref(false)

    function handleOk(params: any) {
      //   console.log(params)
      formRef.value.validate().then((res: any) => {
        confirmLoading.value = true
        // emit('submit', { ...res, action: 'changePassword' })
        changePasswordFn(res)
      })
    }
    const rules = {
      code: [
        {
          required: false,
          message: '请输入验证码',
          trigger: 'blur'
        }
      ],
      // password1: [
      //   {
      //     required: true,
      //     message: '请输入旧密码',
      //     trigger: 'blur'
      //   }
      // ],
      password1: [
        {
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }
      ],
      password2: [
        {
          required: true,
          trigger: 'blur',
          validator: (rule: any, value: any) => {
            if (value === '') {
              return Promise.reject('两次输入密码不一致')
            } else if (value !== formState.password1) {
              return Promise.reject('两次输入密码不一致')
            } else {
              return Promise.resolve()
            }
          }
        }
      ]
    }
    watch(
      () => visible.value,
      (newValue, oldValue) => {
        if (!newValue) {
          formRef.value?.resetFields()
        }
      }
    )
    function changePasswordFn(params: any) {
      const { counter } = useInterval(1000, { controls: true })
      useApiBasic({
        apiFn: usePostChangePas(params) as any,
        successFn: (data: any) => {
          visible.value = false
          message.warning({
            content: () => `请勿操作，${5 - counter.value > 0 ? 5 - counter.value : 0}秒后自动退出`,
            key: 'Changepw',
            duration: 5,
            onClose: () => {
              userStore.loginOut()
            }
          })
        }
      })
    }
    // 获取短信验证码
    function getCode() {
      counterMsg.value--
      resume()
    }
    expose({
      visible,
      confirmLoading
    })
    return () => {
      return (
        <Modal
          okButtonProps={modalFooterBtn}
          cancelButtonProps={modalFooterBtn1}
          onOk={handleOk}
          width={574}
          class="modal-white-bg"
          v-model:open={visible.value}
        >
          {{
            title: () => <div class="font-500">修改密码</div>,
            default: () => (
              <Form
                hideRequiredMark={true}
                ref={formRef}
                labelCol={labelCol}
                model={formState}
                rules={rules}
                class="mt-8 mb-12 px-6"
              >
                {/* <Form.Item name="password1" label="旧密码">
                  <Input.Password
                    v-model:value={formState.password1}
                    placeholder="请输入旧密码"
                  ></Input.Password>
                </Form.Item> */}
                <Form.Item name="password1" label="新密码">
                  <Input.Password
                    v-model:value={formState.password1}
                    placeholder="请输入新密码"
                  ></Input.Password>
                </Form.Item>
                <Form.Item name="password2" label="重复新密码">
                  <Input.Password
                    v-model:value={formState.password2}
                    placeholder="请输入新密码"
                  ></Input.Password>
                </Form.Item>
                <Form.Item name="code" label="短信验证码">
                  <Input.Group compact>
                    <Input
                      v-model:value={formState.code}
                      style={{
                        width: `calc(100% - 120px)`
                      }}
                      placeholder="请输入验证码"
                    ></Input>
                    <Button
                      disabled={counterMsg.value != _count}
                      onClick={getCode}
                      class='w-30 text-center !px-0'
                    >
                      {counterMsg.value != _count
                        ? counterMsg.value + '秒后重新获取'
                        : '获取验证码'}
                    </Button>
                  </Input.Group>
                </Form.Item>
              </Form>
            )
          }}
        </Modal>
      )
    }
  }
})

// 手机号
export const Phone = defineComponent({
  props: {
    type: {
      type: String as unknown as PropType<ConfigPropType>,
      validator: (value: string) => Object.values(ConfigPropType).includes(value),
      default: ConfigPropType.BIND
    }
  },
  emits: ['submit'],
  setup(props, { expose, emit }) {
    const visible = ref(false)
    const formRef = ref()
    const formState = reactive({
      oldPw: '',
      newPw1: '',
      newPw2: '',
      code: ''
    })
    const confirmLoading = ref(false)
    const title = computed(() => {
      return props.type === ConfigPropType.BIND ? '绑定手机号' : '更换手机号码'
    })
    onMounted(() => {
      console.log('mounted--Password')
    })
    function handleOk(params: any) {
      //   console.log(params)
      formRef.value.validate().then((res: any) => {
        confirmLoading.value = true
        emit('submit', { ...res, action: 'changePassword' })
      })
    }
    const rules = {
      code: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        }
      ],
      oldPw: [
        {
          required: true,
          message: '请输入手机号码',
          trigger: 'blur'
        }
      ],
      newPw1: [
        {
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }
      ]
    }
    watch(
      () => visible.value,
      (newValue, oldValue) => {
        if (!newValue) {
          formRef.value?.resetFields()
        }
      }
    )
    expose({
      visible,
      confirmLoading
    })
    return () => {
      return (
        <Modal
          okButtonProps={modalFooterBtn}
          cancelButtonProps={modalFooterBtn1}
          onOk={handleOk}
          width={574}
          class="modal-white-bg"
          v-model:open={visible.value}
        >
          {{
            title: () => <div class="font-500">{title.value}</div>,
            default: () => (
              <Form
                hideRequiredMark={true}
                ref={formRef}
                labelCol={labelCol}
                model={formState}
                rules={rules}
                class="mt-8 mb-12 px-6"
              >
                <Form.Item name="oldPw" label="登录密码">
                  <Input.Password
                    v-model:value={formState.oldPw}
                    placeholder="请输入登录密码"
                  ></Input.Password>
                </Form.Item>
                <Form.Item name="newPw1" label="手机号码">
                  <Input v-model:value={formState.newPw1} placeholder="请输入手机号码"></Input>
                </Form.Item>
                <Form.Item name="newPw2" label="新手机号码">
                  <Input v-model:value={formState.newPw2} placeholder="请输入新手机号码"></Input>
                </Form.Item>
                <Form.Item name="code" label="短信验证码">
                  <Input.Group compact>
                    <Input
                      v-model:value={formState.code}
                      style="width: calc(100% - 88px)"
                      placeholder="请输入验证码"
                    ></Input>
                    <Button class="w-22 !px-2">获取验证码</Button>
                  </Input.Group>
                </Form.Item>
              </Form>
            )
          }}
        </Modal>
      )
    }
  }
})
