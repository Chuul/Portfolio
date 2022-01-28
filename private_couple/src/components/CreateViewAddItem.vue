<template>
	<section class="addItem_cont">
		<div class="select_cont">
			<select v-model="selected">
				<option disabled value="">--카테고리--</option>
				<option v-for="option in options" :key="option.text">
					{{ option.text }}
				</option>
			</select>
		</div>
		<input type="text" v-model="newItem" @keyup.enter="addItem" />
		<div class="btn_cont" @click="addItem">
			<i class="addBtn fas fa-plus"></i>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			options: [{ text: '음식점' }, { text: '카페' }, { text: '즐길거리' }],
			selected: '',
			newItem: '',
		};
	},
	methods: {
		addItem() {
			if (this.newItem !== '') {
				const obj = {
					createdBy: this.$store.state.email,
					category: this.selected,
					name: this.newItem,
					checked: false,
					url: '',
					pos: '',
					pos_latlng: '',
				};
				this.$store.dispatch('ADD_ITEM', obj);
				this.newItem = '';
			}
		},
	},
};
</script>

<style scoped>
.addItem_cont {
	margin: 0;
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
select {
	height: 60%;
	text-align: center;
	border-style: none;
	border-radius: 0.5em;
	font-family: 'Dongle', sans-serif;
	font-size: 1.5em;
	font-weight: 300;
}
.addItem_cont input {
	text-align: center;
	width: 60%;
	height: 60%;
	font-family: 'Dongle', sans-serif;
	font-weight: 300;
	font-size: 1.8em;
	border-style: none;
	border-radius: 0.5em;
	cursor: text;
}
.btn_cont {
	display: block;
	float: right;
	background: linear-gradient(to right, #6478fb, #8763fb);
	width: 3em;
	border-radius: 0 0.5em 0.5em 0;
	cursor: pointer;
}
.addBtn {
	color: white;
}
</style>
