<template>
    <Connect />
    <div class="bg-layout">
      <!-- <div v-if="screenStore.isMobile" class="px-6 pt-4 pb-6 font-h6 font-color-colorTextTertiary">
        <div>
          © 诺言（湖北）私募基金管理有限公司 2025 版权所有
        </div>
        <div class="flex items-center" @click="jumpVerification">
          <img class="w-4 h-4 mr-2" :src="certificateIcon">
          <div>鄂ICP备2025111413号</div>
        </div>
      </div> -->
      <div class="container pt-8 pb-8">
        <div class="font-h7 text-black/45 text-center">
          <div>© 诺言（湖北）私募基金管理有限公司 2025 版权所有</div>
          <div class="certificate-item flex items-center justify-center cursor-pointer" @click="jumpVerification">
            <img class="w-4 h-4 mr-2" :src="certificateIcon">
            <div class="certificate-conten">鄂ICP备2025111413号</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import Connect from '@/views/home/components/connect'
//   import { useScreenStore } from '@/store/modules/screen'
  import certificateIcon from '@/assets/certificate-logo.png'
//   const screenStore = useScreenStore()
  const jumpVerification = () => {
    window.open('https://beian.miit.gov.cn')
  }
  </script>
  <style lang="less" scoped>
  .certificate-item:hover .certificate-conten{
    color: @colorPrimary1;
  }
  </style>
  