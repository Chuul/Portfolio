<template>
  <section class="lastcourse-cont">
    <li v-for="(course, index) in getPrevCourse" :key="course.item">
      <div class="course-cont">
        <span>
          {{ course.item }}
        </span>
        <span>
          {{ course.comment }}
        </span>
        <span class="remove-cont" @click="removeCourse(course, index)">
          <i class="far fa-trash-alt"></i>
        </span>
      </div>
    </li>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed : {
    ...mapGetters(['getPrevCourse']),
  },
  methods : {
    removeCourse(course, index) {
       this.$store.commit('removePrevCourse', {course, index});
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
}
.lastcourse-cont {
  height: 80vh;
  margin: 2em;
  padding : 1em;
  background: rgba(124, 198, 255, 0.247);
}
.course-cont {
  text-align: center;
  margin: 15px;
  padding : 1rem;
  background: rgba(124, 198, 255, 0.247);
  border-radius: 0.5em;
  box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.remove-cont {
  float: right;
  margin-right : 1em;
  color : rgba(124, 198, 255, 0.8);
}
</style>