<template>
  <div>
    <a id="custom-login-btn">
      <img
        src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="222"
        alt="카카오 로그인 버튼"
        @click="kakaoLogin()"
      />
    </a>
  </div>
</template>

<script>    
import loginUser from '@/api/index.js';
export default {
  // mounted() {
  //   window.Kakao.init('59950035b359511b00edf96f7c7e9261');
  // },
  methods : {
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email', 
        success: this.getProfile 
      });
      // const params = {
      //   redirectUri:'http://localhost:8800',
      // }
      // window.Kakao.Auth.authorize(params)
    },
    getProfile(authObj) {
      console.log('authObj: ', authObj);
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: res => {
          const kakao_account = res.kakao_account;
          this.login(kakao_account);
          console.log('kakao_account: ', kakao_account);
        }
      })
      this.$router.push('/creating');
    },
    async login(kakao_account) {
      let email = kakao_account.email;
      await loginUser(email);
    }
  }
}
</script>

<style>

</style>