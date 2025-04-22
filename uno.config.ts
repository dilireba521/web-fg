import { defineConfig, presetTypography, presetUno } from 'unocss'

export default defineConfig({
  theme: {
    container: {
      maxWidth: '1440px',  // 或者使用你想要的固定宽度
    }
  },
  presets: [presetUno(), presetTypography()],
})
