<template>
  <div>
    <h1>로그인페이지</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">id: </label>
        <input id="username" type="text" v-model="username" />
      </div>
       <div>
        <label for="password"></label>
        <input id="password" type="text" v-model="password">
      </div>
      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    submitForm() {
      
    }
  }
}
</script>

<style>

</style>