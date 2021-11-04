<template>
  <section class="list-cont">
    <SortList></SortList>
    <li v-for="(course, index) in getDateCourse" v-bind:key="course.item" v-bind:class="{filterItem : !course.display}">
      <!-- 체크버튼 -->
      <span v-on:click="checkCourse(course)"> 
        <template v-if="course.checked !== false">
          <i class="notpickBtn fas fa-check-circle"></i>
        </template>
        <template v-else>
          <i class="notpickBtn far fa-check-circle"></i>
        </template>
      </span>
      <!-- 아이템표시 -->
      <a v-if="course.url !== ''" v-bind:href="course.url" target="_blank">
        {{course.item}}
      </a>
      <span v-else>
        {{course.item}}
      </span>
      <!-- URL -->
      <span class="urlContainer">
        <!-- URL실행버튼 -->
        <span v-on:click="openURL(course)">
          <span v-if="course.url == ''">
            <i v-bind:class="{checkURL : course.urlCheck}" class="shareBtn fas fa-share-square"></i>
          </span>
          <span v-else>
            <i v-bind:class="{checkURL : course.urlCheck}" class="existBtn fas fa-share-square"></i>
          </span>
        </span>
        <!-- URL양식 -->
        <span v-bind:class="{checkURL : !course.urlCheck}">
          <span class="backBtn" v-on:click="openURL(course)">
            <i class="fas fa-undo"></i>
          </span>
          <input type="text" class="inputURL" v-model="urlText" v-on:keyup.enter="attachURL(course)" placeholder="URL을 입력하세요.">
          <span class="addBtn" v-on:click="attachURL(course)">
            <i class="fas fa-plus"></i>
          </span>
        </span>
      </span>
      <!-- 주소추가버튼 -->
      <span class="posContainer">
        <!-- 주소 실행 -->
        <span v-on:click="openPos(course)">
          <span v-if="course.pos == ''">
            <i v-bind:class="{existPOS : course.posCheck}" class="shareBtn fas fa-map-marker-alt"></i>
          </span>
          <span v-else>
            <i v-bind:class="{existPOS : course.posCheck}" class="existBtn fas fa-map-marker-alt"></i>
          </span>
        </span>
        <!-- 주소양식 -->
        <span class="url-container" v-bind:class="{existPOS : !course.posCheck}">
          <span v-on:click="openPos(course)">
            <i class="fas fa-undo"></i>
          </span>
          <input type="text" class="inputURL" v-model="posText" v-on:keyup.enter="attachPos(course)" placeholder="주소를 입력하세요.">
          <span v-on:click="attachPos(course)">
            <i class="fas fa-plus"></i>
          </span>
        </span>
      </span>
      <!-- 삭제버튼 -->
      <span class="removeContainer" v-on:click="removeCourse(course, index)">
        <i class="far fa-trash-alt"></i>
      </span>
    </li>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import SortList from './SortList.vue';

export default {
  components : {
    SortList,
  },
  data() {
    return {
      urlText : "",
      posText : ""
    }
  },
  computed : {
    ...mapGetters(['getDateCourse']),
  },
  methods : {
    checkCourse(course) {
      this.$store.commit('checkOneCourse', course);
    },
    openURL(course) {
      this.$store.commit('openURLText', course);
    },
    attachURL(course) {
      const url = this.urlText;
      this.$store.commit('attachOneURL', {course, url});
      this.urlText = "";
    },
    openPos(course) {
      this.$store.commit('openPosTxt', course);
    },
    attachPos(course) {
      const pos = this.posText;
      this.$store.commit('attachOnePOS', {course, pos});
      this.posText = "";
    },
    removeCourse(course, index) {
      this.$store.commit('removeOneCourse', {course, index});
    },
    
  },
  
}
</script>

<style scoped>
.list-cont {
  margin : 0;
}
li {
  list-style: none;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.filterItem {
  display : none;
}
.notpickBtn {
  color : #3273e4;
  margin-right: 10px;
}
.urlContainer {
  margin : 0 5px 0 10px;
  cursor: pointer;
}
.checkURL {
  display : none;
}
.shareBtn {
  color :  #62acde;
  line-height: 45px;
  margin-right: 5px;
}
.existBtn {
  color :  #f83dc0;
  line-height: 45px;
  margin-right: 5px;
}
.backBtn {
  margin : 0 5px;
}
.inputURL {
  height: 1rem;
}
.addBtn {
  margin : 0 5px;
}
.posContainer {
  cursor: pointer;
  margin : 0 5px;
}
.existPOS {
  display: none;
}
.removeContainer {
  color : #62acde;
  margin : 0 5px;
}
</style>