<template>
	<section class="last_cont">
		<article class="item_cont">
			<h3>아이템</h3>
			<article>
				<li v-for="item in ItemList" :key="item">
					<span class="item_name">
						{{ item.name }}
					</span>
					<span class="item_comment" v-if="item.comment !== ''">
						{{ item.comment }}
					</span>
					<span class="item_comment" v-else>평가가 없습니다... </span>
				</li>
			</article>
		</article>
		<article class="course_cont">
			<h3>코스</h3>
			<article>
				<li v-for="course in CourseList" :key="course.list">
					<div class="course_item_cont">
						<li
							v-for="item in course.list"
							class="course_name"
							:key="item.name"
						>
							{{ item.name }}
							<i class="fas fa-arrow-right" />
						</li>
					</div>
					<span class="course_comment" v-if="course.comment !== ''">
						{{ course.comment }}
					</span>
					<span class="course_comment" v-else> 평가가 없습니다... </span>
				</li>
			</article>
		</article>
	</section>
</template>

<script>
import bus from '../utils/bus.js';

export default {
	created() {
		bus.$emit('start:spinner');
		// eslint-disable-next-line prettier/prettier
		this.$store.dispatch('FETCH_LAST_LIST')
			.then(() => {
				bus.$emit('end:spinner');
			})
			.catch(error => {
				console.log(error);
			});
	},
	computed: {
		ItemList() {
			return this.$store.getters.getLastItemList;
		},
		CourseList() {
			return this.$store.getters.getLastCourseList;
		},
	},
};
</script>

<style scoped>
li {
	list-style: none;
	margin-bottom: 0.5em;
	display: flex;
	justify-content: space-between;
}
h3 {
	margin: 0 0 1.5em;
	font-family: 'Noto Sans KR', sans-serif;
	font-weight: 500;
}
.last_cont {
	height: 80vh;
	margin: 0 1rem;
}
.item_cont {
	max-height: 40%;
	overflow: auto;
	text-align: center;
	padding: 1rem;
	background: rgba(124, 198, 255, 0.247);
	border-radius: 0.5em;
	box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.item_name {
	width: 25%;
	float: left;
}
.item_comment {
	width: 60%;
}
.course_cont {
	max-height: 40%;
	overflow: auto;
	text-align: center;
	margin-top: 1rem;
	padding: 1rem;
	background: rgba(124, 198, 255, 0.247);
	border-radius: 0.5em;
	box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.course_item_cont {
	width: 40%;
}
.course_item_cont li:last-child i {
	display: none;
}
.course_name {
	display: inline;
}
.course_comment {
	width: 55%;
}
</style>
