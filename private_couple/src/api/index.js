 import axios from 'axios';

const baseUrl = 'http://localhost:8800/';

// login
function loginUser(userData) {
  return axios.post(baseUrl+'login', userData)
}
// item
function getItemList(userData) {
  return axios.post(baseUrl+'item', userData);
}
function postItem(item) {
  return axios.post(baseUrl+'item'+ '/insert', item);
}
function deleteItem(id) {
  return axios.delete(baseUrl+'item'+`/${id}`);
}
function patchUrl(payload) {
  return axios.patch(baseUrl+'item'+`/url/${payload.id}`, {data: {urlText: payload.textArea}});
}
function patchPos(payload) {
  return axios.patch(baseUrl+'item'+`/pos/${payload.id}`, {data: {posText: payload.textArea}});
}
function getCheckedItemList() { 
  return axios.get(baseUrl+'item' + '/list');
}
// course
function getCourseList(userData) {
  return axios.post(baseUrl+'course', userData);
}
function postCourse(course) {
  return axios.post(baseUrl+'course' + '/insert', course)
}
function deleteCourse(name) {
  return axios.delete(baseUrl+'course'+`/${name}`)
}
// start
function getStartList(userData) {
  return axios.post(baseUrl+'start', userData);
}
function replaceStartList(userData) {
  return axios.post(baseUrl+'start' + '/insert', userData);
}
function patchComment(payload) {
  return axios.patch(baseUrl+'start'+`/comment/${payload.id}`, {data: {comment: payload.comment}});
}
function toggleFalseItem(id) {
  return axios.patch(baseUrl+'start'+`/false/${id}`, {data: {completed: false}});
}
function deleteStartItem(id) {
  return axios.delete(baseUrl+'start'+`/${id}`);
}
function patchStartUrl(payload) {
  return axios.patch(baseUrl+'start'+`/url/${payload.id}`, {data: {urlText: payload.textArea}});
}
function patchStartPos(payload) {
  return axios.patch(baseUrl+'start'+`/pos/${payload.id}`, {data: {posText: payload.textArea}});
}
// last
function getLastList(userData) {
  return axios.post(baseUrl+'last', userData);
}
function patchStartItem(userData) {
  return axios.patch(baseUrl+'last/item', userData);
}
function patchStartList(userData) {
  console.log('userData: ',userData)
  return axios.patch(baseUrl+'last/course', userData);
}

export { 
  loginUser,
  getItemList, 
  postItem, 
  deleteItem, 
  patchUrl,
  patchPos,
  getCheckedItemList,
  postCourse,
  getCourseList,
  deleteCourse,
  replaceStartList,
  getStartList,
  patchComment,
  toggleFalseItem,
  deleteStartItem,
  patchStartUrl,
  patchStartPos,
  getLastList,
  patchStartItem,
  patchStartList,
};