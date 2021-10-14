<template>
  <div>
    <div>
      <SortList></SortList>
      <li v-for="(course, index) in getDateCourse" v-bind:key="course.item" v-bind:class="{filterItem : !course.display}">
        <!-- 체크 버튼 -->
        <span v-on:click="checkCourse(course)"> 
          <template v-if="course.completed !== false">
            <i class="notpickBtn fas fa-check-circle"></i>
          </template>
          <template v-else>
            <i class="notpickBtn far fa-check-circle"></i>
          </template>
        </span>
        <span>
          <template v-if="course.url !== ''">
            <a class="linkText" v-bind:href="course.url">{{course.item}}</a>
          </template>
          <template v-else>
            {{ course.item }} 
          </template>
        </span>
        <!-- URL로직 -->
        <span>
          <!-- URL실행 -->
          <span v-on:click="openURL(course)">
            <i v-bind:class="{existURL : course.urlCheck}" class="shareBtn fas fa-share-square"></i>
          </span>
          <!-- URL양식 -->
          <span class="url-container" v-bind:class="{existURL : !course.urlCheck}">
            <span v-on:click="openURL(course)">
              <i class="fas fa-undo"></i>
            </span>
            <input type="text" class="inputURL" v-model="urlText" v-on:keyup.enter="attachURL(course)" placeholder="URL을 입력하세요.">
            <span v-on:click="attachURL(course)">
              <i class="fas fa-plus"></i>
            </span>
          </span>
        </span>
        <!-- 삭제 버튼 -->
        <span v-on:click="removeCourse(course, index)">
          <i class="removeBtn far fa-trash-alt"></i>
        </span>
      </li>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SortList from './SortList.vue'

export default {
  data() {
    return {
      urlText : ""
    }
  },
  methods : {
    removeCourse(course, index) {
      this.$store.commit('removeOneCourse', {course, index});
    },
    checkCourse(course) {
      this.$store.commit('checkOneCourse', course);
    },
    openURL(course) {
      this.$store.commit('openURLText', course);
    },
    attachURL(course) {
      const url = this.urlText
      this.$store.commit('attachOneURL', {course, url});
      this.urlText = "";
    },
  },
  computed : {
    ...mapGetters(['getDateCourse']),
  },
  components : {
    SortList
  },
}
</script>

<style scoped>
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
  line-height: 45px;
  color : #3273e4;
  margin-right: 5px;
}
.itemPick {
  font-weight: bolder;
  color : #3273e4;
}
.shareBtn {
  line-height: 45px;
  color : #62acde;
  margin-right: 5px;
}
/* url입력 양식 */
.url-container {
  border : dashed red;
}
.inputURL {
  height: 1rem;
}
.existURL {
  display : none;
}
.linkText {
  color : #c627ee;
  font-weight: bold;
}
/* --url입력 양식-- */
.removeBtn {
  line-height: 45px;
  color : #62acde;
  margin-left: 5px;
}
</style>