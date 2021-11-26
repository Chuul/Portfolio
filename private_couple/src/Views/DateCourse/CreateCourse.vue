<template>
  <section class="create-cont">
    <button class="createBtn" v-on:click="createCourse()">코스생성</button>
    <KakaoMap></KakaoMap>
    <draggable :list="getSelectedCourse" :disabled="!enabled" @start="dragging = true" @end="dragging = false">
      <li class="courseList" v-for="course in getSelectedCourse" v-bind:key="course.item">
        <!-- 아이템표시 -->
          <template v-if="course.url !== ''">
            <a class="linkText" :href="course.url" target="_blank">
              {{ course.item.slice(11) }}
            </a>
          </template>
          <template v-else>
            {{ course.item.slice(11) }} 
          </template>
          <span class="moveListBtn">  
            <i class="far fa-line-height"></i>
          </span>
          <div class="arrow-cont">
            <a :href="`https://map.kakao.com/link/to/${course},${37.402056,127.108212}`">
              <i class="fas fa-arrow-down"></i>
            </a>
          </div>
      </li>
    </draggable>
    <button class="storeBtn" v-on:click="storeCourse()">코스 저장</button>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import KakaoMap from '../../components/KakaoMaps.vue';
import draggable from 'vuedraggable';

export default {
  components : {
    KakaoMap,
    draggable
  },
  data() {
    return {
      enabled: true,
      dragging: false,
    }
  },
  computed : {
    ...mapGetters(['getSelectedCourse']),
  },
  methods : {
    createCourse() {
      this.$store.commit('createOneCourse');
    },
    storeCourse() {
      this.$store.commit('storeOneCourse');
    }
  }
}
</script>

<style scoped>
.create-cont {
  text-align: center;
}
.createBtn {
  margin: 1em 0;
  background: rgba(124, 198, 255, 0.247);
  border-style : none;
  border-radius: 0.5em;
  padding : 0.6em 1.5em;
  font-size : 1em;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  color : rgb(86, 153, 253);
  cursor : pointer;
  box-shadow: 0.5em -0.2em 10px 1px rgba(143, 143, 143, 0.2);
}
li {
  margin-top: 1em;
  list-style: none;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  padding: 0 0.9eem;
  background: white;
  border-radius: 0.5em;
  font-family: 'Dongle', sans-serif;
  font-size: 1.5em;
  font-weight: 300;
  box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.linkText {
  color : #ee27bc;
  font-weight: bold;
}
.courseList {
  margin-bottom: 3rem;
}
.moveListBtn {
  float : right;
  margin-right: 1em;
}
.moveListBtn i {
  color: #e1e1fd;
}
.moveListBtn i:hover {
  cursor: pointer;
}
.arrow-cont {
  margin-top: 0rem;
}
li:last-child .arrow-cont {
  display: none;
}
.storeBtn {
  margin: 1em 0;
  background: rgba(124, 198, 255, 0.247);
  border-style : none;
  border-radius: 0.5em;
  padding : 0.6em 1.5em;
  font-size : 1em;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  color : rgb(86, 153, 253);
  cursor : pointer;
  box-shadow: 0.5em -0.2em 10px 1px rgba(143, 143, 143, 0.2);
}
</style>