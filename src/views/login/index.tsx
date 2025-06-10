import { defineComponent, ref, reactive } from 'vue'
import logoImg from '@/assets/icons/logo.svg'
import { Form, Input, Button, Checkbox, message } from 'ant-design-vue'
import './index.less'
import { usePostLogin } from '@/api/login'
import { useUserStore } from '@/store/modules/user'
import {  useGo } from '@/hooks/web/usePage'

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    const {go} = useGo()
    const OSSURL = import.meta.env.VITE_GLOB_OSS
    const formRef = ref()
    const formState = reactive({
      loginName: '',
      password: ''
    })
    const rules: any = {
      loginName: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      ]
    }
    const loading = ref(false)
    function submit() {
      formRef.value.validate().then((res: any) => {
        postUserLogin(res)
      })
    }
    async function postUserLogin(params: any) {
      try {
        loading.value = true
        const { data } = await usePostLogin(params)
        console.log('data===', data.value)

        if (data.value?.retCode == 0) {
            await userStore.afterLogin(data.value?.data)
            message.success(data.value?.msg || '登录成功')
            go('/',{isReplace:true})
          //     console.log(data.value)
          //     if (data.value?.data) {
          //       // 登录成功
          //       await userStore.afterLogin(data.value?.data)
          //       emit('close', 'register')
          //       message.success(data.value?.msg || '登录成功')
          //     } else {
          //       // google二次确认
          //       verifyCodeRef.value.visible = true
          //       console.log('verifyCodeRef.value==', verifyCodeRef.value)
          //     }
        } else {
          //     // 登录失败
          message.error(data.value?.retMsg || data.value?.msg || '登录失败')
        }
      } catch (error) {
        // 登录失败
        message.error('登录失败')
      } finally {
        // 最后
        loading.value = false
      }
    }

    return () => {
      return (
        <div class="relative h-lvh ">
          <img src={OSSURL + '/fund/login-bg.png'} class="absolute h-full w-240" alt="" />
          <img src={logoImg} class="absolute top-15 left-15 w-50" alt="" />
          <div
            class="absolute w-120 
               h-[522px] top-50% -translate-y-50% right-100 p-20"
          >
            <div class="text-center">
              <div class="text-black">欢迎登录</div>
              <div class="mt-2 text-xl text-black">诺言私募基金管理平台</div>
            </div>
            <Form
              ref={formRef}
              model={formState}
              rules={rules}
              hideRequiredMark={true}
              class="mt-12 login-form"
              layout="vertical"
            >
              <Form.Item label="账号" name="loginName">
                <Input
                  v-model:value={formState.loginName}
                  size="large"
                  placeholder="请输入账号"
                  autocomplete="username"
                ></Input>
              </Form.Item>
              <Form.Item label="密码" name="password">
                <Input.Password
                  v-model:value={formState.password}
                  size="large"
                  placeholder="请输入密码"
                  autocomplete="current-password"
                ></Input.Password>
              </Form.Item>
            </Form>
            {/* <div class='mb-2'>
                        <Checkbox><span class='text-xs color-tertiary'>记住账号</span></Checkbox>
                    </div> */}
            <Button
              loading={loading.value}
              onClick={submit}
              size="large"
              class="w-full"
              type="primary"
            >
              登录
            </Button>
          </div>
        </div>
      )
    }
  }
})
