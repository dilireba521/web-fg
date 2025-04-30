<template>
  <Connect />
  <div class="bg-layout">
    <div v-if="screenStore.isMobile" class="px-6 pt-4 pb-6 font-h6 font-color-colorTextTertiary">
      <div>
        © 北京火山引擎科技有限公司 2025 版权所有
      </div>
      <div>
        工业和信息化部ICP备案2025111413号 鄂ICP备2025111413号
      </div>
      <div>
        营业执照
      </div>
      <div>
        增值电信业务经营许可证京B2-20202418，A2.B1.B2-20202637
        网络文化经营许可证：京网文（2023）4872-140号
      </div>
    </div>
    <div v-else class="container pt-8 pb-8">
      <div class="font-h7 text-black/45 text-center">
        <div>© 北京火山引擎科技有限公司 2025 版权所有 服务条款 隐私政策 更多协议</div>
        <div>
          工业和信息化部ICP备案2025111413号 鄂ICP备2025111413号 营业执照
          增值电信业务经营许可证京B2-20202418，A2.B1.B2-20202637
          网络文化经营许可证：京网文（2023）4872-140号
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
