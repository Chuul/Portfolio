import Vue from 'vue';
import VueRouter from 'vue-router';
import CreateView from '@/components/CreateView'
import ListView from '@/components/ListView.vue'
import LastView from '@/components/LastView.vue'
import StartView from '@/components/StartView.vue'

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes : [
    // {
    //   path : '/',
    //   component : CreateView
    // },
    {
      path : '/creating',
      component : CreateView
    },
    {
      path : '/list',
      component : ListView
    },
    {
      path : '/last',
      component : LastView
    },
    {
      path : '/start',
      component : StartView
    }
  ]
})