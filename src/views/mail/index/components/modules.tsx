import { defineComponent, nextTick, ref, watch } from 'vue'
import '../index.less'
import { Badge } from 'ant-design-vue'
import { BasicSkeleton } from '@/components/skeleton'
import { useGetNotice, usePostNotice } from '@/api/notice'
import { BasicList } from '@/components/list'
import { useUserStore } from '@/store/modules/user'
import { useRoute } from 'vue-router'

export const Review = defineComponent({
  props: {
    categoryId: {
      type: [String, Number],
      default: () => ''
    }
  },
  setup(props) {
    const listRef = ref()
    const loading = ref(false)

    const userStore = useUserStore()
    watch(
      () => props.categoryId,
      (curV) => {
        if (curV) {
          nextTick(() => {
            listRef.value?.fetch()
          })
        }
      },
      { immediate: true }
    )
    function beforeFetch(params: any) {
      return {
        ...params,
        categoryId: props.categoryId
      }
    }

    // 用户已经成功阅读- header小铃铛数量要同步更新
    function handleRead() {
      const userInfo = userStore.getUserInfo
      console.log(222, userInfo, props.categoryId)
      const _noticeNotRead = userInfo?.noticeNotRead?.map((item) => {
        if (item.categoryId == props.categoryId) {
          return {
            ...item,
            count: Math.max(0, item.count - 1)
          }
        } else {
          return item
        }
      })
      userStore.setUserInfo({
        ...userInfo,
        noticeNotRead: _noticeNotRead
      })
    }
    function afterFetch(data: any) {
      return data?.map((item) => {
        return {
          ...item,
          categoryId: props.categoryId
        }
      })
    }
    async function readAll() {
      const { data } = await usePostNotice({ categoryId: props.categoryId,readAll: true })
      if(data.value?.retCode == 0) {
        listRef.value?.fetch()
        userStore.updateUserInfo()
      }
    }
    return () => (
      <div>
        <div class="flex justify-end items-center h-38px w-full text-black/25 ">
          <div onClick={readAll} class="cursor-pointer hover:text-black/88">全部已读</div>
        </div>
        <BasicSkeleton loading={false} showEmpty={false}>
          <BasicList
            api={useGetNotice}
            ref={listRef}
            loading={loading.value}
            immediate={false}
            isHandle={true}
            beforeFetch={beforeFetch}
            afterFetch={afterFetch}
            split={false}
          >
            {{
              renderItem: ({ item }) => {
                return (
                  <ReviewItem
                    key={item.id}
                    categoryId={props.categoryId}
                    record={item}
                    onRead={handleRead}
                  ></ReviewItem>
                )
              }
            }}
          </BasicList>
        </BasicSkeleton>
      </div>
    )
  }
})

const ReviewItem = defineComponent({
  props: {
    record: {
      type: Object,
      default: () => {}
    },
    categoryId: {
      type: [String, Number],
      default: () => ''
    }
  },
  setup(props, { emit }) {
    const expand = ref(false)
    const isRead = ref(false)
    const route = useRoute()
    watch(
      () => props.record,
      (curV) => {
        isRead.value = curV.isRead
        if (route.query?.activeKey == props.categoryId && curV.id == route.query?.id) {
          handleExpand()
        }
      },
      { immediate: true }
    )
    function handleExpand() {
      expand.value = !expand.value
      if (!isRead.value) {
        usePostNoticeFn()
      }
    }
    async function usePostNoticeFn() {
      const { data } = await usePostNotice({ id: props.record?.id })
      if (data.value?.retCode == 0) {
        // 用户已经成功阅读
        isRead.value = true
        emit('read')
      }
    }
    return () => (
      <div class="list-item">
        <div onClick={handleExpand} class="list-header">
          <div class="w-14px">{!isRead.value ? <Badge status="error"></Badge> : ''}</div>
          <div class="flex-1 truncate mr-4">{props.record?.title}</div>
          <div class="text-black/45 mr-4">{props.record?.createTime}</div>
          {expand.value ? (
            <div class="px-3 py-5px text-[#C1272DFF] cursor-pointer">收起</div>
          ) : (
            <div class="px-3 py-5px cursor-pointer text-[#1677FFFF]">展开</div>
          )}
        </div>
        {expand.value ? <div class="pb-2">{props.record?.content}</div> : <div class="pb-2"></div>}
      </div>
    )
  }
})
