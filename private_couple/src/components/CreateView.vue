<template>
  <section>
    <Header></Header>
    <ToolBar></ToolBar>
    <KakaoMap></KakaoMap>
    <CreateViewAddItem></CreateViewAddItem>
    <CreateViewList></CreateViewList>
    <CreateViewAddCourse></CreateViewAddCourse>
  </section>
</template>

<script>
import Header from '@/components/common/Header.vue';
import ToolBar from '@/components/common/ToolBar.vue';
import KakaoMap from "@/components/common/API/KakaoMaps.vue";
import CreateViewAddItem from './CreateViewAddItem.vue';
import CreateViewList from './CreateViewList.vue';
import CreateViewAddCourse from './CreateViewAddCourse.vue';

export default {  
  components : {
    Header,
    ToolBar,
    KakaoMap,
    CreateViewAddItem,
    CreateViewList,
    CreateViewAddCourse
  },
}
</script>

<style>
section {
  margin : 0 2em;
}
</style>