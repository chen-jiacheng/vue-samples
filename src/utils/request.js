import axios from 'axios'

// 创建axios实例
const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API,
  timeout: 15000,
  withCredentials: true // 重要：允许跨域携带Cookie（Session）
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 可以在这里添加token（如果后续用JWT）
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`
    // }
    return config
  },
  error => {
    console.log('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    
    // 根据你的接口设计调整
    if (res.code === '200') {
      return res
    } else {
      // 业务错误处理
      console.error('业务错误:', res.msg)
      return Promise.reject(new Error(res.msg || 'Error'))
    }
  },
  error => {
    console.error('响应错误:', error)
    
    // 处理HTTP错误状态码
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log('未授权，请重新登录')
          // 可以在这里触发登出
          break
        case 403:
          console.log('拒绝访问')
          break
        case 500:
          console.log('服务器错误')
          break
        default:
          console.log(`请求错误 ${error.response.status}`)
      }
    }
    
    return Promise.reject(error)
  }
)

export default service