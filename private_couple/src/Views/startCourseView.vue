<template>
  <section class="course-cont">
    <li class="list-cont" v-for="(list, index) in getStartCourse[0]" :key="list.item">
      <a v-if="list.url !== ''" v-bind:href="list.url" class="linkText" target="_blank">
        {{list.item}}
      </a>
      <span v-else>
        {{list.item}}
      </span>
      <!-- 버튼 컨테이너 -->
      <span class="utilBtn-cont">
        <!-- URL 버튼 -->
        <span class="url-cont">
          <!-- URL 실행 -->
          <span v-on:click="openURL(list)">
            <span v-if="list.url == ''">
              <i v-bind:class="{checkURL : list.urlCheck}" class="shareBtn fas fa-share-square"></i>
            </span>
            <span v-else>
              <i v-bind:class="{checkURL : list.urlCheck}" class="existBtn fas fa-share-square"></i>
            </span>
          </span>
          <!-- URL 양식 -->
          <span class="showURL" v-bind:class="{checkURL : !list.urlCheck}">
            <!-- <span class="backBtn-cont" > -->
            <i class="backBtn fas fa-undo" v-on:click="openURL(list)"></i>
            <input type="text" class="inputURL" v-model="urlText" v-on:keyup.enter="attachURL(list)" placeholder="URL을 입력하세요.">
              <i class="addBtn fas fa-plus" v-on:click="attachURL(list)"></i>
          </span>
        </span>
        <!-- 주소 버튼 -->
        <span class="position-cont">
          <!-- 주소 실행 -->
          <span v-on:click="openPos(list)">
            <span v-if="list.pos == ''">
              <i v-bind:class="{existPOS : list.posCheck}" class="shareBtn fas fa-map-marker-alt"></i>
            </span>
            <span v-else>
              <i v-bind:class="{existPOS : list.posCheck}" class="existBtn fas fa-map-marker-alt"></i>
            </span>
          </span>
          <!-- 주소 양식 -->
          <span class="showURL" v-bind:class="{existPOS : !list.posCheck}">
              <i class="backBtn fas fa-undo"  v-on:click="openPos(list)"></i>
            <input type="text" class="inputURL" v-model="posText" v-on:keyup.enter="attachPos(list)" placeholder="주소를 입력하세요.">
              <i class="fas fa-plus" v-on:click="attachPos(list)"></i>
            <!-- </span> -->
          </span>
        </span>
        <!-- 삭제 버튼 -->
        <span class="remove-cont" v-on:click="removeCourse(list, index)">
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
      urlText : "",
      posText : ""
    }
  },
  computed : {
    ...mapGetters(['getStartCourse'])
  },
  methods : {
    openURL(list) {
      this.$store.commit('openURLText', list);
    },
    attachURL(list) {
      const url = this.urlText;
      this.$store.commit('attachOneURL', {list, url});
      this.urlText = "";
    },
    openPos(list) {
      this.$store.commit('openPosTxt', list);
    },
    attachPos(list) {
      const pos = this.posText;
      this.$store.commit('attachOnePOS', {list, pos});
      this.posText = "";
    },
    removeCourse(list, index) {
      this.$store.commit('removeOneCourse', {list, index});
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
.course-cont {
  height: 90vh;
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