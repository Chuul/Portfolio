<template>
  <section>
    <CreateViewAddItem></CreateViewAddItem>
    <CreateViewList></CreateViewList>
    <CreateViewAddCourse></CreateViewAddCourse>
  </section>
</template>

<script>
import CreateViewAddItem from './CreateViewAddItem.vue'
import CreateViewList from './CreateViewList.vue'
import CreateViewAddCourse from './CreateViewAddCourse.vue'

export default {  
  components : {
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