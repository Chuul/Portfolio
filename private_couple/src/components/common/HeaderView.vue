<template>
	<div :class="isLogin">
		<div class="header_cont">
			<i class="start_Btn fas fa-play-circle" @click="goStartView"></i>
			<ToolBar></ToolBar>
			<span class="logout_cont">
				<span class="user_cont">{{ fetchName }}님</span>
				<i class="logout_btn fas fa-sign-out-alt" @click="openModal" />
			</span>
		</div>
		<Modal v-if="showModal" @close="closeModal()">
			<h2 slot="header">로그아웃 하시겠습니까?</h2>
			<button slot="body" @click.prevent="kakaoLogout()">확인</button>
		</Modal>
	</div>
</template>

<script>
import ToolBar from '@/components/common/ToolBar.vue';
import Modal from '@/components/common/ModalView.vue';

export default {
	components: {
		ToolBar,
		Modal,
	},
	data() {
		return {
			showModal: false,
		};
	},
	computed: {
		isLogin() {
			return this.$store.state.email === '' ? 'login_cont' : null;
		},
		fetchName() {
			return this.$store.state.username;
		},
	},
	methods: {
		goStartView() {
			this.$router.push('/start');
		},
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
	display: flex;
	align-items: center;
	margin: 0.5rem;
	padding-top: 0.5rem;
}
.start_Btn {
	font-size: 2rem;
	color: rgba(124, 198, 255, 0.8);
	cursor: pointer;
}
.login_cont {
	display: none;
}
.user_cont {
	margin-right: 1rem;
}
.logout_btn {
	color: rgba(124, 198, 255, 0.8);
	cursor: pointer;
}
Modal button {
	border: none;
}

/* 반응형 - PC */
@media (min-width: 1024px) {
	.header_cont {
		margin: 0.2rem 1rem 1rem;
		padding-top: 0.2rem;
		font-size: 1rem;
	}
	.start_Btn {
		font-size: 1rem;
	}
}
/* 반응형 - 모바일 */
@media (max-width: 430px) {
	.start_Btn {
		margin-right: auto;
		font-size: 1.5rem;
		color: rgba(124, 198, 255, 0.8);
		cursor: pointer;
	}
}
</style>
