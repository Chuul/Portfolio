const storage = {
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
}

const state = {
  selectedCourse : [],
  storedCourse : storage.storeCoursefetch(),
}

const getters = {
  getSelectedCourse(state) {
    return state.selectedCourse;
  },
  getStoredCourse(state) {
    return state.storedCourse;
  },
}

const mutations = {
  createOneCourse(state) {
    state.selectedCourse = [];
    for(let i = 0 ; i < localStorage.length ; i++) {
      if(localStorage.key(i).slice(0,3) == 'add') {
        let itemString = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(itemString.checked == true){
          state.selectedCourse.push(itemString);
        }
      }
    }
  },
  storeOneCourse(state) {
    // 코스목록을 하나로 묶어주기 위한 코드
    if(state.selectedCourse.length > 0) {
      let arr = [];
      for(let i = 0 ; i < state.selectedCourse.length ; i++) {
        // delete state.selectedCourse[i].filtered;
        state.selectedCourse[i].item = state.selectedCourse[i].item.slice(11);
        arr.push(state.selectedCourse[i]);
      }
      state.selectedCourse = [];
      localStorage.setItem('storedCourse: ' + JSON.stringify(arr), JSON.stringify(arr));
      state.storedCourse.push(arr);
    }
  },
  removeOneStoredCourse(state, payload) {
    localStorage.removeItem('storedCourse: ' + JSON.stringify(payload.course));
    state.storedCourse.splice(payload.index, 1);
  },
}

export default { state, getters, mutations }