<template>
	<section id="kakao_start_cont"></section>
</template>

<script>
export default {
	created() {
		this.startList = this.$store.getters.getStartList;
	},
	mounted() {
		this.initMap();
	},
	data() {
		return {
			startList: [],
			map: null,
			infowindow: null,
		};
	},
	methods: {
		initMap() {
			var mapContainer = document.getElementById('kakao_start_cont'); // 지도를 표시할 div

			var firstLatLng = { y: 37.533017, x: 126.981094 };
			for (let i = 0; i < this.startList.length; i++) {
				if (this.startList[i].pos_latlng !== '') {
					firstLatLng = this.startList[i].pos_latlng;
					break;
				}
			}
			var mapOption = {
				center: new kakao.maps.LatLng(firstLatLng.y, firstLatLng.x), // 지도의 중심좌표
				level: 8, // 지도의 확대 레벨
			};

			var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

			// 마커를 표시할 위치입니다
			var positions = [];
			for (let i = 0; i < this.startList.length; i++) {
				if (this.startList[i].pos_latlng !== '') {
					let xPos = Number(this.startList[i].pos_latlng.x);
					let yPos = Number(this.startList[i].pos_latlng.y);
					const obj = {
						content: '<div>' + this.startList[i].name + '</div>',
						latlng: new kakao.maps.LatLng(yPos, xPos),
					};
					positions.push(obj);
				}
			}

			for (var i = 0; i < positions.length; i++) {
				// 마커를 생성합니다
				var marker = new kakao.maps.Marker({
					map: map, // 마커를 표시할 지도
					position: positions[i].latlng, // 마커의 위치
				});

				// 마커에 표시할 인포윈도우를 생성합니다
				var infowindow = new kakao.maps.InfoWindow({
					content: positions[i].content, // 인포윈도우에 표시할 내용
				});

				// 마커에 이벤트를 등록하는 함수 만들고 즉시 호출하여 클로저를 만듭니다
				// 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
				(function (marker, infowindow) {
					// 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다
					kakao.maps.event.addListener(marker, 'mouseover', function () {
						infowindow.open(map, marker);
					});

					// 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
					kakao.maps.event.addListener(marker, 'mouseout', function () {
						infowindow.close();
					});
				})(marker, infowindow);
			}
		},
	},
};
</script>

<style scoped>
#kakao_start_cont * {
	font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
}
#kakao_start_cont {
	height: 0;
	border-radius: 0.5rem;
	padding-bottom: 40%;
}
/* 반응형 - PC */
@media (min-width: 1024px) {
	#kakao_start_cont {
		width: 47%;
		height: inherit;
	}
}
/* 반응형 - 모바일 */
@media (max-width: 430px) {
	#kakao_start_cont {
		padding-bottom: 120%;
	}
}
</style>
