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
    dateCourses : storage.fetch()
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
        completed : false, 
        url : '',
        urlCheck : false,
      }
      localStorage.setItem(obj.item, JSON.stringify(obj));
      state.dateCourses.push(obj);
    },
    removeOneCourse(state, payload) {
      localStorage.removeItem(payload.course.item);
      state.dateCourses.splice(payload.index, 1);
    },
    checkOneCourse(state, course) {
      course.completed = !course.completed;
      localStorage.removeItem(course.item);
      localStorage.setItem(course.item, JSON.stringify(course))
    },
    openURLText(state, course) {
      course.urlCheck = !course.urlCheck;
    },
    attachOneURL(state, attachInfo) {
      attachInfo.course.urlCheck = !attachInfo.course.urlCheck;
      attachInfo.course.url = attachInfo.url;
      localStorage.removeItem(attachInfo.course.item);
      localStorage.setItem(attachInfo.course.item, JSON.stringify(attachInfo.course))
      
    }
  }
})