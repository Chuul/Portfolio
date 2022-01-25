 import axios from 'axios';

const config = {
  baseUrl: 'http://localhost:8800/'
}

// login
function loginUser(userData) {
  return axios.post(`${config.baseUrl}login`, userData)
}
// item
function getItemList(userData) {
  return axios.post(`${config.baseUrl}item`, userData);
}
function postItem(item) {
  return axios.post(`${config.baseUrl}item/insert`, item);
}
function deleteItem(id) {
  return axios.delete(`${config.baseUrl}item/${id}`);
}
function patchUrl(payload) {
  return axios.patch(`${config.baseUrl}item/url/${payload.id}`, {data: {urlText: payload.textArea}});
}
function patchPos(payload) {
  return axios.patch(`${config.baseUrl}item/pos/${payload.id}`, {data: {posText: payload.textArea}});
}
function getCheckedItemList() { 
  return axios.get(`${config.baseUrl}item/list`);
}
// course
function getCourseList(userData) {
  return axios.post(`${config.baseUrl}course`, userData);
}
function postCourse(course) {
  return axios.post(`${config.baseUrl}course/insert`, course)
}
function deleteCourse(name) {
  return axios.delete(`${config.baseUrl}course/${name}`)
}
// start
function getStartList(userData) {
  return axios.post(`${config.baseUrl}start`, userData);
}
function replaceStartList(userData) {
  return axios.post(`${config.baseUrl}start/insert`, userData);
}
function patchComment(payload) {
  return axios.patch(`${config.baseUrl}start/comment/${payload.id}`, {data: {comment: payload.comment}});
}
function toggleFalseItem(id) {
  return axios.patch(`${config.baseUrl}start/false/${id}`, {data: {checked: false}});
}
function deleteStartItem(id) {
  return axios.delete(`${config.baseUrl}start/${id}`);
}
function patchStartUrl(payload) {
  return axios.patch(`${config.baseUrl}start/url/${payload.id}`, {data: {urlText: payload.textArea}});
}
function patchStartPos(payload) {
  return axios.patch(`${config.baseUrl}start/pos/${payload.id}`, {data: {posText: payload.textArea}});
}
// last
function getLastList(userData) {
  return axios.post(`${config.baseUrl}last`, userData);
}
function patchStartItem(userData) {
  return axios.patch(`${config.baseUrl}last/item`, userData);
}
function patchStartList(userData) {
  return axios.patch(`${config.baseUrl}last/course`, userData);
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