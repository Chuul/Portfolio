<template>
  <section>
    <li v-for="(storedList, index) in getDateCourse" :key="storedList.item">
      <div v-if="Array.isArray(storedList)" class="displayStroedList">
        <li class="list-cont" v-for="storedItem in storedList" :key="storedItem.item">
          <a v-if="storedItem.url !== ''" v-bind:href="storedItem.url" class="linkText" target="_blank">
            {{storedItem.item}}
          </a>
          <span v-else>
            {{storedItem.item}}
          </span>
          <div class="arrow-cont">
            <i class="fas fa-arrow-down"></i>
          </div>
        </li>
        <span class="remove-cont" v-on:click="removeStoredCourse(storedList, index)">
          <i class="far fa-trash-alt"></i>
        </span>
      </div>
    </li>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed : {
    ...mapGetters(['getDateCourse']),
    // storedCourseList() {
    //   let arr = [];
    //   let base = this.$store.state.dateCourses;
    //   for(let i = 0 ; i < base.length ; i++) {
    //     // typeof로 구하면 모두 object이므로 배열 여부 체크 불가
    //     if(Array.isArray(base[i])) {
    //       arr.push(base[i]);
    //     }
    //   }
    //   return arr;
    // }
  },
  methods : {
    removeStoredCourse(storedList, index) {
      this.$store.commit('removeOneStoredCourse', {storedList, index});
    },
  }
}
</script>

<style scoped>
li {
  list-style: none;
}
.displayStroedList {
  text-align: center;
  margin: 15px;
  padding : 1rem;
  background: rgba(124, 198, 255, 0.247);
  border-radius: 0.5em;
  box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.arrow-cont {
  margin-top: 0rem;
}
.list-cont:nth-last-child(2) .arrow-cont {
  display: none;
}
.linkText {
  color : #ee27bc;
  font-weight: bold;
}
.remove-cont {
  float: right;
  color : #62acde;
  margin : 0 5px;
}
</style>