import { defineComponent, ref, Suspense } from 'vue'
import { Row, Col } from 'ant-design-vue'
import { SwapRightOutlined } from '@ant-design/icons-vue'
import { useGetNews } from '@/api/news'
import { BasicSkeleton } from '@/components/skeleton'
import { useGo } from '@/hooks/web/usePage'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup(props, ctx) {
    const { go } = useGo()

    return () => {
      return (
        <div class="container">
          <div class="font-h3 font-500 pt-24 pb-8 text-center">信息披露</div>
          <Suspense>
            {{
              default: () => {
                return (
                  <ListElm
                    onPush={(params) => {
                      go(params)
                    }}
                  />
                )
              },
              fallback: () => {
                return <BasicSkeleton></BasicSkeleton>
              }
            }}
          </Suspense>
          <div
            onClick={() => go('/info/index')}
            class="font-h7 text-center color-primary1 mt-16 mb-12"
          >
            <span class="inline-block cursor-pointer w-24 h-8 leading-8">了解更多</span>
          </div>
        </div>
      )
    }
  }
})

const ListElm = defineComponent({
  async setup(props, { emit }) {
    const { data } = await useGetNews({ isHome: true })
    console.log('data----', data)
    function handleClick(params: any) {
      emit('push', {
        path: '/info/detail',
        query: params
      })
    }
    return () => {
      return (
        <div>
          <BasicSkeleton loading={false} showEmpty={!data?.value?.data}>
            <Row gutter={[16, 16]}>
              {data.value?.data?.slice(0,8)?.map((item, index) => {
                return (
                  <Col span={6}>
                    <div
                      onClick={() =>
                        handleClick({
                          id: item.id
                        })
                      }
                      class="p-5 group bg-[#F5F5F5] hover:bg-[#C1272D]
                 cursor-pointer rounded-sm"
                    >
                      <div
                        title={item?.title}
                        class="group-hover:color-[#fff]/88 font-h6 font-500 truncate"
                      >
                        {item?.title}
                      </div>
                      <div class="group-hover:color-[#fff]/88 pt-2 h-13 font-h7 color-secondary line-clamp-2">
                        {item?.desc}
                      </div>
                      <div class="group-hover:color-[#fff]/88 color-secondary flex justify-between items-center pt-6">
                        <div>
                          <SwapRightOutlined class="hidden group-hover:block" />
                        </div>
                        <div class="font-h7 text-right">{item?.releaseTime}</div>
                      </div>
                    </div>
                  </Col>
                )
              })}
            </Row>
          </BasicSkeleton>
        </div>
      )
    }
  }
})
