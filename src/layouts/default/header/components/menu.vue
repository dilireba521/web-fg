<template>
    <div v-if="screenStore.isMobile" class="h-full w-full">
        <TabsMobileVue :list="items" v-model:active="selectedKey" :type="tabType" @change="change" />
    </div>
    <div v-else class="container flex justify-center items-center">
        <TabsVue :list="items" v-model:active="selectedKey" :type="tabType" @change="change"></TabsVue>
    </div>
</template>
<script lang="js" setup>
import { watch, ref } from 'vue';
import TabsVue from "./tabs/index.vue";
import TabsMobileVue from "./tabsMobile/index.vue";
import { useGo } from "@/hooks/web/usePage";
import { useRoute } from 'vue-router';
import { routebasicModuleList } from "@/router/routes"
import { useScreenStore } from '@/store/modules/screen'

const { go } = useGo();

const emit = defineEmits(['changeTab','closeMobileMenu'])

const screenStore = useScreenStore()
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
    console.log('路由改变',selectedKey.value);
    items.value = itemsFn()
}, { immediate: true });

watch(() => selectedKey.value, (val) => {
    tabType.value = val == '/home/index' ? 'default' : 'black'
    emit('changeTab', tabType.value)
}, { immediate: true })

function change(params) {
    // 如发现导航样式回选，可以写个定时器，延时对selectedKey赋值
    if(screenStore.isMobile){
        go({
            path: params.path,
            hash: params.hash || '',
        })
        tabType.value = params.path == '/home/index' ? 'default' : 'black'
        emit('changeTab', tabType.value)
        if(params.isClosed){
            // 触发关闭移动菜单的事件
            emit('closeMobileMenu')
        }
    }else{
        go({
            path: params
        })
    }
}
// 排序
function sortRoutes(routes) {
    return routes.sort((a, b) => {
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