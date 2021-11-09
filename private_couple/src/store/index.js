import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const storage = {
  dateCoursefetch() {
    const arr = [];
    if(localStorage.length > 0) {
      for(let i = 0 ; i < localStorage.length ; i++) {
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
    return arr;
  },
  // storedCoursefetch() {
  //   const arr = [];
  //   if(localStorage.length > 0) {
  //     for(let i = 0 ; i < localStorage.length ; i++) {
  //       if(localStorage.getItem(localStorage.key(i)) !== 'SILENT') {
  //         arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  //       }
  //     }
  //     console.log(arr)
  //   }
  //   return arr;
  // }
}
export const store = new Vuex.Store({
  state : {
    dateCourses : storage.dateCoursefetch(),
    selectedCourse : [],
    // storedCourse : storage.storedCoursefetch()
    // storedCourse : []
  },
  getters : {
    getDateCourse(state) {
      return state.dateCourses;
    },
    getSelectedCourse(state) {
      return state.selectedCourse;
    },
    // getStoredCourse(state) {
    //   return state.storedCourse;
    // }
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
        display : true,
        // stored : false
      }
      localStorage.setItem(obj.item, JSON.stringify(obj));
      state.dateCourses.push(obj);
    },
    removeOneCourse(state, payload) {
      localStorage.removeItem(payload.course.item);
      state.dateCourses.splice(payload.index, 1);
    },
    // removeOneStoredCourse(state, payload) {
    //   state.storedCourse.splice(payload.index, 1);
    // },
    checkOneCourse(state, course) {
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
        for(let x of state.dateCourses) {
          x.display = true;
          localStorage.removeItem(x.item);
          localStorage.setItem(x.item, JSON.stringify(x))
        }
      } else {
        for(let x of state.dateCourses) {
          if(x.category !== name) {
            x.display = false;
          } else {
            x.display = true;
          }
          localStorage.removeItem(x.item);
          localStorage.setItem(x.item, JSON.stringify(x))
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
      let arr = [];
      let max = 0;
      for(let i = 0 ; i < state.selectedCourse.length ; i++) {
        arr.push(state.selectedCourse[i]);
      }
      // localStorage에서 코스목록 번호의 최대값을 세는 반복문
      for(let i = 0 ; i < localStorage.length ; i++) {
        if(localStorage.key(i).slice(0, 15) == 'storedCourseKey') {
          max = Math.max(localStorage.key(i).charAt(15), max);
        }
      }
      localStorage.setItem(`storedCourseKey${max+1}`, JSON.stringify(arr));
      // state.storedCourse.push(state.selectedCourse);
    }
  } 
})