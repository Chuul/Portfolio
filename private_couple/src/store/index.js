import Vue from 'vue';
import Vuex from 'vuex';
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
  replaceStartCourse,
  getStartCourse 
} from '@/api/index';
import persistedstate from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state : {
    email: '',
    username: '',
    itemList : [],
    checkedList : [],
    courseList : [],
    startCourse: [],
  },
  mutations: {
    // Login
    SET_USER_DATA(state, data) {
      state.username = data.username;
      state.email = data.email;
    },
    // CreateView
    SET_ITEM_LIST(state, list) {
      if(state.checkedList.length > 0) {
        for(let i = 0 ; i < list.length ; i++) {
          for(let j = 0 ; j < state.checkedList.length ; j++) {
            if(list[i].name === state.checkedList[j].name) {
              list[i].checked = true;
            }
          }
        }
        state.itemList = list;
      } else {
        state.itemList = list;
      }
    },
    SET_TOGGLE_ITEM(state, item) {
      let list = state.itemList;
      // state.checkedList에 I/O
      function toggleChecked(item) {
        let list = state.checkedList;
        for(let i = 0 ; i < list.length ; i++) {
          if(list[i].name === item.name) {
            list.splice(i,1);
            return;
          }
        }
        list.push(item);
      }
      // state.itemList에 I/O
      for(let i = 0 ; i < list.length ; i++) {
        if(item.name === list[i].name) {
          if(list[i].checked === true) {
            list[i].checked = false;
            toggleChecked(list[i]);
          } else {
            list[i].checked = true;
            state.checkedList.push(item);
          }
        }
      }
    },
    SET_ITEM_URL(state, obj) {
      for(let i = 0 ; i < state.itemList.length ; i++) {
        if(state.itemList[i]._id === obj.id) {
          state.itemList[i].url = obj.textArea;
          return
        }
      }
    },
    SET_ITEM_POS(state, obj) {
      for(let i = 0 ; i < state.itemList.length ; i++) {
        if(state.itemList[i]._id === obj.id) {
          state.itemList[i].pos = obj.textArea;
          return
        }
      }
    },
    SPLICE_ITEM(state, id) {
      for(let i = 0 ; i < state.itemList.length ; i++) {
        if(state.itemList[i]._id === id) {
          state.itemList.splice(i,1);
          return;
        }
      }
    },
    // ListView
    SET_COURSE_LIST(state, list) {
      state.courseList = list;
    },
    SET_START_COURSE(state, list) {
      state.startCourse = list;
    },
    // StartView
    setStartCourse(state, data) {
      state.startCourse = data.course;
    },
  },
  actions : {
    // LoginView
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      commit('SET_USER_DATA', data);
      return data;
    },
    // CreateView
    async FETCH_ITEM_LIST(context) {
      const userData = {
        email: context.state.email,
        username: context.state.username,
      }
      const { data } = await getItemList(userData);
      context.commit('SET_ITEM_LIST', data);
    },
    async ADD_ITEM({ dispatch }, obj) {
      await postItem(obj);
      dispatch('FETCH_ITEM_LIST');
    },
    TOGGLE_ITEM(context, item) {
      context.commit('SET_TOGGLE_ITEM', item)
      context.dispatch('FETCH_ITEM_LIST');
    },
    PATCH_ITEM_URL({ commit }, obj) {
      commit('SET_ITEM_URL', obj);
      patchUrl(obj);
    },
    PATCH_ITEM_POS({ commit }, obj) {
      commit('SET_ITEM_POS', obj);
      patchPos(obj);
    },
    DELETE_ITEM({ commit }, id) {
      commit('SPLICE_ITEM', id);
      deleteItem(id);
    },
    STORE_COURSE(context, list) {
      postCourse(list);
    },
    // ListView
    async FETCH_COURSE_LIST(context) {
      const userData = {
        email: context.state.email,
        username: context.state.username,
      }
      const { data } = await getCourseList(userData);
      context.commit('SET_COURSE_LIST', data);
    },
    async DELETE_COURSE(context, item) {
      await deleteCourse(item);
      context.dispatch('FETCH_COURSE_LIST');
    },
    async START_COURSE(context, list) {
      const userData = {
        createdBy: context.state.email,
        course: list.course 
      }
      replaceStartCourse(userData);
      context.commit('SET_START_COURSE', list.course);
    },
    // StartView
    async START({ commit }, userData) {
      const { data } = await getStartCourse(userData);
      commit('setStartCourse', data[0]);
      return data 
    },
  },
  plugins: [
    persistedstate({
      paths: ['username', 'email', 'startCourse']
    })
  ]
})