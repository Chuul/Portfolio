<template>
	<section class="createView_cont">
		<KakaoMapsCreating></KakaoMapsCreating>
		<div class="content_item_cont">
			<CourseCreatingAddItem></CourseCreatingAddItem>
			<CourseCreatingList></CourseCreatingList>
			<CourseCreatingAddCourse></CourseCreatingAddCourse>
		</div>
	</section>
</template>

<script>
import KakaoMapsCreating from '@/components/KakaoAPI/KakaoMapsCreating.vue';
import CourseCreatingAddItem from './CourseCreatingAddItem.vue';
import CourseCreatingList from './CourseCreatingList.vue';
import CourseCreatingAddCourse from './CourseCreatingAddCourse.vue';

export default {
	components: {
		KakaoMapsCreating,
		CourseCreatingAddItem,
		CourseCreatingList,
		CourseCreatingAddCourse,
	},
};
</script>

<style scoped>
.createView_cont {
	margin: 0 1rem;
}
/* 반응형 - PC */
@media (min-width: 1024px) {
	.createView_cont {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.content_item_cont {
		width: 51%;
	}
}
</style>
