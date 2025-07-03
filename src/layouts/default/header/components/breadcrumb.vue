<template>
  <div class="breadcrumb-wrap">
    <div class="breadcrumb">
      <div v-for="(item, i) in breadcrumb" :key="i" @click="handleClick({ data: item, index: i })"
        :class="['breadcrumb-item', i === breadcrumbLength - 1 ? 'is-last' : '']">
        <div :class="['mr-2']">
          {{ i === breadcrumbLength - 1 ? route?.query?.breadcrumb || item.title : item.title }}
        </div>
        <div v-if="i < breadcrumbLength - 1">/</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useGo } from '@/hooks/web/usePage'
import { useRoute } from 'vue-router'
const route = useRoute()
const props = defineProps({
  breadcrumb: {
    type: Array,
    default: () => []
  }
})
const breadcrumbLength = computed(() => props.breadcrumb.length)
const { go } = useGo()
function handleClick(params: any) {
  if (params.index === breadcrumbLength.value - 1) return
  let _params = {}

  // 处理面包屑点击父级带参数跳转
  if (Object.prototype.hasOwnProperty.call(params?.data?.query, 'redirect')) {
    _params = JSON.parse(params?.data?.query.redirect)
  }
  go({
    path: params?.data?.path,
    query: _params
  })
}
</script>
<style lang="less" scoped>
.breadcrumb-wrap {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
}

.breadcrumb {
  width: @widthMax;
  margin: 0 auto;
  display: flex;
  align-items: center;
  color: @colorTextTertiary;
  font-size: 14px;
  line-height: 44px;
  background-color: #fff;

  &-item {
    display: flex;
    align-items: center;
    margin-right: 8px;
    cursor: pointer;

    &:hover {
      color: @colorText;
    }

    &.is-last {
      color: @colorText;
      cursor: unset;
    }
  }
}
</style>
