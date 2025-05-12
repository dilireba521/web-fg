<template>
  <div v-if="screenStore.isMobile">
    <div class="person-item w-full h-171px flex">
      <div class="avatar-container w-2/4 h-171px overflow-hidden">
        <img class="person-avatar w-full h-171px" :src="rtaLogoGold" alt="" />
      </div>
      <div class="person-info w-2/4 h-171px px-4 pt-6 pb-4 text-left">
        <div class="person-info-name font-h4 font-color-colorText mb-4">
          {{ dataPersonUp.name }}
        </div>
        <div class="font-h6 colorTextSecondary">{{ dataPersonUp.title }}</div>
        <!-- <div class="font-h6 colorTextSecondary">董事长兼CEO</div> -->
      </div>
    </div>
    <!-- 头像居右 -->
    <div class="person-item w-full h-171px flex">
      <div class="person-info w-2/4 h-171px px-4 pt-6 pb-4 text-left">
        <div class="person-info-name font-h4 font-color-colorText mb-4">
          {{ dataPersonDown.name }}
        </div>
        <div class="font-h6 colorTextSecondary">{{ dataPersonDown.title }}</div>
        <!-- <div class="font-h6 colorTextSecondary">董事长兼CEO</div> -->
      </div>
      <div class="avatar-container w-2/4 h-171px overflow-hidden">
        <img class="person-avatar w-full h-171px" :src="rtaLogoGold" alt="" />
      </div>
    </div>
  </div>
  <div v-else class="block">
    <!-- 头像居左 -->
    <div class="person-item w-full aspect-[2/1] flex">
      <div class="avatar-container w-2/4 h-full overflow-hidden">
        <img class="person-avatar w-full h-full" :src="rtaLogoGold" alt="" />
      </div>
      <div class="person-info w-2/4 h-full px-8 pt-12 pb-8 text-left">
        <div class="person-info-name font-h4 font-color-colorText mb-8">
          {{ dataPersonUp.name }}
        </div>
        <div class="font-h6 colorTextSecondary">{{ dataPersonUp.title }}</div>
        <!-- <div class="font-h6 colorTextSecondary">董事长兼CEO</div> -->
      </div>
    </div>
    <!-- 头像居右 -->
    <div class="person-item w-full aspect-[2/1] flex">
      <div class="person-info w-2/4 h-full px-8 pt-12 pb-8 text-left">
        <div class="person-info-name font-h4 font-color-colorText mb-8">
          {{ dataPersonDown.name }}
        </div>
        <div class="font-h6 colorTextSecondary">{{ dataPersonDown.title }}</div>
        <!-- <div class="font-h6 colorTextSecondary">董事长兼CEO</div> -->
      </div>
      <div class="avatar-container w-2/4 h-full overflow-hidden">
        <img class="person-avatar w-full h-full" :src="rtaLogoGold" alt="" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref,watch } from 'vue'
import { useScreenStore } from '@/store/modules/screen'

import rtaLogoGold from '@/assets/rta-logo-gold.png'

defineOptions({ name: 'personalCard' })

// 定义人员信息的接口
interface PersonInfo {
  name: string;
  title: string;
  img?: string;
}

const props = defineProps({
  arrPersonInfo: {
    type: Array,
    default: () => [] // 使用函数返回默认值
  }
})
const currentIndex = ref(0)
const screenStore = useScreenStore()
const dataPersonUp = ref<PersonInfo>({ name: '', title: '' })
const dataPersonDown = ref<PersonInfo>({ name: '', title: '' })

const handleClick = (index: number) => {
  currentIndex.value = index
}

import { onMounted } from 'vue'

onMounted(() => {
  if (props.arrPersonInfo && props.arrPersonInfo.length > 0) {
    dataPersonUp.value = props.arrPersonInfo[0] as PersonInfo
    if (props.arrPersonInfo.length > 1) {
      dataPersonDown.value = props.arrPersonInfo[1] as PersonInfo
    }
  }
})
</script>
<style lang="less" scoped>
.person-item {
  background: @colorBgLayout;
}

.person-item:hover .person-avatar {
  cursor: pointer;
}

.person-item:hover .person-info {
  background: @colorPrimary1;
  color: #fff;
}

.person-item:hover .person-info-name {
  color: #fff;
}

.person-avatar {
  transition: transform 0.3s ease;
  object-fit: cover;
}

.person-item:hover .person-avatar {
  cursor: pointer;
  transform: scale(1.1); /* 图片放大10% */
}
</style>
