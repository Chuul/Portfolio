import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://localhost:8800/',
});

// login
function loginUser(userData) {
	return instance.post('login', userData);
}
// item
function getItemList(userData) {
	return instance.post('item', userData);
}
function postItem(item) {
	return instance.post('item/insert', item);
}
function deleteItem(id) {
	return instance.delete(`item/${id}`);
}
function patchUrl(payload) {
	return instance.patch(`item/url/${payload.id}`, {
		data: { urlText: payload.textArea },
	});
}
function patchPos(payload) {
	return instance.patch(`item/pos/${payload.id}`, {
		data: { posText: payload.textArea },
	});
}
function getCheckedItemList() {
	return instance.get('item/list');
}
// course
function getCourseList(userData) {
	return instance.post('course', userData);
}
function postCourse(course) {
	return instance.post('course/insert', course);
}
function deleteCourse(name) {
	return instance.delete(`course/${name}`);
}
// start
function getStartList(userData) {
	return instance.post('start', userData);
}
function replaceStartList(userData) {
	return instance.post('start/insert', userData);
}
function patchComment(payload) {
	return instance.patch(`start/comment/${payload.id}`, {
		data: { comment: payload.comment },
	});
}
function toggleFalseItem(id) {
	return instance.patch(`start/false/${id}`, {
		data: { checked: false },
	});
}
function deleteStartItem(id) {
	return instance.delete(`start/${id}`);
}
function patchStartUrl(payload) {
	return instance.patch(`start/url/${payload.id}`, {
		data: { urlText: payload.textArea },
	});
}
function patchStartPos(payload) {
	return instance.patch(`start/pos/${payload.id}`, {
		data: { posText: payload.textArea },
	});
}
// last
function getLastList(userData) {
	return instance.post('last', userData);
}
function patchStartItem(userData) {
	return instance.patch('last/item', userData);
}
function patchStartList(userData) {
	return instance.patch('last/course', userData);
}

export {
	loginUser,
	getItemList,
	postItem,
	deleteItem,
	patchUrl,
	patchPos,
	getCheckedItemList,
	postCourse,
	getCourseList,
	deleteCourse,
	replaceStartList,
	getStartList,
	patchComment,
	toggleFalseItem,
	deleteStartItem,
	patchStartUrl,
	patchStartPos,
	getLastList,
	patchStartItem,
	patchStartList,
};
