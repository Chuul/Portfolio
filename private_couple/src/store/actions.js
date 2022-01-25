import { 
  loginUser,
  postItem, 
  getItemList, 
  deleteItem,
  patchUrl,
  patchPos,
  postCourse,
  getCourseList,
  deleteCourse,
  replaceStartList,
  getStartList,
  toggleFalseItem,
  patchComment,
  patchStartItem,
  patchStartUrl,
  patchStartPos,
  deleteStartItem,
  patchStartList,
  getLastList
} from '@/api/index';
 
 // LoginView
 const LOGIN = async({ commit }, userData) => {
  const { data } = await loginUser(userData);
  commit('SET_USER_DATA', data);
  return data;
}
// CreateView
const FETCH_ITEM_LIST = async(context) => {
  const userData = {
    email: context.state.email,
    username: context.state.username,
  }
  const { data } = await getItemList(userData);
  context.commit('SET_ITEM_LIST', data);
}
const ADD_ITEM = async({ dispatch }, obj) => {
  await postItem(obj);
  dispatch('FETCH_ITEM_LIST');
}
const TOGGLE_ITEM = (context, item) => {
  console.log('action TOGGLE_ITEM');
  context.commit('SET_TOGGLE_ITEM', item)
  context.dispatch('FETCH_ITEM_LIST');
}
const PATCH_ITEM_URL = ({ commit }, obj) => {
  commit('SET_ITEM_URL', obj);
  patchUrl(obj);
}
const PATCH_ITEM_POS = ({ commit }, obj) => {
  commit('SET_ITEM_POS', obj);
  patchPos(obj);
}
const DELETE_ITEM = ({ commit }, id) => {
  commit('SPLICE_ITEM', id);
  deleteItem(id);
}
const STORE_COURSE = (context, list) => {
  postCourse(list);
}
// ListView
const FETCH_COURSE_LIST = async(context) => {
  const userData = {
    email: context.state.email,
    username: context.state.username,
  }
  const { data } = await getCourseList(userData);
  context.commit('SET_COURSE_LIST', data);
}
const DELETE_COURSE = async(context, item) => {
  await deleteCourse(item);
  context.dispatch('FETCH_COURSE_LIST');
}
const START_COURSE = async(context, list) => {
  const userData = {
    createdBy: context.state.email,
    course: list.course 
  }
  replaceStartList(userData);
  context.commit('SET_START_COURSE', list.course);
}
// StartView
const FETCH_START_LIST = async( context )=> {
  const userData = {
    createdBy: context.state.email
  }
  const { data } = await getStartList(userData);
  context.commit('SET_START_LIST', data[0].course);
  return;
}
const START = async({ commit }, userData) => {
  const { data } = await getStartList(userData);
  commit('setStartList', data[0]);
  return data 
}
const FALSE_ITEM = async( { dispatch }, id) => {
  await toggleFalseItem(id);
  dispatch('FETCH_START_LIST');
}
const PATCH_ITEM_COMMENT = async( context, item ) => {
  // "starts" collection에 저장
  const obj = {
    id: item._id,
    comment: item.comment
  }
  await patchComment(obj);
  // "lasts" collection에 저장
  delete item.completed;
  delete item._id;
  const userData = {
    createdBy: context.state.email,
    item: item
  }
  await patchStartItem(userData);
  context.dispatch('FETCH_START_LIST');
}
const DELETE_START = ( { commit }, id ) => {
  commit('SPLICE_START', id)
  deleteStartItem(id);
}
const PATCH_START_URL = ({ commit }, obj) => {
  commit('SET_START_URL', obj);
  patchStartUrl(obj);
}
const PATCH_START_POS = ({ commit }, obj) => {
  commit('SET_START_POS', obj);
  patchStartPos(obj);
}
const STORE_START = (context, comment) => {
  const obj = {
    createdBy: context.state.email,
    course: {
      list: context.state.startList,
      comment: comment
    },
  }
  patchStartList(obj);
}
// LastView
const FETCH_LAST_LIST = async(context) => {
  const userData = {
    createdBy: context.state.email
  }
  const { data } = await getLastList(userData);
  context.commit('SET_LAST_LIST', data);
}
export {
  LOGIN,
  FETCH_ITEM_LIST,
  ADD_ITEM,
  TOGGLE_ITEM,
  PATCH_ITEM_URL,
  PATCH_ITEM_POS,
  DELETE_ITEM,
  STORE_COURSE,
  FETCH_COURSE_LIST,
  DELETE_COURSE,
  START_COURSE,
  FETCH_START_LIST,
  START,
  FALSE_ITEM,
  PATCH_ITEM_COMMENT,
  PATCH_START_URL,
  PATCH_START_POS,
  DELETE_START,
  STORE_START,
  FETCH_LAST_LIST
}