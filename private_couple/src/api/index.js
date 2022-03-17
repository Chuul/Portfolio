import axios from 'axios';

// 경로에 따른 인스턴스를 생성해주는 함수
function createInstance(url) {
	return axios.create({
		baseURL: `https://priavate-course.netlify.app/${url}`,
	});
}

const login = createInstance('login');
const creating = createInstance('creating');
const list = createInstance('list');
const start = createInstance('start');
const last = createInstance('last');

// login
function loginUser(userData) {
	return login.post('/', userData);
}

export { login, creating, list, start, last, loginUser };
