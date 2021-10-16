<template>
  <div>
    <button v-on:click="createCourse()">Create Course</button>
  </div>
</template>

<script>
export default {
  methods : {
    createCourse() {
      this.$store.commit('createOneCourse')
    }
  }
}
</script>

<styles scoped>

</styles>