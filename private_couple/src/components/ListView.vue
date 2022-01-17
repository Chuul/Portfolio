<template>
  <section class="list-cont">
    <Header></Header>
    <ToolBar></ToolBar>
    <li v-for="list in courseList" :key="list.course">
      <div class="item-cont">
        <router-link to="/start">
          <i class="fas fa-heart-square" @click="startOneCourse(list)"></i>
        </router-link>
        <li class="name-cont" v-for="item in list.course" :key="item.name">
          {{ item.name }}
          <div class="arrow-cont">
            <i class="fas fa-arrow-down"></i>
          </div>
        </li>
        <span class="remove-cont" @click="deleteOneCourse(list)">
          <i class="far fa-trash-alt"></i>
        </span>
        <span class="moveListBtn">  
          <i class="far fa-line-height"></i>
        </span>
      </div>
    </li>
  </section>
</template>

<script>
import Header from '@/components/common/Header.vue';
import ToolBar from '@/components/common/ToolBar.vue'
import { 
  getCourseList, 
  deleteCourse, 
  replaceStartCourse  
} from '@/api/index';
import EventBus from '../utils/bus';

export default {
  components: {
    Header,
    ToolBar
  },
  data() {
    return {
      courseList: [],
      enabled: true,
      dragging: false,
    }
  },
  methods : {
    async getData() {
      const userData = {
        email: this.$store.state.email,
        username: this.$store.state.username,
      }
      const { data } = await getCourseList(userData);
      this.courseList = data;
    },
    async deleteOneCourse(list) {
      await deleteCourse(list.name);
      this.getData();
    },
    startOneCourse(list) {
      const userData = {
          createdBy: this.$store.state.email,
          course: list.course 
        }
      this.$store.commit('storeStartCourse', list.course);
      replaceStartCourse(userData);
    }
  },
  created() {
    this.getData();
  },
  updated() {
    EventBus.$on('refresh', () => this.getData());
  },
}
</script>

<style scoped>
li {
  list-style: none;
}
.list-cont {
  height: 80vh;
  margin: 0 2em 2em 2em;
}
.fa-heart-square {
  float: left;
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer
}
.item-cont {
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
/* .checkBtn {
  float: left;
  margin : 0.5em;
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer
} */
.name-cont:nth-last-child(3) .arrow-cont {
  display: none;
}
.arrow-cont {
  margin: 0.5em;
}
.linkText {
  color : #ee27bc;
  font-weight: bold;
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
.fa-trash-alt {
  width: 1em;
  float: right;
  color : #62acde;
  cursor: pointer;
}
</style>