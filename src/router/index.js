// 1. 导入方式改变：从 vue-router 导入工厂函数，而非默认导入 VueRouter 构造函数
import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

// 2. 不再需要 Vue.use(VueRouter)，因为 Vue 3 使用应用实例(app)来安装插件

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true // 需要认证
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guestOnly: true // 仅游客可访问
    }
  }
]

// 3. 使用 createRouter 工厂函数创建路由实例
//    - 使用 createWebHistory() 替代 mode: 'history'
//    - base 配置项用法保持不变
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // 替代 mode: 'history'
  routes // ES6简写，相当于 routes: routes
})

// 4. 路由守卫：认证检查 (逻辑主体不变，但访问Store的方式需要调整)
router.beforeEach((to, from, next) => {
  // 方法A (推荐)：在守卫内部直接导入Store实例
  // 注意：需要在文件顶部添加 import store from '@/store'
  // const isAuthenticated = store.getters.isAuthenticated
  
  // 方法B：通过 to.meta 或全局状态管理来获取（更现代的方式）
  // 这里假设你的登录状态可以通过Pinia或Vuex全局访问
  // 例如使用Pinia: const authStore = useAuthStore()
  // const isAuthenticated = authStore.isAuthenticated
  
  // 临时示例：假设我们从某个全局状态获取（您需要根据实际情况实现）
//   let isAuthenticated = false
  const isAuthenticated = store.getters.isAuthenticated

  // TODO: 替换为您的实际认证状态获取逻辑
  // 例如：从 localStorage 读取 token，或调用 store
  // const user = localStorage.getItem('user')
  // isAuthenticated = !!user
  
  // 检查是否需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  } 
  // 检查是否仅游客可访问（如登录页）
  else if (to.matched.some(record => record.meta.guestOnly)) {
    if (isAuthenticated) {
      next('/home') // 已登录用户访问登录页时跳转到首页
    } else {
      next()
    }
  } 
  else {
    next()
  }
})

export default router