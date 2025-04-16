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

const app = createApp(App)
app.use(Antd)

setupStore(app)

// 配置路由
setupRouter(app)
// 路由守卫
setupRouterGuard(router)

app.mount('#app')
