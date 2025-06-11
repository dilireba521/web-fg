import { defineComponent, defineAsyncComponent, onMounted, Suspense, KeepAlive, h } from 'vue'
import { Tabs } from 'ant-design-vue'
import { BasicSkeleton } from '@/components/skeleton'

export default defineComponent({
  setup(props, ctx) {
    onMounted(() => {
      console.log('mounted--info33333')
    })
    const items = [
      {
        label: '安全设置',
        component: defineAsyncComponent(() => import('@/views/account/infoSetting/index'))
      },
      {
        label: '通知设置',
        component: defineAsyncComponent(() => import('@/views/account/infoNotice/index'))
      },
      {
        label: '账号日志',
        component: defineAsyncComponent(() => import('@/views/account/infoLog/index'))
      },
      {
        label: '承受风险等级',
        component: defineAsyncComponent(() => import('@/views/account/infoRisk/index'))
      }
    ]
    return () => (
      <div class="container">
        <div class="m-auto w-936px pt-12 pb-10">
          <Tabs tabBarGutter={16} size="small">
            {items.map((item, index) => {
              return (
                <Tabs.TabPane key={index} tab={item.label}>
                  <KeepAlive>
                    <Suspense >
                      {{
                        default: () => h(item.component),
                        fallback: () => (
                          <div class="container">
                            <BasicSkeleton  paragraph={{rows:10}}/>
                          </div>
                        )
                      }}
                    </Suspense>
                  </KeepAlive>
                </Tabs.TabPane>
              )
            })}
          </Tabs>
        </div>
      </div>
    )
  }
})
