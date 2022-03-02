<template>
	<section :class="content_start_cont">
		<div v-if="filter_cont" class="select_cont">
			<a @click="filterItem('전체')" class="select_option">
				<span>전체</span>
			</a>
			<a @click="filterItem('맛집')" class="select_option">
				<span>맛집</span>
			</a>
			<a @click="filterItem('카페')" class="select_option">
				<span>카페</span>
			</a>
			<a @click="filterItem('놀거리')" class="select_option">
				<span>놀거리</span>
			</a>
		</div>
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
				<div class="btn_cont">
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
					<i class="basic_Btn far fa-trash-alt" @click="deleteOneItem(item)" />
				</div>
			</li>
		</section>
		<Modal v-if="showModal" @close="closeModal()">
			<h2 slot="header">{{ modalID }}</h2>
			<form slot="body">
				<input type="text" v-model="textArea" />
				<button @click.prevent="patchOneData()">입력</button>
			</form>
		</Modal>
		<template v-if="this.$route.name == 'start'">
			<div class="start_basic_btn">
				<span class="back_btn_cont">
					<i
						class="back_btn fas fa-arrow-circle-left"
						@click="backStartView()"
					/>
				</span>
				<button class="complete_Btn" @click="openForm(null, '코스 완료')">
					코스 완료
				</button>
			</div>
		</template>
	</section>
</template>

<script>
import Modal from '@/components/common/ModalPrototype.vue';

export default {
	created() {
		const name = this.$route.name;
		if (name === 'creating') {
			this.$store.dispatch('FETCH_ITEM_LIST');
		} else if (name === 'start') {
			if (this.$store.getters.getStartList.length > 0) {
				return;
			} else {
				this.$store.dispatch('FETCH_START_LIST');
			}
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
		filter_cont() {
			return this.$route.name === 'creating' ? true : false;
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
				return this.$store.getters.getItemList;
			} else {
				return this.$store.getters.getStartList;
			}
		},
	},
	methods: {
		filterItem(name) {
			let arr = document.getElementsByClassName('select_option');
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].innerText === name) {
					arr[i].style = 'color: rgba(124, 198, 255, 1.0); font-weight: bold;';
				} else {
					arr[i].style = 'color: ""; font-weight: normal;';
				}
			}
			this.$store.dispatch('FILTER_ITEM', name);
		},
		toggleOneItem(item) {
			this.$store.commit('SET_TOGGLE_ITEM', item);
		},
		deleteOneItem(item) {
			if (this.$route.name === 'creating') {
				this.$store.dispatch('DELETE_ITEM', item._id);
			} else {
				this.$store.dispatch('DELETE_START', item._id);
			}
		},
		backStartView() {
			this.$router.push('/list');
		},
		// Modal 관련 method
		setObj() {
			const obj = {
				id: this.item._id,
				textArea: this.textArea,
			};
			return obj;
		},
		async patchOneData() {
			let payload = {};
			if (this.modalID !== '코스 완료') {
				payload = this.setObj();
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
						.then(() => {
							this.$router.push('/list');
						})
						.catch(error => {
							console.log(error);
						});
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
.select_cont {
	text-align: center;
	margin: 0.6rem;
}
.select_option::after {
	display: inline-block;
	content: '';
	width: 1px;
	height: 0.6rem;
	margin: 0 0.6em;
	background: black;
}
.select_option:last-child:after {
	display: none;
}
.select_option:hover {
	cursor: pointer;
	color: rgba(124, 198, 255, 0.8);
}
.select_option:active {
	color: rgba(124, 198, 255, 0.8);
}
.list_cont {
	display: flex;
	justify-content: space-between;
	align-items: center;
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
.main_cont_creating {
	height: 12rem;
	overflow: auto;
}
.linkText {
	color: #ee27bc;
	font-weight: bold;
}
.toggle_Btn {
	margin: 0.5rem;
	color: rgba(124, 198, 255, 0.8);
	cursor: pointer;
}
.basic_Btn {
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
		height: 8rem;
		padding: 0.3rem;
	}
	.list_cont {
		margin: 0.35rem 0;
		padding: 0.3rem 0.2rem;
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
