import {
  defineComponent,
  defineAsyncComponent,
  shallowRef,
  h,
  Suspense,
  ref,
  KeepAlive,
  computed,
  Transition
} from 'vue'
import TabsVue from '@/layouts/default/header/components/tabs/index.vue'
import { BasicSkeleton } from '@/components/skeleton'
import { useUserStore } from '@/store/modules/user'
import { formatToDateTime } from '@/utils/dateUtil'

export default defineComponent({
  name: 'AccountLayout',
  components: {
    TabsVue
  },
  setup(props, ctx) {
    const userStore = useUserStore()
    const userInfo = userStore.getUserInfo
    const items = shallowRef([
      {
        label: '账户信息',
        value: 'account',
        component: defineAsyncComponent(() => import('@/views/account/index/index'))
      },
      {
        label: '持有基金',
        value: 'fund',
        component: defineAsyncComponent(() => import('@/views/account/fund/index'))
      },
      {
        label: '申赎记录',
        value: 'record',
        component: defineAsyncComponent(() => import('@/views/account/record/index'))
      },
      {
        label: '基本信息',
        value: 'info',
        component: defineAsyncComponent(() => import('@/views/account/info/index'))
      }
    ])
    const selectedKey = ref('account')
    const curComponent = computed(() => {
      return items.value.find((item) => item.value === selectedKey.value)?.component
    })
    return () => (
      <div>
        <div class="bg-#C1272D h-37">
          <div class="container">
            <div class="pl-10 pt-12">
              <div class="font-h5 color-text1">您好，用户{userInfo?.name}</div>
              <div class="mt-1 font-h8 color-tertiary1">
                上次登录时间：{ userInfo?.lastLoginTime ? formatToDateTime(userInfo?.lastLoginTime) : '- -'}
              </div>
            </div>
          </div>
        </div>
        <div class="bg-module">
          <div class="container">
            <TabsVue
              list={items.value}
              size="small"
              v-model:active={selectedKey.value}
              type="black"
            />
          </div>
        </div>
        <div>
          <KeepAlive>
            <Suspense>
              {{
                default: () => curComponent.value && h(curComponent.value),
                fallback: () => (
                  <div class="container">
                    <BasicSkeleton />
                  </div>
                )
              }}
            </Suspense>
          </KeepAlive>
        </div>
      </div>
    )
  }
})
