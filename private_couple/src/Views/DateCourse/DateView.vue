<template>
  <div>
    <h2>Go on a Date</h2>
    <AddCourse></AddCourse>
    <ListCourse></ListCourse>
  </div>
</template>

<script>
import AddCourse from './AddCourse.vue'
import ListCourse from './ListCourse.vue'

export default {  
  components : {
    AddCourse,
    ListCourse
  },
}
</script>

<style>
h2 {
  font-family: 'Noto Sans Mono', monospace;
}
</style>