<template>
  <div>
    <li v-for="(course, index) in getDateCourse" v-bind:key="course.item">
      <span v-on:click="checkCourse(course)">
        <i class="pickBtn fab fa-font-awesome-flag"></i>
      </span>
      <span v-bind:class="{itemPick : course.completed}">
        {{ course.item }}
      </span>
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
.removeBtn {
  line-height: 45px;
  color : #62acde;
  margin-left: 5px;
}
</style>