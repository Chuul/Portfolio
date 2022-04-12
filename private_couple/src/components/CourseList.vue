<template>
	<section class="list_cont">
		<template v-if="list_check">
			<li class="course_cont" v-for="list in CourseList" :key="list.course">
				<i
					class="start_btn fas fa-heart-square"
					@click="startOneCourse(list)"
				></i>
				<section class="item_cont">
					<li class="item_name" v-for="item in list.course" :key="item.name">
						{{ item.name }}
						<div class="arrow_cont">
							<i class="fas fa-arrow-down"></i>
						</div>
					</li>
				</section>
				<span class="delete_btn_cont" @click="deleteOneCourse(list)">
					<i class="delete_btn far fa-trash-alt"></i>
				</span>
			</li>
		</template>
		<template v-else>
			<div class="empty_list">
				아직 생성된 리스트가 없습니다. 코스생성 페이지에서 추가해주세요.
			</div>
		</template>
	</section>
</template>

<script>
import bus from '../utils/bus.js';

export default {
	created() {
		bus.$emit('start:spinner');
		// eslint-disable-next-line prettier/prettier
		this.$store.dispatch('FETCH_COURSE_LIST')
			.then(() => {
				bus.$emit('end:spinner');
			})
			.catch(error => {
				console.log(error);
			});
	},
	computed: {
		list_check() {
			return this.$store.getters.getListCheck;
		},
		CourseList() {
			return this.$store.getters.getCourseList;
		},
	},
	methods: {
		async startOneCourse(list) {
			bus.$emit('start:spinner');
			// eslint-disable-next-line prettier/prettier
			await this.$store.dispatch('START_COURSE', list)
				.then(() => {
					bus.$emit('end:spinner');
					this.$router.push('/start');
				})
				.catch(error => {
					console.log(error);
				});
		},
		deleteOneCourse(list) {
			this.$store.dispatch('DELETE_COURSE', list.name);
		},
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
	display: flex;
	justify-content: space-between;
	height: 20%;
	list-style: none;
	text-align: center;
	margin: 15px;
	padding: 1rem;
	background: rgba(124, 198, 255, 0.247);
	border-radius: 0.5em;
	box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.empty_list {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 80vh;
	width: 100%;
}
.item_cont {
	width: 80%;
	overflow: auto;
}
.item_cont li:last-child .arrow_cont {
	display: none;
}
.start_btn {
	float: left;
	font-size: 1.5rem;
	color: rgba(124, 198, 255, 0.8);
	cursor: pointer;
	margin: auto 0;
}
.delete_btn_cont {
	margin: auto 0;
}
.arrow_cont {
	margin: 0.5em;
}
.delete_btn {
	float: right;
	font-size: 1.5rem;
	color: #62acde;
	cursor: pointer;
}
/* 반응형 - PC */
@media (min-width: 1024px) {
	.list_cont {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
	}
	.course_cont {
		width: 27%;
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
		width: 41%;
	}
}
/* 반응형 - 모바일 */
@media (max-width: 426px) {
	.course_cont {
		height: 16%;
	}
}
</style>
