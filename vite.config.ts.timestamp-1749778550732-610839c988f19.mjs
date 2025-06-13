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
    host: true,
    proxy: {
      "/fundApi": {
        target: "http://192.168.0.43:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(new RegExp(`^/fundApi`), "")
        // only https
        // secure: false
      }
    }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS1jb25maWcvc3ZnU3ByaXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRjpcXFxcMjAyNVxcXFxmdW5kLWZnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFwyMDI1XFxcXGZ1bmQtZmdcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6LzIwMjUvZnVuZC1mZy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5pbXBvcnQgeyBjb25maWdTdmdJY29uc1BsdWdpbiB9IGZyb20gJy4vdml0ZS1jb25maWcvc3ZnU3ByaXRlJ1xuXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IHRydWUsXG4gICAgcHJveHk6IHtcbiAgICAgICcvZnVuZEFwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzE5Mi4xNjguMC40Mzo4MDAwJyxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4vZnVuZEFwaWApLCAnJyksXG4gICAgICAgIC8vIG9ubHkgaHR0cHNcbiAgICAgICAgLy8gc2VjdXJlOiBmYWxzZVxuICAgICAgfSxcbiAgICB9XG4gIH0sXG4gIHBsdWdpbnM6IFt2dWUoKSwgdnVlSnN4KCksIFVub0NTUygpLCB2dWVEZXZUb29scygpLCBjb25maWdTdmdJY29uc1BsdWdpbih7IGlzQnVpbGQ6IHRydWUgfSldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9LFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBsZXNzOiB7XG4gICAgICAgIG1vZGlmeVZhcnM6IHtcbiAgICAgICAgICBoYWNrOiBgdHJ1ZTsgQGltcG9ydCAocmVmZXJlbmNlKSBcIiR7cmVzb2x2ZSgnc3JjL3N0eWxlL2NvbG9yLmxlc3MnKX1cIjtgXG4gICAgICAgIH0sXG4gICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFwyMDI1XFxcXGZ1bmQtZmdcXFxcdml0ZS1jb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkY6XFxcXDIwMjVcXFxcZnVuZC1mZ1xcXFx2aXRlLWNvbmZpZ1xcXFxzdmdTcHJpdGUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6LzIwMjUvZnVuZC1mZy92aXRlLWNvbmZpZy9zdmdTcHJpdGUudHNcIjsvKipcbiAqICBWaXRlIFBsdWdpbiBmb3IgZmFzdCBjcmVhdGluZyBTVkcgc3ByaXRlcy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbm5jd2Ivdml0ZS1wbHVnaW4tc3ZnLWljb25zXG4gKi9cblxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ25vZGU6cGF0aCdcblxuaW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdTdmdJY29uc1BsdWdpbih7IGlzQnVpbGQgfTogeyBpc0J1aWxkOiBib29sZWFuIH0pIHtcbiAgY29uc3Qgc3ZnSWNvbnNQbHVnaW4gPSBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgaWNvbkRpcnM6IFtyZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldLFxuICAgIHN2Z29PcHRpb25zOiBpc0J1aWxkXG4gIH0pXG4gIGNvbnNvbGUubG9nKCdzdmdJY29uc1BsdWdpbj09Jywgc3ZnSWNvbnNQbHVnaW4pXG5cbiAgcmV0dXJuIHN2Z0ljb25zUGx1Z2luIGFzIFBsdWdpbk9wdGlvblxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxTyxTQUFTLGVBQWUsV0FBVztBQUN4USxPQUFPLFlBQVk7QUFDbkIsU0FBUyxXQUFBQSxnQkFBZTtBQUV4QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8saUJBQWlCOzs7QUNGeEIsU0FBUyxlQUFlO0FBR3hCLFNBQVMsNEJBQTRCO0FBRTlCLFNBQVMscUJBQXFCLEVBQUUsUUFBUSxHQUF5QjtBQUN0RSxRQUFNLGlCQUFpQixxQkFBcUI7QUFBQSxJQUMxQyxVQUFVLENBQUMsUUFBUSxRQUFRLElBQUksR0FBRyxrQkFBa0IsQ0FBQztBQUFBLElBQ3JELGFBQWE7QUFBQSxFQUNmLENBQUM7QUFDRCxVQUFRLElBQUksb0JBQW9CLGNBQWM7QUFFOUMsU0FBTztBQUNUOzs7QURsQjJJLElBQU0sMkNBQTJDO0FBVzVMLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLFlBQVk7QUFBQSxRQUNWLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxTQUFTLEtBQUssUUFBUSxJQUFJLE9BQU8sV0FBVyxHQUFHLEVBQUU7QUFBQTtBQUFBO0FBQUEsTUFHN0Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLElBQUksR0FBRyxPQUFPLEdBQUcsT0FBTyxHQUFHLFlBQVksR0FBRyxxQkFBcUIsRUFBRSxTQUFTLEtBQUssQ0FBQyxDQUFDO0FBQUEsRUFDM0YsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLE1BQU07QUFBQSxRQUNKLFlBQVk7QUFBQSxVQUNWLE1BQU0sOEJBQThCQyxTQUFRLHNCQUFzQixDQUFDO0FBQUEsUUFDckU7QUFBQSxRQUNBLG1CQUFtQjtBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJyZXNvbHZlIiwgInJlc29sdmUiXQp9Cg==
