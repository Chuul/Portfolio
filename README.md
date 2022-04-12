# Private Course

## 🌟 서비스 소개
👦🏻 데이트 코스를 만들고, 진행하고, 기록하는 웹 어플리케이션 👩🏻

배포 : [https://private-course.herokuapp.com](https://private-course.herokuapp.com)

### [WIKI](https://github.com/Chuul/Private-Course/wiki)
    
## 🌟 주요 기능

### :couple: 로그인 페이지

* OAuth인증 기반의 '카카오 로그인' API로 로그인을 합니다.
* '카카오 로그인'의 사용자 정보 가져오기 API를 통해 사용자의 정보를 가져옵니다. 
* 가져온 사용자 정보를 기반으로 MongoDB 리소스에 접근합니다. 
<p align="center">
<img width="700" src="https://user-images.githubusercontent.com/86756501/162190821-ecdfddfb-7120-4630-9d30-e123774dc917.jpeg">
</p>

<p align="center">
<img width=1000 src="https://user-images.githubusercontent.com/86756501/159721605-07ef31af-d04b-478f-ae31-f4ee05905d0b.png">
</p>

### :couple: 코스생성 페이지 

코스를 구성할 아이템을 검색, 추가, 수정하고, 아이템을 선택해 코스를 만드는 페이지입니다.

<p align="center">
<img width="1000" src="https://user-images.githubusercontent.com/86756501/162172216-fa522119-d2ba-4abe-92f9-1e2d866090c6.png">
</p>

#### :point_up: 카카오 맵을 사용한 키워드 검색

* 카카오 맵 API의 키워드 검색 기능을 사용해 코스 관련 정보를 얻을 수 있습니다.
<p align="center">
<img width="1000" src="https://user-images.githubusercontent.com/86756501/162169050-78ab09d6-1bbd-4d1e-a73d-da17cf2a78bb.png">
</p>

#### :point_up: 카테고리별로 아이템 추가

<p align="center">
<img width="1000" src="https://user-images.githubusercontent.com/86756501/162169054-04949560-2bd1-4f92-94c9-2c6399a16519.png">
</p>

#### :point_up: 아이템 정보 추가 및 아이템 삭제

<p align="center">
<img src="https://user-images.githubusercontent.com/86756501/162185286-46d3e076-e1ec-4921-866c-6b5070b3036c.gif">   
</p>

* 아이템과 관련되 URL, 위치를 추가할 수 있습니다.
* URL 추가 시, 아이템 이름의 색상이 바뀌며, 이름 클릭시 해당 링크로 연결됩니다.
* 위치는 추후 코스 시작 시, 지도에 위치를 표시해줄 때 사용합니다.
* 마음에 들지 않는 아이템은 삭제할 수 있습니다.

#### :point_up: 코스 생성

<p align="center">
<img src="https://user-images.githubusercontent.com/86756501/162192934-21d076b0-d75f-4d13-9124-a945af4561c7.gif">   
</p>

* 아이템의 체크버튼을 누른 후, '코스생성' 버튼을 누르면 하단에 코스가 생성됩니다.
* 코스 저장 버튼을 누르면, 코스 목록 페이지에 코스가 추가됩니다.
* 코스 순서를 변경할 수 있습니다. 
<p align="center">
<img src="https://user-images.githubusercontent.com/86756501/162185571-e14d68f6-294f-4b7f-b20b-8f67c96a8434.gif">   
</p>

### :couple: 코스 목록 페이지

코스 생성 페이지에서 저장한 코스들을 보여주며, 코스 진행을 시작하는 기능을 가지고 있습니다. 

<p align="center">
<img width="1000" src="https://user-images.githubusercontent.com/86756501/160099217-941d63e5-1704-4336-a78f-72f661008244.png">
</p>

#### :point_up: 코스 시작 및 삭제

<p align="center">
<img width="1000" src="https://user-images.githubusercontent.com/86756501/160099618-da936fa9-c945-4786-a99a-3736be22a3f7.png">
</p>

* 코스의 왼쪽 하트를 누르면, 해당 코스를 진행시킬 수 있습니다.
<img src="https://user-images.githubusercontent.com/86756501/162940685-56af5674-e47e-4d9e-af1f-2f78737a74ff.gif">

* 마음에 들지 않는 코스는 삭제할 수 있습니다.

### :couple: 코스 진행 페이지

코스 목록에서 선택한 코스를 진행하는 페이지입니다. 아이템과 코스를 완료 후, 평가할 수 있습니다.

<p align="center">
<img width="1000" src="https://user-images.githubusercontent.com/86756501/162941624-eabe4b1e-1ac5-4ea4-a205-f3979ec46cb5.png">
</p>

#### :point_up: 아이템 위치 표시

* 코스 생성 페이지에서 위치를 추가한 아이템의 위치를 표시해줍니다.

<p align="center">
<img width="1000" src="https://user-images.githubusercontent.com/86756501/162941640-8121e59f-c4d8-482b-8ac7-7ccb0d467dd5.png">
</p>

#### :point_up: 아이템 수정, 삭제 및 아이템 정보 추가

* 코스 생성 페이지와 마찬가지로 모달창을 사용해 URL과 위치 정보를 추가 가능합니다.
* 아이템 이름을 변경할 수 있습니다.
* 마음에 들지 않는 아이템은 삭제할 수 있습니다.

#### :point_up: 아이템 및 코스 평가

* 아이템의 체크버튼을 누르면, 아이템을 평가할 수 있습니다. 평가는 이전 코스 페이지에 추가됩니다.
<p align="center">
<img width="1000" src="https://user-images.githubusercontent.com/86756501/162178375-58e93ffc-e35c-4c87-8d18-931e2978aa8f.png">
</p>

* 마찬가지로 코스 완료 버튼을 누르면, 코스를 평가할 수 있습니다.
<p align="center">
<img width="250" src="https://user-images.githubusercontent.com/86756501/162178508-1684e122-59e4-40fb-bd34-cc9f12eff37e.png">
</p>

#### :point_up: 코스 진행 페이지 돌아가기 및 그만두기

<img width="700" src="https://user-images.githubusercontent.com/86756501/162940699-96183968-49fe-4c16-92d3-0d7a3d3c5807.gif">

* 코스 진행 페이지에서 다른 페이지로 이동하면, 왼쪽 상단에 코스 진행 페이지로 돌아갈 수 있는 버튼이 생깁니다.
<p align="center">
<img width="700" src="https://user-images.githubusercontent.com/86756501/162179396-fbcbdeac-4221-41dd-9965-3e910a69c29c.png">
</p>

* 그만두기 버튼을 누르면, 해당 코스의 진행 상황은 사라지고, 코스 목록 페이지로 돌아갑니다.
<p align="center">
<img width="577" src="https://user-images.githubusercontent.com/86756501/162179389-a280b884-f601-47a5-99e7-add5a04543d6.png">
</p>

### :couple: 이전 코스 페이지

코스 진행 페이지에서 완료한 아이템과 코스의 이름과 평가를 아이템, 코스로 두 가지로 나눠서 보여줍니다. 

<p align="center">
<img width="1000" src="https://user-images.githubusercontent.com/86756501/162942098-94009b14-59e8-4dee-86be-ebb1b3c32e3f.png">
</p>

## 🌟 배포

Heroku를 이용해 앱을 배포하였습니다.
<p align="center">
<img width="550" alt="스크린샷 2022-04-08 오후 1 07 06" src="https://user-images.githubusercontent.com/86756501/162942133-7b8505d6-2a57-4539-9569-07b9e15ba7da.png">
</p>