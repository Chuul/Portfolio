"use strict";(self["webpackChunkprivate_couple"]=self["webpackChunkprivate_couple"]||[]).push([[242],{8045:function(t,e,n){n.d(e,{Z:function(){return _}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{class:t.content_start_cont},["start"===this.$route.name?n("h1",[t._v("코스 진행중...")]):t._e(),n("section",{class:t.main_cont},t._l(t.CommonList,(function(e,a){return n("li",{key:e.name,staticClass:"list_cont",class:t.list_page},[e.createdBy?[n("i",{staticClass:"toggle_Btn far fa-check-circle",class:{checked_Btn:e.checked},on:{click:function(n){return t.toggleOneItem(e)}}})]:[n("div",{staticClass:"index_cont"},[n("span",[t._v(" "+t._s(a+1)+" ")])]),n("i",{staticClass:"toggle_Btn far fa-check-circle",class:{checked_Btn:e.checked},on:{click:function(n){return t.openForm(e,"아이템 평가")}}})],e.url?n("a",{staticClass:"linkText",attrs:{href:e.url,target:"_blank"}},[t._v(" "+t._s(e.name)+" ")]):n("a",[t._v(" "+t._s(e.name)+" ")]),n("span",{staticClass:"btn_cont"},[n("i",{staticClass:"basic_Btn far fa-trash-alt",on:{click:function(n){return t.deleteOneItem(e)}}}),n("i",{staticClass:"basic_Btn fas fa-map-marked-alt",class:{checked_Btn:e.pos.length>0},on:{click:function(n){return t.openForm(e,"위치")}}}),n("i",{staticClass:"basic_Btn far fa-window-restore",class:{checked_Btn:e.url.length>0},on:{click:function(n){return t.openForm(e,"URL")}}}),e.createdBy?t._e():[n("i",{staticClass:"basic_Btn fas fa-text",on:{click:function(n){return t.openForm(e,"아이템 이름 변경")}}})]],2)],2)})),0),t.showModal?n("Modal",{on:{close:function(e){return t.closeModal()}}},[n("h2",{attrs:{slot:"header"},slot:"header"},[t._v(t._s(t.modalID))]),n("form",{attrs:{slot:"body"},slot:"body"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.textArea,expression:"textArea"}],attrs:{type:"text"},domProps:{value:t.textArea},on:{input:function(e){e.target.composing||(t.textArea=e.target.value)}}}),n("button",{on:{click:function(e){return e.preventDefault(),t.patchOneData()}}},[t._v("입력")])])]):t._e(),"start"===this.$route.name?[n("div",{staticClass:"start_basic_btn"},[n("span",{staticClass:"back_btn_cont",on:{click:function(e){return t.exitStart()}}},[n("i",{staticClass:"back_btn fas fa-arrow-circle-left"}),t._v(" 그만두기 ")]),n("button",{staticClass:"complete_Btn",on:{click:function(e){return t.openForm(null,"코스 완료")}}},[t._v(" 코스 완료 ")])])]:t._e()],2)},s=[],r=n(6198),c=(n(5666),n(8309),n(9477)),o={created:function(){var t=this.$route.name;if("creating"===t)this.$store.dispatch("FETCH_ITEM_LIST");else if("start"===t){if(this.$store.state.startList.length>0)return;this.$store.dispatch("FETCH_START_LIST")}},data:function(){return{item:{},textArea:"",modalID:"",showModal:!1}},components:{Modal:c.Z},computed:{content_start_cont:function(){return"start"===this.$route.name?"content_start_cont":""},main_cont:function(){return"start"===this.$route.name?"main_cont_start":"main_cont_creating"},list_page:function(){return"start"===this.$route.name?"list_start":"list_creating"},CommonList:function(){return"creating"===this.$route.name?this.$store.getters.getItemList:this.$store.getters.getStartList}},methods:{toggleOneItem:function(t){this.$store.commit("SET_TOGGLE_ITEM",t)},deleteOneItem:function(t){"creating"===this.$route.name?this.$store.dispatch("DELETE_ITEM",t._id):this.$store.dispatch("DELETE_START_ITEM",t._id)},exitStart:function(){var t=this;return(0,r.Z)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("EXIT_START");case 2:t.$router.push("/list");case 3:case"end":return e.stop()}}),e)})))()},patchOneData:function(){var t=this;return(0,r.Z)(regeneratorRuntime.mark((function e(){var n,a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n={},"코스 완료"!==t.modalID&&(a={id:t.item._id,textArea:t.textArea},n=a),"creating"!==t.$route.name){e.next=6;break}"URL"===t.modalID?t.$store.dispatch("PATCH_ITEM_URL",n):"위치"===t.modalID&&t.$store.dispatch("PATCH_ITEM_POS",n),e.next=27;break;case 6:if("아이템 이름 변경"!==t.modalID){e.next=10;break}t.$store.dispatch("EDIT_START_ITEM",n),e.next=27;break;case 10:if("URL"!==t.modalID){e.next=14;break}t.$store.dispatch("PATCH_START_URL",n),e.next=27;break;case 14:if("위치"!==t.modalID){e.next=18;break}t.$store.dispatch("PATCH_START_POS",n),e.next=27;break;case 18:if("아이템 평가"!==t.modalID){e.next=24;break}s=t.item,s.comment=t.textArea,t.$store.dispatch("PATCH_ITEM_COMMENT",s),e.next=27;break;case 24:if("코스 완료"!==t.modalID){e.next=27;break}return e.next=27,t.$store.dispatch("STORE_START",t.textArea).then((function(){t.$router.push("/list")})).catch((function(t){console.log(t)}));case 27:t.textArea="",t.showModal=!1;case 29:case"end":return e.stop()}}),e)})))()},openForm:function(t,e){"아이템 평가"!==e||!0!==t.checked?(this.showModal=!0,this.modalID=e,this.item=t):this.$store.dispatch("FALSE_ITEM",t._id)},closeModal:function(){this.showModal=!1,this.textArea=""}}},i=o,l=n(3736),u=(0,l.Z)(i,a,s,!1,null,"7aece78d",null),_=u.exports},5964:function(t,e,n){n.r(e),n.d(e,{default:function(){return u}});var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"start_cont"},[n("CommonLogic")],1)},s=[],r=n(8045),c={components:{CommonLogic:r.Z}},o=c,i=n(3736),l=(0,i.Z)(o,a,s,!1,null,"658917c7",null),u=l.exports}}]);
//# sourceMappingURL=242-legacy.4ab622f7.js.map