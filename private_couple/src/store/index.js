import Vue from 'vue';
import Vuex from 'vuex';
import module_login from './module_login.js';
import module_creating from './module_creating.js';
import module_list from './module_list.js';
import module_start from './module_start.js';
import module_last from './module_last.js';
import persistedstate from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		module_login,
		module_creating,
		module_list,
		module_start,
		module_last,
	},
	plugins: [
		persistedstate({
			paths: ['module_login', 'module_start'],
		}),
	],
});
