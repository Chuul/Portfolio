<template>
  <div class="header_cont">
    <i class="logout_btn fas fa-sign-out-alt" @click="openModal"/>
    <Modal v-if="showModal" @close="closeModal()">
      <h2 slot="header">로그아웃 하시겠습니까?</h2>
      <button slot="body" @click.prevent="kakaoLogout()">확인</button>
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/common/Modal.vue';

export default {
  components: {
    Modal
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    kakaoLogout() {
        console.log(window.Kakao.Auth.getAccessToken());
      if (!window.Kakao.Auth.getAccessToken()) {
        console.log('Not logged in.');
        return;
      }
      window.Kakao.Auth.logout(function() {
        console.log(window.Kakao.Auth.getAccessToken());
      });
      this.$router.push('/login');
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  }
}
</script>

<style scoped>
.header_cont {
  margin: 0.5em;
  text-align: end;
}
.logout_btn {
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer;
}
Modal button {
  border: none;
}
</style>