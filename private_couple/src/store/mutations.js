// Login
const SET_USER_DATA = (state, data) => {
  state.username = data.username;
  state.email = data.email;
}
// CreateView
const SET_ITEM_LIST = (state, list) => {
  if(state.checkedList.length > 0) {
    for(let i = 0 ; i < list.length ; i++) {
      for(let j = 0 ; j < state.checkedList.length ; j++) {
        if(list[i].name === state.checkedList[j].name) {
          list[i].checked = true;
        }
      }
    }
    state.itemList = list;
  } else {
    state.itemList = list;
  }
}
const SET_TOGGLE_ITEM = (state, item) => {
  let list = state.itemList;
  // state.checkedList에 I/O
  function toggleChecked(item) {
    let checkList = state.checkedList;
    for(let i = 0 ; i < checkList.length ; i++) {
      if(checkList[i].name === item.name) {
        checkList.splice(i,1);
        return;
      }
    }
    list.push(item);
  }
  // state.itemList에 I/O
  for(let i = 0 ; i < list.length ; i++) {
    if(item.name === list[i].name) {
      if(list[i].checked === true) {
        list[i].checked = false;
        toggleChecked(list[i]);
        console.log('list[i].checked: ', list[i].checked)
      } else {
        list[i].checked = true;
        state.checkedList.push(item);
        console.log('list[i].checked: ', list[i].checked)
      }
    }
  }
}
const SET_ITEM_URL = (state, obj) => {
  for(let i = 0 ; i < state.itemList.length ; i++) {
    if(state.itemList[i]._id === obj.id) {
      state.itemList[i].url = obj.textArea;
      return
    }
  }
}
const SET_ITEM_POS = (state, obj) => {
  for(let i = 0 ; i < state.itemList.length ; i++) {
    if(state.itemList[i]._id === obj.id) {
      state.itemList[i].pos = obj.textArea;
      return
    }
  }
}
const SPLICE_ITEM = (state, id) => {
  for(let i = 0 ; i < state.itemList.length ; i++) {
    if(state.itemList[i]._id === id) {
      state.itemList.splice(i,1);
      return;
    }
  }
}
// ListView
const SET_COURSE_LIST = (state, list) => {
  state.courseList = list;
}
const SET_START_COURSE = (state, list) => {
  state.startList = list;

  // 아이템 이름, 좌표값 state 저장
  let obj = [];
  list.forEach( (item) => {
    const data = {
      name: item.name,
      pos_latlng: item.pos_latlng 
    }
    obj.push(data);
  })
  state.LatLng = obj;
}
// StartView
const SET_START_LIST = (state, data) => {
  state.startList = data;
}
const SET_START_URL = (state, obj) => {
  for(let i = 0 ; i < state.startList.length ; i++) {
    if(state.startList[i]._id === obj.id) {
      state.startList[i].url = obj.textArea;
      return
    }
  }
}
const SET_START_POS = (state, obj) => {
  for(let i = 0 ; i < state.startList.length ; i++) {
    if(state.startList[i]._id === obj.id) {
      state.startList[i].pos = obj.textArea;
      return
    }
  }
}
const SPLICE_START = (state, id) => {
  for(let i = 0 ; i < state.startList.length ; i++) {
    if(state.startList[i]._id === id) {
      state.startList.splice(i,1);
      return;
    }
  }
}
// LastView
const SET_LAST_LIST = (state, data) => {
  state.lastItemList = data[0].item;
  state.lastCourseList = data[0].course;
}

export { 
  SET_USER_DATA,
  SET_ITEM_LIST,
  SET_TOGGLE_ITEM,
  SET_ITEM_URL,
  SET_ITEM_POS,
  SPLICE_ITEM,
  SET_COURSE_LIST,
  SET_START_COURSE,
  SET_START_LIST,
  SET_START_URL,
  SET_START_POS,
  SPLICE_START,
  SET_LAST_LIST
}