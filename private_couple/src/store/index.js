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
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
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
        if(str !== 'SILENT' && Array.isArray(JSON.parse(str))) {
            arr.push(JSON.parse(str));
        }
      }
    }
    return arr;
  }
}
const func = {
  resetItem(key) {
    localStorage.removeItem(key.item);
    localStorage.setItem(key.item, JSON.stringify(key))
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
    getDateCourse(state) {
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
      func.resetItem(course)
    },
    openURLText(state, course) {
      course.urlCheck = !course.urlCheck;
      func.resetItem(course)
    },
    attachOneURL(state, attachInfo) {
      attachInfo.course.urlCheck = !attachInfo.course.urlCheck;
      attachInfo.course.url = attachInfo.url;
      func.resetItem(attachInfo.course);
    },
    openPosTxt(state, course) {
      course.posCheck = !course.posCheck;
      func.resetItem(course)
    },
    attachOnePOS(state, attachInfo) {
      attachInfo.course.posCheck = !attachInfo.course.posCheck;
      attachInfo.course.pos = attachInfo.pos;
      func.resetItem(attachInfo.course);
    },
    filterListItem(state, name) {
      if(name == '전체') {
        for(let x of state.addCourse) {
          x.filtered = true;
          func.resetItem(x);
        }
      } else {
        for(let x of state.addCourse) {
          if(x.category !== name) {
            x.filtered = false;
          } else {
            x.filtered = true;
          }
          func.resetItem(x)
        }
      }
    },
    createOneCourse(state) {
      state.selectedCourse = [];
      for(let i = 0 ; i < localStorage.length ; i++) {
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          let itemString = JSON.parse(localStorage.getItem(localStorage.key(i)))
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
        arr.push(state.selectedCourse[i]);
      }
      localStorage.setItem(JSON.stringify(arr), JSON.stringify(arr));
      state.storedCourse.push(arr);
    },
    removeOneStoredCourse(state, payload) {
      localStorage.removeItem(JSON.stringify(payload.course));
      state.storedCourse.splice(payload.index, 1);
    },
    startOneCourse(state, course) {
      state.startCourse = [];
      state.startCourse.push(course);
    }
  } 
})