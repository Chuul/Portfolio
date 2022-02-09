// 이전 코스 페이지 관련 API
import { last } from './index.js';

function getLastList(userData) {
	return last.post('/', userData);
}
function patchLastItem(userData) {
	return last.patch('/item', userData);
}
function patchLastList(userData) {
	return last.patch('/course', userData);
}

export { getLastList, patchLastItem, patchLastList };
