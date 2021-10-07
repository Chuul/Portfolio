<template>
  <div>
    <h1>데이트 코스</h1>
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

</style>