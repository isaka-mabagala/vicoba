import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLocalforage from '@storage-js/vue-localforage'

import 'popper.js'
import 'bootstrap'
import './directive'
import './filter'

import './assets/css/app.scss'

Vue.use(VueLocalforage)

Vue.config.productionTip = false

Vue.prototype.$eventHub = new Vue() // Global event bus
Vue.prototype.$os = require('os')
Vue.prototype.$toastr = require('toastr')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
