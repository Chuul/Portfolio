<template>
  <div>
    <router-link to="/createCourse">코스생성</router-link>  
    <router-link to="/courseList">코스목록</router-link>   
    <router-link to="/lastCourse">이전코스</router-link>  
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
a {
  color : white;
  margin : auto 1rem;
}
a:hover {
  color : #1a66ff;
}
</style>