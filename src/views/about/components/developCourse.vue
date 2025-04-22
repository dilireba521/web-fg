<template>
  <div v-if="screenStore.isMobile" class="w-full min-h-465px mobile-develop-timeline px-6 pt-10 flex flex-col">
    <div class="font-h1 font-bold font-color-colorText text-center mb-6">发展历程</div>
    <div class="develop-timeline flex-1 flex">
      <!-- 左侧年份列表 -->
      <div class="timeline-years relative">
        <div class="timeline-line"></div>
        <div
          v-for="(year, index) in years"
          :key="year"
          class="year-item flex items-center"
          @click="handleYearClick(index)"
        >
          <div class="year-text min-w-49px text-right" :class="{ active: currentIndex === index }">
            {{ year }}
          </div>
          <div class="year-dot" :class="{ active: currentIndex === index }">
            <div class="year-dot-inner" :class="{ active: currentIndex === index }"></div>
          </div>
          <!-- <div class="year-line" :class="{ active: currentIndex === index }"></div> -->
        </div>
      </div>

      <!-- 右侧内容区域 -->
      <div class="timeline-content flex-1 ml-8">
        <div class="content-header flex items-center mb-30px">
          <div class="current-year text-red-600 font-h1 font-medium ml-auto">
            {{ years[currentIndex] }}
          </div>
        </div>
        <div class="text-left">
          <!-- <div
              v-for="(item, idx) in developEvents[currentIndex]"
              :key="idx"
              class="event-item mb-20px flex font-h6 font-color-colorTextSecondary"
            >
              <div>{{ item.month }}月-</div>
              <div>{{ item.desc }}</div>
            </div> -->
          <div v-html="developEvents[currentIndex]"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="w-full h-669px text-center relative">
    <div class="w-full px-80 h-669px pt-24 text-center z-10 relative flex flex-col">
      <div class="font-h3 font-color-colorText text-center font-medium mb-31px">发展历程</div>
      <div class="develop-timeline flex-1 flex">
        <!-- 左侧年份列表 -->
        <div class="timeline-years relative">
          <div class="timeline-line"></div>
          <div
            v-for="(year, index) in years"
            :key="year"
            class="year-item flex items-center"
            @click="handleYearClick(index)"
          >
            <div
              class="year-text min-w-49px text-right"
              :class="{ active: currentIndex === index }"
            >
              {{ year }}
            </div>
            <div class="year-dot" :class="{ active: currentIndex === index }">
              <div class="year-dot-inner" :class="{ active: currentIndex === index }"></div>
            </div>
            <div class="year-line" :class="{ active: currentIndex === index }"></div>
          </div>
        </div>

        <!-- 右侧内容区域 -->
        <div class="timeline-content flex-1 ml-42 flex flex-col">
          <div class="content-header flex items-center mb-30px">
            <div class="current-year text-red-600 text-4xl font-medium mr-20px">
              {{ years[currentIndex] }}
            </div>
          </div>
          <div class="text-left flex-1">
            <!-- <div
              v-for="(item, idx) in developEvents[currentIndex]"
              :key="idx"
              class="event-item mb-20px flex font-h6 font-color-colorTextSecondary"
            >
              <div>{{ item.month }}月-</div>
              <div>{{ item.desc }}</div>
            </div> -->
            <div v-html="developEvents[currentIndex]" class="timeline-content-text hide-scrollbar max-h-395px"></div>
          </div>
        </div>
      </div>
    </div>
    <img class="absolute top-0 left-0 w-full he-669px" :src="aboutCours" />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as userApi from '@/api/user'
import { useScreenStore } from '@/store/modules/screen'
import aboutCours from '@/assets/about-cours.png'

defineOptions({ name: 'developCourse' })

// 定义年份数据
const years = ref<string[]>([])

// 定义每年的事件数据
const developEvents = ref<string[]>([])

const props = defineProps({
  arrDevelopCours: {
    type: Array,
    default: []
  }
})
const currentIndex = ref(0)
const screenStore = useScreenStore()

const handleYearClick = (index: number) => {
  currentIndex.value = index
}

const handleMilestoneInfo = async () => {
  try {
    const res = await userApi.useGetMilestoneInfo()
    console.log('里程碑数据获取', res.data.value)
    // 获取数据，数据在data的_value中
    let data = res.data.value
    if (data && data.retCode == 0) {
      data.data.forEach((item: any) => {
        years.value.unshift(item.title)
        let content = item.content
        // 使用正则表达式为p标签添加类名
        content = content.replace(
          /<p>/g,
          '<p class="mb-20px flex font-h6 font-color-colorTextSecondary">'
        )
        developEvents.value.unshift(content)
      })
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  handleMilestoneInfo()
})
</script>
<style scoped lang="less">
/* 添加滚动内容样式 */
.timeline-content-text {
  overflow-y: auto; /* 启用垂直滚动 */
}

/* 隐藏滚动条但保留滚动功能 */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE 和 Edge */
  scrollbar-width: none; /* Firefox */
}

/* Webkit浏览器（Chrome、Safari等）隐藏滚动条 */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* 发展时间线容器样式 */
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
  background: linear-gradient(90deg, #c1272d 0%, rgba(193, 39, 45, 0) 100%);
}

.current-year {
  color: @colorPrimary1;
}

@media screen and (max-width: 768px) {
  .mobile-develop-timeline {
    background: linear-gradient(180deg, #f4f9ff 0%, #eef6ff 100%);
  }

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
    background: linear-gradient(90deg, #c1272d 0%, rgba(193, 39, 45, 0) 100%);
  }

  .current-year {
    color: @colorPrimary1;
  }
}
</style>
