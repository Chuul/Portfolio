<template>
  <section class="courelist-cont">
    <li v-for="(course, index) in getStoredCourse" :key="course.item">
      <div class="displayStroedList">
        <router-link to="/startCourse">
          <i class="fas fa-heart-square" v-on:click="startCourse(course)"></i>
        </router-link>
        <li class="list-cont" v-for="storedItem in course" :key="storedItem.item">
          <a v-if="storedItem.url !== ''" v-bind:href="storedItem.url" class="linkText" target="_blank">
            {{storedItem.item}}
          </a>
          <span v-else>
            {{storedItem.item}}
          </span>
          <div class="arrow-cont">
            <i class="fas fa-arrow-down"></i>
          </div>
        </li>
        <span class="remove-cont" v-on:click="removeStoredCourse(course, index)">
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
    ...mapGetters(['getStoredCourse']),
  },
  methods : {
    startCourse(course) {
      this.$store.commit('startOneCourse', course);
    },
    removeStoredCourse(course, index) {
      this.$store.commit('removeOneStoredCourse', {course, index});
    },
  }
}
</script>

<style scoped>
li {
  list-style: none;
}
.courelist-cont {
  height: 80vh;
  margin: 2em;
}
.fa-heart-square {
  float: left;
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer
}
.displayStroedList {
  text-align: center;
  margin: 15px;
  padding : 1rem;
  background: rgba(124, 198, 255, 0.247);
  border-radius: 0.5em;
  box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.checkBtn {
  float: left;
  margin : 0.5em;
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer
}
.list-cont:nth-last-child(2) .arrow-cont {
  display: none;
}
.arrow-cont {
  margin: 0.5em;
}
.linkText {
  color : #ee27bc;
  font-weight: bold;
}
.fa-trash-alt {
  width: 1em;
  float: right;
  color : #62acde;
  cursor: pointer;
}
</style>