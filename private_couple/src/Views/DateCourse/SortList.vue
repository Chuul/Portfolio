<template>
  <section class="sort-cont">
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
  </section>
</template>

<script>
export default {
  methods : {
    filterItem(name) {
      this.$store.commit('filterListItem', name);
    },
  }
}
</script>

<style scoped>
.sort-cont {
  text-align: center;
  margin: 1em;
}
a {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
}
a::after {
  display: inline-block;
  content : '';
  width: 1px;
  height: 0.8em;
  margin : 0 1em;
  background : black;
}
a:last-child::after {
  display: none;
}
a:active {
  color : rgba(124, 198, 255, 0.8);
}
a:hover {
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer;
}
</style>