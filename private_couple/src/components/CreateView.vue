<template>
	<section class="createView_cont">
		<KakaoMap></KakaoMap>
		<div class="content_cont">
			<CreateViewAddItem></CreateViewAddItem>
			<CreateViewList></CreateViewList>
			<CreateViewAddCourse></CreateViewAddCourse>
		</div>
	</section>
</template>

<script>
import KakaoMap from '@/components/common/API/KakaoMaps.vue';
import CreateViewAddItem from './CreateViewAddItem.vue';
import CreateViewList from './CreateViewList.vue';
import CreateViewAddCourse from './CreateViewAddCourse.vue';

export default {
	components: {
		KakaoMap,
		CreateViewAddItem,
		CreateViewList,
		CreateViewAddCourse,
	},
};
</script>

<style scoped>
.createView_cont {
	margin: 0 1rem;
}

@media (min-width: 1024px) {
	.createView_cont {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.content_cont {
		width: 51%;
	}
}
</style>
