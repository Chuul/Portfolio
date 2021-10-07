<template>
  <div>
    <span>
      <input type="text" v-model="newDateCourse" v-on:keyup.enter="addCourse">
      <button v-on:click="addCourse">ADD</button>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
       newDateCourse : ""
    }
  },
  methods : {
    addCourse() {
      if(this.newDateCourse !== '') {
        this.$store.commit('addOneCourse', this.newDateCourse)
        this.clearInput()
      }
    },
    clearInput() {
      this.newDateCourse = ""
    },
  }
}
</script>

<style>

</style>