import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import Vuelidate from "vuelidate";
import store from './store/store.js'

Vue.config.productionTip = false
Vue.use(Vuelidate);
// set auth header


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
