<template>
	<section class="add_item_cont">
		<div class="select_cont">
			<select class="select_box" v-model="selected">
				<option disabled value="">--카테고리--</option>
				<option v-for="option in options" :key="option.text">
					{{ option.text }}
				</option>
			</select>
		</div>
		<input type="text" v-model="newItem" @keyup.enter="addItem" />
		<div class="btn_cont" @click="addItem">
			<i class="add_btn fas fa-plus"></i>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			options: [{ text: '맛집' }, { text: '카페' }, { text: '놀거리' }],
			selected: '',
			newItem: '',
		};
	},
	methods: {
		async addItem() {
			if (this.newItem !== '') {
				const payload = {
					category: this.selected,
					name: this.newItem,
				};
				// eslint-disable-next-line prettier/prettier
				await this.$store.dispatch('ADD_ITEM', payload)
					.then(response => {
						// response가 string이면 '에러메시지'가 전달된 것
						if (typeof response === 'string') {
							this.newItem = response;
							setTimeout(() => {
								this.newItem = '';
							}, 1200);
						} else {
							this.newItem = '';
						}
					})
					.catch(error => {
						console.log('error in CourseCreatingAddItem: ', error);
					});
			}
		},
	},
};
</script>

<style scoped>
.add_item_cont {
	text-align: center;
	height: 50px;
	line-height: 50px;
	border-radius: 0.5em;
	background: rgba(124, 198, 255, 0.247);
	box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.select_cont {
	height: 100%;
	float: left;
	margin-left: 1em;
}
.select_box {
	height: 60%;
	text-align: center;
	border-style: none;
	border-radius: 0.5em;
	font-family: 'Dongle', sans-serif;
	font-weight: 300;
	font-size: 1.5em;
}
.add_item_cont > input {
	text-align: center;
	width: 50%;
	height: 60%;
	font-family: 'Dongle', sans-serif;
	font-weight: 300;
	font-size: 1.8em;
	border-style: none;
	border-radius: 0.5em;
	cursor: text;
}
.btn_cont {
	float: right;
	background: linear-gradient(to right, #6478fb, #8763fb);
	width: 3em;
	border-radius: 0 0.5em 0.5em 0;
	cursor: pointer;
}
.add_btn {
	color: white;
}
</style>
