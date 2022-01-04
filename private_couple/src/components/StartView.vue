<template>
  <section class="course-cont">
    <h2>코스 진행중...</h2>
    <li class="list-cont" v-for="item in startList" :key="item.name">
      <span class="checkBtn-cont" @click="checkedItem()"> 
        <i class="checkBtn fas fa-check-circle"></i>
      </span>
      {{ item.name }}
      <div class="arrow-cont">
        <i class="fas fa-arrow-down"></i>
      </div>
    </li>
  </section>
</template>

<script>
import { startCourse, deleteStartCourse, getStartList } from '@/api/index';

export default {
  data() {
    return {
      startList: [],
    }
  },
  methods : {
    async startOneCourse() {
      const list = this.$store.state.startCourse;
      console.log(list);
      await deleteStartCourse();
      await startCourse(list);
      const {data} = await getStartList();
      this.startList = data[0].start.course;
      console.log("this.startList : ",this.startList);
    },
  },
  created() {
    this.startOneCourse();
  },
}
</script>

<style scoped>
section {
  margin : 0;
}
li {
  list-style: none;
}
h2 {
  text-align: center;
  font-family: 'Dongle', sans-serif;
  font-size: 2em;
  font-weight: 700;
}
.checkBtn {
  float: left;
  margin : 0.5em;
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer
}
.course-cont {
  height: 80vh;
  margin: 2em;
  background: rgba(124, 198, 255, 0.247);
}
.list-cont:last-child .arrow-cont {
  display: none;
}
.arrow-cont {
  margin: 0.5em;
}
</style>