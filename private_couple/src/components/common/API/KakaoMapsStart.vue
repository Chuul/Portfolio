<template>
  <div id="map" style="width:100%;height:350px;"></div>
</template>

<script>
import getStartList from '@/api/index'

export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      infowindow: null,
      // list: [],
    };
  },
  created() {
    this.list = this.$store.state.startCourse;
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      // global kakao 
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=59950035b359511b00edf96f7c7e9261&libraries=services";
      document.head.appendChild(script);
    }
  },
  methods: {
    async initMap() {
      let list = [];
      let tmp = this.$store.state.startCourse;
      if(tmp.length !== 0) {
        list = tmp;
      } else {
        const { data } = await getStartList();
        list = data[0].start;
      }
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = { 
          center: new kakao.maps.LatLng(37.533017, 126.981094), // 지도의 중심좌표
          level: 8 // 지도의 확대 레벨
      };

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        
      // 마커를 표시할 위치입니다 
      var positions = [];
      for(let i = 0 ; i < list.length ; i++) {
        if(list[i].pos_latlang !== '') {
          let xPos = Number(list[i].pos_latlng.x)
          let yPos = Number(list[i].pos_latlng.y)
          const obj = {
            content: '<div>'+this.list[i].name+'</div>',
            latlng: new kakao.maps.LatLng(yPos, xPos)
          }
          positions.push(obj);
        }
      }

      for (var i = 0; i < positions.length; i ++) {
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng // 마커의 위치
        });

        // 마커에 표시할 인포윈도우를 생성합니다 
        var infowindow = new kakao.maps.InfoWindow({
            content: positions[i].content // 인포윈도우에 표시할 내용
        });

        // 마커에 이벤트를 등록하는 함수 만들고 즉시 호출하여 클로저를 만듭니다
        // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        (function(marker, infowindow) {
            // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다 
            kakao.maps.event.addListener(marker, 'mouseover', function() {
                infowindow.open(map, marker);
            });

            // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
            kakao.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.close();
            });
        })(marker, infowindow);
      }
    }
  }
}
</script>