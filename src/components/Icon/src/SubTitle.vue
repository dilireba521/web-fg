<template>
    <div class="w-full h-16 pl-80 sub-title-wrap flex">
        <div class="min-w-136px" v-for="(item, index) in arrTitle" @click="handleClick(index)">
            <div :class="['item-content', 'font-h7', currentIndex == index ? 'item-active' : 'item-normal']">{{ item }}</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import type { PropType } from 'vue';

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
</style>