import axios from 'axios';

function getItemList() {
  const url = 'http://localhost:8800/creating';
  return axios.get(url);
}
function postItem(userData) {
  const url = 'http://localhost:8800/creating';
  return axios.post(url, userData);
}
function deleteItem(id) {
  const url = 'http://localhost:8800/creating';
  return axios.delete(url+`/${id}`);
}
function patchUrl(payload) {
  const url = 'http://localhost:8800/creating';
  return axios.patch(url+`/${payload.id}`, {data: {urlText: payload.urlText}});
}

export { 
  getItemList, 
  postItem, 
  deleteItem, 
  patchUrl 
};