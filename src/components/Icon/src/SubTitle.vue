<template>
     <div v-if="screenStore.isMobile" class="sub-title-wrap pl-6 flex" :class="{ 'hidden': isHidden }">
        <div class="mr-6 whitespace-nowrap" v-for="(item, index) in arrTitle" @click="handleClick(index)">
            <div :class="['item-content', 'font-h5', currentIndex == index ? 'item-active' : 'item-normal']">{{ item }}</div>
        </div>
    </div>
    <div v-else class="w-full h-16 pl-80 sub-title-wrap flex" :class="{ 'hidden': isHidden }">
        <div class="min-w-136px" v-for="(item, index) in arrTitle" @click="handleClick(index)">
            <div :class="['item-content', 'font-h7', currentIndex == index ? 'item-active' : 'item-normal']">{{ item }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
import type { PropType } from 'vue';
import { useScreenStore } from '@/store/modules/screen'

defineOptions({ name: 'SubTitle' });

const props = defineProps({
    arrTitle: {
        type: Array,
        default: [],
    },
    activeIndex: {
        type: Number,
        default: 0
    },
    onItemClick: {
        type: Function as PropType<(index: number) => void>,
        default: null
    }
});
const currentIndex = ref(0);
const screenStore = useScreenStore()
const isHidden = ref(false);
let lastScrollTop = 0;

// 监听滚动事件的处理函数
const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 判断滚动方向
    if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
        // 向下滚动且已经滚动了一定距离，显示组件
        isHidden.value = false;
    } else if (currentScrollTop < lastScrollTop && currentScrollTop > 536) {
        // 向上滚动，且滚动位置大于536px时，才隐藏组件
        isHidden.value = true;
    } else if (currentScrollTop <= 536) {
        // 当滚动位置小于等于536px时，始终显示组件
        isHidden.value = false;
    }
    
    // 更新上次滚动位置
    lastScrollTop = currentScrollTop;
};

// 组件挂载时添加滚动监听
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

// 组件卸载时移除滚动监听
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

watch(() => props.activeIndex, (newVal) => {
    currentIndex.value = newVal; 
})

const handleClick = (index: number) => {
    currentIndex.value = index;
    if (props.onItemClick) {
        props.onItemClick(index)
    }
}
</script>
<style lang="less" scoped>
.sub-title-wrap {
    background: @colorBgLayout;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
    transition: transform 0.2s ease;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
}

.sub-title-wrap::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
}

.hidden {
    transform: translateY(-100%);
}

.item-content {
    padding: 22px 0 13px 0;
    font-weight: 400;
    color: #000000;
    text-align: center;
    margin: auto;
    width: fit-content;
}

.item-active {
    border-bottom: 1px solid rgba(@colorPrimaryActive, 1);
}

.item-normal {
    border-bottom: 1px solid transparent;
}

@media screen and (max-width: 768px) {
    .item-content {
    padding: 12px 0;
    font-weight: 400;
    color: #000000;
    text-align: center;
    margin: auto;
    width: fit-content;
}
}
</style>