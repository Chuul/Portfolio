import axios from 'axios';

function postItem(userData) {
  const url = 'http://localhost:8800/creating';
  return axios.post(url, userData);
}

function getItemList() {
  const url = 'http://localhost:8800/creating';
  return axios.get(url);
}

export { postItem, getItemList };