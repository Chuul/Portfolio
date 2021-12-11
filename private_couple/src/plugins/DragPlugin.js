import draggable from 'vuedraggable';

export default {
  install(Vue) {
    Vue.prototype.Drag =  draggable;
  }
}