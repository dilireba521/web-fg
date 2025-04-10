<template>
    <div class="w-full h-669px text-center relative">
        <div class="w-full px-80 h-669px pt-24 text-center z-10 relative flex flex-col">
            <div class="font-h3 font-color-colorText text-center font-medium mb-31px">发展历程</div>
            <div class="develop-timeline flex-1 flex">
                <!-- 左侧年份列表 -->
                <div class="timeline-years relative">
                    <div class="timeline-line"></div>
                    <div v-for="(year, index) in years" :key="year" 
                        class="year-item flex items-center" 
                        @click="handleYearClick(index)">
                        <div class="year-text min-w-49px text-right" :class="{'active': currentIndex === index}">{{ year }}</div>
                        <div class="year-dot" :class="{'active': currentIndex === index}">
                            <div class="year-dot-inner" :class="{'active': currentIndex === index}"></div>
                        </div>
                        <div class="year-line" :class="{'active': currentIndex === index}"></div>
                    </div>
                </div>
                
                <!-- 右侧内容区域 -->
                <div class="timeline-content flex-1 ml-42">
                    <div class="content-header flex items-center mb-30px">
                        <div class="current-year text-red-600 text-4xl font-medium mr-20px">{{ years[currentIndex] }}</div>
                    </div>
                    <div>
                        <div v-for="(item, idx) in developEvents[currentIndex]" :key="idx" class="event-item mb-20px flex font-h6 font-color-colorTextSecondary">
                            <div>{{ item.month }}月-</div>
                            <div>{{ item.desc }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img class="absolute top-0 left-0 w-full he-669px" :src="aboutCours" />
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import aboutCours from '@/assets/about-cours.png';

defineOptions({ name: 'developCourse' });

// 定义年份数据
const years = ['2025', '2024', '2023', '2022'];

// 定义每年的事件数据
const developEvents = [
    [
        { month: '06', desc: '正圆投资获得中国证券投资基金协会基金管理人资格正圆投资获得中国证券投资基金协会基金管理人资格' },
        { month: '05', desc: '正圆投资获得中国证券投资基金协会基金管理人资格' },
        { month: '03', desc: '正圆投资获得中国证券投资基金协会基金管理人资格' },
        { month: '02', desc: '正圆投资获得中国证券投资基金协会基金管理人资格' },
    ],
    [
        { month: '12', desc: '2024年的事件1' },
        { month: '09', desc: '2024年的事件2' },
    ],
    [
        { month: '11', desc: '2023年的事件1' },
        { month: '07', desc: '2023年的事件2' },
    ],
    [
        { month: '10', desc: '2022年的事件1' },
        { month: '06', desc: '2022年的事件2' },
    ]
];

const props = defineProps({
    arrDevelopCours: {
        type: Array,
        default: [],
    }
});
const currentIndex = ref(0);

const handleClick = (index: number) => {
    currentIndex.value = index;
}

const handleYearClick = (index: number) => {
    currentIndex.value = index;
}
</script>
<style lang="less" scoped>
.develop-timeline {
    position: relative;
    z-index: 1;
}

.timeline-years {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 83px;
    padding-top: 15px;
}

.timeline-line {
    position: absolute;
    left: 73px;
    top: 0;
    bottom: 0;
    width: 1px;
    height: 100%;
    background-color: @colorPrimary1;
}

.year-item {
    position: relative;
    margin-bottom: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.year-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid #e0e0e0;
    z-index: 2;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
}

.year-text {
    color: #999;
    transition: all 0.3s;
    margin-right: 19px;
}

.year-dot.active {
    border-color: @colorPrimary1;
    width: 18px;
    height: 18px;
}

.year-dot-inner {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #e0e0e0;
    transition: all 0.3s;
}

.year-dot-inner.active {
    width: 12px;
    height: 12px;
    background-color: @colorPrimary1;
    transform: scale(1.1);
}

.year-text {
    color: #999;
    font-size: 16px;
    transition: all 0.3s;
}

.year-text.active {
    color: @colorPrimary1;
    font-weight: 500;
    font-size: 20px;
    margin-right: 16px;
}

.year-line {
    position: absolute;
    left: 66px;
    width: 0;
    height: 1px;
    background-color: transparent;
    transition: all 0.5s ease;
}

.year-line.active {
    width: 153px;
    height: 1px;
    background: linear-gradient( 180deg, rgba(193,39,45,0) 0%, #C1272D 100%);
}

.current-year {
    color: @colorPrimary1;
}
</style>