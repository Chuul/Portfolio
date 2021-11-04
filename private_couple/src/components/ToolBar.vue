<template>
  <nav class="router-cont">
    <router-link to="/createCourse">코스생성</router-link>  
    <router-link to="/courseList">코스목록</router-link>   
    <router-link to="/lastCourse">이전코스</router-link>  
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
.router-cont {
  text-align: center;
  margin : 2em;
}
a {
  margin : auto 1em;
  font-family: 'Noto Sans KR', sans-serif;
}
a:hover {
  color : #1a66ff;
}
</style>