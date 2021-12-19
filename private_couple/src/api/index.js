import axios from 'axios';

function addItem(userData) {
  const url = 'http://localhost:3000/create/add';
  return axios.post(url, userData);
}

export { addItem };