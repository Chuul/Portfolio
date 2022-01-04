import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state : {
    itemListState : [],
    startCourse: []
    // checkedItems : [],
  },
  mutations: {
    fetchItemList(state, itemList) {
      state.itemListState = itemList;
    },
    storeStartCourse(state, list) {
      state.startCourse = list;
    },
    filterListItem(state, name) {
      if(name == '전체') {
        for(let x of state.addCourse) {
          x.filtered = true;
          localStorage.removeItem(x);
          localStorage.setItem(x, JSON.stringify(x));
        }
      } else {
        for(let x of state.addCourse) {
          if(x.category !== name) {
            x.filtered = false;
          } else {
            x.filtered = true;
          }
          localStorage.removeItem(x);
          localStorage.setItem(x, JSON.stringify(x));
        }
      }
    },
  },
})