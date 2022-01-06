<template>
  <section class="course-cont">
    <h2>코스 진행중...</h2>
    <li class="list-cont" v-for="(item, index) in startList" :key="item.name">
      <i class="checkBtn far fa-check-circle" @click="openForm({item, index})" :class="{checkBtnCompleted: item.completed}"></i>
      {{ item.name }}
      <div class="arrow-cont">
        <i class="fas fa-arrow-down"></i>
      </div>
    </li>
    <Modal v-if="showModal" @close="closeForm()">
      <h2 slot="header">코스 평가</h2>
      <form slot="body">  
        <label for="comment">한줄평 </label>
        <input type="text" id="comment" v-model="commentText">
        <button @click.prevent="patchOneComment()">평가완료</button>
      </form>
    </Modal>
  </section>
</template>

<script>
import { replaceStartCourse, getStartList, patchComment, toggleTrueItem, toggleFalseItem } from '@/api/index';
import Modal from '@/components/common/Modal.vue';

export default {
   components: {
    Modal
  },
  data() {
    return {
      startList: [],
      item: {},
      commentText: "",
      showModal : false
    }
  },
  methods : {
    async startOneCourse() {
      const list = this.$store.state.startCourse;
      if(list.length === 0) {
        this.getData();
      } else {
        await replaceStartCourse(list);
        this.startList = list;
      }
    },
    async getData() {
      const { data } = await getStartList();
      this.startList = data[0].start;
    },
    async patchOneComment() {
      const obj = {
        id: this.item._id,
        commentText: this.commentText
      };
      await patchComment(obj);
      const id = this.item._id;
      await toggleTrueItem(id);
      this.commentText = "";
      this.showModal = false;
      this.getData();
    },
    async openForm(payload) {
      if(payload.item.completed === true) {
        await toggleFalseItem(payload.item._id);
        this.getData();
      } else {
        this.showModal = true;
        this.item = payload.item;
      }
    },
    closeForm() {
      this.showModal = false;
      this.item = "";
    },
  },
  created() {
    console.log('created');
    this.startOneCourse();
  },
  mounted() {
    console.log('mounted');
  },
  updated() {
    console.log('updated');
  }
}
</script>

<style scoped>
section {
  margin : 0;
}
li {
  list-style: none;
}
h2 {
  text-align: center;
  font-family: 'Dongle', sans-serif;
  font-size: 2em;
  font-weight: 700;
}
.checkBtn {
  float: left;
  margin : 0.5em;
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer;
}
.checkBtnCompleted {
  color: #8763FB;
}
.course-cont {
  height: 80vh;
  margin: 2em;
  background: rgba(124, 198, 255, 0.247);
}
.list-cont:last-child .arrow-cont {
  display: none;
}
.arrow-cont {
  margin: 0.5em;
}
</style>