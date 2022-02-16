// 코스 목록 페이지 관련 API
import { list } from './index.js';

function getCourseList(userData) {
	return list.post('/', userData);
}
function postCourse(userData) {
	return list.post('/insert', userData);
}
function deleteCourse(name) {
	return list.delete(`/${name}`);
}

export { getCourseList, postCourse, deleteCourse };
