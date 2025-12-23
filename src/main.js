// 正确：Vue 3 写法
import { createApp } from 'vue'
import App from './App.vue'

// 1. 导入插件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'

// 2. 创建应用实例
const app = createApp(App)

// 3. 在实例上使用插件 (而非全局Vue上)
app.use(ElementPlus)
app.use(router)
app.use(store)

// 4. （可选）应用实例配置，例如关闭生产提示
app.config.productionTip = false

// 5. 初始化用户状态（注意：在Vue 3中，store是 reactive 的）
// 通常不再需要手动dispatch，可以通过computed或useStore在组件内访问
// store.dispatch('initUser') // 根据你的store逻辑决定是否保留

// 6. 挂载应用
app.mount('#app')