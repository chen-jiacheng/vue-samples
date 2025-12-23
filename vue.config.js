const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭 eslint 语法检查
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src')
      }
    }
  },
  // 配置开发服务器
  devServer: {
    proxy: {
      // 代理所有以 '/servlet_samples_war' 开头的请求
      '/servlet_samples_war': {
        target: 'http://localhost:8080', // 后端服务器地址
        changeOrigin: true, // 修改请求头中的Origin为目标地址，用于跨域
        // 可选：如果你不需要重写路径，可以省略 pathRewrite
        // pathRewrite: {
        //   '^/servlet_samples_war': '/servlet_samples_war' // 通常不需要重写
        // }
      }
      // 你可以在这里添加更多代理规则
      // '/api': {
      //   target: 'http://other-server:3000',
      //   changeOrigin: true
      // }
    }
  }
})