<template>
	<main>
		<HeaderView></HeaderView>
		<router-view></router-view>
		<PageInfo></PageInfo>
	</main>
</template>

<script>
import HeaderView from '@/components/common/HeaderView.vue';
import PageInfo from '@/components/common/PageInfo.vue';

export default {
	components: {
		HeaderView,
		PageInfo,
	},
};
</script>

<style>
body {
	margin: 0;
	background-color: #f6f6f6;
}
a {
	text-decoration: none;
}
main > section,
div.loginView_cont {
	min-height: 80vh;
}
router-view {
	overflow: auto;
}

/* 반응형-모바일 */
@media all and (max-width: 430px) {
	html {
		font-size: 80%;
	}
}
</style>
