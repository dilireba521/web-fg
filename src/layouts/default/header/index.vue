<template>
    <div class="relative h-[1px]">
        <div :style="headerStyle" :class="['header',
            {
                'black': tabType == 'black'
            }
        ]">
            <!-- 一级导航 -->
            <MenuVue @changeTab="changeTab"></MenuVue>
        </div>
        <!-- 占位 -->
        <div :class="['header-seat', { 'hidden': tabType == 'default' }]"></div>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import MenuVue from "./components/menu.vue";
const tabType = ref('default')
const headerStyle = ref({})
const isScrollDown = ref(true)
function changeTab(type: string) {
    tabType.value = type
}
function handleWheel(e: WheelEvent) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    let _style = {}
    if (scrollTop <= 1) {
        isScrollDown.value = true
        _style = {
            position: 'absolute',
        }
    } else {
        if (e.deltaY > 0) {
            _style = {
                position: 'fixed',
                transform: 'translateY(-56px)',
                display: isScrollDown.value ? 'none' : 'block',
            }
        } else {
            isScrollDown.value = false
            _style = {
                transform: 'translateY(0px)',
                position: 'fixed',
            }
        }
    }
    // console.log("scrollTop===", scrollTop);
    // console.log("_style===", _style);
    headerStyle.value = _style
}
onMounted(() => {
    document.addEventListener('wheel', handleWheel)
})

onUnmounted(() => {
    document.removeEventListener('wheel', handleWheel)
})
</script>
<style lang="less" scoped>
.header-seat {
    height: 56px;
}

.header {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    height: 56px;
    z-index: 2;
    background: rgba(0, 0, 0, 0.8);
    transition: all 0.2s linear;

    &.black {
        background: rgba(255, 255, 255, 0.4);
        // background-color: red;
    }
}
</style>