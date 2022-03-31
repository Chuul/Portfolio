import * as last from '@/api/last.js';

const state = {
	lastItemList: [],
	lastCourseList: [],
};

const getters = {
	getLastItemList: state => {
		return state.lastItemList;
	},
	getLastCourseList: state => {
		return state.lastCourseList;
	},
};

const mutations = {
	SET_LAST_LIST: (state, data) => {
		state.lastItemList = data[0].item;
		state.lastCourseList = data[0].course;
	},
};

const actions = {
	FETCH_LAST_LIST: async context => {
		try {
			const userData = {
				createdBy: context.rootState.module_login.username,
			};
			const { data } = await last.getLastList(userData);
			context.commit('SET_LAST_LIST', data);
		} catch (error) {
			console.log(error);
		}
	},
	ADD_LAST_ITEM: async (context, item) => {
		delete item.completed;
		delete item._id;
		const userData = {
			createdBy: context.rootState.module_login.username,
			item: item,
		};
		await last.patchLastItem(userData);
		context.dispatch('FETCH_START_LIST');
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
