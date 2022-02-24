// Login
const SET_USER_DATA = (state, data) => {
	state.username = data.username;
	state.email = data.email;
};
const LOGOUT_USER = state => {
	state.username = '';
	state.email = '';
	state.startList = [];
};
// CreateView
const SET_ITEM_LIST = (state, list) => {
	state.itemList = list;
};
const SET_ITEM = (state, item) => {
	state.itemList.push(item);
};
const SET_TOGGLE_ITEM = (state, item) => {
	let list = state.itemList;
	// state.checkedList에 I/O
	function toggleChecked(itemName) {
		let checkList = state.checkedList;
		for (let i = 0; i < checkList.length; i++) {
			if (checkList[i].name === itemName) {
				checkList.splice(i, 1);
				return;
			}
		}
	}
	// state.itemList에 I/O
	for (let i = 0; i < list.length; i++) {
		if (item.name === list[i].name) {
			if (list[i].checked === true) {
				list[i].checked = false;
				toggleChecked(list[i].name);
			} else {
				list[i].checked = true;
				state.checkedList.push(item);
			}
		}
	}
};
const SET_ITEM_URL = (state, obj) => {
	for (let i = 0; i < state.itemList.length; i++) {
		if (state.itemList[i]._id === obj.id) {
			state.itemList[i].url = obj.textArea;
			return;
		}
	}
};
const SET_ITEM_POS = (state, obj) => {
	for (let i = 0; i < state.itemList.length; i++) {
		if (state.itemList[i]._id === obj.id) {
			state.itemList[i].pos = obj.textArea;
			return;
		}
	}
};
const SPLICE_ITEM = (state, id) => {
	for (let i = 0; i < state.itemList.length; i++) {
		if (state.itemList[i]._id === id) {
			state.itemList.splice(i, 1);
			return;
		}
	}
};
const SET_ITEM_FALSE = (state, course) => {
	for (let i = 0; i < course.length; i++) {
		for (let j = 0; j < state.itemList.length; j++) {
			if (state.itemList[j].name === course[i].name) {
				state.itemList[j].checked = false;
			}
		}
	}
	state.checkedList = [];
};
// ListView
const SET_COURSE_LIST = (state, list) => {
	state.courseList = list;
};
const SPLICE_LIST = (state, name) => {
	for (let i = 0; i < state.courseList.length; i++) {
		if (state.courseList[i].name === name) {
			state.courseList.splice(i, 1);
			return;
		}
	}
};
const SET_START_COURSE = (state, list) => {
	state.startList = list;
};
// StartView
const EDIT_START_CHECKED = (state, id) => {
	let startList = state.startList;
	for (let i = 0; i < startList.length; i++) {
		if (startList[i]._id === id) {
			startList[i].checked = true;
			return;
		}
	}
};
const EDIT_START_NAME = (state, obj) => {
	for (let i = 0; i < state.startList.length; i++) {
		if (state.startList[i]._id === obj.id) {
			state.startList[i].name = obj.textArea;
			return;
		}
	}
};
const SET_START_URL = (state, obj) => {
	for (let i = 0; i < state.startList.length; i++) {
		if (state.startList[i]._id === obj.id) {
			state.startList[i].url = obj.textArea;
			return;
		}
	}
};
const SET_START_POS = (state, obj) => {
	for (let i = 0; i < state.startList.length; i++) {
		if (state.startList[i]._id === obj.id) {
			state.startList[i].pos = obj.textArea;
			return;
		}
	}
};
const SPLICE_START = (state, id) => {
	for (let i = 0; i < state.startList.length; i++) {
		if (state.startList[i]._id === id) {
			state.startList.splice(i, 1);
			return;
		}
	}
};
// LastView
const SET_LAST_LIST = (state, data) => {
	state.lastItemList = data[0].item;
	state.lastCourseList = data[0].course;
};
// Error
const SET_ERROR = (state, data) => {
	state.errorMessage = data;
};

export {
	LOGOUT_USER,
	SET_USER_DATA,
	SET_ITEM_LIST,
	SET_ITEM,
	SET_TOGGLE_ITEM,
	SET_ITEM_URL,
	SET_ITEM_POS,
	SPLICE_ITEM,
	SET_ITEM_FALSE,
	SET_COURSE_LIST,
	SPLICE_LIST,
	EDIT_START_CHECKED,
	EDIT_START_NAME,
	SET_START_COURSE,
	SET_START_URL,
	SET_START_POS,
	SPLICE_START,
	SET_LAST_LIST,
	SET_ERROR,
};
