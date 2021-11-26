import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 새로고침 후에 localStorage에 저장된 값을 state.addCourse에 담아주는 코드
const storage = {
  addCoursefetch() {
    const arr = [];
    if(localStorage.length > 0) {
      for(let i = 0 ; i < localStorage.length ; i++) {
        if(localStorage.key(i).substr(0,3) == 'add') {
          let str = localStorage.getItem(localStorage.key(i))
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
        if(localStorage.key(i).substr(0,3) == 'sto') {
          let str = localStorage.getItem(localStorage.key(i))
          arr.push(JSON.parse(str));
        }
      }
    }
    return arr;
  },
  // startCoursefetch() {
  //   if(localStorage.length > 0) {
  //     for(let i = 0 ; i < localStorage.length ; i++) {
  //       if(localStorage.key(i).substr(0,3) == 'sta') {
  //         let str = localStorage.getItem(localStorage.key(i))
  //         return str;
  //       }
  //     }
  //   }
  // }
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
    addOneCourse(state, payload) {
      const obj = {
        category : payload.category,
        item : payload.item,
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
    // CourseListView
    storeOneCourse(state) {
      // 코스목록을 하나로 묶어주기 위한 코드
      let arr = [];
      if(state.selectedCourse.length > 0) {
        for(let i = 0 ; i < state.selectedCourse.length ; i++) {
          delete state.selectedCourse[i].checked;
          delete state.selectedCourse[i].filtered;
          state.selectedCourse[i].item = state.selectedCourse[i].item.slice(11);
          arr.push(state.selectedCourse[i]);
        }
        state.selectedCourse = [];
      }
      localStorage.setItem('storedCourse: ' + JSON.stringify(arr), JSON.stringify(arr));
      state.storedCourse.push(arr);
    },
    removeOneStoredCourse(state, payload) {
      localStorage.removeItem('storedCourse: ' + JSON.stringify(payload.course));
      state.storedCourse.splice(payload.index, 1);
    },
    startOneCourse(state, course) {
      for(let i = 0 ; i < localStorage.length ; i++) {
        if(localStorage.key(i).slice(0,3) == 'sta') {
          localStorage.removeItem(localStorage.key(i));
          break;
        }
      }
      for(let i = 0 ; i < course.length ; i++) {
        course[i].checked = false;
        course[i].ratingBtnChecked = false;
        course[i].comment = "";
      }
      state.startCourse = course;
      // course를 start해서 페이지가 넘어갈 때, checked를 기본으로 돌려주는 코드
      localStorage.setItem('startCourse', JSON.stringify(course));
    },
    // startCourseView mutation
    checkedStartItem(state, attachInfo) {
      attachInfo.course.checked = !attachInfo.course.checked;
      localStorage.removeItem('startCourse');
      localStorage.setItem('startCourse', JSON.stringify(attachInfo.obj));
    },
    ratingStartItem(state, attachInfo) {
      attachInfo.course.comment = attachInfo.commentContent;
      localStorage.removeItem('startCourse');
      localStorage.setItem('startCourse', JSON.stringify(attachInfo.obj));
    },
    openStartURLText(state, attachInfo) {
      attachInfo.course.urlCheck = !attachInfo.course.urlCheck;
      localStorage.removeItem('startCourse');
      localStorage.setItem('startCourse', JSON.stringify(attachInfo.obj));
    },
    attachStartURL(state, attachInfo) {
      attachInfo.course.urlCheck = !attachInfo.course.urlCheck;
      attachInfo.course.url = attachInfo.url;
      localStorage.removeItem('startCourse');
      localStorage.setItem('startCourse', JSON.stringify(attachInfo.obj));
    },
    openStartPosTxt(state, attachInfo) {
      attachInfo.course.posCheck = !attachInfo.course.posCheck;
      localStorage.removeItem('startCourse');
      localStorage.setItem('startCourse', JSON.stringify(attachInfo.obj));
    },
    attachStartPOS(state, attachInfo) {
      attachInfo.course.posCheck = !attachInfo.course.posCheck;
      attachInfo.course.pos = attachInfo.pos;
      localStorage.removeItem('startCourse');
      localStorage.setItem('startCourse', JSON.stringify(attachInfo.obj));
    },
    removeStartCourse(state, attachInfo) {
      // localStorage.removeItem('startCourse');
      console.log(state.startCourse[0]);
      console.log(attachInfo);
      state.startCourse[0].splice(attachInfo.index, 1);
    },
  } 
})