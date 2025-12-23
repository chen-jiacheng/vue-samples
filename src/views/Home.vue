<template>
    <div class="home-container">
      <el-container>
        <!-- 顶部导航 -->
        <el-header height="80px">
          <div class="header-content">
            <div class="logo">
              <h2>用户管理系统</h2>
            </div>
            <div class="user-info" v-if="isAuthenticated">
              <el-avatar :size="40" :src="userAvatar">
                {{ userInitials }}
              </el-avatar>
              <div class="user-details">
                <span class="username">{{ currentUser.username }}</span>
                <span class="email">{{ currentUser.email }}</span>
              </div>
              <el-button 
                type="danger" 
                plain 
                @click="handleLogout"
                :loading="logoutLoading"
              >
                退出登录
              </el-button>
            </div>
          </div>
        </el-header>
        
        <!-- 主要内容 -->
        <el-main>
          <el-card class="welcome-card" v-if="isAuthenticated">
            <div slot="header">
              <span>欢迎回来！</span>
            </div>
            <div class="user-info-card">
              <el-descriptions title="用户信息" :column="1" border>
                <el-descriptions-item label="用户ID">
                  {{ currentUser.id }}
                </el-descriptions-item>
                <el-descriptions-item label="用户名">
                  {{ currentUser.username }}
                </el-descriptions-item>
                <el-descriptions-item label="邮箱">
                  {{ currentUser.email }}
                </el-descriptions-item>
                <el-descriptions-item label="登录状态">
                  <el-tag type="success">已登录</el-tag>
                </el-descriptions-item>
              </el-descriptions>
              
              <div class="tips">
                <h3>Session机制说明</h3>
                <p>当前使用Session认证机制：</p>
                <ul>
                  <li>登录成功后，服务器会创建Session并返回Session ID</li>
                  <li>Session ID会自动存储在浏览器的Cookie中</li>
                  <li>后续请求会自动携带Cookie，服务器通过Session ID识别用户</li>
                  <li>点击"退出登录"会销毁服务器端的Session</li>
                </ul>
              </div>
            </div>
          </el-card>
          
          <div v-else class="not-logged-in">
            <h3>您还未登录</h3>
            <p>请先登录或注册新账户</p>
            <div class="action-buttons">
              <el-button type="primary" @click="$router.push('/login')">
                前往登录
              </el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex'
  
  export default {
    name: 'Home',
    data() {
      return {
        logoutLoading: false
      }
    },
    computed: {
      ...mapGetters(['currentUser', 'isAuthenticated']),
      userInitials() {
        if (this.currentUser && this.currentUser.username) {
          return this.currentUser.username.charAt(0).toUpperCase()
        }
        return 'U'
      },
      userAvatar() {
        // 可以设置默认头像或使用Gravatar
        return ''
      }
    },
    methods: {
      ...mapActions(['logout']),
      
      async handleLogout() {
        this.logoutLoading = true
        try {
          await this.logout()
          this.$message.success('已成功退出登录')
          // 如果配置了路由守卫，这里会自动跳转到登录页
          this.$router.push('/login')
        } catch (error) {
          this.$message.error('退出登录失败：' + (error.message || '未知错误'))
        } finally {
          this.logoutLoading = false
        }
      }
    },
    mounted() {
      // 页面加载时初始化用户状态
      if (!this.isAuthenticated) {
        this.$store.dispatch('initUser')
      }
    }
  }
  </script>
  
  <style scoped>
  .home-container {
    height: 100vh;
    background-color: #f5f7fa;
  }
  
  .el-header {
    background-color: #ffffff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
  }
  
  .header-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo h2 {
    margin: 0;
    color: #409EFF;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .user-details {
    display: flex;
    flex-direction: column;
  }
  
  .username {
    font-weight: bold;
    font-size: 16px;
  }
  
  .email {
    font-size: 12px;
    color: #909399;
  }
  
  .welcome-card {
    max-width: 800px;
    margin: 20px auto;
  }
  
  .user-info-card {
    padding: 10px;
  }
  
  .tips {
    margin-top: 30px;
    padding: 20px;
    background-color: #f0f9ff;
    border-radius: 4px;
    border-left: 4px solid #409EFF;
  }
  
  .tips h3 {
    margin-top: 0;
    color: #333;
  }
  
  .tips ul {
    padding-left: 20px;
  }
  
  .tips li {
    margin: 5px 0;
    color: #666;
  }
  
  .not-logged-in {
    text-align: center;
    padding: 100px 20px;
  }
  
  .not-logged-in h3 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .not-logged-in p {
    color: #909399;
    margin-bottom: 30px;
  }
  
  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  </style>