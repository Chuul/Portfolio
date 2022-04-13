import * as item from '@/api/creating.js';
import * as list from '@/api/list.js';

const state = {
	itemList: [],
	checkedList: [],
	errorMessage: '',
};

const getters = {
	getItemList: state => {
		return state.itemList;
	},
	getCheckedList: state => {
		return state.checkedList;
	},
	getItemListCheck: state => {
		return state.itemList.length > 0 ? true : false;
	},
};

const mutations = {
	SET_ITEM_LIST: (state, list) => {
		state.itemList = list;
	},
	SET_ITEM: (state, item) => {
		state.itemList.push(item);
	},
	SET_TOGGLE_ITEM: (state, item) => {
		let list = state.itemList;
		// state.checkedList에 I/O
		function toggleChecked(itemName) {
			let checkList = state.checkedList;
			for (let i = 0; i < checkList.length; i++) {
				if (checkList[i].name === itemName) {
					checkList.splice(i, 1);
					return;
				}
			}
		}
		// state.itemList에 I/O
		for (let i = 0; i < list.length; i++) {
			if (item.name === list[i].name) {
				if (list[i].checked === true) {
					list[i].checked = false;
					toggleChecked(list[i].name);
					return;
				} else {
					list[i].checked = true;
					state.checkedList.push({ ...item });
					return;
				}
			}
		}
	},
	SET_CLEAR_CHECKED_LIST: state => {
		state.checkedList = [];
	},
	SET_ITEM_URL: (state, obj) => {
		for (let i = 0; i < state.itemList.length; i++) {
			if (state.itemList[i]._id === obj.id) {
				state.itemList[i].url = obj.textArea;
				return;
			}
		}
	},
	SET_ITEM_POS: (state, obj) => {
		for (let i = 0; i < state.itemList.length; i++) {
			if (state.itemList[i]._id === obj.id) {
				state.itemList[i].pos = obj.textArea;
				return;
			}
		}
	},
	SPLICE_ITEM: (state, id) => {
		for (let i = 0; i < state.itemList.length; i++) {
			if (state.itemList[i]._id === id) {
				state.itemList.splice(i, 1);
				return;
			}
		}
	},
	SET_ITEM_FALSE: (state, course) => {
		for (let i = 0; i < course.length; i++) {
			for (let j = 0; j < state.itemList.length; j++) {
				if (state.itemList[j].name === course[i].name) {
					state.itemList[j].checked = false;
				}
			}
		}
		state.checkedList = [];
	},
	SET_ERROR: (state, data) => {
		state.errorMessage = data;
	},
};

const actions = {
	FETCH_ITEM_LIST: async context => {
		try {
			const userData = {
				username: context.rootState.module_login.username,
			};
			const { data } = await item.getItemList(userData);
			context.commit('SET_ITEM_LIST', data);
			return data;
		} catch (error) {
			context.commit('SET_ERROR', error.response.data.message);
			return error.response.data.message;
		}
	},
	FILTER_ITEM: async (context, name) => {
		try {
			if (name === '전체') {
				return context.dispatch('FETCH_ITEM_LIST');
			}
			const userData = {
				username: context.rootState.module_login.username,
				category: name,
			};
			const { data } = await item.filterItemList(userData);
			context.commit('SET_ITEM_LIST', data);
			return data;
		} catch (error) {
			context.commit('SET_ERROR', error.response.data.message);
			return error.response.data.message;
		}
	},
	ADD_ITEM: async (context, payload) => {
		const obj = {
			createdBy: context.rootState.module_login.username,
			category: payload.category,
			name: payload.name,
			checked: false,
			url: '',
			pos: '',
		};
		try {
			const response = await item.postItem(obj);
			context.commit('SET_ITEM', obj);
			return response;
		} catch (error) {
			console.log(error.response.data.message);
			return error.response.data.message;
		}
	},
	PATCH_ITEM_URL: async ({ commit }, payload) => {
		try {
			const response = await item.patchUrl(payload);
			commit('SET_ITEM_URL', payload);
			return response;
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	PATCH_ITEM_POS: async ({ commit }, payload) => {
		try {
			const response = await item.patchPos(payload);
			commit('SET_ITEM_POS', payload);
			return response;
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	DELETE_ITEM: async ({ commit }, id) => {
		try {
			const response = await item.deleteItem(id);
			commit('SPLICE_ITEM', id);
			return response;
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	ADD_COURSE: async (context, payload) => {
		const obj = {
			createdBy: payload[0].createdBy,
			course: payload,
		};
		try {
			const response = await list.postCourse(obj);
			context.dispatch('FETCH_ITEM_LIST');
			context.commit('SET_ITEM_FALSE', payload);
			return response;
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
