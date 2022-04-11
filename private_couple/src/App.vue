<template>
	<main>
		<HeaderView></HeaderView>
		<router-view></router-view>
		<PageInfo></PageInfo>
		<ProgressBar :loading="loadingStatus"></ProgressBar>
	</main>
</template>

<script>
import HeaderView from '@/components/common/HeaderView.vue';
import PageInfo from '@/components/common/PageInfo.vue';
import ProgressBar from '@/components/common/ProgressBar.vue';
import bus from './utils/bus.js';

export default {
	components: {
		HeaderView,
		PageInfo,
		ProgressBar,
	},
	data() {
		return {
			loadingStatus: false,
		};
	},
	methods: {
		startSpinner() {
			this.loadingStatus = true;
		},
		endSpinner() {
			this.loadingStatus = false;
		},
	},
	created() {
		bus.$on('start:spinner', this.startSpinner);
		bus.$on('end:spinner', this.endSpinner);
	},
	beforeDestroy() {
		bus.$off('start:spinner', this.startSpinner);
		bus.$off('end:spinner', this.endSpinner);
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
main.login_cont {
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
