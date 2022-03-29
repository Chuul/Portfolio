import * as index from '@/api/index.js';
// import * as item from '@/api/creating.js';
// import * as list from '@/api/list.js';
// import * as start from '@/api/start.js';
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
// ListView
// const FETCH_COURSE_LIST = async context => {
// 	const userData = {
// 		email: context.state.email,
// 		username: context.state.username,
// 	};
// 	try {
// 		const { data } = await list.getCourseList(userData);
// 		context.commit('SET_COURSE_LIST', data);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// const DELETE_COURSE = async ({ commit }, name) => {
// 	try {
// 		const response = await list.deleteCourse(name);
// 		commit('SPLICE_LIST', name);
// 		return response;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// const START_COURSE = async (context, list) => {
// 	const userData = {
// 		createdBy: context.state.username,
// 		course: list.course,
// 	};
// 	await context.commit('SET_START_COURSE', list.course);
// 	start.replaceStartList(userData);
// };
// StartView
// const FETCH_START_LIST = async context => {
// 	const userData = {
// 		createdBy: context.state.username,
// 	};
// 	try {
// 		const { data } = await start.getStartList(userData);
// 		context.commit('SET_START_COURSE', data[0].course);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// const FALSE_ITEM = async ({ dispatch }, id) => {
// 	await start.toggleFalseItem(id);
// 	dispatch('FETCH_START_LIST');
// };
// const PATCH_ITEM_COMMENT = async (context, item) => {
// 	try {
// 		const obj = {
// 			id: item._id,
// 			comment: item.comment,
// 		};
// 		await start.patchComment(obj);
// 		context.commit('EDIT_START_CHECKED', item._id);
// 		context.dispatch('ADD_LAST_ITEM', item);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// const EDIT_START_ITEM = async ({ commit }, obj) => {
// 	try {
// 		await start.editStartItem(obj);
// 		commit('EDIT_START_NAME', obj);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// const PATCH_START_POS = async ({ commit }, obj) => {
// 	try {
// 		await start.patchStartPos(obj);
// 		commit('SET_START_POS', obj);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// const PATCH_START_URL = async ({ commit }, obj) => {
// 	try {
// 		await start.patchStartUrl(obj);
// 		commit('SET_START_URL', obj);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// const DELETE_START_ITEM = async ({ commit }, id) => {
// 	try {
// 		await start.deleteStartItem(id);
// 		commit('SPLICE_START', id);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// const STORE_START = async (context, comment) => {
// 	try {
// 		let list = context.state.startList;
// 		let arr = [];
// 		for (let i = 0; i < list.length; i++) {
// 			if (list[i].checked === true) {
// 				arr.push(list[i]);
// 			}
// 		}
// 		const obj = {
// 			createdBy: context.state.username,
// 			course: {
// 				list: arr,
// 				comment: comment,
// 			},
// 		};
// 		const user = context.state.username;
// 		// 코스 평가 DB통신-> stata 비우기 -> 코스 시작 DB통신
// 		await last.patchLastList(obj);
// 		context.commit('EXIT_START_COURSE');
// 		const response = await start.exitCourse(user);
// 		return response;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// const EXIT_START = async context => {
// 	const user = context.state.username;
// 	try {
// 		await start.exitCourse(user);
// 		context.commit('EXIT_START_COURSE');
// 		return;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
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
const ADD_LAST_ITEM = async (context, item) => {
	delete item.completed;
	delete item._id;
	const userData = {
		createdBy: context.state.username,
		item: item,
	};
	await last.patchLastItem(userData);
	context.dispatch('FETCH_START_LIST');
};
export {
	LOGIN,
	// // FETCH_ITEM_LIST,
	// FILTER_ITEM,
	// ADD_ITEM,
	// PATCH_ITEM_URL,
	// PATCH_ITEM_POS,
	// DELETE_ITEM,
	// ADD_COURSE,
	// FETCH_COURSE_LIST,
	// DELETE_COURSE,
	// START_COURSE,
	// FETCH_START_LIST,
	// FALSE_ITEM,
	// PATCH_ITEM_COMMENT,
	// EXIT_START,
	// EDIT_START_ITEM,
	// PATCH_START_URL,
	// PATCH_START_POS,
	// DELETE_START_ITEM,
	// STORE_START,
	FETCH_LAST_LIST,
	ADD_LAST_ITEM,
};
