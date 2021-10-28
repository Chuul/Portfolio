<template>
  <section>
    <li v-for="item in this.$store.state.selectedCourse" :key="item">
      {{ item.item }}
    </li>
  </section>
</template>

<script>
export default {

}
</script>

<style>

</style>