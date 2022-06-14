import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import {
  Area
} from 'vant';
import Vant, {
  Lazyload,
  Icon,
  NoticeBar
} from 'vant'
import 'vant/lib/index.css'
import '@/assets/css/font/font.css';

import "@/assets/css/base.css";
import store from './store/index'
// import "./rem.js"



Vue.use(Vant)

Vue.use(Area);
Vue.use(Lazyload)
Vue.use(Icon)
Vue.use(NoticeBar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
