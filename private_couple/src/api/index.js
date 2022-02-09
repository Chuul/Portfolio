import axios from 'axios';

// 경로에 따른 인스턴스를 생성해주는 함수
function createInstance(url) {
	return axios.create({
		baseURL: `http://localhost:8800/${url}`,
	});
}

const login = createInstance('login');
const item = createInstance('item');
const list = createInstance('course');
const start = createInstance('start');
const last = createInstance('last');

// login
function loginUser(userData) {
	return login.post('/', userData);
}

export { login, item, list, start, last, loginUser };
