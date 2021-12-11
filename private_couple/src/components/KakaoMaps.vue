<template>
  <div>
    <div id="map"></div>
    <div class="button-group">
      <button class="button-hide" @click="changeSize(0)">숨기기</button>
      <button class="button-show" @click="changeSize(80)">지도표시</button>
      <button class="button-create" @click="createMarker()">위치표시</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      markers: [],
      infowindow: null,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=d8f74dc81a66dea76dd630c540c728ee&libraries=services";
      document.head.appendChild(script);
    }
  },
  methods: {
    // kakao.maps.Map(container, options)
    // 지도를 생성한다. kakaoMap API 문서보기!
    initMap() {
      const container = document.getElementById("map");
      const options = {
        // maps.LatLng : WGS84(세계지구좌표시스템) 좌표 정보를 가지고 있는 객체를 생성한다. ex) kakao.maps.LatLng(latitude, longitude)
        center: new kakao.maps.LatLng(37.560941, 126.986214),
        level: 5,
      };
      this.map = new kakao.maps.Map(container, options);
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}%`;
      container.style.height = `${size*4}px`;
      this.map.relayout();
    },
    createMarker() {
      // 마커 이미지 생성
      var restaurant = new kakao.maps.MarkerImage(
        'https://localimg.daum-img.net/localimages/07/2009/map/icon/blog_icon01_on.png',
        new kakao.maps.Size(31, 35),
        {
            offset: new kakao.maps.Point(16, 34),
            alt: "아이템 마커",
            shape: "poly",
            coords: "1,20,1,9,5,2,10,0,21,0,27,3,30,9,30,20,17,33,14,33"
        }
      );
      // 데이터 받아오기
      var courseList = this.$store.state.selectedCourse

      // 주소로 좌표 검색
      var geocoder = new kakao.maps.services.Geocoder();
      var vm = this;

      var callback = function(result, status) {
        
        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
              map: vm.map,
              position: coords,
              image: restaurant
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
              content: `<div style="width:150px;text-align:center;padding:6px 0;">${courseList[0]}</div>`
          });

          // 마커에 마우스오버 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.open(vm.map, marker);
          });

          // 마커에 마우스아웃 이벤트를 등록합니다
          kakao.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
          });

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          vm.map.setCenter(coords);
        } 
      }
      for(let i = 0 ; i < courseList.length ; i++) {
        let item = courseList[i].pos
        geocoder.addressSearch(item, callback);
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  margin: 15px auto;
  width: 80%;
  height: 320px;
  border-radius: 10px;
   box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
  background: rgba(124, 198, 255, 0.247);
  border-style : none;
  border-radius: 5px;
  padding : 5px 10px;
  font-family: 'Noto Sans KR', sans-serif;
  color : rgb(86, 153, 253);
  cursor : pointer;
  box-shadow: 0.5em -0.2em 10px 1px rgba(143, 143, 143, 0.2);
}
</style>
