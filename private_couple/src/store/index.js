import Vue from 'vue';
import Vuex from 'vuex';
import persistedstate from 'vuex-persistedstate';
import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';
import module_creating from './module_creating.js';
import module_list from './module_list.js';
import module_start from './module_start.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		module_creating,
		module_list,
		module_start,
	},
	state: {
		email: '',
		username: '',
		// itemList: [],
		// checkedList: [],
		// courseList: [],
		// startList: [],
		lastItemList: [],
		lastCourseList: [],
		errorMessage: '',
	},
	getters,
	mutations,
	actions,
	plugins: [
		persistedstate({
			paths: ['username', 'email', 'startList'],
		}),
	],
});
