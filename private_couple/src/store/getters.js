const isLogin = state => {
	return state.username === '';
};
const checkLogin = state => {
	return state.username === '' ? 'login_cont' : null;
};
const checkLogin_Name = state => {
	return state.username === '' ? false : true;
};
const fetchName = state => {
	return state.username;
};
// const getItemList = state => {
// 	return state.itemList;
// };
// const getCheckedList = state => {
// 	return state.checkedList;
// };
// const getCourseList = state => {
// 	return state.courseList;
// };
// const getStartList = state => {
// 	return state.startList;
// };
// const checkStartList = state => {
// 	return state.startList.length === 0 ? 'before_start' : 'proceeding_start';
// };
const getLastItemList = state => {
	return state.lastItemList;
};
const getLastCourseList = state => {
	return state.lastCourseList;
};

export {
	isLogin,
	checkLogin,
	checkLogin_Name,
	fetchName,
	// getItemList,
	// getCheckedList,
	// getCourseList,
	// getStartList,
	// checkStartList,
	getLastItemList,
	getLastCourseList,
};
