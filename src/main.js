import Vue from 'vue'
import router from './router'

import VueResource from 'vue-resource'
import VueApexCharts from 'vue-apexcharts'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.component('apexchart', VueApexCharts)
Vue.use(VueMaterial)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
