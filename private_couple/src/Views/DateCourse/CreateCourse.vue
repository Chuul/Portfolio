<template>
  <div>
    <button v-on:click="createCourse()">Create Course</button>
    <!-- <template v-if="this.$store.state.selectedCourse !== []"> -->
      <KakaoMap></KakaoMap>
      <draggable>
        <li class="itemList" v-for="(item, index) in getSelectedCourse" v-bind:key="item.item">
          <!-- 아이템표시 -->
          <div>
            <template v-if="item.url !== ''">
              <a class="linkText" :href="item.url" target="_blank">
                {{item.item}}
              </a>
            </template>
            <template v-else>
              {{ item.item }} 
            </template>
            <div class="arrowContainer" v-bind:class="{displayArrow : index == getSelectedCourse.length-1}">
              <a :href="`https://map.kakao.com/link/to/${item},${37.402056,127.108212}`">
                <i class="fas fa-arrow-down"></i>
              </a>
            </div>
          </div>
        </li>
      </draggable>
  </div>
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
      urlText : "",
      posText : ""
    }
  },
  computed : {
    ...mapGetters(['getSelectedCourse']),
  },
  methods : {
    createCourse() {
      this.$store.commit('createOneCourse')
    },
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
.linkText {
  color : #ee27bc;
  font-weight: bold;
}
.itemList {
  margin-bottom: 3rem;
}
.arrowContainer {
  margin-top: 0rem;
}
.displayArrow {
  display: none;
}
</style>