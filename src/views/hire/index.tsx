import { defineComponent, ref, onMounted, onUnmounted, reactive, watch } from 'vue'
import { WEB_BG_HEAD } from '@/utils/resources'
import { SubTitle } from '@/components/Icon'
import * as userApi from '@/api/user'
import { useScreenStore } from '@/store/modules/screen'
import './index.less'
import { Pagination, Checkbox, Col } from 'ant-design-vue'
import { useGo } from '@/hooks/web/usePage'
import { isBlock } from 'typescript'
import iconSelected from '@/assets/icon-selected.png'
import iconEmptySelect from '@/assets/icon-empty-select.png'

const arrHireTitle = ref(['社会招聘', '校园招聘'])

// 定义类型接口
interface HireType {
  name: string
  id: number
}

export default defineComponent({
  components: {
    SubTitle
  },
  setup(props, ctx) {
    const screenStore = useScreenStore()
    const { go } = useGo()
    const hireChannel = ref(2)
    const current = ref(1)
    const pageSize = ref(10)
    const total = ref(0)
    const hireType = ref(1)
    const jobsNumber = ref(0)
    const arrHire = ref([])
    const selectType = ref(null)
    const arrHireTYpe = ref<HireType[]>([])

    // 处理SubTitle点击事件
    const handleSubTitleClick = (index: number) => {
      if (index == 0) {
        hireChannel.value = 2
      } else {
        hireChannel.value = 1
      }
      handleHireInfo()
    }

    const handleHireInfo = async () => {
      try {
        // categoryId:1 社会招聘, categoryId:2 校园招聘
        const res = await userApi.useGetHireInfo({
          type: hireChannel.value,
          categoryId: selectType.value
        })
        // 获取数据，数据在data的_value中
        let data = res.data.value
        if (data && data.retCode == 0) {
          // 根据order字段排序，数字越小排越前面
          data.data.sort((a: { order?: number }, b: { order?: number }) => {
            // 如果order字段不存在，则默认为最大值
            const orderA = a.order !== undefined ? a.order : Number.MAX_VALUE
            const orderB = b.order !== undefined ? b.order : Number.MAX_VALUE
            return orderA - orderB
          })
          jobsNumber.value = data.data.length
          arrHire.value = data.data
        }
      } catch (error) {
        console.log(error)
      }
    }

    const handleHireType = async () => {
      try {
        const res = await userApi.useGetHireType()
        // console.log('招聘类别数据获取', res.data.value)
        // 获取数据，数据在data的_value中
        let data = res.data.value
        if (data && data.retCode == 0) {
          // for (let i = 0; i < data.data.length; i++) {
          //   arrHireTYpe.value.push({
          //     name: data.data[i].title,
          //     id: data.data[i].id
          //   })
          // }
          console.log('招聘类别数据获取', arrHireTYpe.value)
          arrHireTYpe.value = data.data
        }
      } catch (error) {
        console.log(error)
      }
    }

    // 处理复选框选中状态变化
    const handleCheckboxChange = (checkedValues: any[]) => {
      console.log('选中的值:', checkedValues)
      handleHireInfo()
    }

    // 根据选中的职位类别筛选职位
    const filterJobsByCategories = (categoryIds: number[]) => {
      if (categoryIds.length === 0) {
        // 如果没有选中任何类别，显示所有职位
        handleClearSelectType()
        return
      }

      // 根据选中的类别筛选职位
      // 这里是示例逻辑，您需要根据实际需求调整
      if (hireType.value === 1) {
        // 社会招聘职位筛选
        // 可以调用API或者在本地筛选
        console.log('筛选社会招聘职位，类别IDs:', categoryIds)
      } else {
        // 校园招聘职位筛选
        console.log('筛选校园招聘职位，类别IDs:', categoryIds)
      }
    }

    // 清除选中的职位类别
    const handleClearSelectType = () => {
      selectType.value = null
      handleHireInfo()
    }

    // 处理职位类别点击事件
    const hadleSelect = (item: any) => {
      if (selectType.value == item.id) {
        selectType.value = null
        return
      }
      selectType.value = item.id
    }

    // 分页变化处理函数
    const handlePageChange = (page: number, pageSize: number) => {
      current.value = page
      handleHireInfo()
      // 这里可以添加重新获取数据的逻辑
    }

    const jumpPositionDetail = (item: any) => {
      localStorage.setItem('currentHireDetail', JSON.stringify(item))
      go('/hireDetail')
    }

    // 监听选中值的变化
    watch(
      () => selectType.value,
      (newValue) => {
        handleHireInfo()
      }
    )

    onMounted(() => {
      handleHireInfo()
      handleHireType()
    })

    return () => (
      <div>
        {screenStore.isMobile ? (
          <div
            class="w-full h-390px bg-cover bg-center bg-no-repeat px-8 py-12"
            style={{ backgroundImage: `url(${WEB_BG_HEAD}/mobile-head-join.png)` }}
          >
            {/* <div class="font-color-colorText" style={{ fontSize: '32px' }}>
              <div>RECRUIT</div>
              <div>TALENTED PEOPLE</div>
            </div> */}
          </div>
        ) : (
          <div
            class="w-full h-120 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${WEB_BG_HEAD}/head-join.jpg)` }}
          ></div>
        )}
        <SubTitle arrTitle={arrHireTitle.value} onItemClick={handleSubTitleClick} />
        {screenStore.isMobile ? (
          <div class="w-full px-6 pt-10 pb-12 background-white">
            <div class="font-bold font-h1 font-color-colorText">
              开启新的工作（{jobsNumber.value}）
            </div>
            {arrHire.value.map((item, index) => (
              <div
                class="py-4 mb-4"
                onClick={() => {
                  jumpPositionDetail(item)
                }}
              >
                <div class="mb-2 font-h5 font-medium font-color-colorText">
                  {(item as any).title}
                </div>
                <div class="mb-2 font-h6 font-color-colorText">
                  {(item as any)?.category?.title}
                  {(item as any)?.label && <span>｜{(item as any)?.label}</span>}
                </div>
                {/* <div
                  class="line-clamp-2 font-h7 font-color-colorTextSecondary"
                  v-html={(item as any).content}
                ></div> */}
                {(item as any).content && (
                  <div class="line-clamp-2 font-h7 font-color-colorTextSecondary">
                    {(item as any).remark}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div class="w-full px-80 pt-24 flex background-colorBgLayout min-h-100vh flex-col">
            <div class="flex w-full">
              <div class="hire-type-box w-304px min-h-100vh pr-8">
                <div class="hire-type-clear flex justify-between py-4">
                  <div class="font-h7 font-color-colorTextSecondary">筛选</div>
                  <div class="font-h7 font-color-colorTextTertiary" onClick={handleClearSelectType}>
                    清除
                  </div>
                </div>
                <div class="pt-6">
                  <div class="font-h6 font-medium font-color-colorText mb-6">职位类别</div>
                  {arrHireTYpe.value.map((item: any) => (
                    <div class="py-2 flex items-center">
                      {selectType.value == item.id ? (
                        <img
                          onClick={() => {
                            hadleSelect(item)
                          }}
                          class="w-4 h-4"
                          src={iconSelected}
                        />
                      ) : (
                        <img
                          onClick={() => {
                            hadleSelect(item)
                          }}
                          class="w-4 h-4"
                          src={iconEmptySelect}
                        />
                      )}
                      <div class="ml-2 font-h7 font-medium">{item.title}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div class="pl-8 w-full">
                <div class="font-h3 font-medium mb-10">开启新的工作（{jobsNumber.value}）</div>
                {arrHire.value.map((item, index) => (
                  <div
                    class="mb-10 w-full"
                    onClick={() => {
                      jumpPositionDetail(item)
                    }}
                  >
                    <div class="mb-2 font-h5 font-medium font-color-colorText">
                      {(item as any).title}
                    </div>
                    <div class="mb-3 font-h6 font-color-colorText">
                      {(item as any)?.category?.title}
                      {(item as any)?.label && <span>｜{(item as any)?.label}</span>}
                    </div>
                    {/* <div
                      class="line-clamp-2 font-h7 font-color-colorTextSecondary"
                      v-html={(item as any).content}
                    ></div> */}
                    {(item as any).content && (
                      <div class="line-clamp-2 font-h7 font-color-colorTextSecondary">
                        {(item as any).remark}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* <div class="flex justify-end mt-auto">
              <Pagination
                current={current.value}
                pageSize={pageSize.value}
                total={total.value}
                onChange={handlePageChange}
                showSizeChanger={false} // 可选：隐藏页码大小选择器
              />
            </div> */}
          </div>
        )}
      </div>
    )
  }
})
