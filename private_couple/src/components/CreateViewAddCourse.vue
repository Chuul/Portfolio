<template>
  <section class="create-cont">
    <button class="createBtn" @click="getCheckedItems">코스생성</button>
    <draggable 
      :list="checkedItemList" 
      :disabled="!enabled" 
      @start="dragging = true" 
      @end="dragging = false">
      <li class="courseList" v-for="item in checkedItemList" :key="item.name">
        <a class="linkText" :href="item.url" target="_blank">
          {{ item.name }}
        </a>
        <span class="moveBtn-cont">
          <i class="fas fa-bars"></i>
        </span>
        <div class="arrowBtn-cont">
          <i class=" fal fa-arrow-alt-down"></i>
        </div>
      </li> 
    </draggable>
    <button class="storeBtn" @click="storeCourse">코스 저장</button>
    <Modal v-if="checkFail" @close="closeCheck">
      <h2 slot="header">최소 1개 이상의 아이템을 선택해주세요</h2>
    </Modal>
    <Modal v-if="showSuccess" @close="closeSuccess">
      <h2 slot="header">코스 저장 완료</h2>
    </Modal>
    <Modal v-if="showFail" @close="closeFail">
      <h2 slot="header">코스 저장 실패</h2>
      <div slot="body">코스 생성 후 저장해주세요</div>
    </Modal>
  </section>
</template>

<script>
import draggable from 'vuedraggable';
import Modal from '@/components/common/Modal.vue'
import { postCourse } from '@/api/index';

export default {
  components : {
    draggable,
    Modal
  },
  data() {
    return {
      checkedItemList: [],
      enabled: true,
      dragging: false,
      checkFail: false,
      showSuccess: false,
      showFail: false,
    }
  },
  methods : {
    getCheckedItems() {
      if(this.$store.state.checkedItems.length === 0) {
        this.checkFail = true;
      } else {
        this.checkedItemList = this.$store.state.checkedItems;
      }
    },
    async storeCourse() {
      if(this.$store.state.checkedItems === []) {
        this.showFail = true;
      } else {
        let course = this.$store.state.checkedItems;
        course.forEach( (item) => {
          delete item.checked;
          item.completed = false;
          item.comment = "";
        })
        await postCourse(course);
        this.checkedItemList = [];
        this.showSuccess = true;
      }
    },
    closeCheck() {
      this.checkFail = false;
    },
    closeSuccess() {
      this.showSuccess = false;
    },
    closeFail() {
      this.showFail = false;
    }
  }
}
</script>

<style scoped>
.create-cont {
  text-align: center;
}
.createBtn {
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
li {
  margin-top: 1em;
  list-style: none;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  padding: 0 0.9eem;
  background: white;
  border-radius: 0.5em;
  font-family: 'Dongle', sans-serif;
  font-size: 1.5em;
  font-weight: 300;
  box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.courseList {
  margin-bottom: 3rem;
}
.linkText {
  color : #ee27bc;
  font-weight: bold;
}
.moveBtn-cont {
  float : right;
  margin-right: 1em;
}
.moveBtn-cont i {
  color: #e1e1fdc5;
}
.moveBtn-cont i:hover {
  color: #e1e1fdc5;
  cursor: pointer;
}
.arrowBtn-cont {
  text-align: center;
}
.arrowBtn-cont i {
  color : rgb(86, 153, 253);
}
li:last-child .arrowBtn-cont {
  display: none;
}
.storeBtn {
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