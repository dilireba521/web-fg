import {
  defineComponent,
  defineAsyncComponent,
  shallowRef,
  h,
  Suspense,
  ref,
  KeepAlive,
  computed,
  Transition,
  watch,
  nextTick
} from 'vue'
import TabsVue from '@/layouts/default/header/components/tabs/index.vue'
import { BasicSkeleton } from '@/components/skeleton'
import { useUserStore } from '@/store/modules/user'
import { formatToDateTime } from '@/utils/dateUtil'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'AccountLayout',
  components: {
    TabsVue
  },
  setup(props, ctx) {
    const userStore = useUserStore()
    const userInfo = userStore.getUserInfo
    const route = useRoute()
    const router = useRouter()
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
    watch(
      () => route.query,
      (curV,oldV) => {
        console.log("curV---",route,curV,oldV);
        
        nextTick(() => {
          if (curV?.activeKey && curV?.activeKey != selectedKey.value) {
            selectedKey.value = curV?.activeKey
          }
        })
      },
      { immediate: true }
    )
    watch(
      () => selectedKey.value,
      (curV) => {
        router.push({
          query: {
            activeKey: curV.toString()
          },
          replace: true // 不会创建新的历史记录
        })
      }
    )
    return () => (
      <div>
        <div class="bg-#C1272D h-37">
          <div class="container">
            <div class="pl-10 pt-12">
              <div class="font-h5 color-text1">您好，{userInfo?.name}</div>
              <div class="mt-1 font-h8 color-tertiary1">
                上次登录时间：
                {userInfo?.lastLoginTime ? formatToDateTime(userInfo?.lastLoginTime) : '- -'}
              </div>
            </div>
          </div>
        </div>
        <div class="bg-#f7f7f7 sticky top-0 z-10" style="box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1)">
          <div class="container ">
            <TabsVue
              list={items.value}
              size="small"
              v-model:active={selectedKey.value}
              type="black"
            />
          </div>
        </div>
        <div class='min-h-150'>
          <KeepAlive>
            <Suspense>
              {{
                default: () => curComponent.value && h(curComponent.value),
                // fallback: () => (
                //   <div class="container">
                //     <BasicSkeleton paragraph={{ rows: 12, width: '100%' }} />
                //   </div>
                // )
              }}
            </Suspense>
          </KeepAlive>
        </div>
      </div>
    )
  }
})
