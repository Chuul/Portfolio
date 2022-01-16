<template>
  <div class="loginView_cont">
    <h1>Date With You</h1>
    <kakaoLogin></kakaoLogin>
  </div>
</template>

<script>
import kakaoLogin from '@/components/common/API/KakaoLogin'

export default {
  components: {
    kakaoLogin
  }
}
</script>

<style scoped>
h1 {
  font-family: 'Dongle', sans-serif;
  font-weight: 700; 
  font-size: 3em; 
}
.loginView_cont {
  margin-top: 5em;
  height: 65vh;
  text-align: center;
}
</style>