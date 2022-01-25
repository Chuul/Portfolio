import Vue from 'vue';
import App from './App.vue';
import { router } from './router/index.js'
import { store } from './store/index.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');

window.Kakao.init('59950035b359511b00edf96f7c7e9261');