<template>
  <section class="list_cont">
    <Header></Header>
    <ToolBar></ToolBar>
    <li v-for="list in CourseList" :key="list.course">
      <div class="item_cont">
        <!-- StartView 진입 -->
        <router-link to="/start">
          <i class="fas fa-heart-square" @click="startOneCourse(list)"></i>
        </router-link>
        <!-- // -->
        <li class="name_cont" v-for="item in list.course" :key="item.name">
          {{ item.name }}
          <div class="arrow_cont">
            <i class="fas fa-arrow-down"></i>
          </div>
        </li>
        <span class="remove_cont" @click="deleteOneCourse(list)">
          <i class="far fa-trash-alt"></i>
        </span>
      </div>
    </li>
  </section>
</template>

<script>
import Header from '@/components/common/Header.vue';
import ToolBar from '@/components/common/ToolBar.vue'

export default {
  components: {
    Header,
    ToolBar
  },
  computed: {
    CourseList() {
      return this.$store.state.courseList;
    }
  },
  methods : {
    startOneCourse(list) {
      this.$store.dispatch('START_COURSE', list)
    },
    deleteOneCourse(list) {
      this.$store.dispatch('DELETE_COURSE', list.name);
    }
  },
  created() {
    this.$store.dispatch('FETCH_COURSE_LIST');
  },
}
</script>

<style scoped>
li {
  list-style: none;
}
.list_cont {
  height: 80vh;
  margin: 0 2em 2em 2em;
}
.fa-heart-square {
  float: left;
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer
}
.item_cont {
  text-align: center;
  margin: 15px;
  padding : 1rem;
  background: rgba(124, 198, 255, 0.247);
  border-radius: 0.5em;
  box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.name_cont:nth-last-child(2) .arrow_cont {
  display: none;
}
.arrow_cont {
  margin: 0.5em;
}
.fa-trash-alt {
  width: 1em;
  float: right;
  color : #62acde;
  cursor: pointer;
}
</style>