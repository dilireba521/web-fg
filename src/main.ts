import 'uno.css'
import { createApp } from 'vue'
import { setupStore } from '@/store'

import './style/main.less'
import App from './App.vue'
import { router, setupRouter } from './router'
import { setupRouterGuard } from '@/router/guard'

const app = createApp(App)

setupStore(app)

// 配置路由
setupRouter(app)
// 路由守卫
setupRouterGuard(router)

app.mount('#app')
