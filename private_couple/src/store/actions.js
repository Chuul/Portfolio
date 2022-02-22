import * as index from '@/api/index.js';
import * as item from '@/api/creating.js';
import * as list from '@/api/list.js';
import * as start from '@/api/start.js';
import * as last from '@/api/last.js';

// LoginView
const LOGIN = async ({ commit }, userData) => {
	try {
		const { data } = await index.loginUser(userData);
		commit('SET_USER_DATA', data);
		return data;
	} catch (error) {
		console.log(error);
	}
};
// CreateView
const FETCH_ITEM_LIST = async context => {
	try {
		const userData = {
			username: context.state.username,
		};
		const { data } = await item.getItemList(userData);
		context.commit('SET_ITEM_LIST', data);
		return data;
	} catch (error) {
		context.commit('SET_ERROR', error.response.data.message);
		return error.response.data.message;
	}
};
const ADD_ITEM = async (context, payload) => {
	const obj = {
		createdBy: context.state.username,
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
		// context.dispatch('FETCH_ITEM_LIST');
		return response;
	} catch (error) {
		console.log(error.response.data.message);
		return error.response.data.message;
	}
};
const PATCH_ITEM_URL = async ({ commit }, payload) => {
	try {
		const response = item.patchUrl(payload);
		commit('SET_ITEM_URL', payload);
		return response;
	} catch (error) {
		console.log(error);
		return error;
	}
};
const PATCH_ITEM_POS = async ({ commit }, payload) => {
	try {
		const response = item.patchPos(payload);
		commit('SET_ITEM_POS', payload);
		return response;
	} catch (error) {
		console.log(error);
		return error;
	}
};
const DELETE_ITEM = async ({ commit }, id) => {
	try {
		const response = item.deleteItem(id);
		commit('SPLICE_ITEM', id);
		return response;
	} catch (error) {
		console.log(error);
		return error;
	}
};
const ADD_COURSE = async (context, payload) => {
	const obj = {
		createdBy: context.state.username,
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
};
// ListView
const FETCH_COURSE_LIST = async context => {
	const userData = {
		email: context.state.email,
		username: context.state.username,
	};
	try {
		const { data } = await list.getCourseList(userData);
		context.commit('SET_COURSE_LIST', data);
	} catch (error) {
		console.log(error);
	}
};
const DELETE_COURSE = async ({ commit }, name) => {
	try {
		const response = await list.deleteCourse(name);
		commit('SPLICE_LIST', name);
		return response;
	} catch (error) {
		console.log(error);
	}
};
const START_COURSE = async (context, list) => {
	const userData = {
		createdBy: context.state.username,
		course: list.course,
	};
	await context.commit('SET_START_COURSE', list.course);
	start.replaceStartList(userData);
};
// StartView
const FETCH_START_LIST = async context => {
	const userData = {
		createdBy: context.state.username,
	};
	try {
		const { data } = await start.getStartList(userData);
		context.commit('SET_START_COURSE', data[0].course);
	} catch (error) {
		console.log(error);
	}
};
const START = async ({ commit }, userData) => {
	try {
		const { data } = await start.getStartList(userData);
		commit('setStartList', data[0]);
		return data;
	} catch (error) {
		console.log(error);
	}
};
const FALSE_ITEM = async ({ dispatch }, id) => {
	await start.toggleFalseItem(id);
	dispatch('FETCH_START_LIST');
};
const PATCH_ITEM_COMMENT = async (context, item) => {
	// DB의 "starts" collection에 저장
	console.log('item: ', item);
	const obj = {
		id: item._id,
		comment: item.comment,
	};
	await start.patchComment(obj);
	// "lasts" collection에 저장
	delete item.completed;
	delete item._id;
	const userData = {
		createdBy: context.state.username,
		item: item,
	};
	await last.patchLastItem(userData);
	context.dispatch('FETCH_START_LIST');
};
const DELETE_START = ({ commit }, id) => {
	commit('SPLICE_START', id);
	start.deleteStartItem(id);
};
const PATCH_START_URL = ({ commit }, obj) => {
	commit('SET_START_URL', obj);
	start.patchStartUrl(obj);
};
const PATCH_START_POS = ({ commit }, obj) => {
	commit('SET_START_POS', obj);
	start.patchStartPos(obj);
};
const STORE_START = (context, comment) => {
	const obj = {
		createdBy: context.state.username,
		course: {
			list: context.state.startList,
			comment: comment,
		},
	};
	last.patchLastList(obj);
};
// LastView
const FETCH_LAST_LIST = async context => {
	try {
		const userData = {
			createdBy: context.state.username,
		};
		const { data } = await last.getLastList(userData);
		context.commit('SET_LAST_LIST', data);
	} catch (error) {
		console.log(error);
	}
};
export {
	LOGIN,
	FETCH_ITEM_LIST,
	ADD_ITEM,
	PATCH_ITEM_URL,
	PATCH_ITEM_POS,
	DELETE_ITEM,
	ADD_COURSE,
	FETCH_COURSE_LIST,
	DELETE_COURSE,
	START_COURSE,
	FETCH_START_LIST,
	START,
	FALSE_ITEM,
	PATCH_ITEM_COMMENT,
	PATCH_START_URL,
	PATCH_START_POS,
	DELETE_START,
	STORE_START,
	FETCH_LAST_LIST,
};
