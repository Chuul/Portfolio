<template>
	<div :class="content_start_cont">
		<section :class="main_cont">
			<li
				class="list_cont"
				:class="list_page"
				v-for="item in CommonList"
				:key="item.name"
			>
				<template v-if="item.createdBy">
					<i
						class="toggle_Btn far fa-check-circle"
						@click="toggleOneItem(item)"
						:class="{ checked_Btn: item.checked }"
					/>
				</template>
				<template v-else>
					<i
						class="toggle_Btn far fa-check-circle"
						@click="openForm(item)"
						:class="{ checked_Btn: item.checked }"
					/>
				</template>
				<a v-if="item.url" :href="item.url" class="linkText" target="_blank">
					{{ item.name }}
				</a>
				<a v-else>
					{{ item.name }}
				</a>
				<span class="btn_cont">
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
				</span>
				<template v-if="!item.createdBy">
					<div class="arrow_cont">
						<i class="fas fa-arrow-down"></i>
					</div>
				</template>
			</li>
			<!-- Modal -->
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
			<Modal v-if="showModal" @close="closeForm()">
				<h2 slot="header">코스 평가</h2>
				<form slot="body">
					<label for="comment">한줄평 </label>
					<input type="text" id="comment" v-model="textArea" />
					<button @click.prevent="patchItemComment()">평가완료</button>
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
		<template v-if="this.$route.name == 'start'">
			<div class="start_basic_btn">
				<span class="back_btn_cont">
					<i
						class="back_btn fas fa-arrow-circle-left"
						@click="backStartView()"
					/>
				</span>
				<button class="complete_Btn" @click="openCompleteForm()">
					코스 완료
				</button>
			</div>
		</template>
	</div>
</template>

<script>
import Modal from '@/components/common/SetModal.vue';

export default {
	computed: {
		content_start_cont() {
			if (this.$route.name === 'start') {
				return 'content_start_cont';
			} else {
				return '';
			}
		},
		main_cont() {
			if (this.$route.name === 'start') {
				return 'main_cont_start';
			} else {
				return 'main_cont_creating';
			}
		},
		list_page() {
			if (this.$route.name === 'start') {
				return 'list_start';
			} else {
				return 'list_creating';
			}
		},
		CommonList() {
			if (this.$route.name === 'creating') {
				return this.$store.state.itemList;
			} else {
				return this.$store.state.startList;
			}
		},
	},
	created() {
		const name = this.$route.name;
		if (name === 'creating') {
			this.$store.dispatch('FETCH_ITEM_LIST');
		} else if (name === 'start') {
			if (this.$store.state.startList.length > 0) {
				return;
			} else {
				this.$store.dispatch('FETCH_START_LIST');
			}
		}
	},
	components: {
		Modal,
	},
	data() {
		return {
			item: {},
			textArea: '',
			showUrlModal: false,
			showPosModal: false,
			showModal: false,
			showCompleteModal: false,
		};
	},
	methods: {
		toggleOneItem(item) {
			this.$store.dispatch('TOGGLE_ITEM', item);
		},
		// start
		openForm(item) {
			if (item.checked === true) {
				this.$store.dispatch('FALSE_ITEM', item._id);
			} else {
				this.showModal = true;
				this.item = item;
			}
		},
		// start
		patchItemComment() {
			const item = this.item;
			item.comment = this.textArea;
			this.$store.dispatch('PATCH_ITEM_COMMENT', item);
			this.textArea = '';
			this.showModal = false;
		},
		deleteOneItem(item) {
			if (this.$route.name === 'creating') {
				this.$store.dispatch('DELETE_ITEM', item._id);
			} else {
				this.$store.dispatch('DELETE_START', item._id);
			}
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
			if (this.$route.name === 'creating') {
				this.$store.dispatch('PATCH_ITEM_URL', obj);
			} else {
				this.$store.dispatch('PATCH_START_URL', obj);
			}
			this.showUrlModal = false;
		},
		patchOnePos() {
			const obj = this.setObj();
			if (this.$route.name === 'item') {
				this.$store.dispatch('PATCH_ITEM_POS', obj);
			} else {
				this.$store.dispatch('PATCH_START_POS', obj);
			}
			this.showPosModal = false;
		},
		// start
		endStartCourse() {
			this.$store.dispatch('STORE_START', this.textArea);
			this.showCompleteModal = false;
			this.textArea = '';
			this.$router.push('/list');
		},
		// start
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
		closeUrlForm() {
			this.showUrlModal = false;
			this.textArea = '';
		},
		closePosForm() {
			this.showPosModal = false;
			this.textArea = '';
		},
		// start
		openCompleteForm() {
			this.showCompleteModal = true;
		},
		// start
		closeForm() {
			this.showModal = false;
			this.item = '';
		},
		// start
		closeCompleteForm() {
			this.showCompleteModal = false;
			this.item = '';
		},
	},
};
</script>

<style scoped>
.list_cont {
	list-style: none;
	text-align: center;
	height: 2.5rem;
	line-height: 2.5rem;
	margin: 1rem 0;
	padding: 0 1rem;
	font-family: 'Dongle', sans-serif;
	font-size: 1.5rem;
	font-weight: 300;
	background: white;
	border-radius: 0.5rem;
	box-shadow: 0.5rem -0.3rem 10px 1px rgba(143, 143, 143, 0.2);
}
.linkText {
	color: #ee27bc;
	font-weight: bold;
}
.toggle_Btn {
	float: left;
	margin: 0.5rem;
	color: rgba(124, 198, 255, 0.8);
	cursor: pointer;
}
.basic_Btn {
	float: right;
	margin: 0.5rem;
	color: rgba(124, 198, 255, 0.8);
	cursor: pointer;
}
.checked_Btn {
	color: #8763fb;
}
/* start */
.start_basic_btn {
	padding: 1rem 0;
}
.back_btn_cont {
	float: left;
}
.back_btn {
	font-size: 2rem;
	color: rgba(124, 198, 255, 0.8);
	cursor: pointer;
}
.complete_Btn {
	background: rgba(124, 198, 255, 0.247);
	border-style: none;
	border-radius: 0.5rem;
	padding: 0.6rem 1.5rem;
	font-size: 1rem;
	font-family: 'Noto Sans KR', sans-serif;
	font-weight: 500;
	color: rgb(86, 153, 253);
	cursor: pointer;
	box-shadow: 0.5rem -0.2rem 10px 1px rgba(143, 143, 143, 0.2);
}
/* 반응형 - PC */
@media (min-width: 1024px) {
	.content_start_cont {
		width: 51%;
	}
}
/* 반응형 - 테블릿 */
@media (min-width: 768px) {
	/* 코스생성 리스트 컨테이너 style*/
	.main_cont_creating {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		height: 22.5%;
		overflow: auto;
		padding: 0.3rem;
	}
	.list_cont {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0.35rem 0;
		padding: 0.3rem 0.2rem;
		line-height: initial;
		height: initial;
	}
	.list_creating {
		width: 48%;
	}
	.list_start {
		margin: 1rem 0;
	}
	.list_cont > a {
		width: 50%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.list_cont i {
		font-size: 1rem;
	}
	.toggle_Btn {
		margin: 0.2rem;
	}
	.basic_Btn {
		margin: 0.2rem;
	}
}
</style>
