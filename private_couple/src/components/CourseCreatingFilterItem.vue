<template>
	<div v-if="this.$route.name === 'creating'" class="select_cont">
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
</template>

<script>
export default {
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
	},
};
</script>

<style scoped>
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
</style>
