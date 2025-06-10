// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import UnoCSS from "file:///F:/2025/fund-fg/node_modules/.pnpm/unocss@0.61.9_postcss@5.2.18_rollup@4.36.0_vite@5.4.14_@types+node@20.17.24_less@4.2.2_/node_modules/unocss/dist/vite.mjs";
import { resolve as resolve2 } from "node:path";
import { defineConfig } from "file:///F:/2025/fund-fg/node_modules/.pnpm/vite@5.4.14_@types+node@20.17.24_less@4.2.2/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/2025/fund-fg/node_modules/.pnpm/@vitejs+plugin-vue@5.2.3_vite@5.4.14_@types+node@20.17.24_less@4.2.2__vue@3.5.13_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///F:/2025/fund-fg/node_modules/.pnpm/@vitejs+plugin-vue-jsx@4.1.2_vite@5.4.14_@types+node@20.17.24_less@4.2.2__vue@3.5.13_typescript@5.4.5_/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueDevTools from "file:///F:/2025/fund-fg/node_modules/.pnpm/vite-plugin-vue-devtools@7.7.2_rollup@4.36.0_vite@5.4.14_@types+node@20.17.24_less@4.2.2__vue@3.5.13_typescript@5.4.5_/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";

// vite-config/svgSprite.ts
import { resolve } from "node:path";
import { createSvgIconsPlugin } from "file:///F:/2025/fund-fg/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.14_@types+node@20.17.24_less@4.2.2_/node_modules/vite-plugin-svg-icons/dist/index.mjs";
function configSvgIconsPlugin({ isBuild }) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), "src/assets/icons")],
    svgoOptions: isBuild
  });
  console.log("svgIconsPlugin==", svgIconsPlugin);
  return svgIconsPlugin;
}

// vite.config.ts
var __vite_injected_original_import_meta_url = "file:///F:/2025/fund-fg/vite.config.ts";
var vite_config_default = defineConfig({
  server: {
    host: true
  },
  plugins: [vue(), vueJsx(), UnoCSS(), vueDevTools(), configSvgIconsPlugin({ isBuild: true })],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve2("src/style/color.less")}";`
        },
        javascriptEnabled: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS1jb25maWcvc3ZnU3ByaXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcMjAyNVxcXFxmdW5kLWZnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFwyMDI1XFxcXGZ1bmQtZmdcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6LzIwMjUvZnVuZC1mZy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5pbXBvcnQgeyBjb25maWdTdmdJY29uc1BsdWdpbiB9IGZyb20gJy4vdml0ZS1jb25maWcvc3ZnU3ByaXRlJ1xuXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IHRydWVcbiAgfSxcbiAgcGx1Z2luczogW3Z1ZSgpLCB2dWVKc3goKSwgVW5vQ1NTKCksIHZ1ZURldlRvb2xzKCksIGNvbmZpZ1N2Z0ljb25zUGx1Z2luKHsgaXNCdWlsZDogdHJ1ZSB9KV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIGxlc3M6IHtcbiAgICAgICAgbW9kaWZ5VmFyczoge1xuICAgICAgICAgIGhhY2s6IGB0cnVlOyBAaW1wb3J0IChyZWZlcmVuY2UpIFwiJHtyZXNvbHZlKCdzcmMvc3R5bGUvY29sb3IubGVzcycpfVwiO2BcbiAgICAgICAgfSxcbiAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkY6XFxcXDIwMjVcXFxcZnVuZC1mZ1xcXFx2aXRlLWNvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcMjAyNVxcXFxmdW5kLWZnXFxcXHZpdGUtY29uZmlnXFxcXHN2Z1Nwcml0ZS50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRjovMjAyNS9mdW5kLWZnL3ZpdGUtY29uZmlnL3N2Z1Nwcml0ZS50c1wiOy8qKlxuICogIFZpdGUgUGx1Z2luIGZvciBmYXN0IGNyZWF0aW5nIFNWRyBzcHJpdGVzLlxuICogaHR0cHM6Ly9naXRodWIuY29tL2FubmN3Yi92aXRlLXBsdWdpbi1zdmctaWNvbnNcbiAqL1xuXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xuXG5pbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ1N2Z0ljb25zUGx1Z2luKHsgaXNCdWlsZCB9OiB7IGlzQnVpbGQ6IGJvb2xlYW4gfSkge1xuICBjb25zdCBzdmdJY29uc1BsdWdpbiA9IGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICBpY29uRGlyczogW3Jlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXG4gICAgc3Znb09wdGlvbnM6IGlzQnVpbGRcbiAgfSlcbiAgY29uc29sZS5sb2coJ3N2Z0ljb25zUGx1Z2luPT0nLCBzdmdJY29uc1BsdWdpbilcblxuICByZXR1cm4gc3ZnSWNvbnNQbHVnaW4gYXMgUGx1Z2luT3B0aW9uXG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFPLFNBQVMsZUFBZSxXQUFXO0FBQ3hRLE9BQU8sWUFBWTtBQUNuQixTQUFTLFdBQUFBLGdCQUFlO0FBRXhCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxpQkFBaUI7OztBQ0Z4QixTQUFTLGVBQWU7QUFHeEIsU0FBUyw0QkFBNEI7QUFFOUIsU0FBUyxxQkFBcUIsRUFBRSxRQUFRLEdBQXlCO0FBQ3RFLFFBQU0saUJBQWlCLHFCQUFxQjtBQUFBLElBQzFDLFVBQVUsQ0FBQyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUEsSUFDckQsYUFBYTtBQUFBLEVBQ2YsQ0FBQztBQUNELFVBQVEsSUFBSSxvQkFBb0IsY0FBYztBQUU5QyxTQUFPO0FBQ1Q7OztBRGxCMkksSUFBTSwyQ0FBMkM7QUFXNUwsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxHQUFHLE9BQU8sR0FBRyxZQUFZLEdBQUcscUJBQXFCLEVBQUUsU0FBUyxLQUFLLENBQUMsQ0FBQztBQUFBLEVBQzNGLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixZQUFZO0FBQUEsVUFDVixNQUFNLDhCQUE4QkMsU0FBUSxzQkFBc0IsQ0FBQztBQUFBLFFBQ3JFO0FBQUEsUUFDQSxtQkFBbUI7QUFBQSxNQUNyQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicmVzb2x2ZSIsICJyZXNvbHZlIl0KfQo=
