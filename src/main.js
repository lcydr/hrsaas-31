import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import *as directives from '@/directives'

import components from '@/components'

Vue.use(components)
// 打印
import Print from 'vue-print-nb'
Vue.use(Print);
// 过滤器封装
import *as filters from '@/filters'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// mock假数据
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
// 参数1:自定义指令的名字：不需要+v-
// 参数2:是配置对象

for (let key in directives) {
  Vue.directive(key,directives[key])
}
// 统一注册过滤器
for (let key in filters) {
  Vue.filter(key,filters[key])
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
