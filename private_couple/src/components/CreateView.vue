<template>
  <section>
    <CreateViewAdd></CreateViewAdd>
    <CreateViewList></CreateViewList>
    <CreateViewMake></CreateViewMake>
  </section>
</template>

<script>
import CreateViewAdd from './CreateViewAdd.vue'
import CreateViewList from './CreateViewList.vue'
import CreateViewMake from './CreateViewMake.vue'

export default {  
  components : {
    CreateViewAdd,
    CreateViewList,
    CreateViewMake
  },
}
</script>

<style>
section {
  margin : 0 2em;
}
</style>