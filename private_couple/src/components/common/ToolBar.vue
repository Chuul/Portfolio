<template>
	<nav class="toolbar_cont">
		<router-link to="/creating">코스생성</router-link>
		<router-link to="/list">코스목록</router-link>
		<router-link to="/last">이전코스</router-link>
	</nav>
</template>

<script>
export default {};
</script>

<style scoped>
.toolbar_cont {
	margin-left: 3rem;
}
.toolbar_cont .router-link-exact-active {
	color: rgb(31, 152, 245);
}
router-link {
	display: block;
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
