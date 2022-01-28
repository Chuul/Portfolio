<template>
	<section class="last_cont">
		<div class="item_cont">
			<h3>이벤트</h3>
			<li v-for="item in ItemList" :key="item">
				<span class="item_name">
					{{ item.name }}
				</span>
				<span v-if="item.comment !== ''">
					{{ item.comment }}
				</span>
			</li>
		</div>
		<div class="course_cont">
			<h3>코스</h3>
			<li v-for="course in CourseList" :key="course.list">
				<div class="course_item_cont">
					<li v-for="item in course.list" class="course_item" :key="item.name">
						{{ item.name }}
						<i class="fas fa-arrow-right" />
					</li>
				</div>
				<span>
					{{ course.comment }}
				</span>
			</li>
		</div>
	</section>
</template>

<script>
export default {
	computed: {
		ItemList() {
			return this.$store.state.lastItemList;
		},
		CourseList() {
			return this.$store.state.lastCourseList;
		},
	},
	created() {
		this.$store.dispatch('FETCH_LAST_LIST');
	},
};
</script>

<style scoped>
li {
	list-style: none;
	margin-bottom: 0.5em;
}
h3 {
	margin-bottom: 1.5em;
	font-family: 'Noto Sans KR', sans-serif;
	font-weight: 500;
}
.last_cont {
	height: 80vh;
	margin: 0 2em 2em 2em;
}
.item_cont {
	text-align: center;
	margin: 15px;
	padding: 1rem;
	background: rgba(124, 198, 255, 0.11);
	border-radius: 0.5em;
	box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.item_name {
	float: left;
}
.course_cont {
	text-align: center;
	margin: 15px;
	padding: 1rem;
	background: rgba(124, 198, 255, 0.11);
	border-radius: 0.5em;
	box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.course_item_cont {
	display: inline;
	float: left;
}
.course_item_cont li:last-child i {
	display: none;
}
.course_item {
	display: inline;
}
</style>
