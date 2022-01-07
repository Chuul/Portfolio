<template>
  <section class="last-cont">
    <div class="item-cont">
      <h3>이벤트</h3>
      <li v-for="item in itemList" :key="item">
        <span class="item-name">
          {{ item.name }}
        </span>
        <span v-if="item.comment !== ''">
          {{ item.comment }}
        </span>
        <span v-else></span>
      </li>
    </div>
    <div class="course-cont">
      <h3>코스</h3>
      <li v-for="course in courseList" :key="course">
        <div class="course-item-cont">
          <li class="course-item" v-for="item in course.list" :key="item.name">
            {{ item.name }}
            <i class="fas fa-arrow-right"></i>
          </li>
        </div>
        <span>
          {{ course.completeText }}
        </span>
      </li>
    </div>
  </section>
</template>

<script>
import { getLastList } from '@/api/index'

export default {
  data() {
    return {
      itemList : [],
      courseList : []
    }
  },
  methods : {
    async getData() {
      const { data } = await getLastList();
      this.itemList = data[0].item;
      this.courseList = data[1].course;
    },
  },
  created() {
    this.getData();
  },
}
</script>

<style scoped>
li {
  list-style: none;
  margin-bottom: 0.5em;
}
h3 {
  margin-bottom: 1.5em ;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
}
.last-cont {
  height: 80vh;
  margin: 2em;
  padding : 1em;
}
.item-cont {
  text-align: center;
  margin: 15px;
  padding : 1rem;
  background: rgba(124, 198, 255, 0.11);
  border-radius: 0.5em;
  box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.course-cont {
  text-align: center;
  margin: 15px;
  padding : 1rem;
  background: rgba(124, 198, 255, 0.11);
  border-radius: 0.5em;
  box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.item-name {
  float: left
}
.course-name {
  float: left
}
.course-item-cont {
  display: inline;
  float: left;
}
.course-item-cont li:last-child i {
  display: none;
}
.course-item {
  display: inline;
}
</style>