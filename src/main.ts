import 'uno.css'
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import { setupStore } from '@/store'

import './style/main.less'
import App from './App.vue'
import { router, setupRouter } from './router'
import { setupRouterGuard } from '@/router/guard'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { createPinia } from 'pinia'
import { useScreenStore } from './store/modules/screen'

const app = createApp(App)
app.use(Antd)

const pinia = createPinia()
app.use(pinia)
// 初始化屏幕尺寸 store
const screenStore = useScreenStore()
screenStore.init()

setupStore(app)

// 配置路由
setupRouter(app)
// 路由守卫
setupRouterGuard(router)

app.mount('#app')
