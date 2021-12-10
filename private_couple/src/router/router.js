import Vue from 'vue';
import VueRouter from 'vue-router';
import DateView from '../Views/DateCourse/DateView.vue'
import CourseListView from '../Views/CourseListView.vue'
import LastCourseView from '../Views/LastCourseView.vue'
import startCourseView from '../Views/StartCourseView.vue'
Vue.use(VueRouter);

export const router = new VueRouter({
  routes : [
    {
      path : '/',
      component : DateView
    },
    {
      path : '/createCourse',
      component : DateView
    },
    {
      path : '/courseList',
      component : CourseListView
    },
    {
      path : '/lastCourse',
      component : LastCourseView
    },
    {
      path : '/startCourse',
      component : startCourseView
    }
  ]
})