// 코스 생성 페이지 관련 API
import { creating } from './index.js';

function getItemList(userData) {
	return creating.post('/', userData);
}
function filterItemList(userData) {
	return creating.post('/filter', userData);
}
function postItem(userData) {
	console.log('2. api: ', userData);
	return creating.post('/insert', userData);
}
function patchUrl(payload) {
	return creating.patch(`/url/${payload.id}`, {
		data: { urlText: payload.textArea },
	});
}
function patchPos(payload) {
	return creating.patch(`/pos/${payload.id}`, {
		data: { posText: payload.textArea },
	});
}
function deleteItem(id) {
	return creating.delete(`/${id}`);
}
function getCheckedItemList() {
	return creating.get('/list');
}

export {
	getItemList,
	filterItemList,
	postItem,
	deleteItem,
	patchUrl,
	patchPos,
	getCheckedItemList,
};
