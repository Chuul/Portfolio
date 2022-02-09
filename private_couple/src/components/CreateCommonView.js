import CommonListView from './CommonListView';

export default function createCommonView(name) {
	return {
		name,
		created() {
			const name = this.$route.name;
			let tmp = 'item';
			if (name === 'start') {
				tmp = 'start';
			}
			this.$store.dispatch('FETCH_COMMON', tmp);
			// if (this.$store.state.startList.length > 0) {
			// 	return;
			// } else {
			// 	this.$store.dispatch('FETCH_START_LIST');
			// }
		},
		render(createElement) {
			return createElement(CommonListView);
		},
	};
}
