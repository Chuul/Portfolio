<template>
  <section>
    <li v-for="storedList in getStoredCourse" :key="storedList.item">
      <div class="storedList">
        <li v-for="storedItem in storedList" :key="storedItem.item">
          {{ storedItem.item }}
        </li>
        <!--
          우선순위 
          1. vuedraggable 사이트에서 ThirdParty 참고해서 리스트 만들기
          2. 코스 리스트 기본 기능들 구현해놓기 URL, 위치 정보 등등
          3. 새로고침해도 리스트 없어지지 않게 하기
          4. 리스트 삭제해도 없어지지 않게 하기  -->
      </div>
    </li>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed : {
    ...mapGetters(['getStoredCourse']),
  },
}
</script>

<style scoped>
li {
  list-style: none;
}
.storedList {
  background: rgb(248, 173, 244);
  margin: 15px;
}
</style>