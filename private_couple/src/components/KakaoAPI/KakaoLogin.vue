<template>
	<section class="kakao_login_cont">
		<a id="custom_login_btn">
			<img
				src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
				width="160"
				alt="카카오 로그인 버튼"
				@click="kakaoLogin()"
			/>
		</a>
	</section>
</template>

<script>
import bus from '../utils/bus.js';

export default {
	data() {
		return {
			data: [],
		};
	},
	methods: {
		kakaoLogin() {
			window.Kakao.Auth.loginForm({
				scope: 'profile_nickname, account_email',
				success: this.getProfile,
			});
		},
		// 성공할 경우, 파라미터를 자동으로 받아온다
		getProfile() {
			window.Kakao.API.request({
				url: '/v2/user/me',
				success: async res => {
					const userData = {
						username: res.kakao_account.profile.nickname,
						email: res.kakao_account.email,
					};
					bus.$emit('start:spinner');
					// eslint-disable-next-line prettier/prettier
					await this.$store.dispatch('LOGIN', userData)
						.then(() => {
							this.$router.push('/creating');
							bus.$emit('end:spinner');
						})
						.catch(error => console.log(error));
				},
			});
		},
	},
};
</script>

<style scoped>
.kakao_login_cont img {
	cursor: pointer;
	padding: 1em;
}
</style>
