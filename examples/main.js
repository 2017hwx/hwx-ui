import Vue from 'vue'
import App from './App.vue'
import hwx_ui from "../packages";

Vue.config.productionTip = false
Vue.use(hwx_ui)
new Vue({
  render: h => h(App),
}).$mount('#app')
