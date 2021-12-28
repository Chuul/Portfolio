import axios from 'axios';

function getItemList() {
  const url = 'http://localhost:8800/creating';
  return axios.get(url);
}
function postItem(userData) {
  const url = 'http://localhost:8800/creating';
  return axios.post(url, userData);
}
function deleteItem(name) {
  const url = 'http://localhost:8800/creating';
  return axios.delete(url, {name: name});
}
function patchUrl(source) {
  const url = 'http://localhost:8800/creating';
  return axios.patch(url+`/${source.id}`, {id: source.id, urlText: source.urlText});
}

export { getItemList, postItem, deleteItem, patchUrl };