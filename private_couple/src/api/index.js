import axios from 'axios';

const baseUrl = 'http://localhost:8800/';

function getItemList() {
  return axios.get(baseUrl+'item');
}
function toggleItem(id) {
  return axios.patch(baseUrl+'item'+`/checked/${id}`);
}
function postItem(item) {
  return axios.post(baseUrl+'item', item);
}
function deleteItem(id) {
  return axios.delete(baseUrl+'item'+`/${id}`);
}
function patchUrl(payload) {
  return axios.patch(baseUrl+'item'+`/url/${payload.id}`, {data: {urlText: payload.urlText}});
}
function patchPos(payload) {
  return axios.patch(baseUrl+'item'+`/pos/${payload.id}`, {data: {posText: payload.posText}});
}
function getCheckedItemList() {
  return axios.get(baseUrl+'item' + '/list');
}
function postCourse(course) {
  console.log('course: ', course);
  return axios.post(baseUrl+'course', course)
}

export { 
  getItemList, 
  postItem, 
  deleteItem, 
  patchUrl,
  patchPos,
  toggleItem,
  getCheckedItemList,
  postCourse 
};