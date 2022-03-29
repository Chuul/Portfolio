import * as list from '@/api/list.js';
import * as start from '@/api/start.js';

const state = {
	courseList: [],
};

const getters = {
	getCourseList: state => {
		return state.courseList;
	},
};

const mutations = {
	SET_COURSE_LIST: (state, list) => {
		state.courseList = list;
	},
	SPLICE_LIST: (state, name) => {
		for (let i = 0; i < state.courseList.length; i++) {
			if (state.courseList[i].name === name) {
				state.courseList.splice(i, 1);
				return;
			}
		}
	},
};

const actions = {
	FETCH_COURSE_LIST: async context => {
		const userData = {
			email: context.rootState.email,
			username: context.rootState.username,
		};
		try {
			const { data } = await list.getCourseList(userData);
			context.commit('SET_COURSE_LIST', data);
		} catch (error) {
			console.log(error);
		}
	},
	DELETE_COURSE: async ({ commit }, name) => {
		try {
			const response = await list.deleteCourse(name);
			commit('SPLICE_LIST', name);
			return response;
		} catch (error) {
			console.log(error);
		}
	},
	START_COURSE: async (context, list) => {
		const userData = {
			createdBy: context.rootState.username,
			course: list.course,
		};
		context.rootState.module_start.startList = list.course;
		start.replaceStartList(userData);
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
};
