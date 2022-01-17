<template>
  <header class="login_cont">
    <a id="custom-login-btn">
      <img
        src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="160"
        alt="카카오 로그인 버튼"
        @click="kakaoLogin()"
      />
    </a>
  </header>
</template>

<script>    
export default {
  data() {
    return {
      data: []
    }
  },
  methods : {
    kakaoLogin() {
      window.Kakao.Auth.login({
        scope: 'profile_nickname, account_email', 
        success: this.getProfile
      });
    },
    // 성공할 경우, 파라미터를 자동으로 받아온다
    getProfile(authObj) {
      console.log('authObj: ', authObj);
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: async (res) => {
          console.log('res: ', res);
          const userData = {
            username: res.kakao_account.profile.nickname,
            email: res.kakao_account.email
          }
          // await loginUser(userData);
          await this.$store.dispatch('LOGIN', userData);
          this.$router.push('/creating');
        }
      })
    },
  }
}
</script>

<style scoped>
img {
  cursor: pointer;
  padding: 1em;
}
</style>