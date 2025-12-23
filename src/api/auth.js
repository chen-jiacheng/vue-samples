import request from '@/utils/request'

// 用户注册
export function register(data) {
  return request({
    url: '/servlet_samples_war/register',
    method: 'post',
    data
  })
}

// 用户登录
export function login(data) {
  return request({
    url: '/servlet_samples_war/login',
    method: 'post',
    data
  })
}

// 用户注销
export function logout() {
  return request({
    url: '/servlet_samples_war/logout',
    method: 'post',
    data: {} // 空对象，符合你的接口要求
  })
}

// 获取当前用户信息（如果后端有提供）
export function getCurrentUser() {
  return request({
    url: '/servlet_samples_war/user/info', // 假设的接口，根据实际情况调整
    method: 'get'
  })
}