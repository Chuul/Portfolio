import axios from 'axios';

const baseUrl = 'http://localhost:8800/';

// item
function postItem(item) {
  return axios.post(baseUrl+'item', item);
}
function getItemList() {
  return axios.get(baseUrl+'item');
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
function postCourse(course) {
  return axios.post(baseUrl+'course', course)
}
function getCourseList() {
  return axios.get(baseUrl+'course');
}
function deleteCourse(name) {
  return axios.delete(baseUrl+'course'+`/${name}`)
}
// start
function replaceStartCourse(list) {
  return axios.post(baseUrl+'start', list);
}
// function deleteStartCourse() {
//   return axios.delete(baseUrl+'start/delete')
// }
function getStartList() {
  return axios.get(baseUrl+'start');
}

export { 
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
  getStartList
};