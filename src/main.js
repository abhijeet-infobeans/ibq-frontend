import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import './registerServiceWorker'
import GlobalStorePlugin from './globalStorePlugin'
import axios from 'axios'
import ENV_PARAMS from './config/envparams'
import store from "@/store/store";

/**
 * Configure axios
 */
// axios.defaults.withCredentials = true
axios.defaults.baseURL = ENV_PARAMS.BACKEND_BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.interceptors.request.use(
    config => {
      // modify headers
      if (store.state.AuthModule.token) {
        // exclude Authorization header to external API calls
        config.headers.common['Authorization'] = `Bearer ${store.state.AuthModule.token}`
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
)


// Use Global plugin
Vue.use(GlobalStorePlugin)

Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
