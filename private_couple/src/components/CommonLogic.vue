<template>
	<section :class="content_start_cont">
		<h1 v-if="this.$route.name === 'start'">코스 진행중...</h1>
		<section :class="main_cont">
			<template v-if="list_check">
				<li
					class="list_cont"
					:class="list_page"
					v-for="(item, index) in CommonList"
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
						<div class="index_cont">
							<span>
								{{ index + 1 }}
							</span>
						</div>

						<i
							class="toggle_Btn far fa-check-circle"
							@click="openForm(item, '아이템 평가')"
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
						<i
							class="basic_Btn far fa-trash-alt"
							@click="deleteOneItem(item)"
						/>
						<i
							class="basic_Btn fas fa-map-marked-alt"
							@click="openForm(item, '위치')"
							:class="{ checked_Btn: item.pos.length > 0 }"
						/>
						<i
							class="basic_Btn far fa-window-restore"
							@click="openForm(item, 'URL')"
							:class="{ checked_Btn: item.url.length > 0 }"
						/>
						<template v-if="!item.createdBy">
							<i
								class="basic_Btn fas fa-text"
								@click="openForm(item, '아이템 이름 변경')"
							></i>
						</template>
					</span>
				</li>
			</template>
			<template v-else>
				<div class="empty_list">
					생성된 아이템이 없습니다. 아이템을 추가해주세요 ^^
				</div>
			</template>
		</section>
		<Modal v-if="showModal" @close="closeModal()">
			<h2 slot="header">{{ modalID }}</h2>
			<form slot="body">
				<input class="modal_input" type="text" v-model="textArea" />
				<button class="modal_input_button" @click.prevent="patchOneData()">
					입력
				</button>
			</form>
		</Modal>
		<template v-if="this.$route.name === 'start'">
			<div class="start_basic_btn">
				<span class="back_btn_cont" @click="exitStart()">
					<i class="back_btn fas fa-arrow-circle-left" />
					그만두기
				</span>
				<button
					class="complete_Btn"
					:class="check_complete_Btn"
					@click="openForm(null, '코스 완료')"
				>
					코스 완료
				</button>
			</div>
		</template>
	</section>
</template>

<script>
import Modal from '@/components/common/ModalPrototype.vue';
import bus from '../utils/bus.js';

export default {
	created() {
		bus.$emit('start:spinner');
		if (this.$route.name === 'creating') {
			// eslint-disable-next-line prettier/prettier
        this.$store.dispatch('FETCH_ITEM_LIST')
				.then(() => {
					bus.$emit('end:spinner');
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			bus.$emit('end:spinner');
		}
	},
	data() {
		return {
			item: {},
			textArea: '',
			modalID: '',
			showModal: false,
		};
	},
	components: {
		Modal,
	},
	computed: {
		list_check() {
			if (this.$route.name === 'start') {
				return true;
			} else {
				return this.$store.getters.getItemList.length > 0 ? true : false;
			}
		},
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
		filter_item() {
			return true;
		},
		CommonList() {
			if (this.$route.name === 'creating') {
				return this.$store.getters.getItemList;
			} else {
				return this.$store.getters.getStartList;
			}
		},
		check_complete_Btn() {
			let list = this.$store.getters.getStartList;
			for (let i = 0; i < list.length; i++) {
				if (list[i].checked === true) {
					return false;
				}
			}
			return 'uncomplete_Btn';
		},
	},
	methods: {
		toggleOneItem(item) {
			this.$store.commit('SET_TOGGLE_ITEM', item);
		},
		deleteOneItem(item) {
			if (this.$route.name === 'creating') {
				this.$store.dispatch('DELETE_ITEM', item._id);
			} else {
				this.$store.dispatch('DELETE_START_ITEM', item._id);
			}
		},
		async exitStart() {
			await this.$store.dispatch('EXIT_START');
			this.$router.push('/list');
		},
		// Modal 관련 method
		async patchOneData() {
			let payload = {};
			if (this.modalID !== '코스 완료') {
				const obj = {
					id: this.item._id,
					textArea: this.textArea,
				};
				payload = obj;
			}
			if (this.$route.name === 'creating') {
				if (this.modalID === 'URL') {
					this.$store.dispatch('PATCH_ITEM_URL', payload);
				} else if (this.modalID === '위치') {
					this.$store.dispatch('PATCH_ITEM_POS', payload);
				}
			} else {
				if (this.modalID === '아이템 이름 변경') {
					this.$store.dispatch('EDIT_START_ITEM', payload);
				} else if (this.modalID === 'URL') {
					this.$store.dispatch('PATCH_START_URL', payload);
				} else if (this.modalID === '위치') {
					this.$store.dispatch('PATCH_START_POS', payload);
				} else if (this.modalID === '아이템 평가') {
					const item = this.item;
					item.comment = this.textArea;
					this.$store.dispatch('PATCH_ITEM_COMMENT', item);
				} else if (this.modalID === '코스 완료') {
					// eslint-disable-next-line prettier/prettier
					await this.$store.dispatch('STORE_START', this.textArea)
						.then(() => this.$router.push('/list'))
						.catch(error => console.log(error));
				}
			}
			this.textArea = '';
			this.showModal = false;
		},
		openForm(item, name) {
			if (name === '아이템 평가') {
				if (item.checked === true) {
					this.$store.dispatch('FALSE_ITEM', item._id);
					return;
				}
			}
			this.showModal = true;
			this.modalID = name;
			this.item = item;
		},
		closeModal() {
			this.showModal = false;
			this.textArea = '';
		},
	},
};
</script>

<style scoped>
.content_start_cont {
	display: inline-block;
	width: 100%;
}
.list_cont {
	list-style: none;
	text-align: center;
	height: 2.5rem;
	line-height: 2.5rem;
	margin: 1rem 0;
	padding-right: 1rem;
	font-family: 'Dongle', sans-serif;
	font-size: 1.5rem;
	font-weight: 300;
	background: white;
	border-radius: 0.5rem;
	box-shadow: 0.5rem -0.3rem 10px 1px rgba(143, 143, 143, 0.2);
}
.main_cont_creating {
	height: 12rem;
	overflow: auto;
}
.linkText {
	color: #ee27bc;
	font-weight: bold;
}
.index_cont {
	float: left;
	background: linear-gradient(to left, #5fa4ff, #2e72f1);
	width: 1em;
	border-radius: 0.5rem 0 0 0.5rem;
	color: white;
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
.modal_input {
	width: 95%;
}
.modal_input_button {
	width: 40%;
	margin-top: 10%;
	padding: 3px;
	border-style: none;
	border-radius: 0.5em;
	cursor: pointer;
}
.checked_Btn {
	color: #8763fb;
}
/* start */
.back_btn_cont {
	background: rgba(124, 198, 255, 0.247);
	display: flex;
	align-items: center;
	float: left;
	cursor: pointer;
	padding: 1px 4px;
	margin-top: 1rem;
	border-radius: 0.5rem;
	color: rgb(86, 153, 253);
}
.back_btn {
	font-size: 1rem;
}
.complete_Btn {
	background: rgba(124, 198, 255, 0.247);
	margin-left: -5rem;
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
.uncomplete_Btn {
	visibility: hidden;
}
.empty_list {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	height: 100%;
	width: 100%;
	color: rgba(124, 198, 255, 0.8);
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
		height: 8rem;
		padding: 0.3rem;
		align-content: flex-start;
	}
	.list_cont {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0.35rem 0;
		padding-right: 0.3rem;
		line-height: initial;
		height: 25%;
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
