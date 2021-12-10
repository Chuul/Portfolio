import Vue from 'vue';
import Vuex from 'vuex';
import addStore from './modules/addStore'
import selectStore from './modules/selectStore'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules : {
    addStore,
    selectStore,
  }
})