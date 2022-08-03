import {getUserInfoApi, login,getUserDetail} from '@/api/user.js'
import setTokenTime from '@/utils/auth.js'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo:{}
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setUserInfo (state, payload) {
      state.userInfo = payload
    }
  }, 
  actions: {
    // 登录获取token
   async getToken (context, payload) {
      const res = await login(payload)
      console.log(res)
      // 发送请求得来的
      context.commit('setToken', res)
      setTokenTime()
    },
    // 获取用户信息
    async getUserInfo (context) {
      const userBaseInfo = await getUserInfoApi()
      const userInfo = await getUserDetail(userBaseInfo.userId)
      context.commit('setUserInfo',{...userBaseInfo,...userInfo})
      // context.commit('setUserInfo',res)
      // console.log(res)
      // setTimeout(() => {
      //   const res = { name: '张三' }
      //   context.commit('setUserInfo',res)
      // },1000)
    },
    // 退出
    logout (context) {
      context.commit('setToken', '')
      context.commit('setUserInfo',{})
    }
  },
}

