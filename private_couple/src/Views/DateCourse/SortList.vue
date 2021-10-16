<template>
  <div class="sortContainer">
    <a v-on:click="filterItem('전체')">
      <span>전체</span>
    </a> 
    <a v-on:click="filterItem('음식점')">
      <span>음식점</span>
    </a>
    <a v-on:click="filterItem('카페')">
      <span>카페</span>
    </a>
    <a v-on:click="filterItem('즐길거리')">
      <span>즐길거리</span>
    </a>
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

<style scoped>
.sortContainer {
  margin: 10px;
}
a {
  color : white;
  margin-right: 20px;
}
a:hover {
  color : #1a66ff;
  cursor : pointer;
}
</style>