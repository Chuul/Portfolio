"use strict";(self["webpackChunkprivate_couple"]=self["webpackChunkprivate_couple"]||[]).push([[937],{8937:function(t,s,e){e.r(s),e.d(s,{default:function(){return u}});var n=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("section",{staticClass:"list_cont"},t._l(t.CourseList,(function(s){return e("li",{key:s.course,staticClass:"course_cont"},[e("router-link",{staticClass:"start_btn_cont",attrs:{to:"/start"}},[e("i",{staticClass:"start_btn fas fa-heart-square",on:{click:function(e){return t.startOneCourse(s)}}})]),e("section",{staticClass:"item_cont"},t._l(s.course,(function(s){return e("li",{key:s.name,staticClass:"item_name"},[t._v(" "+t._s(s.name)+" "),t._m(0,!0)])})),0),e("span",{staticClass:"delete_btn_cont",on:{click:function(e){return t.deleteOneCourse(s)}}},[e("i",{staticClass:"delete_btn far fa-trash-alt"})])],1)})),0)},r=[function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"arrow_cont"},[e("i",{staticClass:"fas fa-arrow-down"})])}],a=(e(8309),{computed:{CourseList:function(){return this.$store.getters.getCourseList}},methods:{startOneCourse:function(t){this.$store.dispatch("START_COURSE",t)},deleteOneCourse:function(t){this.$store.dispatch("DELETE_COURSE",t.name)}},created:function(){this.$store.dispatch("FETCH_COURSE_LIST")}}),c=a,i=e(3736),o=(0,i.Z)(c,n,r,!1,null,"fc6396f6",null),u=o.exports}}]);
//# sourceMappingURL=937-legacy.a5a45fd7.js.map