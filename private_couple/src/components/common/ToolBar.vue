<template>
  <nav class="router-cont">
    <router-link to="/creating">코스생성</router-link>  
    <router-link to="/list">코스목록</router-link>   
    <router-link to="/last">이전코스</router-link>  
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
.router-cont {
  text-align: center;
  margin : 0 2em 2em 2em;
}
.router-cont .router-link-exact-active {
  color : rgb(31, 152, 245);
}
a {
  color : black;
  margin : auto 1em;
  font-family: 'Noto Sans KR', sans-serif;
}
a:hover {
  color : rgba(124, 198, 255, 0.8);
}
</style>