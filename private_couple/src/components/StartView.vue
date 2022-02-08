<template>
	<section class="start_cont">
		<h2>진행중...</h2>
		<KakaoMap></KakaoMap>
		<CommonView></CommonView>
	</section>
</template>

<script>
import KakaoMap from '@/components/common/API/KakaoMapsStart.vue';
import CommonView from './CommonView.vue';

export default {
	components: {
		KakaoMap,
		CommonView,
	},
};
</script>

<style scoped>
h2 {
	text-align: center;
	font-family: 'Dongle', sans-serif;
	font-size: 2em;
	font-weight: 700;
	margin: 0;
}
.start_cont {
	margin: 0 1rem 1rem 1rem;
	padding: 0 1.3rem 1.3rem 1.3rem;
	border-radius: 0.5em;
	text-align: center;
	background: rgba(124, 198, 255, 0.11);
	box-shadow: 0.5em -0.2em 10px 1px rgba(143, 143, 143, 0.2);
}
</style>
