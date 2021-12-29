// const storage = {
//   coursefetch(name) {
//     const arr = [];
//     if(localStorage.length > 0) {
//       for(let i = 0 ; i < localStorage.length ; i++) {
//         if(localStorage.key(i).substr(0,3) == name) {
//           let str = localStorage.getItem(localStorage.key(i))
//           arr.push(JSON.parse(str));
//         }
//       }
//     }
//     return arr;
//   },
// }

const state = {
  addItemState : []
  // startCourse : storage.coursefetch('sta'),
  // prevCourse : storage.coursefetch('pre')
}

const getters = {
  getAddCourse(state) {
    return state.addCourse;
  },
  getStartCourse(state) {
    return state.startCourse;
  },
  getPrevCourse(state) {
    return state.prevCourse;
  }
}

const mutations = {
  fetchItemList(state, payload) {
    state.addItemState = [];
    for(let i = 0 ; i < payload.length ; i ++) {
      const obj = {
        category : payload[i].category, 
        name : payload[i].name,
        checked : false, 
        url : '',
        urlCheck : false,
        pos : '',
        posCheck : false,
        filtered : true,
      }
      state.addItemState.push(obj);
    }
    // console.log('state.addItemState: ', state.addItemState);
  },
  addOneItem(state, payload) {
    const obj = {
      category : payload.category, 
      name : payload.name,
      checked : false, 
      url : '',
      urlCheck : false,
      pos : '',
      posCheck : false,
      filtered : true,
    }
    state.addItemState.push(obj);
    // console.log('state.addItemState: ', state.addItemState);
  },
  startOneCourse(state, course) {
    // course : storedCourse배열에 저장된 값 중 특정 코스
    // 1. localStorage에서 startCourse제거
    for(let i = 0 ; i < localStorage.length ; i++) {
      if(localStorage.key(i).slice(0,3) == 'sta') {
        localStorage.removeItem(localStorage.key(i));
        break;
      }
    }
    // 2. course list에서 특정 코스를 시작했을 때, 해당 코스 속성 디폴트+추가
    for(let i = 0 ; i < course.length ; i++) {
      course[i].checked = false;
      course[i].ratingBtnChecked = false;
      course[i].comment = "";
    }
    // 3. startCourseView에서 뿌려주기 위해 state에 값을 저장하는 코드
    state.startCourse = course;
    localStorage.setItem('startCourse', JSON.stringify(course));
  },
  checkOneItem(state, course) {
    course.checked = !course.checked;
    if(course.comment == undefined) {
      localStorage.removeItem(course.item);
      localStorage.setItem(course.item, JSON.stringify(course))
    } else {
      course.ratingBtnChecked = false;
      localStorage.removeItem('startCourse');
      localStorage.setItem('startCourse', JSON.stringify(state.startCourse));
      state.prevCourse.push(course);
      localStorage.setItem('prev: ' + JSON.stringify(course), JSON.stringify(course));
    }
  },
  commentStartItem(state, course) {
    course.ratingBtnChecked = !course.ratingBtnChecked;
    localStorage.removeItem('startCourse');
    localStorage.setItem('startCourse', JSON.stringify(state.startCourse))
  },
  completeStartComment(state, attachInfo) {
    attachInfo.course.comment = attachInfo.commentText;
    attachInfo.course.ratingBtnChecked = false;
    localStorage.removeItem('startCourse');
    localStorage.setItem('startCourse', JSON.stringify(state.startCourse))
  },
  openURLText(state, course) {
    course.urlCheck = !course.urlCheck;
    if(course.comment == undefined) {
      localStorage.removeItem(course.item);
      localStorage.setItem(course.item, JSON.stringify(course))
    } else {
      localStorage.removeItem('startCourse');
      localStorage.setItem('startCourse', JSON.stringify(state.startCourse));
    }
  },
  attachOneURL(state, attachInfo) {
    attachInfo.course.urlCheck = !attachInfo.course.urlCheck;
    attachInfo.course.url = attachInfo.url;
    if(attachInfo.course.comment == undefined) {
      localStorage.removeItem(attachInfo.course.item);
      localStorage.setItem(attachInfo.course.item, JSON.stringify(attachInfo.course))
    } else {
      localStorage.removeItem('startCourse');
      localStorage.setItem('startCourse', JSON.stringify(state.startCourse));
    }
  },
  openPosTxt(state, course) {
    course.posCheck = !course.posCheck;
    if(course.comment == undefined) {
      localStorage.removeItem(course.item);
      localStorage.setItem(course.item, JSON.stringify(course))
    } else {
      // course.posCheck = !course.posCheck;
      localStorage.removeItem('startCourse');
      localStorage.setItem('startCourse', JSON.stringify(state.startCourse));
    }
  },
  attachOnePOS(state, attachInfo) {
    attachInfo.course.posCheck = !attachInfo.course.posCheck;
    attachInfo.course.pos = attachInfo.pos;
    if(attachInfo.course.comment == undefined) {
      localStorage.removeItem(attachInfo.course.item);
      localStorage.setItem(attachInfo.course.item, JSON.stringify(attachInfo.course))
    } else {
      // attachInfo.course.posCheck = !attachInfo.course.posCheck;
      // attachInfo.course.pos = attachInfo.pos;
      localStorage.removeItem('startCourse');
      localStorage.setItem('startCourse', JSON.stringify(state.startCourse));
    }
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
  removeOneCourse(state, attachInfo) {
    if(attachInfo.course.comment == undefined) {
      state.addCourse.splice(attachInfo.index, 1);
      localStorage.removeItem(attachInfo.course.item);
    } else {
      state.startCourse.splice(attachInfo.index, 1);
      // 화면에서 제거
      for(let i = 0 ; i < localStorage.length ; i++) {
        if(localStorage.key(i).slice(0,3) == 'sta') {
          let tmp = JSON.parse(localStorage.getItem(localStorage.key(i)));
          tmp.splice(attachInfo.index, 1);
          localStorage.removeItem('startCourse')
        }
      }
    }
  },
  removePrevCourse(state, attachInfo) {
    // 1. startCourse에서 제거
    state.prevCourse.splice(attachInfo.index, 1);
    // 2. 화면에서 제거
    for(let i = 0 ; i < localStorage.length ; i++) {
      if(localStorage.key(i).slice(0,3) == 'pre') {
        localStorage.removeItem('prev: ' + JSON.stringify(this.getPrevCourse))
      }
    }
  }
}

export default { state, getters, mutations }