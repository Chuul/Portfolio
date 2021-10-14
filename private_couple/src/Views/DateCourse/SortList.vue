<template>
  <div>
    <span class="category" v-on:click="filterItem('전체')">
      <span>전체 | </span>
    </span> 
    <span class="category" v-on:click="filterItem('음식점')">
      <span>음식점 | </span>
    </span>
    <span class="category" v-on:click="filterItem('카페')">
      <span>카페 | </span>
    </span>
    <span class="category" v-on:click="filterItem('즐길거리')">
      <span>즐길거리 | </span>
    </span>
  </div>
</template>

<script>
export default {
  methods : {
    filterItem(name) {
      this.$store.commit('filterListItem', name)
    },
  }
}
</script>

<style>
.category:hover {
  color : red;
  cursor : pointer;
}
</style>