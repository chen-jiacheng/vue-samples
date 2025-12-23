<template>
    <div class="login-container">
      <div class="login-box">
        <!-- 标签页切换：登录/注册 -->
        <el-tabs v-model="activeTab" stretch @tab-click="handleTabClick">
          <el-tab-pane label="登录" name="login">
            <login-form 
              ref="loginForm"
              @success="handleLoginSuccess"
            />
          </el-tab-pane>
          <el-tab-pane label="注册" name="register">
            <register-form 
              ref="registerForm"
              @success="handleRegisterSuccess"
            />
          </el-tab-pane>
        </el-tabs>
        
        <!-- 底部信息 -->
        <div class="footer-info">
          <p>使用Session认证，登录后服务器会创建会话</p>
          <p>Cookie会自动管理，无需前端手动处理</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LoginForm from '@/components/LoginForm.vue'
  import RegisterForm from '@/components/RegisterForm.vue'
  
  export default {
    name: 'Login',
    components: {
      LoginForm,
      RegisterForm
    },
    data() {
      return {
        activeTab: 'login'
      }
    },
    methods: {
      handleTabClick(tab) {
        // 切换标签时重置表单
        if (tab.name === 'login' && this.$refs.loginForm) {
          this.$refs.loginForm.resetForm()
        } else if (tab.name === 'register' && this.$refs.registerForm) {
          this.$refs.registerForm.resetForm()
        }
      },
      
      handleLoginSuccess(userData) {
        this.$message.success('登录成功111！')
        // 跳转到首页
        console.log('$router:', this.$router.getRoutes())
        this.$router.push('/home')
      },
      
      handleRegisterSuccess(userData) {
        this.$message.success('注册成功！')
        // 注册成功后自动切换到登录标签页
        this.activeTab = 'login'
        // 填充用户名到登录表单
        if (this.$refs.loginForm) {
          this.$refs.loginForm.setUsername(userData.username)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .login-box {
    width: 100%;
    max-width: 450px;
    background-color: #ffffff;
    border-radius: 8px;
    padding: 40px 30px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
  
  .footer-info {
    margin-top: 30px;
    text-align: center;
    font-size: 12px;
    color: #909399;
  }
  
  .footer-info p {
    margin: 5px 0;
  }
  </style>