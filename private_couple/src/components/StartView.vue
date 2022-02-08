<template>
	<section class="course_cont">
		<h2>진행중...</h2>
		<KakaoMap></KakaoMap>
		<div class="main_cont">
			<li class="list_cont" v-for="item in StartList" :key="item.name">
				<!-- <div class="item_cont"> -->
				<i
					class="toggle_Btn far fa-check-circle"
					@click="openForm(item)"
					:class="{ checked_Btn: item.checked }"
				/>
				<a v-if="item.url" :href="item.url" class="linkText" target="_blank">
					{{ item.name }}
				</a>
				<a v-else>
					{{ item.name }}
				</a>
				<i class="basic_Btn far fa-trash-alt" @click="deleteOneItem(item)" />
				<i
					class="basic_Btn fas fa-map-marked-alt"
					@click="openPosForm(item)"
					:class="{ checked_Btn: item.pos.length > 0 }"
				/>
				<i
					class="basic_Btn far fa-window-restore"
					@click="openUrlForm(item)"
					:class="{ checked_Btn: item.url.length > 0 }"
				/>
				<!-- </div>
				<div class="arrow-cont">
					<i class="fas fa-arrow-down"></i>
				</div> -->
			</li>
		</div>
		<button class="complete_Btn" @click="openCompleteForm()">코스 완료</button>
		<div>
			<i class="back_btn fas fa-arrow-circle-left" @click="backStartView()"></i>
		</div>
		<!-- 모달창 -->
		<Modal v-if="showModal" @close="closeForm()">
			<h2 slot="header">코스 평가</h2>
			<form slot="body">
				<label for="comment">한줄평 </label>
				<input type="text" id="comment" v-model="textArea" />
				<button @click.prevent="patchItemComment()">평가완료</button>
			</form>
		</Modal>
		<Modal v-if="showUrlModal" @close="closeUrlForm()">
			<h2 slot="header">URL 입력</h2>
			<form slot="body">
				<input type="text" id="urlInput" v-model="textArea" />
				<button @click.prevent="patchOneUrl()">입력</button>
			</form>
		</Modal>
		<Modal v-if="showPosModal" @close="closePosForm()">
			<h2 slot="header">Position 입력</h2>
			<form slot="body">
				<input type="text" id="posInput" v-model="textArea" />
				<button @click.prevent="patchOnePos()">입력</button>
			</form>
		</Modal>
		<Modal v-if="showCompleteModal" @close="closeCompleteForm()">
			<h2 slot="header">코스 평점</h2>
			<form slot="body">
				<input type="text" id="completeInput" v-model="textArea" />
				<button @click.prevent="endStartCourse()">완료</button>
			</form>
		</Modal>
	</section>
</template>

<script>
import KakaoMap from '@/components/common/API/KakaoMapsStart.vue';
import Modal from '@/components/common/ModalView.vue';
export default {
	components: {
		KakaoMap,
		Modal,
	},
	data() {
		return {
			item: {},
			textArea: '',
			showModal: false,
			showUrlModal: false,
			showPosModal: false,
			showCompleteModal: false,
		};
	},
	computed: {
		StartList() {
			return this.$store.state.startList;
		},
	},
	methods: {
		openForm(item) {
			if (item.checked === true) {
				this.$store.dispatch('FALSE_ITEM', item._id);
			} else {
				this.showModal = true;
				this.item = item;
			}
		},
		patchItemComment() {
			const item = this.item;
			item.comment = this.textArea;
			this.$store.dispatch('PATCH_ITEM_COMMENT', item);
			this.textArea = '';
			this.showModal = false;
		},
		deleteOneItem(item) {
			this.$store.dispatch('DELETE_START', item._id);
		},
		setObj() {
			const obj = {
				id: this.item._id,
				textArea: this.textArea,
			};
			this.textArea = '';
			return obj;
		},
		patchOneUrl() {
			const obj = this.setObj();
			this.$store.dispatch('PATCH_START_URL', obj);
			this.showUrlModal = false;
		},
		patchOnePos() {
			const obj = this.setObj();
			this.$store.dispatch('PATCH_START_POS', obj);
			this.showPosModal = false;
		},
		endStartCourse() {
			this.$store.dispatch('STORE_START', this.textArea);
			this.showCompleteModal = false;
			this.textArea = '';
			this.$router.push('/list');
		},
		backStartView() {
			this.$router.push('/list');
		},
		// Modal창 on/off
		openUrlForm(item) {
			this.showUrlModal = true;
			this.item = item;
		},
		openPosForm(item) {
			this.showPosModal = true;
			this.item = item;
		},
		openCompleteForm() {
			this.showCompleteModal = true;
		},
		closeForm() {
			this.showModal = false;
			this.item = '';
		},
		closeUrlForm() {
			this.showUrlModal = false;
			this.textArea = '';
		},
		closePosForm() {
			this.showPosModal = false;
			this.textArea = '';
		},
		closeCompleteForm() {
			this.showCompleteModal = false;
			this.item = '';
		},
	},
	created() {
		if (this.$store.state.startList.length > 0) {
			return;
		} else {
			this.$store.dispatch('FETCH_START_LIST');
		}
	},
};
</script>

<style scoped>
section {
	margin: 0;
}
li {
	list-style: none;
}
h2 {
	text-align: center;
	font-family: 'Dongle', sans-serif;
	font-size: 2em;
	font-weight: 700;
	margin: 0;
}
.course_cont {
	margin: 0 1rem 1rem 1rem;
	padding: 0 1.3rem 1.3rem 1.3rem;
	border-radius: 0.5em;
	text-align: center;
	background: rgba(124, 198, 255, 0.11);
	box-shadow: 0.5em -0.2em 10px 1px rgba(143, 143, 143, 0.2);
}
.main_cont li:last-child .arrow-cont {
	display: none;
}
.list_cont {
	margin: 1rem 0;
	padding: 1rem;
	border-radius: 0.5em;
	background: white;
}
.linkText {
	color: #ee27bc;
	font-weight: bold;
}
.toggle_Btn {
	float: left;
	margin: 0.5em;
	color: rgba(124, 198, 255, 0.8);
	cursor: pointer;
}
.basic_Btn {
	float: right;
	margin: 0.5em;
	color: rgba(124, 198, 255, 0.8);
	cursor: pointer;
}
.checked_Btn {
	color: #8763fb;
}
.arrow-cont {
	margin: 0.5em;
}
.complete_Btn {
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
.back_btn {
	display: flex;
	font-size: 2rem;
	color: rgba(124, 198, 255, 0.8);
	cursor: pointer;
}
</style>
