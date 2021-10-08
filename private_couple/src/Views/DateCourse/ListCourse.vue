<template>
  <div>
    <li v-for="(course, index) in getDateCourse" v-bind:key="course.item">
      <span v-on:click="checkCourse(course)">
        <i class="pickBtn fab fa-font-awesome-flag"></i>
      </span>
      <span v-bind:class="{itemPick : course.completed}">
        {{ course.item }}
      </span>
      <!-- URL로직 -->
      <span>
        <!-- URL실행 -->
        <span v-on:click="openInput(course)">
          <i v-bind:class="{existURL : course.urlCheck}" class="shareBtn fas fa-share-square"></i>
        </span>
        <!-- URL양식 -->
        <span class="url-container" v-bind:class="{existURL : !course.urlCheck}">
          <span v-on:click="openInput(course)">
            <i class="fas fa-undo"></i>
          </span>
          <input type="text" class="inputURL">
          <span v-on:click="attachURL(course)">
            <i class="fas fa-plus"></i>
          </span>
        </span>
      </span>
      <!-- /URL로직 -->
      <span v-on:click="removeCourse(course, index)">
        <i class="removeBtn far fa-trash-alt"></i>
      </span>
    </li>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods : {
    removeCourse(course, index) {
      this.$store.commit('removeOneCourse', {course, index})
    },
    checkCourse(course) {
      this.$store.commit('checkOneCourse', course)
    },
    openInput(course) {
      this.$store.commit('addOneURL', course);
    },
    attachURL(course) {
      this.$store.commit('attachOneURL', course);
    }
  },
  computed : {
    ...mapGetters(['getDateCourse'])
  }
  
}
</script>

<style>
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
.pickBtn {
  line-height: 45px;
  color : #62acde;
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
/* --url입력 양식-- */
.removeBtn {
  line-height: 45px;
  color : #62acde;
  margin-left: 5px;
}
</style>