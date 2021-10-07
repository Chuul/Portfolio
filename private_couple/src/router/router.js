import Vue from 'vue';
import VueRouter from 'vue-router';
import DateView from '../Views/DateView.vue'
import TravelView from '../Views/TravelView.vue'
import CalendarView from '../Views/CalendarView.vue'

Vue.use(VueRouter);

export const router = new VueRouter({
  routes : [
    {
      path : '/date',
      component : DateView
    },
    {
      path : '/travel',
      component : TravelView
    },
    {
      path : '/calendar',
      component : CalendarView
    }
  ]
})