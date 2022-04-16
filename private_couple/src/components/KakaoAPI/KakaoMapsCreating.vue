<template>
	<section id="map_creating_cont">
		<article id="menu_cont" class="bg_white">
			<div class="option">
				<form>
					<input type="text" id="keyword" size="15" placeholder="키워드" />
					<button @click.prevent="searchFunc">검색</button>
				</form>
			</div>
			<hr />
			<ul id="placesList">
				<li class="item" v-for="(item, index) in placeList" :key="item">
					<span
						class="markerbg"
						:style="`background-position: 0 -${10 + index * 46}px;`"
						:class="`marker_${index + 1}`"
					></span>
					<div class="info_cont" @click="showItemInfo(item)">
						<div class="info">
							<h5 class="info_item_name">{{ item.place_name }}</h5>
							<span
								:style="
									item.road_address_name
										? 'display:block; padding-bottom: 2px;'
										: ''
								"
								>{{
									item.road_address_name
										? item.road_address_name
										: item.address_name
								}}</span
							>
						</div>
					</div>
				</li>
			</ul>
			<div id="pagination"></div>
		</article>
	</section>
</template>

<script>
export default {
	mounted() {
		this.initMap();
	},
	data() {
		return {
			map: null,
			infowindow: null,
			markers: [],
			placeList: [],
		};
	},
	methods: {
		// 지도를 띄우는 function
		initMap() {
			let container = document.getElementById('map_creating_cont');
			let options = {
				center: new kakao.maps.LatLng(37.53343, 126.981279),
				level: 8,
			};
			this.map = new kakao.maps.Map(container, options);
		},
		searchFunc() {
			var temp = this;
			// 장소 검색 객체를 생성합니다
			var ps = new kakao.maps.services.Places();
			// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
			var infowindow = new kakao.maps.InfoWindow({
				zIndex: 1,
				removable: true,
			});
			// 키워드로 장소를 검색합니다
			searchPlaces();
			// 키워드 검색을 요청하는 함수입니다
			function searchPlaces() {
				var keyword = document.getElementById('keyword').value;
				if (!keyword.replace(/^\s+|\s+$/g, '')) {
					alert('키워드를 입력해주세요!');
					return false;
				}
				// 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
				ps.keywordSearch(keyword, placesSearchCB);
			}
			// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
			function placesSearchCB(data, status, pagination) {
				if (status === kakao.maps.services.Status.OK) {
					// 정상적으로 검색이 완료됐으면 검색 목록과 마커를 표출합니다
					displayPlaces(data);
					// 페이지 번호를 표출합니다
					displayPagination(pagination);
				} else if (status === kakao.maps.services.Status.ZERO_RESULT) {
					alert('검색 결과가 존재하지 않습니다.');
					return;
				} else if (status === kakao.maps.services.Status.ERROR) {
					alert('검색 결과 중 오류가 발생했습니다.');
					return;
				}
			}
			// 검색 결과 목록과 마커를 표출하는 함수입니다
			function displayPlaces(places) {
				// var listEl = document.getElementById('placesList'),
				var menuEl = document.getElementById('menu_cont');
				// fragment = document.createDocumentFragment(),
				var bounds = new kakao.maps.LatLngBounds();
				// listStr = '';
				// 검색 결과 목록에 추가된 항목들을 제거합니다
				// removeAllChildNods(listEl);
				temp.placeList = [];
				// 지도에 표시되고 있는 마커를 제거합니다
				removeMarker();
				for (let i = 0; i < places.length; i++) {
					// 마커를 생성하고 지도에 표시합니다
					let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
					let marker = addMarker(placePosition, i);
					let itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
					// 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
					// LatLngBounds 객체에 좌표를 추가합니다
					bounds.extend(placePosition);

					// 마커와 검색결과 항목에 mouseover 했을때
					// 해당 장소에 인포윈도우에 장소명을 표시합니다
					// mouseout 했을 때는 인포윈도우를 닫습니다
					(function (marker, places) {
						kakao.maps.event.addListener(marker, 'click', function () {
							displayInfowindow(marker, places);
						});
						itemEl.onmouseover = function () {
							displayInfowindow(marker, places);
						};
						itemEl.onmouseout = function () {
							infowindow.close();
						};
					})(marker, places[i]);
				}
				// 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
				menuEl.scrollTop = 0;
				// 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
				temp.map.setBounds(bounds);
			}
			// 검색결과 항목을 Element로 반환하는 함수입니다
			function getListItem(index, places) {
				temp.placeList.push(places);
				return places;
			}
			// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
			function addMarker(position, idx) {
				let imageSrc =
						'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
					imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
					imgOptions = {
						spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
						spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
						offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
					},
					markerImage = new kakao.maps.MarkerImage(
						imageSrc,
						imageSize,
						imgOptions,
					),
					marker = new kakao.maps.Marker({
						position: position, // 마커의 위치
						image: markerImage,
						clickable: true,
					});
				marker.setMap(temp.map); // 지도 위에 마커를 표출합니다
				temp.markers.push(marker); // 배열에 생성된 마커를 추가합니다
				return marker;
			}
			// 지도 위에 표시되고 있는 마커를 모두 제거합니다
			function removeMarker() {
				for (let i = 0; i < temp.markers.length; i++) {
					temp.markers[i].setMap(null);
				}
				temp.markers = [];
			}

			// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
			function displayPagination(pagination) {
				let paginationEl = document.getElementById('pagination'),
					fragment = document.createDocumentFragment(),
					i;
				// 기존에 추가된 페이지번호를 삭제합니다
				while (paginationEl.hasChildNodes()) {
					paginationEl.removeChild(paginationEl.lastChild);
				}
				for (i = 1; i <= pagination.last; i++) {
					let el = document.createElement('a');
					el.href = '#';
					el.innerHTML = i;
					el.style = 'display:inline-block;margin-right:10px;';

					if (i === pagination.current) {
						el.className = 'on';
					} else {
						el.onclick = (function (i) {
							return function () {
								pagination.gotoPage(i);
							};
						})(i);
					}
					fragment.appendChild(el);
				}
				paginationEl.appendChild(fragment);
			}
			// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
			// 인포윈도우에 장소명을 표시합니다
			function displayInfowindow(marker, places) {
				// 지도보기: link/map/장소ID 혹은 /link/map/위도,경도
				// 길찾기: '/link/to/이름,위도,경도' 혹은 '/link/to/장소ID'
				var content =
					'<div style="padding:5px;z-index:1; ">' +
					places.place_name +
					'</div><br><a href="https://place.map.kakao.com/' +
					places.id +
					'" style="color:#8a8a8a" target="_blank">관련정보</a> <a href="https://map.kakao.com/link/to/' +
					places.id +
					'" style="color:#8a8a8a" target="_blank">길찾기</a>';
				infowindow.setContent(content);
				infowindow.open(temp.map, marker);
			}
		},
		showItemInfo(item) {
			console.log(item);
		},
	},
};
</script>

<style scoped>
#map_creating_cont * {
	font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
	font-size: 12px;
}
#map_creating_cont {
	height: 0;
	padding-bottom: 30%;
	position: relative;
	overflow: auto;
	margin: 0 1rem 1rem 0;
	border-radius: 0.5rem;
	box-shadow: 0.5rem -0.3rem 10px 1px rgba(143, 143, 143, 0.2);
	z-index: 1;
}
#placesList {
	list-style: none;
	padding: 0;
	margin-top: 0;
}
#menu_cont {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	width: 25%;
	margin: 10px 0 30px 10px;
	padding: 5px;
	overflow-y: auto;
	background: rgba(255, 255, 255, 0.7);
	border-bottom: #5f5f5f;
	z-index: 2;
	font-size: 12px;
	border-radius: 10px;
}
.option {
	text-align: center;
}
.option input,
button {
	border-style: none;
	border-radius: 10px;
}
.option button {
	background: rgba(124, 198, 255, 0.247);
	color: #5699fd;
}
.bg_white {
	background: #fff;
}
#menu_cont hr {
	display: block;
	height: 1px;
	border: 0;
	border-top: 2px solid #5699fda8;
	margin: 3px 0;
}
/* 페이지 표시 */
#pagination {
	margin: 10px auto;
	text-align: center;
}
#pagination a {
	display: inline-block;
	margin-right: 10px;
}
#pagination .on {
	font-weight: bold;
	cursor: default;
	color: red;
}
/* 아이템 리스트 */
.markerbg {
	float: left;
	position: absolute;
	width: 36px;
	height: 37px;
	margin-top: 0.4rem;
	background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png)
		no-repeat;
}
.info_cont {
	border-bottom: 1px solid rgba(53, 53, 53, 0.993);
	overflow: hidden;
	min-height: 50px;
}
.info {
	padding: 0 0 10px 35px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	cursor: pointer;
}
.info_item_name {
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	padding-bottom: 2px;
	margin: 0.4rem 0 0;
}
/* 반응형 - PC */
@media (min-width: 1260px) {
	.option input {
		margin: 0 7px 7px 0;
	}
}
@media (min-width: 1024px) {
	#map_creating_cont {
		width: 47%;
		height: 40vh;
	}
	.option input {
		text-align: center;
		margin-bottom: 7px;
	}
}
/* 반응형 - 모바일 */
@media (max-width: 430px) {
	#map_creating_cont {
		padding-bottom: 120%;
	}
	#menu_cont {
		bottom: 65%;
		width: 90%;
		margin: 10px;
		padding: 8px;
	}
}
</style>
