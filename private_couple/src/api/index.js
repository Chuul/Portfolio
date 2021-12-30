import axios from 'axios';

const baseUrl = 'http://localhost:8800/creating';

function getItemList() {
  return axios.get(baseUrl);
}
function toggleItem(id) {
  return axios.patch(baseUrl+`/checked/${id}`);
}
function postItem(userData) {
  return axios.post(baseUrl, userData);
}
function deleteItem(id) {
  return axios.delete(baseUrl+`/${id}`);
}
function patchUrl(payload) {
  return axios.patch(baseUrl+`/url/${payload.id}`, {data: {urlText: payload.urlText}});
}
function patchPos(payload) {
  return axios.patch(baseUrl+`/pos/${payload.id}`, {data: {posText: payload.posText}});
}

export { 
  getItemList, 
  postItem, 
  deleteItem, 
  patchUrl,
  patchPos,
  toggleItem 
};