<template>
  <Connect />
  <div class="bg-layout">
    <div v-if="screenStore.isMobile" class="px-6 pt-4 pb-6 font-h6 font-color-colorTextTertiary">
      <div>
        © 诺言（湖北）私募基金管理有限公司 2025 版权所有
      </div>
      <div>
        鄂ICP备2025111413号
      </div>
    </div>
    <div v-else class="container pt-8 pb-8">
      <div class="font-h7 text-black/45 text-center">
        <div>© 诺言（湖北）私募基金管理有限公司 2025 版权所有</div>
        <div>
          鄂ICP备2025111413号
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Connect from '@/views/home/components/connect'
import { useScreenStore } from '@/store/modules/screen'
const screenStore = useScreenStore()
</script>
<style lang="less" scoped></style>
