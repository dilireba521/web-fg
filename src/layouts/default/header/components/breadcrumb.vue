<template>
    <div class="breadcrumb">
        <div v-for="(item, i) in  breadcrumb " :key="i" @click="handleClick({ data: item, index: i })"
            :class="['breadcrumb-item', i === breadcrumbLength - 1 ? 'is-last' : '']">
            <div :class="['mr-2']"> {{ i === breadcrumbLength - 1 ? (route?.query?.breadcrumb || item.title) : item.title }}
            </div>
            <div v-if="i < breadcrumbLength - 1">></div>
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
function handleClick(params: any) {
    if (params.index === breadcrumbLength.value - 1) return
    go({
        path: params?.data?.path
    })
}
</script>
<style lang="less" scoped>
.breadcrumb {
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.45);

    &-item {
        display: flex;
        align-items: center;
        margin-right: 8px;
        cursor: pointer;

        &:hover {
            color: rgba(255, 255, 255, 0.65);

        }

        &.is-last {
            color: rgba(255, 255, 255, 0.65);
            cursor: unset;
        }
    }
}
</style>