import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const storage = {
  fetch() {
    const arr = [];
    if(localStorage.length > 0) {
      for(let i = 0 ; i < localStorage.length ; i++) {
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
    return arr;
  }
}

export const store = new Vuex.Store({
  state : {
    dateCourses : storage.fetch(),
    // filterDateCourses : [...storage.fetch()],
    newList : []
  },
  getters : {
    getDateCourse(state) {
      return state.dateCourses;
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
        display : true
      }
      localStorage.setItem(obj.item, JSON.stringify(obj));
      state.dateCourses.push(obj);
    },
    removeOneCourse(state, payload) {
      localStorage.removeItem(payload.course.item);
      state.dateCourses.splice(payload.index, 1);
    },
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
    createOneCourse(){
      let arr = [];
      for(let i = 0 ; i < localStorage.length ; i++) {
        if(localStorage.key(i) !== 'loglevel:webpack-dev-server') {
          let itemString = JSON.parse(localStorage.getItem(localStorage.key(i)))
          if(itemString.checked == true){
            // console.log(itemString);
            arr.push(itemString)
          }
        }
      }
      console.log(arr);
      return arr;
    }
  } 
})