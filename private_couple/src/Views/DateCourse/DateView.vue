<template>
  <div>
    <h2>Go on a Date</h2>
    <AddItem></AddItem>
    <ListingItem></ListingItem>
    <CreateCourse></CreateCourse>
  </div>
</template>

<script>
import AddItem from './AddItem.vue'
import ListingItem from './ListingItem.vue'
import CreateCourse from './CreateCourse.vue'

export default {  
  components : {
    AddItem,
    ListingItem,
    CreateCourse
  },
}
</script>

<style>
h2 {
  font-family: 'Noto Sans Mono', monospace;
}
</style>