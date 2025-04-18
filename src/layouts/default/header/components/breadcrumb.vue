<template>
    <div class="breadcrumb">
        <div v-for="(item, i) in  breadcrumb " :key="i" @click="handleClick({ data: item, index: i })"
            :class="['breadcrumb-item', i === breadcrumbLength - 1 ? 'is-last' : '']">
            <div :class="['mr-2']"> {{ i === breadcrumbLength - 1 ? (route?.query?.breadcrumb || item.title) : item.title }}
            </div>
            <div v-if="i < breadcrumbLength - 1">/</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useGo } from '@/hooks/web/usePage';
import { useRoute } from 'vue-router';
const route = useRoute()
const props = defineProps({
    breadcrumb: {
        type: Array,
        default: () => []
    }
})
const breadcrumbLength = computed(() => props.breadcrumb.length)
const { go } = useGo()
console.log("breadcrumb====breadcrumb", props.breadcrumb);

function handleClick(params: any) {
    if (params.index === breadcrumbLength.value - 1) return
    go({
        path: params?.data?.path
    })
}
</script>
<style lang="less" scoped>
.breadcrumb {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    color: @colorTextTertiary;
    font-size: 14px;
    line-height: 44px;

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