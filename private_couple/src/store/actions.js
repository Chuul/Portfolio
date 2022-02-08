import {
	loginUser,
	postItem,
	getItemList,
	deleteItem,
	patchUrl,
	patchPos,
	postCourse,
	getCourseList,
	deleteCourse,
	replaceStartList,
	getStartList,
	toggleFalseItem,
	patchComment,
	patchStartItem,
	patchStartUrl,
	patchStartPos,
	deleteStartItem,
	patchStartList,
	getLastList,
} from '@/api/index';

// LoginView
const LOGIN = async ({ commit }, userData) => {
	try {
		const { data } = await loginUser(userData);
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
			email: context.state.email,
		};
		const { data } = await getItemList(userData);
		context.commit('SET_ITEM_LIST', data);
		return data;
	} catch (error) {
		context.commit('SET_ERROR', error.response.data.message);
		return error.response.data.message;
	}
};
const ADD_ITEM = async (context, payload) => {
	const obj = {
		createdBy: context.state.email,
		category: payload.category,
		name: payload.name,
		checked: false,
		url: '',
		pos: '',
		pos_latlng: '',
	};
	try {
		const response = await postItem(obj);
		console.log('response: ', response);
		context.dispatch('FETCH_ITEM_LIST');
		return response;
	} catch (error) {
		console.log('error: ', error.response.data.message);
		return error.response.data.message;
	}
	// postItem(obj)
	// 	.then(response => {
	// 		console.log('response in action : ', response);
	// 		context.dispatch('FETCH_ITEM_LIST');
	// 		return response;
	// 	})
	// 	.catch(error => {
	// 		console.log('error in action: ', error);
	// 		return error.response.data.message;
	// 	});
};
const TOGGLE_ITEM = async (context, item) => {
	context.commit('SET_TOGGLE_ITEM', item);
	context.dispatch('FETCH_ITEM_LIST');
};
const PATCH_ITEM_URL = async ({ commit }, obj) => {
	try {
		commit('SET_ITEM_URL', obj);
		patchUrl(obj);
	} catch (error) {
		console.log(error);
		return error;
	}
};
const PATCH_ITEM_POS = async ({ commit }, obj) => {
	try {
		commit('SET_ITEM_POS', obj);
		patchPos(obj);
	} catch (error) {
		console.log(error);
		return error;
	}
};
const DELETE_ITEM = async ({ commit }, id) => {
	try {
		commit('SPLICE_ITEM', id);
		deleteItem(id);
	} catch (error) {
		console.log(error);
		return error;
	}
};
const STORE_COURSE = (context, list) => {
	const obj = {
		createdBy: context.state.email,
		course: list,
	};
	postCourse(obj);
	context.commit('SET_ITEM_FALSE', list);
};
// ListView
const FETCH_COURSE_LIST = async context => {
	const userData = {
		email: context.state.email,
		username: context.state.username,
	};
	try {
		const { data } = await getCourseList(userData);
		context.commit('SET_COURSE_LIST', data);
	} catch (error) {
		console.log(error);
	}
};
const DELETE_COURSE = async (context, item) => {
	try {
		deleteCourse(item);
		context.dispatch('FETCH_COURSE_LIST');
	} catch (error) {
		console.log(error);
	}
};
const START_COURSE = async (context, list) => {
	const userData = {
		createdBy: context.state.email,
		course: list.course,
	};
	context.commit('SET_START_COURSE', list.course);
	replaceStartList(userData);
};
// StartView
const FETCH_START_LIST = async context => {
	const userData = {
		createdBy: context.state.email,
	};
	try {
		const { data } = await getStartList(userData);
		context.commit('SET_START_COURSE', data[0].course);
	} catch (error) {
		console.log(error);
	}
};
const START = async ({ commit }, userData) => {
	try {
		const { data } = await getStartList(userData);
		commit('setStartList', data[0]);
		return data;
	} catch (error) {
		console.log(error);
	}
};
const FALSE_ITEM = async ({ dispatch }, id) => {
	await toggleFalseItem(id);
	dispatch('FETCH_START_LIST');
};
const PATCH_ITEM_COMMENT = async (context, item) => {
	// "starts" collection에 저장
	const obj = {
		id: item._id,
		comment: item.comment,
	};
	await patchComment(obj);
	// "lasts" collection에 저장
	delete item.completed;
	delete item._id;
	const userData = {
		createdBy: context.state.email,
		item: item,
	};
	await patchStartItem(userData);
	context.dispatch('FETCH_START_LIST');
};
const DELETE_START = ({ commit }, id) => {
	commit('SPLICE_START', id);
	deleteStartItem(id);
};
const PATCH_START_URL = ({ commit }, obj) => {
	commit('SET_START_URL', obj);
	patchStartUrl(obj);
};
const PATCH_START_POS = ({ commit }, obj) => {
	commit('SET_START_POS', obj);
	patchStartPos(obj);
};
const STORE_START = (context, comment) => {
	const obj = {
		createdBy: context.state.email,
		course: {
			list: context.state.startList,
			comment: comment,
		},
	};
	patchStartList(obj);
};
// LastView
const FETCH_LAST_LIST = async context => {
	try {
		const userData = {
			createdBy: context.state.email,
		};
		const { data } = await getLastList(userData);
		context.commit('SET_LAST_LIST', data);
	} catch (error) {
		console.log(error);
	}
};
export {
	LOGIN,
	FETCH_ITEM_LIST,
	ADD_ITEM,
	TOGGLE_ITEM,
	PATCH_ITEM_URL,
	PATCH_ITEM_POS,
	DELETE_ITEM,
	STORE_COURSE,
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
