import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store/index'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import { BVToastPlugin } from "bootstrap-vue"

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(BVToastPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  BootstrapVue,
  render: h => h(App),
}).$mount('#app')
