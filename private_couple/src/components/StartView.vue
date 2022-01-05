<template>
  <section class="course-cont">
    <h2>코스 진행중...</h2>
    <li class="list-cont" v-for="item in startList" :key="item.name">
      <i class="checkBtn far fa-check-circle" @click="toggleOneItem(item)" :class="{checkBtnChecked: item.checked}"></i>
      {{ item.name }}
      <div class="arrow-cont">
        <i class="fas fa-arrow-down"></i>
      </div>
    </li>
  </section>
</template>

<script>
// import { replaceStartCourse } from '@/api/index';

export default {
  data() {
    return {
      startList: [],
    }
  },
  methods : {
    async startOneCourse() {
      const list = this.$store.state.startCourse;
      this.startList = list;
      console.log('this.startList: ', this.startList)
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
  cursor : pointer;
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