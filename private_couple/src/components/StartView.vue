<template>
  <section class="course-cont">
    <h2>코스 진행중...</h2>
    <KakaoMap></KakaoMap>
    <div class="main-cont">
      <li 
        class="list-cont" 
        v-for="(item, index) in startList" 
        :key="item.name">
        <div class="item-cont">
          <i 
            class="checkBtn far fa-check-circle" 
            @click="openForm({item, index})" 
            :class="{checkBtnCompleted: item.completed}" 
          />
          {{ item.name }}
          <i 
            class="deleteBtn far fa-trash-alt" 
            @click="deleteOneItem(item)" 
          />
          <i 
            class="posBtn fas fa-map-marked-alt" 
            @click="openPosForm(item)" 
            :class="{checkBtnChecked: item.pos !== ''}"
          />        <i 
            class="urlBtn far fa-window-restore" 
            @click="openUrlForm(item)" 
            :class="{checkBtnChecked: item.url !== ''}"
          />
        </div>
        <div class="arrow-cont">
          <i class="fas fa-arrow-down"></i>
        </div>
      </li>
    </div>
    <button class="completBtn" @click="openCompleteForm()">코스 완료</button>
    <!-- 모달창 -->
    <Modal v-if="showModal" @close="closeForm()">
      <h2 slot="header">코스 평가</h2>
      <form slot="body">  
        <label for="comment">한줄평 </label>
        <input type="text" id="comment" v-model="commentText">
        <button @click.prevent="patchOneComment()">평가완료</button>
      </form>
    </Modal>
    <Modal v-if="showUrlModal" @close="closeUrlForm()">
      <h2 slot="header">URL 입력</h2>
      <form slot="body">  
        <input type="text" id="urlInput" v-model="urlText">
        <button @click.prevent="patchOneUrl()">입력</button>
      </form>
    </Modal>
    <Modal v-if="showPosModal" @close="closePosForm()">
      <h2 slot="header">Position 입력</h2>
      <form slot="body">
        <input type="text" id="posInput" v-model="posText">
        <button @click.prevent="patchOnePos()">입력</button>
      </form>
    </Modal>
    <Modal v-if="showCompleteModal" @close="closeCompleteForm()">
      <h2 slot="header">코스 평점</h2>
      <form slot="body">
        <input type="text" id="completeInput" v-model="completeText">
        <button @click.prevent="patchOneComplete()">완료</button>
      </form>
    </Modal>
  </section>
</template>

<script>
import { 
  replaceStartCourse, 
  getStartList, 
  patchComment, 
  toggleTrueItem, 
  toggleFalseItem, 
  deleteStartItem, 
  patcStarthUrl, 
  patchStartPos,
  patchStartItem,
  patchStartCourse
} from '@/api/index';
import KakaoMap from "@/components/common/API/KakaoMapsStart.vue";
import Modal from '@/components/common/Modal.vue';

export default {
  components: {
    KakaoMap,
    Modal
  },
  data() {
    return {
      startList: [],
      item: {},
      commentText: "",
      urlText: "",
      posText: "",
      completeText: "",
      showModal : false,
      showUrlModal: false,
      showPosModal: false,
      showCompleteModal: false
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
      const item = this.item;
      const obj = {
        id: item._id,
        commentText: this.commentText
      };
      await patchComment(obj);
      const id = item._id;
      await toggleTrueItem(id);
      delete item.completed;
      delete item._id;
      item.comment = this.commentText;
      patchStartItem(item);
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
     async deleteOneItem(item) {
      await deleteStartItem(item._id);
      this.getData();
    },
    async patchOneUrl() {
      const obj = {
        id: this.item._id,
        urlText: this.urlText
      };
      await patcStarthUrl(obj);
      this.getData();
      this.urlText = "";
      this.showUrlModal = true;
    },
    async patchOnePos() {
      const obj = {
        id: this.item._id,
        posText: this.posText
      };
      await patchStartPos(obj);
      this.getData();
      this.posText = "";
      this.showPosModal = false;
    },
    async patchOneComplete() {
      const course = {
        list: this.startList,
        completeText: this.completeText
      }
      await patchStartCourse(course);
      this.showCompleteModal = false;
      this.completeText = "";
    },
    openUrlForm(item) {
      this.showUrlModal = true;
      this.item = item;
    },
    openPosForm(item) {
      this.showPosModal = true;
      this.item = item;
    },
    openCompleteForm() {
      this.showCompleteModal = true;
      this.getData();
    },
    closeForm() {
      this.showModal = false;
      this.item = "";
    },
    closeUrlForm() {
      this.showUrlModal = false;
      this.urlText = "";
    },
    closePosForm() {
      this.showPosModal = false;
      this.posText = "";
    },
    closeCompleteForm() {
      this.showCompleteModal = false;
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
.course-cont {
  height: 80vh;
  margin: 2em;
  padding: 2em;
  text-align: center;
  background: rgba(124, 198, 255, 0.11);
}
.main-cont li:last-child .arrow-cont {
  display: none;
}
.list-cont {
  border-radius: 0.5em;
}
.item-cont {
  margin: 1.5em;
  padding : 1rem;
  border-radius: 0.5em;
  background: white;
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
.checkBtnChecked {
  color: red;
}
.arrow-cont {
  margin: 0.5em;
}
.urlBtn {
  color: #e1e1fd;
  float: right;
  margin: 0.5em;
  cursor : pointer;
}
.posBtn {
  color: #e1e1fdc5;
  float: right;
  margin: 0.5em;
  cursor : pointer;
}
.deleteBtn {
  color: #e1e1fdc5;
  float: right;
  margin: 0.5em;
  cursor : pointer;
}
.completBtn {
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