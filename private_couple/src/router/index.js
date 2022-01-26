import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '@/components/LoginView'
import CreateView from '@/components/CreateView'
import ListView from '@/components/ListView.vue'
import LastView from '@/components/LastView.vue'
import StartView from '@/components/StartView.vue'
import NotFoundView from '@/components/NotFoundView.vue'
import { store } from '../store/index.js'

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  routes : [
    {
      path : '/',
      redirect : '/login'
    },
    {
      path : '/login',
      component : LoginView,
      name: 'login'
    },
    {
      path : '/creating',
      component : CreateView,
      name : 'creating'
    },
    {
      path : '/list',
      component : ListView,
      name: 'list'
    },
    {
      path : '/last',
      component : LastView,
      name: 'last'
    },
    {
      path : '/start',
      component : StartView,
      name: 'start',
      beforeEnter: async (to, from, next) => {
        // 지번 주소를 좌표값으로 바꾸는 함수(카카오 API 참조)
        function transPosition() {
          let list = store.state.startList;
          let posInfo = [];
          for (let i = 0; i < list.length; i ++) {
            if(list[i].pos !== "") {
              var geocoder = new kakao.maps.services.Geocoder();

              var callback = function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                  let obj = {y: result[0].y, x: result[0].x}
                  list[i].pos_latlng = obj;
                  console.log('obj: ', obj);
                  // posInfo.push(obj);
                }
              };
              geocoder.addressSearch(list[i].pos, callback);
            }
          }
          console.log('posInfo: ', posInfo)
          store.state.LatLng = posInfo;
        }
        transPosition();
        next();
      }
    },
    {
      path: '*',
      component: NotFoundView
    },
  ]
})