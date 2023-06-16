import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store/index'
import axios from 'axios'

//import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  BootstrapVue,
  render: h => h(App),
}).$mount('#app')
