<template>
	<div class="header_cont">
		<span class="user_cont">{{ fetchName }}님</span>
		<i class="logout_btn fas fa-sign-out-alt" @click="openModal" />
		<Modal v-if="showModal" @close="closeModal()">
			<h2 slot="header">로그아웃 하시겠습니까?</h2>
			<button slot="body" @click.prevent="kakaoLogout()">확인</button>
		</Modal>
	</div>
</template>

<script>
import Modal from '@/components/common/ModalView.vue';

export default {
	components: {
		Modal,
	},
	data() {
		return {
			showModal: false,
		};
	},
	computed: {
		fetchName() {
			return this.$store.state.username;
		},
	},
	methods: {
		kakaoLogout() {
			if (!window.Kakao.Auth.getAccessToken()) {
				console.log('Not logged in.');
				return;
			}
			window.Kakao.Auth.logout();
			this.$store.commit('LOGOUT_USER');
			this.$router.push('/login');
			this.closeModal();
		},
		openModal() {
			this.showModal = true;
		},
		closeModal() {
			this.showModal = false;
		},
	},
};
</script>

<style scoped>
.header_cont {
	margin: 0.5em;
	text-align: end;
}
.user_cont {
	margin-right: 1em;
}
.logout_btn {
	color: rgba(124, 198, 255, 0.8);
	cursor: pointer;
}
Modal button {
	border: none;
}
</style>
