// 코스 시작 페이지 관련 API
import { start } from './index.js';

function getStartList(userData) {
	return start.post('/', userData);
}
function replaceStartList(userData) {
	return start.post('/insert', userData);
}
function patchComment(payload) {
	return start.patch(`/comment/${payload.id}`, {
		data: { comment: payload.comment },
	});
}
function toggleFalseItem(id) {
	return start.patch(`/false/${id}`, {
		data: { checked: false },
	});
}
function deleteStartItem(id) {
	return start.delete(`/item/${id}`);
}
function editStartItem(payload) {
	return start.patch(`/name/${payload.id}`, {
		data: { urlText: payload.textArea },
	});
}
function patchStartUrl(payload) {
	return start.patch(`/url/${payload.id}`, {
		data: { urlText: payload.textArea },
	});
}
function patchStartPos(payload) {
	return start.patch(`/pos/${payload.id}`, {
		data: { posText: payload.textArea },
	});
}
function exitCourse(userData) {
	return start.delete(`/exit/${userData}`);
}

export {
	getStartList,
	replaceStartList,
	patchComment,
	toggleFalseItem,
	deleteStartItem,
	editStartItem,
	patchStartUrl,
	patchStartPos,
	exitCourse,
};
