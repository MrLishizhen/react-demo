import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  resolve:{
    // 路径别名
    alias:{
      "@":path.resolve(__dirname,'./src')//配置@别名
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    // 是否开启 https
    https: false,
  },
})
