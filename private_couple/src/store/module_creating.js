import * as item from '@/api/creating.js';
import * as list from '@/api/list.js';

const state = {
	itemList: [],
	checkedList: [],
};

const getters = {
	getItemList: state => {
		return state.itemList;
	},
	getCheckedList: state => {
		return state.checkedList;
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
				} else {
					list[i].checked = true;
					state.checkedList.push(item);
				}
			}
		}
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
};

const actions = {
	FETCH_ITEM_LIST: async context => {
		try {
			const userData = {
				username: context.rootState.username,
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
				username: context.rootState.username,
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
			createdBy: context.rootState.username,
			category: payload.category,
			name: payload.name,
			checked: false,
			url: '',
			pos: '',
			pos_latlng: '',
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
			const response = item.patchUrl(payload);
			commit('SET_ITEM_URL', payload);
			return response;
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	PATCH_ITEM_POS: async ({ commit }, payload) => {
		try {
			const response = item.patchPos(payload);
			commit('SET_ITEM_POS', payload);
			return response;
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	DELETE_ITEM: async ({ commit }, id) => {
		try {
			const response = item.deleteItem(id);
			commit('SPLICE_ITEM', id);
			return response;
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	ADD_COURSE: async (context, payload) => {
		const obj = {
			createdBy: context.rootState.username,
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
