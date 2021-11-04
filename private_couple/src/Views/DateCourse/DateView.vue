<template>
  <section>
    <header>Go on a Date</header>
    <AddItem></AddItem>
    <ListingItem></ListingItem>
    <CreateCourse></CreateCourse>
  </section>
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
section {
  margin : 0 2em;
}
header {
  font-family: 'Noto Sans KR', sans-serif;
}
</style>