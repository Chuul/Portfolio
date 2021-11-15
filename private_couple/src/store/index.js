import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 새로고침 후에 localStorage에 저장된 값을 state.addCourse에 담아주는 코드
const storage = {
  addCoursefetch() {
    const arr = [];
    if(localStorage.length > 0) {
      for(let i = 0 ; i < localStorage.length ; i++) {
        let str = localStorage.getItem(localStorage.key(i))
        if(localStorage.key(i).substr(0,3) == 'add') {
          arr.push(JSON.parse(str));
        }
      }
    }
    return arr;
  },
  storeCoursefetch() {
    const arr = [];
    if(localStorage.length > 0) {
      for(let i = 0 ; i < localStorage.length ; i++) {
        let str = localStorage.getItem(localStorage.key(i))
        if(localStorage.key(i).substr(0,3) == 'sto') {
          arr.push(JSON.parse(str));
        }
      }
    }
    return arr;
  }
}

export const store = new Vuex.Store({
  state : {
    addCourse : storage.addCoursefetch(),
    selectedCourse : [],
    storedCourse : storage.storeCoursefetch(),
    startCourse : [],
    prevCourse : []
  },
  getters : {
    getAddCourse(state) {
      return state.addCourse;
    },
    getSelectedCourse(state) {
      return state.selectedCourse;
    },
    getStoredCourse(state) {
      return state.storedCourse;
    },
    getStartCourse(state) {
      return state.startCourse;
    }
  },
  mutations : {
    addOneCourse(state, option) {
      const obj = {
        category : option.category,
        item : option.item,
        checked : false, 
        url : '',
        urlCheck : false,
        pos : '',
        posCheck : false,
        filtered : true,
      }
      localStorage.setItem(obj.item, JSON.stringify(obj));
      state.addCourse.push(obj);
    },
    
    removeOneCourse(state, payload) {
      localStorage.removeItem(payload.course.item);
      state.addCourse.splice(payload.index, 1);
    },
    checkOneItem(state, course) {
      course.checked = !course.checked;
      localStorage.removeItem(course.item);
      localStorage.setItem(course.item, JSON.stringify(course))
    },
    openURLText(state, course) {
      course.urlCheck = !course.urlCheck;
      localStorage.removeItem(course.item);
      localStorage.setItem(course.item, JSON.stringify(course))
    },
    attachOneURL(state, attachInfo) {
      attachInfo.course.urlCheck = !attachInfo.course.urlCheck;
      attachInfo.course.url = attachInfo.url;
      localStorage.removeItem(attachInfo.course.item);
      localStorage.setItem(attachInfo.course.item, JSON.stringify(attachInfo.course))
    },
    openPosTxt(state, course) {
      course.posCheck = !course.posCheck;
      localStorage.removeItem(course.item);
      localStorage.setItem(course.item, JSON.stringify(course))
    },
    attachOnePOS(state, attachInfo) {
      attachInfo.course.posCheck = !attachInfo.course.posCheck;
      attachInfo.course.pos = attachInfo.pos;
      localStorage.removeItem(attachInfo.course.item);
      localStorage.setItem(attachInfo.course.item, JSON.stringify(attachInfo.course))
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
    createOneCourse(state) {
      state.selectedCourse = [];
      for(let i = 0 ; i < localStorage.length ; i++) {
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          let itemString = JSON.parse(localStorage.getItem(localStorage.key(i)));
          if(itemString.checked == true){
            state.selectedCourse.push(itemString);
          }
        }
      }
    },
    storeOneCourse(state) {
      // 코스목록을 하나로 묶어주기 위한 코드
      let arr = [];
      for(let i = 0 ; i < state.selectedCourse.length ; i++) {
        state.selectedCourse[i].item = state.selectedCourse[i].item.slice(11);
        arr.push(state.selectedCourse[i]);
      }
      localStorage.setItem('storedCourse: ' + JSON.stringify(arr), JSON.stringify(arr));
      state.storedCourse.push(arr);
      state.selectedCourse = [];
    },
    startOneCourse(state, course) {
      for(let i = 0 ; i < localStorage.length ; i++) {
        if(localStorage.key(i).slice(0,3) == 'sta') {
          localStorage.removeItem(localStorage.key(i));
        }
      }
      state.startCourse = [];
      state.startCourse.push(course);
      localStorage.setItem('startCourse: ' + JSON.stringify(course), JSON.stringify(course))
    },
    removeOneStoredCourse(state, payload) {
      localStorage.removeItem('storedCourse: ' + JSON.stringify(payload.course));
      state.storedCourse.splice(payload.index, 1);
    },
  } 
})