// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getTokenTime } from '@/utils/auth.js'
import router from '@/router'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  
}) // 创建一个axios的实例
service.interceptors.request.use(async (config) => {
  // 当前请求的配置
  if (store.state.user.token) {
    const currentTime = Date.now()
    const tokenTime = getTokenTime()
    const timeout = 10 * 1000
    if (currentTime - tokenTime > timeout) {
      // 判断token是否过期,过期跳转登录页
      console.log('跳转登录页')
     await store.dispatch('user/logout')
      router.push('/login')
      return promise.reject(new Error('登录过期'))
    } else {
      // token 没有过期在携带
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
    
  }
  return config
}) // 请求拦截器
service.interceptors.response.use(
  (res) => {
    // 请求成功的函数
    const { success, data, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message)) 
  },
 async function (error) {
    // 对响应错误做点什么
    if (error?.request?.status === 401) {
      Message.error('登录过期')
      await store.dispatch('user/logout')
      router.push('login')
    } else {
      Message.error(error.message)
    }
    // Message.error('123')
    return Promise.reject(error)
  }
) // 响应拦截器
export default service // 导出axios实例