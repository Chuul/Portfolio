<template>
	<nav :class="checkRoute">
		<router-link to="/creating">코스생성</router-link>
		<router-link to="/list">코스목록</router-link>
		<router-link to="/last">이전코스</router-link>
	</nav>
</template>

<script>
export default {
	computed: {
		checkRoute() {
			return this.$route.name === 'start'
				? 'toolbar_cont_start'
				: 'toolbar_cont';
		},
	},
};
</script>

<style scoped>
router-link {
	display: block;
}
.toolbar_cont_start {
	display: flex;
	justify-content: center;
	margin: auto;
}
.toolbar_cont .router-link-exact-active {
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
/* 반응형 - 테블릿 */
@media (min-width: 768px) {
	.toolbar_cont {
		margin-left: 4rem;
	}
}
@media (max-width: 425px) {
	.toolbar_cont {
		margin-left: 3rem;
	}
}
</style>
