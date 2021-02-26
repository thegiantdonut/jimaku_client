import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.config.productionTip = false

const app = new Vue({
  vuetify: new Vuetify(),
  router,
  components: {App},
  template: '<App/>'
})
app.$mount('#app')
