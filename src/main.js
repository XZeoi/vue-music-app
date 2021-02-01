import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import Swiper2, {Navigation, Pagination, Autoplay} from 'swiper'
// import style (>= Swiper 6.x)
import 'swiper/swiper-bundle.css'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Swiper2.use([Navigation, Pagination, Autoplay])

import 'assets/css/style.scss'
import 'assets/iconfont/iconfont.css'

// 全局过滤器
import filters from 'utils/time.js'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
