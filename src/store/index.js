// src/store/index.js
import { createStore } from 'vuex' // 1. 从 'vuex' 导入 createStore
// import * as authApi from '@/api/auth'
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '@/api/auth'
// import { login as apiLogin, register as apiRegister, logout as apiLogout } from '@/api/auth'

const getDefaultState = () => {
  return {
    user: null,
    isAuthenticated: false
  }
}

// 2. 使用 createStore 创建实例，而不是 new Vuex.Store()
export default createStore({
  state: getDefaultState(),
  
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isAuthenticated = !!user
      if (user) {
        localStorage.setItem('user_info', JSON.stringify(user))
      } else {
        localStorage.removeItem('user_info')
      }
    },
    RESET_STATE(state) {
      Object.assign(state, getDefaultState())
    }
  },
  
  actions: {
    initApp({ commit }) {
        // 1. 从 localStorage 尝试恢复用户信息
        const userStr = localStorage.getItem('user_info')
        if (userStr) {
          try {
            const user = JSON.parse(userStr)
            // 2. 【可选但推荐】验证 Session 是否仍然有效
            // 这里可以发起一个轻量级的 API 请求（如 /api/validate），
            // 根据后端返回决定是 commit('SET_USER', user) 还是 commit('RESET_STATE')
            // 为了快速解决问题，我们先直接恢复
            commit('SET_USER', user)
            console.log('从 localStorage 恢复用户状态:', user)
          } catch (e) {
            console.error('解析存储的用户信息失败:', e)
            localStorage.removeItem('user_info')
          }
        }
      },
    // 注册
    async register({ commit }, userInfo) {
      try {
        console.log('store apiRegister 对象内容:', apiRegister) // 添加这行
        console.log('store apiRegister 函数类型:', typeof apiRegister) // 添加这行

        const response = await apiRegister(userInfo)
        if (response.code === '200') {
          commit('SET_USER', response.date)
          return Promise.resolve(response)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    
    // 登录
    async login({ commit }, loginInfo) {
      try {

        console.log('store apiLogin 对象内容:', apiLogin) // 添加这行
        console.log('store apiLogin 函数类型:', typeof apiLogin) // 添加这行

        const response = await apiLogin(loginInfo)
        if (response.code === '200') {
          commit('SET_USER', response.date)
          return Promise.resolve(response)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    
    // 注销
    async logout({ commit }) {
      try {
        const response = await apiLogout()
        if (response.code === '200') {
          commit('RESET_STATE')
          localStorage.removeItem('userInfo')
          return Promise.resolve(response)
        }
      } catch (error) {
        commit('RESET_STATE')
        return Promise.reject(error)
      }
    },
    
    // 初始化用户状态
    initUser({ commit }) {
      const userStr = localStorage.getItem('userInfo')
      if (userStr) {
        try {
          const user = JSON.parse(userStr)
          commit('SET_USER', user)
        } catch (e) {
          console.error('解析用户信息失败:', e)
        }
      }
    }
  },
  
  getters: {
    currentUser: state => state.user,
    isAuthenticated: state => state.isAuthenticated
  }
})