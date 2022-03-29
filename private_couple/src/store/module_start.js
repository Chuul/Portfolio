import * as start from '@/api/start.js';
import * as last from '@/api/last.js';

const state = {
	startList: [],
};

const getters = {
	getStartList: state => {
		return state.startList;
	},
	checkStartList: state => {
		return state.startList.length === 0 ? 'before_start' : 'proceeding_start';
	},
};

const mutations = {
	EDIT_START_CHECKED: (state, id) => {
		let startList = state.startList;
		for (let i = 0; i < startList.length; i++) {
			if (startList[i]._id === id) {
				startList[i].checked = true;
				return;
			}
		}
	},
	EDIT_START_NAME: (state, obj) => {
		for (let i = 0; i < state.startList.length; i++) {
			if (state.startList[i]._id === obj.id) {
				state.startList[i].name = obj.textArea;
				return;
			}
		}
	},
	SET_START_URL: (state, obj) => {
		for (let i = 0; i < state.startList.length; i++) {
			if (state.startList[i]._id === obj.id) {
				state.startList[i].url = obj.textArea;
				return;
			}
		}
	},
	SET_START_POS: (state, obj) => {
		for (let i = 0; i < state.startList.length; i++) {
			if (state.startList[i]._id === obj.id) {
				state.startList[i].pos = obj.textArea;
				return;
			}
		}
	},
	SPLICE_START: (state, id) => {
		for (let i = 0; i < state.startList.length; i++) {
			if (state.startList[i]._id === id) {
				state.startList.splice(i, 1);
				return;
			}
		}
	},
	EXIT_START_COURSE: state => {
		state.startList = [];
	},
};

const actions = {
	FETCH_START_LIST: async context => {
		const userData = {
			createdBy: context.rootState.username,
		};
		try {
			const { data } = await start.getStartList(userData);
			context.commit('SET_START_COURSE', data[0].course);
		} catch (error) {
			console.log(error);
		}
	},
	FALSE_ITEM: async ({ dispatch }, id) => {
		await start.toggleFalseItem(id);
		dispatch('FETCH_START_LIST');
	},
	PATCH_ITEM_COMMENT: async (context, item) => {
		try {
			const obj = {
				id: item._id,
				comment: item.comment,
			};
			await start.patchComment(obj);
			context.commit('EDIT_START_CHECKED', item._id);
			context.dispatch('ADD_LAST_ITEM', item);
		} catch (error) {
			console.log(error);
		}
	},
	EDIT_START_ITEM: async ({ commit }, obj) => {
		try {
			await start.editStartItem(obj);
			commit('EDIT_START_NAME', obj);
		} catch (error) {
			console.log(error);
		}
	},
	PATCH_START_POS: async ({ commit }, obj) => {
		try {
			await start.patchStartPos(obj);
			commit('SET_START_POS', obj);
		} catch (error) {
			console.log(error);
		}
	},
	PATCH_START_URL: async ({ commit }, obj) => {
		try {
			await start.patchStartUrl(obj);
			commit('SET_START_URL', obj);
		} catch (error) {
			console.log(error);
		}
	},
	DELETE_START_ITEM: async ({ commit }, id) => {
		try {
			await start.deleteStartItem(id);
			commit('SPLICE_START', id);
		} catch (error) {
			console.log(error);
		}
	},
	STORE_START: async (context, comment) => {
		try {
			let list = context.state.startList;
			let arr = [];
			for (let i = 0; i < list.length; i++) {
				if (list[i].checked === true) {
					arr.push(list[i]);
				}
			}
			const obj = {
				createdBy: context.rootState.username,
				course: {
					list: arr,
					comment: comment,
				},
			};
			const user = context.rootState.username;
			// 코스 평가 DB통신-> stata 비우기 -> 코스 시작 DB통신
			await last.patchLastList(obj);
			context.commit('EXIT_START_COURSE');
			const response = await start.exitCourse(user);
			return response;
		} catch (error) {
			console.log(error);
		}
	},
	EXIT_START: async context => {
		const user = context.rootState.username;
		try {
			await start.exitCourse(user);
			context.commit('EXIT_START_COURSE');
			return;
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
