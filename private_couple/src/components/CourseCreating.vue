<template>
	<section class="creating_cont">
		<KakaoMapsCreating></KakaoMapsCreating>
		<div class="main_cont">
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
.creating_cont {
	margin: 0 1rem;
}
/* 반응형 - PC */
@media (min-width: 1024px) {
	.creating_cont {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.main_cont {
		width: 51%;
	}
}
</style>
