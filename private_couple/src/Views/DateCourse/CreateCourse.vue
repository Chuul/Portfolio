<template>
  <section>
    <button class="createBtn" v-on:click="createCourse()">코스생성</button>
    <!-- <template v-if="this.$store.state.selectedCourse !== []"> -->
    <KakaoMap></KakaoMap>
    <draggable :list="getSelectedCourse" :disabled="!enabled" @start="dragging = true" @end="dragging = false">
      <li class="courseList" v-for="course in getSelectedCourse" v-bind:key="course.item">
        <!-- 아이템표시 -->
          <template v-if="course.url !== ''">
            <a class="linkText" :href="course.url" target="_blank">
              {{course.item}}
            </a>
          </template>
          <template v-else>
            {{ course.item }} 
          </template>
          <span class="moveList">
            <i class="far fa-line-height"></i>
          </span>
          <div class="arrowContainer">
            <a :href="`https://map.kakao.com/link/to/${course},${37.402056,127.108212}`">
              <i class="fas fa-arrow-down"></i>
            </a>
          </div>
      </li>
    </draggable>
    <button v-on:click="storeCourse()">코스 저장</button>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import KakaoMap from '../../components/KakaoMaps.vue';
import draggable from 'vuedraggable';

export default {
  order: 0,
  components : {
    KakaoMap,
    draggable
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      urlText : "",
      posText : ""
    }
  },
  computed : {
    ...mapGetters(['getSelectedCourse']),
  },
  methods : {
    createCourse() {
      this.$store.commit('createOneCourse');
    },
    storeCourse(course) {
      this.$store.commit('storeOneCourse', course);
    }
  }
}
</script>

<style scoped>
li {
  list-style: none;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.createBtn {
  margin: 10px 3px;
  background: rgba(124, 198, 255, 0.247);
  border-style : none;
  border-radius: 5px;
  padding : 10px 20px;
  font-size : 20px;
  color : rgb(86, 153, 253);
  cursor : pointer;
}
.linkText {
  color : #ee27bc;
  font-weight: bold;
}
.courseList {
  margin-bottom: 3rem;
}
.moveList {
  float : right;
}
.moveList i {
  color: #e1e1fd;
}
.moveList i:hover {
  cursor: pointer;
}
.arrowContainer {
  margin-top: 0rem;
}
li:last-child .arrowContainer {
  display: none;
}
</style>