<!--
우선순위 
2. 새로고침해도 리스트 없어지지 않게 하기
3. 리스트 삭제해도 없어지지 않게 하기  -->
<template>
  <section>
    <li v-for="(storedList, index) in getStoredCourse" :key="storedList.item">
      <div class="storedList">
        <li class="listContainer" v-for="storedItem in storedList" :key="storedItem.item">
          <a v-if="storedItem.url !== ''" v-bind:href="storedItem.url" class="linkText" target="_blank">
            {{storedItem.item}}
          </a>
          <span v-else>
            {{storedItem.item}}
          </span>
          <div class="arrowContainer">
            <i class="fas fa-arrow-down"></i>
          </div>
        </li>
        <span class="removeContainer" v-on:click="removeStoredCourse(storedList, index)">
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
    ...mapGetters(['getStoredCourse']),
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
.storedList {
  background: rgb(248, 173, 244);
  margin: 15px;
  padding : 1rem;
}
.arrowContainer {
  margin-top: 0rem;
}
.listContainer:nth-last-child(2) .arrowContainer {
  display: none;
}
.linkText {
  color : #ee27bc;
  font-weight: bold;
}
.removeContainer {
  color : #62acde;
  margin : 0 5px;
}
</style>