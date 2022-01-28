<template>
  <section>
    <KakaoMap></KakaoMap>
    <CreateViewAddItem></CreateViewAddItem>
    <CreateViewList></CreateViewList>
    <CreateViewAddCourse></CreateViewAddCourse>
  </section>
</template>

<script>
import KakaoMap from "@/components/common/API/KakaoMaps.vue";
import CreateViewAddItem from './CreateViewAddItem.vue';
import CreateViewList from './CreateViewList.vue';
import CreateViewAddCourse from './CreateViewAddCourse.vue';

export default {  
  created() {
    console.log('최상위 created');
  },
  mounted() {
    console.log('최상위 mounted');
  },
  updated() {
    console.log('최상위 updated');
  },
  components : {
    KakaoMap,
    CreateViewAddItem,
    CreateViewList,
    CreateViewAddCourse
  },
}
</script>

<style>
section {
  margin : 0 2em;
}
</style>