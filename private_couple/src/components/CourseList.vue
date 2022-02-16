<template>
	<section class="list_cont">
		<li class="course_cont" v-for="list in CourseList" :key="list.course">
			<!-- <div class="item_cont"> -->
			<div class="item_cont">
				<li class="name_cont" v-for="item in list.course" :key="item.name">
					{{ item.name }}
					<div class="arrow_cont">
						<i class="fas fa-arrow-down"></i>
					</div>
				</li>
			</div>
			<!-- StartView 진입 -->
			<router-link to="/start">
				<i class="fas fa-heart-square" @click="startOneCourse(list)"></i>
			</router-link>
			<span class="remove_cont" @click="deleteOneCourse(list)">
				<i class="far fa-trash-alt"></i>
			</span>
		</li>
	</section>
</template>

<script>
export default {
	computed: {
		CourseList() {
			return this.$store.state.courseList;
		},
	},
	methods: {
		startOneCourse(list) {
			this.$store.dispatch('START_COURSE', list);
		},
		deleteOneCourse(list) {
			this.$store.dispatch('DELETE_COURSE', list.name);
		},
	},
	created() {
		this.$store.dispatch('FETCH_COURSE_LIST');
	},
};
</script>

<style scoped>
.list_cont {
	height: 80vh;
	margin: 0 1rem;
	overflow: auto;
}
.course_cont {
	list-style: none;
	text-align: center;
	margin: 15px;
	padding: 1rem 1rem 1.5rem 1rem;
	background: rgba(124, 198, 255, 0.247);
	border-radius: 0.5em;
	box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.item_cont li:last-child .arrow_cont {
	display: none;
}
/* .name_cont:nth-last-child(2) .arrow_cont {
	display: none;
} */
.fa-heart-square {
	float: left;
	color: rgba(124, 198, 255, 0.8);
	cursor: pointer;
}
.arrow_cont {
	margin: 0.5em;
}
.fa-trash-alt {
	width: 1em;
	float: right;
	color: #62acde;
	cursor: pointer;
}
/* 반응형 - PC */
@media (min-width: 1024px) {
	.list_cont {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: flex-start;
	}
	.course_cont {
		width: 27%;
		height: 25%;
		overflow: auto;
	}
}
/* 반응형 - 테블릿 */
@media (min-width: 768px) and (max-width: 1023px) {
	.list_cont {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: flex-start;
	}
	.course_cont {
		width: 42%;
		height: 25%;
		overflow: auto;
		margin: 13px;
	}
}
</style>
