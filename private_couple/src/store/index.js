import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state : {
    itemListState : [],
    checkedItems : [],
    startCourse: [],
  },
  mutations: {
    fetchItemList(state, itemList) {
      if(state.checkedItems.length > 0) {
        for(let i = 0 ; i < itemList.length ; i++) {
          for(let j = 0 ; j < state.checkedItems.length ; j++) {
            if(itemList[i].name === state.checkedItems[j].name) {
              itemList[i].checked = true;
            }
          }
        }
        state.itemListState = itemList;
      } else {
        state.itemListState = itemList;
      }
    },
    toggleItem(state, item) {
      // 1. state.checkedItems에 I/O
      function checkFunc(item) {
        for(let i = 0 ; i < state.checkedItems.length ; i++) {
          if(state.checkedItems[i].name === item.name) {
            state.checkedItems.splice(i,1);
            return;
          }
        }
        state.checkedItems.push(item);
      }
      // 2. state.itemList에 I/O
      for(let i = 0 ; i < state.itemListState.length ; i++) {
        if(state.itemListState[i].name === item.name) {
          if(state.itemListState[i].checked === true || undefined) {
            state.itemListState[i].checked = false;
            checkFunc(state.itemListState[i]);
          } else {
            state.itemListState[i].checked = true;
            state.checkedItems.push(item);
          }
        }
      }
    },
    deleteCheckedItems(state, itemName) {
      for(let i = 0 ; i < state.checkedItems.length ; i++) {
        if(state.checkedItems[i].name === itemName) {
          state.checkedItems.splice(i,1);
        }
      } 
    },
    storeStartCourse(state, list) {
      state.startCourse = list;
    },
    // filterListItem(state, name) {
    //   if(name == '전체') {
    //     for(let x of state.addCourse) {
    //       x.filtered = true;
    //       localStorage.removeItem(x);
    //       localStorage.setItem(x, JSON.stringify(x));
    //     }
    //   } else {
    //     for(let x of state.addCourse) {
    //       if(x.category !== name) {
    //         x.filtered = false;
    //       } else {
    //         x.filtered = true;
    //       }
    //       localStorage.removeItem(x);
    //       localStorage.setItem(x, JSON.stringify(x));
    //     }
    //   }
    // },
  },
})