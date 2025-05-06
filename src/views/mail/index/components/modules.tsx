import { defineComponent, ref } from 'vue'
import '../index.less'
import { Badge } from 'ant-design-vue'

export const Review = defineComponent({
  setup() {
    const expand = ref(false)
    function handleExpand() {
      expand.value = !expand.value
      console.log('expand', expand.value)
    }
    return () => (
      <div>
        <div class="flex justify-end items-center h-38px w-full text-black/25 ">
          <div class="cursor-pointer hover:text-black/88">全部已读</div>
        </div>
        <div class="list-item">
          <div onClick={handleExpand} class="list-header">
            <div class="w-14px">
              <Badge status="error"></Badge>
            </div>
            <div class="flex-1 truncate mr-4">您的申购申请审核已通过通过</div>
            <div class="text-black/45 mr-4">2025-03-08</div>
            {expand.value ? (
              <div class="px-3 py-5px text-[#C1272DFF] cursor-pointer">收起</div>
            ) : (
              <div class="px-3 py-5px cursor-pointer text-[#1677FFFF]">展开</div>
            )}
          </div>
          {expand.value ? (
            <div class="pb-2">
              您的申购申请审核已通过通过…您的申购申请审核已通过通过…您的申购申请审核…您的申购申请审核已通过通过…您的申购申请审核已通过通过…您的申购申请审核…您的申购申请审核已通过通过…您的申购申请审核已通过通过…您的申购申请审核…您的申购申请审核已通过通过…您的申购申请审核已通过通过…您的申购申请审核…您的申购申请审核已通过通过…您的申购申请审核已通过通过…您的申购申请审核…您的申购申请审核已通过通过…您的申购申请审核已通过通过…您的申购申请审核…您的申购申请审核已通过通过…您的申购申请审核已通过通过…您的申购申请审核…您的申购申请审核已通过通过…您的申购申请审核已通过通过…您的申购申请审核…您的申购申请审核已通过通过…您的申购申请审核已通过通过…您的申购申请审核…您的申购申请审核已通过通过…您的申购申请审核已通过通过…您的申购。
            </div>
          ) : (
            <div class="pb-2"></div>
          )}
        </div>

        {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty> */}
      </div>
    )
  }
})
