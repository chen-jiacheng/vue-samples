<template>
    <div class="register-form">
      <el-form
        ref="registerFormRef"
        :model="form"
        :rules="rules"
        @submit.native.prevent="handleSubmit"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="用户名"
            prefix-icon="el-icon-user"
            size="large"
          />
        </el-form-item>
        
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            placeholder="邮箱"
            prefix-icon="el-icon-message"
            size="large"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            size="large"
            show-password
          />
        </el-form-item>
        
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="确认密码"
            prefix-icon="el-icon-lock"
            size="large"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="success"
            size="large"
            :loading="loading"
            @click="handleSubmit"
            style="width: 100%;"
          >
            {{ loading ? '注册中...' : '注册' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex'
  
  export default {
    name: 'RegisterForm',
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      
      return {
        form: {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { validator: validatePassword, trigger: 'blur' }
          ]
        },
        loading: false
      }
    },
    methods: {
      ...mapActions(['register']),
      
      handleSubmit() {
        this.$refs.registerFormRef.validate(async valid => {
          if (!valid) return
          
          this.loading = true
          
          // 准备注册数据
          const registerData = {
            username: this.form.username,
            email: this.form.email,
            password: this.form.password
          }
          
          try {
            const result = await this.register(registerData)
            
            // 触发成功事件，传递用户数据
            this.$emit('success', result.date)
            
            this.$message.success('注册成功！')
          } catch (error) {
            this.$message.error(
              error.message || '注册失败，请稍后重试'
            )
          } finally {
            this.loading = false
          }
        })
      },
      
      resetForm() {
        this.form = {
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        }
        if (this.$refs.registerFormRef) {
          this.$refs.registerFormRef.resetFields()
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .register-form {
    padding: 20px 0;
  }
  </style>