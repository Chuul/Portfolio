<template>
  <div>
    <h1>데이트 코스</h1>
    <!-- 추가로직 -->
    <span>
      <input type="text" v-model="newDateCourse" v-on:keyup.enter="addCourse">
      <button v-on:click="addCourse">ADD</button>
    </span>
    <!-- 표시로직 -->
    <li v-for="(course, index) in this.dateCourse" v-bind:key="course">
      <span>
        <button v-on:click="checkCourse()">Check</button>
      </span>
      {{ course }}
      <span>
        <button v-on:click="removeCourse(course, index)">REMOVE</button>
      </span>
    </li>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newDateCourse : "",
      dateCourse : []
    }
  },
  methods : {
    addCourse() {
      localStorage.setItem(this.newDateCourse, this.newDateCourse);
      this.clearInput()
    },
    clearInput() {
      this.newDateCourse = ""
    },
    removeCourse(course, index) {
      console.log(course, index);
      localStorage.removeItem(course);
      this.dateCourse.splice(index, 1);
    },
    checkCourse() {

    }
  },
  created() {
    if(localStorage.length > 0) {
      for(let i = 0 ; i < localStorage.length ; i++) {
        const obj = {completed : false, item : this.newDateCourse}
        console.log(obj);
        // this.dateCourse.push(localStorage.key(i))
      }
    }
  }
}
</script>

<style>

</style>