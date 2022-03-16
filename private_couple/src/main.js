import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/index.js';

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	router,
	store,
}).$mount('#app');

window.Kakao.init('69d01f6ae97ecb427d72e87a37952804');
