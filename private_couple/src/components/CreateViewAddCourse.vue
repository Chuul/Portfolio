<template>
	<section class="create_cont">
		<button class="create_Btn" @click="getCheckedItems">코스생성</button>
		<draggable
			:list="localCheckedList"
			:disabled="!enabled"
			@start="dragging = true"
			@end="dragging = false"
		>
			<li v-for="item in localCheckedList" class="courseList" :key="item.name">
				<a v-if="item.url" :href="item.url" class="linkText" target="_blank">
					{{ item.name }}
				</a>
				<a v-else>
					{{ item.name }}
				</a>
				<span class="move_Btn_cont">
					<i class="fas fa-bars"></i>
				</span>
				<div class="arrow_Btn_cont">
					<i class="fal fa-arrow-alt-down"></i>
				</div>
			</li>
		</draggable>
		<button class="store_Btn" @click="storeCourse">코스 저장</button>
		<!-- Modal -->
		<Modal v-if="showCheck" @close="closeCheck">
			<h2 slot="header">최소 1개 이상의 아이템을 선택해주세요</h2>
		</Modal>
		<Modal v-if="showSuccess" @close="closeSuccess">
			<h2 slot="header">코스 저장 완료</h2>
		</Modal>
		<Modal v-if="showFail" @close="closeFail">
			<h2 slot="header">코스 생성 후 저장해주세요</h2>
		</Modal>
	</section>
</template>

<script>
import draggable from 'vuedraggable';
import Modal from '@/components/common/ModalView.vue';

export default {
	components: {
		draggable,
		Modal,
	},
	data() {
		return {
			localCheckedList: [],
			enabled: true,
			dragging: false,
			showCheck: false,
			showSuccess: false,
			showFail: false,
		};
	},
	methods: {
		// 지번 주소를 좌표값으로 바꾸는 함수(카카오 API 참조)
		transPosition(list) {
			for (let i = 0; i < list.length; i++) {
				if (list[i].pos !== '') {
					var geocoder = new kakao.maps.services.Geocoder();

					var callback = function (result, status) {
						if (status === kakao.maps.services.Status.OK) {
							let obj = { y: result[0].y, x: result[0].x };
							list[i].pos_latlng = obj;
						}
					};
					geocoder.addressSearch(list[i].pos, callback);
				}
			}
			this.localCheckedList = list;
		},
		// 위에서 체크된 아이템을 조건에 맞게 처리하는 함수
		getCheckedItems() {
			let list = this.$store.state.checkedList;
			if (list.length === 0) {
				this.showCheck = true;
			} else {
				this.transPosition(list);
			}
		},
		// 코스에 들어가는 아이템 정리하는 함수
		setupCourse(course) {
			course.forEach(item => {
				delete item.createdBy;
				item.checked = false;
				item.comment = ' ';
			});
			return course;
		},
		storeCourse() {
			let list = this.localCheckedList;
			if (list.length === 0) {
				this.showFail = true;
			} else {
				let obj = this.setupCourse(list);
				this.$store.dispatch('STORE_COURSE', obj);
				this.localCheckedList = [];
				this.showSuccess = true;
			}
		},
		closeCheck() {
			this.showCheck = false;
		},
		closeSuccess() {
			this.showSuccess = false;
		},
		closeFail() {
			this.showFail = false;
		},
	},
};
</script>

<style scoped>
.create_cont {
	text-align: center;
}
.create_Btn {
	margin: 1em 0;
	background: rgba(124, 198, 255, 0.247);
	border-style: none;
	border-radius: 0.5em;
	padding: 0.6em 1.5em;
	font-size: 1em;
	font-family: 'Noto Sans KR', sans-serif;
	font-weight: 500;
	color: rgb(86, 153, 253);
	cursor: pointer;
	box-shadow: 0.5em -0.2em 10px 1px rgba(143, 143, 143, 0.2);
}
li {
	margin-top: 1em;
	list-style: none;
	min-height: 50px;
	height: 50px;
	line-height: 50px;
	padding: 0 0.9eem;
	background: white;
	border-radius: 0.5em;
	font-family: 'Dongle', sans-serif;
	font-size: 1.5em;
	font-weight: 300;
	box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.courseList {
	margin-bottom: 3rem;
}
.linkText {
	color: #ee27bc;
	font-weight: bold;
}
.move_Btn_cont {
	float: right;
	margin-right: 1em;
}
.move_Btn_cont i {
	color: #e1e1fdc5;
}
.move_Btn_cont i:hover {
	color: #8763fb;
	cursor: pointer;
}
.arrow_Btn_cont {
	text-align: center;
}
.arrow_Btn_cont i {
	color: rgb(86, 153, 253);
}
li:last-child .arrow_Btn_cont {
	display: none;
}
.store_Btn {
	margin: 1em 0;
	background: rgba(124, 198, 255, 0.247);
	border-style: none;
	border-radius: 0.5em;
	padding: 0.6em 1.5em;
	font-size: 1em;
	font-family: 'Noto Sans KR', sans-serif;
	font-weight: 500;
	color: rgb(86, 153, 253);
	cursor: pointer;
	box-shadow: 0.5em -0.2em 10px 1px rgba(143, 143, 143, 0.2);
}
</style>
