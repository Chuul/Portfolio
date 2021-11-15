<template>
  <section class="lastcourse-cont">
    <li v-for="item in getStoredCourse" :key="item">
      <div class="displayStroedList">
        {{ item }}
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
}
</script>

<style scoped``>
li {
  list-style: none;
}
.lastcourse-cont {
  height: 80vh;
  margin: 2em;
}
.displayStroedList {
  text-align: center;
  margin: 15px;
  padding : 1rem;
  background: rgba(124, 198, 255, 0.247);
  border-radius: 0.5em;
  box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
</style>