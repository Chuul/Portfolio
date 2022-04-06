<template>
	<section class="creating_add_course_cont">
		<button class="create_Btn" @click="getCheckedItems">코스생성</button>
		<button class="reset_Btn" @click="resetChecked">초기화</button>
		<ul v-if="showCreateBtn" class="main_cont">
			<draggable
				:list="localCheckedList"
				:disabled="!enabled"
				@start="dragging = true"
				@end="dragging = false"
			>
				<li
					v-for="item in localCheckedList"
					class="course_cont"
					:key="item.name"
				>
					<a v-if="item.url" :href="item.url" class="item_name" target="_blank">
						{{ item.name }}
					</a>
					<a v-else>
						{{ item.name }}
					</a>
					<span class="move_btn_cont">
						<i class="fas fa-bars"></i>
					</span>
					<div class="arrow_btn_cont">
						<i class="fal fa-arrow-alt-down"></i>
					</div>
				</li>
			</draggable>
		</ul>
		<button v-if="showCreateBtn" class="store_btn" @click="addCourse">
			코스 저장
		</button>
		<!-- Modal -->
		<Modal v-if="showCheck" @close="closeCheck">
			<h2 slot="header">최소 1개 이상의 아이템을 선택해주세요</h2>
		</Modal>
		<Modal v-if="showSuccess" @close="closeSuccess">
			<h2 slot="header">코스 저장 완료</h2>
		</Modal>
	</section>
</template>

<script>
import draggable from 'vuedraggable';
import Modal from '@/components/common/ModalPrototype.vue';

export default {
	created() {
		this.$store.commit('CLEAR_CHECKEDLIST');
	},
	components: {
		draggable,
		Modal,
	},
	data() {
		return {
			localCheckedList: [],
			enabled: true,
			dragging: false,
			showCreateBtn: false,
			showCheck: false,
			showSuccess: false,
		};
	},
	methods: {
		getCheckedItems() {
			// 지번 주소를 좌표값으로 바꾸는 함수(카카오 API 참조)
			let transPosition = list => {
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
				this.localCheckedList = [...list];
			};
			let list = this.$store.getters.getCheckedList;
			if (list.length === 0) {
				this.showCheck = true;
			} else {
				this.showCreateBtn = true;
				transPosition(list);
			}
		},
		// 코스에 들어가는 아이템 정리하는 함수
		async addCourse() {
			let setupCourse = list => {
				list.forEach(item => {
					delete item.createdBy;
					item.checked = false;
					item.comment = ' ';
				});
				return list;
			};
			let payload = setupCourse(this.localCheckedList);
			// eslint-disable-next-line prettier/prettier
			await this.$store.dispatch('ADD_COURSE', payload)
				.then(response => {
					console.log(response);
					this.localCheckedList = [];
					this.showCreateBtn = false;
					this.showSuccess = true;
				})
				.catch(error => {
					console.log(error);
				});
		},
		async resetChecked() {
			if (this.localCheckedList.length === 0) {
				this.$store.commit(
					'SET_ITEM_FrdfALSE',
					this.$store.getters.getCheckedList,
				);
			} else {
				this.$store.commit('SET_ITEM_FALSE', this.localCheckedList);
				this.localCheckedList = [];
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
.creating_add_course_cont {
	display: inline-block;
	width: 100%;
	text-align: center;
}
.create_Btn {
	margin: 1rem 0 0 5rem;
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
.reset_Btn {
	float: right;
	margin-top: 1.2em;
	background: rgba(124, 198, 255, 0.096);
	border-style: none;
	border-radius: 0.5em;
	padding: 0.6em 1em;
	font-size: 0.7em;
	font-family: 'Noto Sans KR', sans-serif;
	font-weight: 500;
	color: rgb(59, 137, 255);
	cursor: pointer;
	box-shadow: 0.5em -0.2em 10px 1px rgba(143, 143, 143, 0.2);
}
.main_cont {
	padding: 1rem;
	overflow: auto;
	border: thick double rgb(59, 137, 255);
	height: 33vh;
}
.course_cont {
	margin-bottom: 2.2rem;
	list-style: none;
	height: 3rem;
	line-height: 3rem;
	background: white;
	border-radius: 0.5em;
	font-family: 'Dongle', sans-serif;
	font-size: 1.5rem;
	font-weight: 300;
	box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.item_name {
	color: #ee27bc;
	font-weight: bold;
}
.move_btn_cont {
	float: right;
	margin-right: 1em;
}
.move_btn_cont i {
	color: #e1e1fdc5;
}
.move_btn_cont i:hover {
	color: #8763fb;
	cursor: pointer;
}
.arrow_btn_cont {
	text-align: center;
}
.arrow_btn_cont i {
	color: rgb(86, 153, 253);
}
li:last-child .arrow_btn_cont {
	display: none;
}
.store_btn {
	margin: 1em 0;
	background: rgba(124, 198, 255, 0.247);
	border-style: none;
	border-radius: 0.5em;
	padding: 0.6em 1.5em;
	font-size: 1em;
	font-family: 'Noto Sans KR', sans-serif;
	color: rgb(86, 153, 253);
	cursor: pointer;
	box-shadow: 0.5em -0.2em 10px 1px rgba(143, 143, 143, 0.2);
}
/* 반응형 - PC */
@media (min-width: 1024px) {
	.course_cont {
		margin: 0 0 2rem;
	}
	.arrow_btn_cont {
		margin-top: -0.3rem;
	}
	.arrow_btn_cont i {
		font-size: 1rem;
	}
}
</style>
