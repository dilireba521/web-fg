<template>
    <div :class="['header', { 'black': tabType == 'black' }]">
        <div class="container flex justify-center items-center">
            <TabsVue :list="items" v-model:active="selectedKey" :type="tabType" @change="change"></TabsVue>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { watch, ref } from 'vue';
import TabsVue from "./components/tabs/index.vue";
import { useGo } from "@/hooks/web/usePage";
import { useRoute } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { routebasicModuleList } from "@/router/routes"

const { go } = useGo();

const route = useRoute();
const items = ref()
const selectedKey = ref()
const tabType = ref('default')

const itemsFn = () => {
    return sortRoutes(routebasicModuleList).map((item) => {
        return {
            ...item,
            label: item.meta?.title || item.path,
            value: item.redirect || item.path,
        }
    })
}
watch(() => route.path, () => {
    // console.log(route, routebasicModuleList);
    const _len = route.matched?.length
    const _item = route.matched[_len - 1]
    selectedKey.value = _item.meta?.active || _item.path
    items.value = itemsFn()
}, { immediate: true });

watch(() => selectedKey.value, (val) => {
    tabType.value = val == '/home/index' ? 'default' : 'black'
}, { immediate: true })

function change(params: any) {
    // 如发现导航样式回选，可以写个定时器，延时对selectedKey赋值
    go({
        path: params
    })
}
// 排序
function sortRoutes(routes: RouteRecordRaw[]) {
    return routes.sort((a: RouteRecordRaw, b: RouteRecordRaw) => {
        if (a.meta?.orderNo && b.meta?.orderNo) {
            // @ts-ignore
            return a.meta?.orderNo - b.meta?.orderNo
        } else if (a.meta?.orderNo) {
            return -1
        } else if (b.meta?.orderNo) {
            return 1
        } else {
            return 0
        }
    })
}
</script>
<style lang="less" scoped>
.header {
    height: 56px;
    background: rgba(0, 0, 0, 0.8);

    &.black {
        background: rgba(255, 255, 255, 0.8);
    }
}
</style>