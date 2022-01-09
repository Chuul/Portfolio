<template>
  <div id="map" style="width:100%;height:350px;"></div>
</template>

<script>
export default {
  name: "KakaoMap",
  data() {
    return {
      map: null,
      infowindow: null,
      list: [],
      transpos: [],
    };
  },
  created() {
    console.log('kakaoMapState의 created');
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
    transPosition() {
      let tmp = this;
      console.log('created에서 실행한 transPosition');
      for (var i = 0; i < this.list.length; i ++) {
        if(this.list[i].pos !== "") {
          var geocoder = new kakao.maps.services.Geocoder();
  
          var callback = function(result, status) {
            if (status === kakao.maps.services.Status.OK) {
              let obj = {y: result[0].y, x: result[0].x}
              tmp.transpos.push(obj)
              console.log('transPosition의 temp.transpos: ', tmp.transpos)
            }
          };
          geocoder.addressSearch(this.list[i].pos, callback);
        }
      }
    },
    initMap() {
      this.transPosition();
      var tmp = this;
      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = { 
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 7 // 지도의 확대 레벨
      };

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        
      // 마커를 표시할 위치입니다 
      var positions = [];
      console.log('tmp.transpos: ', tmp.transpos);
      for(let i = 0 ; i <tmp.trnaspos.length ; i++) {
        let obj = {content: '1', latlng:new kakao.maps.LatLng(tmp.transpos.y,tmp.transpos.x)}
        positions.push(obj)
      }
    //   var positions =  [
    //     {
    //         content: '<div>카카오</div>', 
    //         latlng: new kakao.maps.LatLng(33.450705, 126.570677)
    //     },
    //     {
    //         content: '<div>생태연못</div>', 
    //         latlng: new kakao.maps.LatLng(33.450936, 126.569477)
    //     },
    //     {
    //         content: '<div>텃밭</div>', 
    //         latlng: new kakao.maps.LatLng(33.450879, 126.569940)
    //     },
    //     {
    //         content: '<div>근린공원</div>',
    //         latlng: new kakao.maps.LatLng(33.451393, 126.570738)
    //     }
    // ];

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