"use strict";(self["webpackChunkprivate_couple"]=self["webpackChunkprivate_couple"]||[]).push([[106],{106:function(t,s,e){e.r(s),e.d(s,{default:function(){return l}});var c=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("section",{staticClass:"last_cont"},[e("article",{staticClass:"item_cont"},[e("h3",[t._v("아이템")]),e("article",t._l(t.ItemList,(function(s){return e("li",{key:s},[e("span",{staticClass:"item_name"},[t._v(" "+t._s(s.name)+" ")]),""!==s.comment?e("span",{staticClass:"item_comment"},[t._v(" "+t._s(s.comment)+" ")]):e("span",{staticClass:"item_comment"},[t._v(" 평가가 없습니다... ")])])})),0)]),e("article",{staticClass:"course_cont"},[e("h3",[t._v("코스")]),e("article",t._l(t.CourseList,(function(s){return e("li",{key:s.list},[e("div",{staticClass:"course_item_cont"},t._l(s.list,(function(s){return e("li",{key:s.name,staticClass:"course_name"},[t._v(" "+t._s(s.name)+" "),e("i",{staticClass:"fas fa-arrow-right"})])})),0),""!==s.comment?e("span",{staticClass:"course_comment"},[t._v(" "+t._s(s.comment)+" ")]):e("span",{staticClass:"course_comment"},[t._v(" 평가가 없습니다... ")])])})),0)])])},n=[],a={computed:{ItemList:function(){return this.$store.getters.getLastItemList},CourseList:function(){return this.$store.getters.getLastCourseList}},created:function(){this.$store.dispatch("FETCH_LAST_LIST")}},i=a,r=e(3736),o=(0,r.Z)(i,c,n,!1,null,"c3c0b1ee",null),l=o.exports}}]);
//# sourceMappingURL=106-legacy.e3b1c427.js.map