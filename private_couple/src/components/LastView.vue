<template>
  <section class="lastcourse-cont">
    <draggable :list="getPrevCourse" :disabled="!enabled" @start="dragging = true" @end="dragging = false">
      <li v-for="(course, index) in getPrevCourse" :key="course.item">
        <div class="course-cont">
          <span>
            {{ course.item }}
          </span>
          <span>
            {{ course.comment }}
          </span>
          <span class="moveListBtn">  
            <i class="far fa-line-height"></i>
          </span>
          <span class="remove-cont" @click="removeCourse(course, index)">
            <i class="far fa-trash-alt"></i>
          </span>
        </div>
      </li>
    </draggable>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  data() {
    return {
      enabled: true,
      dragging: false,
    }
  },
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
.moveListBtn {
  float : right;
  margin-right: 1em;
}
.moveListBtn i {
  color: rgb(86, 153, 253);
}
.moveListBtn i:hover {
  cursor: pointer;
}
.remove-cont {
  float: right;
  margin-right : 1em;
  color : rgba(124, 198, 255, 0.8);
}
</style>