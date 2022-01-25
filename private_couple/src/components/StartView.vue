<template>
  <section class="main_cont">
    <h2>진행중...</h2>
    <div class="course_cont">
      <KakaoMap></KakaoMap>
      <ItemView></ItemView>
    </div>
    <button class="complete_Btn" @click="openCompleteForm()">
      코스 완료
    </button>
  </section>
</template>

<script>
import ItemView from '@/components/ItemView'
import KakaoMap from "@/components/common/API/KakaoMapsStart.vue";

export default {
  components: {
    ItemView,
    KakaoMap,
  },
}
</script>

<style scoped>
h2 {
  text-align: center;
  font-family: 'Dongle', sans-serif;
  font-size: 2em;
  font-weight: 700;
}
.main_cont {
  height: 80vh;
  margin: 2em;
  padding: 2em;
  text-align: center;
  background: rgba(124, 198, 255, 0.11);
}
.complete_Btn {
  margin: 1em 0;
  background: rgba(124, 198, 255, 0.247);
  border-style : none;
  border-radius: 0.5em;
  padding : 0.6em 1.5em;
  font-size : 1em;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  color : rgb(86, 153, 253);
  cursor : pointer;
  box-shadow: 0.5em -0.2em 10px 1px rgba(143, 143, 143, 0.2);
}
</style>