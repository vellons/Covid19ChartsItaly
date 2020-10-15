import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.component('apexchart', VueApexCharts)

new Vue({
  render: h => h(App),
}).$mount('#app')
