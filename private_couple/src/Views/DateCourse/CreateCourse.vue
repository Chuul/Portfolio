<template>
  <section>
    <button class="createBtn" v-on:click="createCourse()">코스생성</button>
    <!-- <template v-if="this.$store.state.selectedCourse !== []"> -->
      <KakaoMap></KakaoMap>
      <draggable>
        <li class="itemList" v-for="item in getSelectedCourse" v-bind:key="item.item">
          <!-- 아이템표시 -->
            <template v-if="item.url !== ''">
              <a class="linkText" :href="item.url" target="_blank">
                {{item.item}}
              </a>
            </template>
            <template v-else>
              {{ item.item }} 
            </template>
            <span class="moveList">
              <i class="far fa-line-height"></i>
            </span>
            <div class="arrowContainer">
              <a :href="`https://map.kakao.com/link/to/${item},${37.402056,127.108212}`">
                <i class="fas fa-arrow-down"></i>
              </a>
            </div>
        </li>
      </draggable>
      <button>코스 저장</button>
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
.itemList {
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