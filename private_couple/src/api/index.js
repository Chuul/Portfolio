import axios from 'axios';

function createInstance(url) {
	return axios.create({
		baseURL: `https://private-course.herokuapp.com/${url}`,
		// baseURL: `http://localhost:8800/${url}`,
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
