<template>
  <section class="course-cont">
    <!-- stored -->
    <li class="list-cont" v-for="(course, index) in getStartCourse" :key="course.item">
      <!-- 체크버튼 -->
      <span class="checkBtn-cont" v-on:click="checkedItem(course)"> 
        <template v-if="course.checked !== false">
          <i class="checkBtn fas fa-check-circle"></i>
        </template>
        <template v-else>
          <i class="checkBtn far fa-check-circle"></i>
        </template>
      </span>
      <!-- 아이템 표시 -->
      <a v-if="course.url !== ''" v-bind:href="course.url" class="linkText" target="_blank">
        {{course.item}}
      </a>
      <span v-else>
        {{course.item}}
      </span>
      <!-- 평가 영역 -->
      <span>
        <template v-if="course.checked">
          <button v-on:click="ratingItem(course)">
              평가하기
          </button>
          <div v-show="course.ratingChecked">
            <section class="rating-cont">
              <input type="text" v-model="comment">
              <button v-on:click="completRatingItem(course)">
                  평가완료
              </button>
              <button v-on:click="ratingItem(course)">
                  취소
              </button>
            </section>    
          </div>
        </template>
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
            <i class="backBtn fas fa-undo" v-on:click="openURL(course)"></i>
            <input type="text" class="inputURL" v-model="urlText" v-on:keyup.enter="attachURL(course)" placeholder="URL을 입력하세요.">
            <i class="addBtn fas fa-plus" v-on:click="attachURL(course)"></i>
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
              <i class="backBtn fas fa-undo"  v-on:click="openPos(course)"></i>
            <input type="text" class="inputURL" v-model="posText" v-on:keyup.enter="attachPos(course)" placeholder="주소를 입력하세요.">
              <i class="fas fa-plus" v-on:click="attachPos(course)"></i>
            <!-- </span> -->
          </span>
        </span>
        <!-- 삭제 버튼 -->
        <span class="remove-cont" v-on:click="removeCourse(course, index)">
          <i class="far fa-trash-alt"></i>
        </span>
      </span>
      <div class="arrow-cont">
        <i class="fas fa-arrow-down"></i>
      </div>
    </li>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      comment : "",
      urlText : "",
      posText : "",
    }
  },
  computed : {
    ...mapGetters(['getStartCourse']),
  },
  methods : {
    ratingItem(course){ 
      // this.is_show = !this.is_show;
      console.log(course.ratingChecked);
      course.ratingChecked = !course.ratingChecked;
    },
    completRatingItem(course) {
      this.is_show = false;
      const obj = this.getStartCourse;
      const commentContent = this.comment;
      this.$store.commit('ratingStartItem', {course, commentContent, obj});
      this.comment = '';
    },
    checkedItem(course) {
      const obj = this.getStartCourse;
      this.$store.commit('checkedStartItem', {course, obj});
    },
    openURL(course) {
      const obj = this.getStartCourse;
      this.$store.commit('openStartURLText', {course, obj});
    },
    attachURL(course) {
      const url = this.urlText;
      const obj = this.getStartCourse;
      this.$store.commit('attachStartURL', {course, url, obj});
      this.urlText = "";
    },
    openPos(course) {
      const obj = this.getStartCourse;
      this.$store.commit('openStartPosTxt', {course, obj});
    },
    attachPos(course) {
      const pos = this.posText;
      const obj = this.getStartCourse;
      this.$store.commit('attachStartPOS', {course, pos, obj});
      this.posText = "";
    },
    removeCourse(course, index) {
      const obj = this.getStartCourse;
      this.$store.commit('removeStartCourse', {course, index, obj});
    },
  }
}
</script>

<style scoped>
section {
  margin : 0;
}
li {
  list-style: none;
}
.rating-cont {
  margin : 1em;
  border : 1px solid
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
.linkText {
  color : #ee27bc;
  font-weight: bold;
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
.arrow-cont {
  margin: 0.5em;
}
</style>