import {getUserInfoApi, login,getUserDetail} from '@/api/user.js'
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
   async getToken (context, payload) {
      const res = await login(payload)
      console.log(res)
      context.commit('setToken',res)
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
    }
  },
}

