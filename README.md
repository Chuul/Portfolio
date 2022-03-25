# Private Course

## 🌟 서비스 소개
👦🏻 데이트 코스를 만들고, 진행하고, 기록하는 웹 어플리케이션 👩🏻

배포 : [https://private-course.herokuapp.com](https://private-course.herokuapp.com)

### [WIKI](https://github.com/Chuul/Private-Course/wiki)
    
## 🌟 주요 기능

### :couple: 로그인 페이지

<img width=800 src="https://user-images.githubusercontent.com/86756501/159721605-07ef31af-d04b-478f-ae31-f4ee05905d0b.png">

* OAuth인증 기반의 '카카오 로그인' API로 로그인을 합니다.
* '카카오 로그인'의 사용자 정보 가져오기 API를 통해 사용자의 정보를 가져옵니다. 
* 가져온 사용자 정보를 기반으로 MongoDB 리소스에 접근합니다. 

1. 카카오 소셜로그인 인증 및 로그인

2. 가져온 사용자 정보로 MongoDB 리소스에 접근

### :couple: 코스생성 페이지 

아이템(1개의 코스)을 검색, 추가, 수정하고, 아이템을 선택해 코스를 만드는 페이지입니다.

<img width="800" src="https://user-images.githubusercontent.com/86756501/160093679-f305c3b6-3f7b-4aaa-bc23-f18d1c69f1db.png">

#### :point_up: 카카오 맵을 사용한 키워드 검색

<img width="800" src="https://user-images.githubusercontent.com/86756501/160096277-569d3cf1-79d2-4bb1-a2e7-60410ff8d272.png">

* 카카오 맵 API와 맵의 키워드 검색 기능을 사용해 코스 관련 정보를 얻을 수 있습니다.

#### :point_up: 카테고리별로 아이템 추가
  
 <img width="800" src="https://user-images.githubusercontent.com/86756501/160094000-3bae01e6-825d-4b82-b19f-91871049380f.png">

#### :point_up: 아이템 정보 추가 및 아이템 삭제

<img width="800" src="https://user-images.githubusercontent.com/86756501/160096546-93a62610-fe7b-4e16-9f4e-2ce3f56916b6.png">

* 아이템과 관련되 URL, 위치를 추가할 수 있습니다.

<img width="800" src="https://user-images.githubusercontent.com/86756501/160094137-836ef3b4-392e-49ec-8b14-af395128caf7.png">

* 각 데이터 추가 시 모달창을 활용합니다.

<img width="800" src="https://user-images.githubusercontent.com/86756501/160096869-602e07db-ee23-452d-81bf-9b162ee1410a.png">

* URL 추가 시, 아이템 이름의 색상이 바뀌며, 이름 클릭시 해당 링크로 연결됩니다.
* 위치는 추후 코스 시작 시, 지도에 위치를 표시해줍니다.
* 마음에 들지 않는 아이템은 삭제할 수 있습니다.

#### :point_up: 코스 생성

<img width="800" src="https://user-images.githubusercontent.com/86756501/160094159-897e38a0-62ef-4e88-a39d-e98b2bd54757.png">

* 아이템의 체크버튼을 누른 후, '코스생성' 버튼을 누르면 하단에 코스가 생성됩니다.
* Draggable Node Package를 사용하여 코스 순서를 변경합니다. 
* 코스 저장 버튼을 누르면, 코스 목록 페이지에 코스가 추가됩니다.

### :couple: 코스 목록 페이지

코스 생성 페이지에서 저장한 코스들을 보여주며, 코스 진행을 시작하는 기능을 가지고 있습니다. 

#### :point_up: 코스 시작 및 삭제

<img width="800" src="https://user-images.githubusercontent.com/86756501/160095943-c3f1c0a9-c0c2-409a-8211-38ef4411fd89.png">

* 코스의 왼쪽 하트를 누르면, 해당 코스를 진행시킬 수 있습니다.
* 마음에 들지 않는 코스는 삭제할 수 있습니다.

### :couple: 코스 진행 페이지

<img width="800" src="https://user-images.githubusercontent.com/86756501/160094897-c605b0e8-5bdc-4a45-80bc-ac360613287f.png">

코스 목록에서 선택한 코스를 진행하는 페이지입니다. 아이템과 코스를 완료 후, 평가할 수 있습니다.

#### :point_up: 아이템 위치 표시

<img width="800" src="https://user-images.githubusercontent.com/86756501/160094901-7d65afc2-1e43-4be3-8a77-9c6f0e07b9c0.png">

* 코스 생성 페이지에서 위치를 추가한 아이템의 위치를 표시해줍니다.

#### :point_up: 아이템 수정, 삭제 및 아이템 정보 추가

<img width="800"   src="https://user-images.githubusercontent.com/86756501/160094912-f7699df8-5536-4874-a326-ede895111b68.png">

* 아이템의 이름을 수정하고, 코스 생성 페이지와 마찬가지로 URL과 위치 정보를 추가 가능합니다.
* 마음에 들지 않는 아이템은 삭제할 수 있습니다.

#### :point_up: 아이템 및 코스 평가

<img width="800" src="https://user-images.githubusercontent.com/86756501/160095258-54e525b2-f450-4a2b-ab08-d29d7bb87a5d.png">

* 아이템의 체크버튼을 누르면, 아이템을 평가할 수 있습니다. 평가는 이전 코스 페이지에 추가됩니다.

<img width="800" src="https://user-images.githubusercontent.com/86756501/160095269-be3c3ab8-e7dc-49ea-a9b8-c7b193dceedd.png">

* 코스 완료 버튼을 누르면, 코스를 평가할 수 있습니다. 평가와 더불어, 완료한 아이템만 이전 코스 페이지에 추가됩니다.

#### :point_up: 코스 진행 페이지 돌아가기 및 그만두기

<img width="800" src="https://user-images.githubusercontent.com/86756501/160095415-b8037169-a4c6-4f65-abcf-86e6d13749ae.png">

* 코스 진행 페이지에서 다른 페이지로 이동하면, 왼쪽 상단에 코스 진행 페이지로 돌아갈 수 있는 버튼이 생깁니다.
* 그만두기 버튼을 누르면, 해당 코스의 진행 상황은 사라지고, 코스 목록 페이지로 돌아갑니다.

### :couple: 이전 코스 페이지

<img width="800" src="https://user-images.githubusercontent.com/86756501/160095422-107ba6ed-61bd-47a1-8319-d624c0f59cec.png">

코스 진행 페이지에서 완료한 아이템과 코스의 이름과 평가를 아이템, 코스로 두 가지로 나눠서 보여줍니다. 

## 🌟 배포

Heroku를 이용해 앱을 배포하였습니다.



