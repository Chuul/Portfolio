<template>
	<section>
		<template v-if="name">
			<KakaoMap></KakaoMap>
			<CreateViewAddItem></CreateViewAddItem>
		</template>
		<template v-else>
			<h2>진행중...</h2>
			<KakaoMapStart></KakaoMapStart>
		</template>
		<CommonView></CommonView>
		<template v-if="name">
			<CreateViewAddCourse></CreateViewAddCourse>
		</template>
	</section>
</template>

<script>
import KakaoMap from '@/components/common/API/KakaoMaps.vue';
import CreateViewAddItem from './CreateViewAddItem.vue';
import CreateViewAddCourse from './CreateViewAddCourse.vue';
import CommonView from './CommonView.vue';
import KakaoMapStart from '@/components/common/API/KakaoMapsStart.vue';

export default {
	components: {
		KakaoMap,
		CreateViewAddItem,
		CreateViewAddCourse,
		CommonView,
		KakaoMapStart,
	},
	computed: {
		name() {
			return this.$route.name === 'creating' ? true : false;
		},
	},
};
</script>

<style></style>
