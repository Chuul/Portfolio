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
}
export const store = new Vuex.Store({
  state : {
    dateCourses : storage.dateCoursefetch(),
    selectedCourse : [],
  },
  getters : {
    getDateCourse(state) {
      return state.dateCourses;
    },
    getSelectedCourse(state) {
      return state.selectedCourse;
    },
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
      }
      localStorage.setItem(obj.item, JSON.stringify(obj));
      state.dateCourses.push(obj);
    },
    removeOneCourse(state, payload) {
      localStorage.removeItem(payload.course.item);
      state.dateCourses.splice(payload.index, 1);
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
      // selectedCourse에 담긴 data를 배열에 넣어주는 코드
      let arr = [];
      for(let i = 0 ; i < state.selectedCourse.length ; i++) {
        arr.push(state.selectedCourse[i]);
      }
      // localStorage에서 코스목록 번호의 최대값을 세는 반복문
      let max = 0;
      for(let i = 0 ; i < localStorage.length ; i++) {
        if(localStorage.key(i).slice(0, 15) == 'storedCourseKey') {
          max = Math.max(localStorage.key(i).charAt(15), max);
        }
      }
      localStorage.setItem(`storedCourseKey${max+1}`, JSON.stringify(arr));
      state.dateCourses.push(arr);
    },
    removeOneStoredCourse(state, payload) {
      // dateCourse에서의 index는 맞는데, localStorage에서 localStorage때문에 안 맞는 것으로 예상
      // console.log(state);
      // console.log('payload.course : ', payload.course);
      // console.log('payload.index : ', payload.index);
      // console.log('localStorage.key(payload.index) : ', localStorage.key(payload.index));
      // console.log('===============================================')
      localStorage.removeItem(localStorage.key(payload.index));
      state.dateCourses.splice(payload.index, 1);
    },
  } 
})