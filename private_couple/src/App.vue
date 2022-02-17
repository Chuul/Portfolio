<template>
	<main>
		<HeaderView></HeaderView>
		<transition name="fade">
			<router-view></router-view>
		</transition>
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
/* transition */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}

/* 반응형-모바일 */
@media all and (max-width: 430px) {
	html {
		font-size: 80%;
	}
}
</style>
