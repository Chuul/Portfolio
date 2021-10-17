<template>
  <div>
    <button v-on:click="createCourse()">Create Course</button>
    <!-- <template v-if="this.$store.state.selectedCourse !== []"> -->
      <KakaoMap></KakaoMap>
      <li v-for="item in this.$store.state.selectedCourse" v-bind:key="item.item">
        {{item.item}}
      </li>
    <!-- </template> -->
  </div>
</template>

<script>
import KakaoMap from '../../components/KakaoMaps.vue'

export default {
  components : {
    KakaoMap
  },
  methods : {
    createCourse() {
      this.$store.commit('createOneCourse')
    }
  }
}
</script>

<styles scoped>

</styles>