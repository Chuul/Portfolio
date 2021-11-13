<template>
  <section class="list-cont">
    <SortList></SortList>
    <li v-for="(course, index) in getDateCourse" v-bind:key="course.item" v-bind:class="{filterItem : !course.filtered}">
      <!-- 체크버튼 -->
      <span class="checkBtn-cont" v-on:click="checkedItem(course)"> 
        <template v-if="course.checked !== false">
          <i class="checkBtn fas fa-check-circle"></i>
        </template>
        <template v-else>
          <i class="checkBtn far fa-check-circle"></i>
        </template>
      </span>
      <!-- 아이템표시 -->
      <span>
        <a v-if="course.url !== ''" v-bind:href="course.url" target="_blank">
          {{course.item}}
        </a>
        <span v-else>
          {{course.item}}
        </span>
      </span>
      <!-- 버튼 컨테이너 -->
      <span class="utilBtn-cont">
        <!-- URL 버튼 -->
        <span class="url-cont">
          <!-- URL 실행 -->
          <span v-on:click="openURL(course)">
            <span v-if="course.url == ''">
              <i v-bind:class="{checkURL : course.urlCheck}" class="shareBtn fas fa-share-square"></i>
            </span>
            <span v-else>
              <i v-bind:class="{checkURL : course.urlCheck}" class="existBtn fas fa-share-square"></i>
            </span>
          </span>
          <!-- URL 양식 -->
          <span class="showURL" v-bind:class="{checkURL : !course.urlCheck}">
            <!-- <span class="backBtn-cont" > -->
            <i class="backBtn fas fa-undo" v-on:click="openURL(course)"></i>
            <!-- </span> -->
            <input type="text" class="inputURL" v-model="urlText" v-on:keyup.enter="attachURL(course)" placeholder="URL을 입력하세요.">
            <!-- <span class="addBtn-cont" v-on:click="attachURL(course)"> -->
              <i class="addBtn fas fa-plus" v-on:click="attachURL(course)"></i>
            <!-- </span> -->
          </span>
        </span>
        <!-- 주소 버튼 -->
        <span class="position-cont">
          <!-- 주소 실행 -->
          <span v-on:click="openPos(course)">
            <span v-if="course.pos == ''">
              <i v-bind:class="{existPOS : course.posCheck}" class="shareBtn fas fa-map-marker-alt"></i>
            </span>
            <span v-else>
              <i v-bind:class="{existPOS : course.posCheck}" class="existBtn fas fa-map-marker-alt"></i>
            </span>
          </span>
          <!-- 주소 양식 -->
          <span class="showURL" v-bind:class="{existPOS : !course.posCheck}">
            <!-- <span class="backBtn-cont" v-on:click="openPos(course)"> -->
              <i class="backBtn fas fa-undo"  v-on:click="openPos(course)"></i>
            <!-- </span> -->
            <input type="text" class="inputURL" v-model="posText" v-on:keyup.enter="attachPos(course)" placeholder="주소를 입력하세요.">
            <!-- <span v-on:click="attachPos(course)"> -->
              <i class="fas fa-plus" v-on:click="attachPos(course)"></i>
            <!-- </span> -->
          </span>
        </span>
        <!-- 삭제 버튼 -->
        <span class="remove-cont" v-on:click="removeCourse(course, index)">
          <i class="far fa-trash-alt"></i>
        </span>
      </span>
    </li>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import SortList from './SortList.vue';

export default {
  components : {
    SortList,
  },
  data() {
    return {
      urlText : "",
      posText : ""
    }
  },
  computed : {
    ...mapGetters(['getDateCourse']),
  },
  methods : {
    checkedItem(course) {
      this.$store.commit('checkOneItem', course);
    },
    openURL(course) {
      this.$store.commit('openURLText', course);
    },
    attachURL(course) {
      const url = this.urlText;
      this.$store.commit('attachOneURL', {course, url});
      this.urlText = "";
    },
    openPos(course) {
      this.$store.commit('openPosTxt', course);
    },
    attachPos(course) {
      const pos = this.posText;
      this.$store.commit('attachOnePOS', {course, pos});
      this.posText = "";
    },
    removeCourse(course, index) {
      this.$store.commit('removeOneCourse', {course, index});
    },
    
  },
  
}
</script>

<style scoped>
.list-cont {
  margin : 0;
}
li {
  list-style: none;
  text-align: center;
  /* min-height: 50px; */
  height: 2em;
  line-height: 2em;
  margin: 1em 0;
  padding: 0 1em;
  font-family: 'Dongle', sans-serif;
  font-size: 1.5em;
  font-weight: 300;
  background: white;
  border-radius: 0.5em;
  box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.filterItem {
  display : none;
}
.checkBtn {
  float: left;
  margin : 0.5em;
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer
}
.utilBtn-cont {
  float : right;
}
.url-cont {
  display: inline-block;
  margin-right : 1em;
  cursor: pointer;
}
.checkURL {
  display : none;
}
/* url실행 */
.showURL {
  border-radius: 0.5em;
  background-color: #F6F6F6;
  padding: 0.2em 0.4em;
}
/* .backBtn-cont {
  margin-right : 0.5em;
} */
/* ******************뭔가 display:none이랑 관련 있을 듯...showURL 클래스를 다시 보자 */
.backBtn {
  display: inline-block;
  padding-top: 0.5em;
  margin-right : 0.5em;
}
.inputURL {
  border-style: none;
  border-radius: 0.5em;
  height: 1.5em;
}
/* .addBtn-cont {
  margin-left : 0.5em;
} */
.shareBtn {
  color : rgba(124, 198, 255, 0.8);
}
.existBtn {
  color :  #ffa7e5;
}
.position-cont {
  margin-right : 1em;
  cursor: pointer;
}
.existPOS {
  display: none;
}
.remove-cont {
  margin-right : 1em;
  color : rgba(124, 198, 255, 0.8);
}
.fa-trash-alt {
  cursor: pointer;
}
</style>