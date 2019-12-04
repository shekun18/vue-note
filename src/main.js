// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './styles/reset.css'
import './styles/main.css'
import 'element-ui/lib/theme-chalk/index.css'

import ElementUI from 'element-ui'
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.use(ElementUI, { size: 'small' })
Vue.config.productionTip = false

import Auth from '@/apis/auth'

// 图表的相关配置
import VCharts from 'v-charts'
Vue.use(VCharts)
import VeLine from 'v-charts/lib/line.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VeRing from 'v-charts/lib/ring.common'
Vue.component(VeLine.name, VeLine)
Vue.component(VeHistogram.name, VeHistogram)
Vue.component(VeRing.name, VeRing)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  Auth.getInfo().then(res => {
    // 假如用户没有登录
    if (!res.isLogin && to.path !== "/login") {
      router.push("/login")
    }
  }).catch(err => {
    router.push("/login")
  })

  next()
})
