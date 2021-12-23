import axios from 'axios';

function fetchItem(userData) {
  const url = 'http://localhost:8800/creating/add';
  return axios.post(url, userData);
}

function fetchItemList() {
  const url = 'http://localhost:8800/creating';
  return axios.get(url);
}

export { fetchItem, fetchItemList };