import * as index from '@/api/index.js';

const state = {
	email: '',
	username: '',
	errorMessage: '',
};

const getters = {
	isLogin: state => {
		return state.username === '';
	},
	checkLogin: state => {
		return state.username === '' ? 'login_cont' : null;
	},
	checkLogin_Name: state => {
		return state.username === '' ? false : true;
	},
	fetchName: state => {
		return state.username;
	},
};

const mutations = {
	SET_USER_DATA: (state, data) => {
		state.username = data.username;
		state.email = data.email;
	},
	LOGOUT_USER: state => {
		state.username = '';
		state.email = '';
	},
	SET_ERROR: (state, data) => {
		state.errorMessage = data;
	},
};

const actions = {
	LOGIN: async ({ commit }, userData) => {
		try {
			const { data } = await index.loginUser(userData);
			commit('SET_USER_DATA', data);
			return data;
		} catch (error) {
			console.log(error);
		}
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
