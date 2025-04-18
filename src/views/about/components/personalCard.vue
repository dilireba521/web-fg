<template>
  <div v-if="screenStore.isMobile">
    <div class="person-item w-full h-171px flex">
      <div class="avatar-container w-2/4 h-171px overflow-hidden">
        <img class="person-avatar w-full h-171px" :src="rtaLogoGold" alt="" />
      </div>
      <div class="person-info w-2/4 h-171px px-4 pt-6 pb-4 text-left">
        <div class="person-info-name font-h4 font-color-colorText mb-4">雷军</div>
        <div class="font-h6 colorTextSecondary">创始人、</div>
        <div class="font-h6 colorTextSecondary">董事长兼CEO</div>
      </div>
    </div>
    <!-- 头像居右 -->
    <div class="person-item w-full h-171px flex">
      <div class="person-info w-2/4 h-171px px-4 pt-6 pb-4 text-left">
        <div class="person-info-name font-h4 font-color-colorText mb-4">雷军</div>
        <div class="font-h6 colorTextSecondary">创始人、</div>
        <div class="font-h6 colorTextSecondary">董事长兼CEO</div>
      </div>
      <div class="avatar-container w-2/4 h-171px overflow-hidden">
        <img class="person-avatar w-full h-171px" :src="rtaLogoGold" alt="" />
      </div>
    </div>
  </div>
  <div v-else class="block">
    <!-- 头像居左 -->
    <div class="person-item w-full h-80 flex">
      <div class="avatar-container w-2/4 h-80 overflow-hidden">
        <img class="person-avatar w-full h-80" :src="rtaLogoGold" alt="" />
      </div>
      <div class="person-info w-2/4 h-80 px-8 pt-12 pb-8 text-left">
        <div class="person-info-name font-h4 font-color-colorText mb-8">雷军</div>
        <div class="font-h6 colorTextSecondary">创始人、</div>
        <div class="font-h6 colorTextSecondary">董事长兼CEO</div>
      </div>
    </div>
    <!-- 头像居右 -->
    <div class="person-item w-full h-80 flex">
      <div class="person-info w-2/4 h-80 px-8 pt-12 pb-8 text-left">
        <div class="person-info-name font-h4 font-color-colorText mb-8">雷军</div>
        <div class="font-h6 colorTextSecondary">创始人、</div>
        <div class="font-h6 colorTextSecondary">董事长兼CEO</div>
      </div>
      <div class="avatar-container w-2/4 h-80 overflow-hidden">
        <img class="person-avatar w-full h-80" :src="rtaLogoGold" alt="" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useScreenStore } from '@/store/modules/screen'

import rtaLogoGold from '@/assets/rta-logo-gold.png'

defineOptions({ name: 'personalCard' })

const props = defineProps({
  arrPerson: {
    type: Array,
    default: []
  }
})
const currentIndex = ref(0)
const screenStore = useScreenStore()

const handleClick = (index: number) => {
  currentIndex.value = index
}
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
