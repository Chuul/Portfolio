<template>
  <section>
    <li v-for="(course, index) in getDateCourse" :key="course.item">
      <!-- <div class="displayStroedList"> -->
      <div v-if="Array.isArray(course)" class="displayStroedList">
        <div v-on:click="checkIndex(course, index)">##############</div>
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
          'index : ', {{ index }}
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
    ...mapGetters(['getDateCourse']),
  },
  methods : {
    checkIndex(course, index){
      console.log('course : ',course);
      console.log('index : ', index);
    },
    checkCourse(course, index) {
      this.$store.commit('checkOneCourse', {course, index});
    },
    removeStoredCourse(course, index) {
      localStorage.removeItem('loglevel:webpack-dev-server')
      this.$store.commit('removeOneStoredCourse', {course, index});
    },
  }
}
</script>

<style scoped>
li {
  list-style: none;
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
.arrow-cont {
  margin-top: 0rem;
}
.list-cont:nth-last-child(2) .arrow-cont {
  display: none;
}
.linkText {
  color : #ee27bc;
  font-weight: bold;
}
.remove-cont {
  float: right;
  color : #62acde;
  margin : 0 5px;
}
</style>