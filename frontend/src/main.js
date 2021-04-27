// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import FeatherIcon from './components/FeatherIcon.vue'
import vSelect from 'vue-select'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../static/main.css'
import 'vue-select/dist/vue-select.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(FeatherIcon)
Vue.component('v-select', vSelect)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
