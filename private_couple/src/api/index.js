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
  return axios.patch(baseUrl+'item'+`/url/${payload.id}`, {data: {urlText: payload.urlText}});
}
function patchPos(payload) {
  return axios.patch(baseUrl+'item'+`/pos/${payload.id}`, {data: {posText: payload.posText}});
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
function replaceStartCourse(userData) {
  return axios.post(baseUrl+'start' + '/insert', userData);
}
function patchComment(payload) {
  return axios.patch(baseUrl+'start'+`/comment/${payload.id}`, {data: {comment: payload.commentText}});
}
function toggleTrueItem(id) {
  return axios.patch(baseUrl+'start'+`/true/${id}`, {data: {completed: true}});
}
function toggleFalseItem(id) {
  return axios.patch(baseUrl+'start'+`/false/${id}`, {data: {completed: false}});
}
function deleteStartItem(id) {
  return axios.delete(baseUrl+'start'+`/${id}`);
}
function patcStarthUrl(payload) {
  return axios.patch(baseUrl+'start'+`/url/${payload.id}`, {data: {urlText: payload.urlText}});
}
function patchStartPos(payload) {
  return axios.patch(baseUrl+'start'+`/pos/${payload.id}`, {data: {posText: payload.posText}});
}
// last
function getLastList(userData) {
  return axios.post(baseUrl+'last', userData);
}
function patchStartItem(userData) {
  return axios.patch(baseUrl+'last/item', userData);
}
function patchStartCourse(userData) {
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
  replaceStartCourse,
  getStartList,
  patchComment,
  toggleTrueItem,
  toggleFalseItem,
  deleteStartItem,
  patcStarthUrl,
  patchStartPos,
  getLastList,
  patchStartItem,
  patchStartCourse,
};