// 코스 생성 페이지 관련 API
import { item } from './index.js';

function getItemList(userData) {
	return item.post('/', userData);
}
function postItem(userData) {
	return item.post('/insert', userData);
}
function patchUrl(payload) {
	return item.patch(`/url/${payload.id}`, {
		data: { urlText: payload.textArea },
	});
}
function patchPos(payload) {
	return item.patch(`/pos/${payload.id}`, {
		data: { posText: payload.textArea },
	});
}
function deleteItem(id) {
	return item.delete(`/${id}`);
}
function getCheckedItemList() {
	return item.get('/list');
}

export {
	getItemList,
	postItem,
	deleteItem,
	patchUrl,
	patchPos,
	getCheckedItemList,
};
