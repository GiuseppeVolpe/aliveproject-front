import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store/index'
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { FormCheckboxPlugin } from 'bootstrap-vue'
Vue.use(FormCheckboxPlugin)

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  BootstrapVue,
  render: h => h(App),
}).$mount('#app')
