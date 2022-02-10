<template>
	<nav class="router_cont">
		<router-link to="/item">코스생성</router-link>
		<router-link to="/list">코스목록</router-link>
		<router-link to="/last">이전코스</router-link>
	</nav>
</template>

<script>
export default {};
</script>

<style scoped>
router-link {
	display: block;
}
.router_cont {
	display: flex;
	justify-content: center;
	margin: auto;
}
.router_cont .router-link-exact-active {
	color: rgb(31, 152, 245);
}
a {
	color: black;
	margin: auto 1em;
	font-family: 'Noto Sans KR', sans-serif;
}
a:hover {
	color: rgba(124, 198, 255, 0.8);
}
</style>
