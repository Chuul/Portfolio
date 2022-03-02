<template>
	<section class="start_cont">
		<KakaoMapsStart></KakaoMapsStart>
		<CommonLogic></CommonLogic>
	</section>
</template>

<script>
import KakaoMapsStart from '@/components/KakaoAPI/KakaoMapsStart.vue';
import CommonLogic from './CommonLogic.vue';

export default {
	components: {
		KakaoMapsStart,
		CommonLogic,
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
	margin: 1rem;
	padding: 1.3rem;
	border-radius: 0.5em;
	text-align: center;
	background: rgba(124, 198, 255, 0.11);
	box-shadow: 0.5em -0.2em 10px 1px rgba(143, 143, 143, 0.2);
}
@media (min-width: 1024px) {
	.start_cont {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
}
</style>
