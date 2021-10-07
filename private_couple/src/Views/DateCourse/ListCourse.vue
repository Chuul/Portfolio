<template>
  <div>
    <li v-for="(course, index) in getDateCourse" v-bind:key="course.item">
      <span>
        <button v-on:click="checkCourse(course, index)">Check</button>
      </span>
      <span v-bind:class="{textCompleted : course.completed}">
        {{ course.item }}
      </span>
      <span>
        <button v-on:click="removeCourse(course, index)">REMOVE</button>
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
    }
  },
  computed : {
    ...mapGetters(['getDateCourse'])
  }
  
}
</script>

<style>
.textCompleted {
  color : red;
  font-weight: bold;
}
</style>