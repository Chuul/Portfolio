import Vue from 'vue';
import Vuex from 'vuex';
import persistedstate from 'vuex-persistedstate';
import * as mutations from './mutations';
import * as actions from './actions';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		email: '',
		username: '',
		itemList: [],
		checkedList: [],
		courseList: [],
		startList: [],
		lastItemList: [],
		lastCourseList: [],
		errorMessage: '',
	},
	mutations,
	actions,
	plugins: [
		persistedstate({
			paths: ['username', 'email', 'startList'],
		}),
	],
});
