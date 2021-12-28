<template>
  <section class="list-cont">
    <!-- <div class="sort-cont">
      <a @click="filterItem('전체')">
        <span>전체</span>
      </a> 
      <a @click="filterItem('음식점')">
        <span>음식점</span>
      </a>
      <a @click="filterItem('카페')">
        <span>카페</span>
      </a>
      <a @click="filterItem('즐길거리')">
        <span>즐길거리</span>
      </a>
    </div> -->
    <li v-for="item in itemList" :key="item.name">
      <!-- 체크버튼 -->
      <span class="checkBtn-cont" @click="changeCheck(item)"> 
        <template v-if="item.checked !== false">
          <i class="checkBtn fas fa-check-circle"></i>
        </template>
        <template v-else>
          <i class="checkBtn far fa-check-circle"></i>
        </template>
      </span>
      <!-- 아이템표시 -->
      <!-- <span> -->
        <!-- <a v-if="item.url !== ''" :href="item.url" target="_blank">
          {{ item.name }}
        </a> -->
        <span>
          {{ item.name }}
        </span>
      <!-- </span> -->
        <i class="far fa-trash-alt" @click="deleteOneItem(item)"></i>
        <i class="far fa-window-restore" @click="openUrlForm()"></i>
        <Modal v-if="showModal" @close="showModal = false">
          <h2 slot="header">URL 입력</h2>
          <form slot="body">
            <label for="urlInput">URL</label>
            <input type="text" id="urlInput" v-model="urlText">
            <button @click.prevent="patchOneURL(item)">입력</button>
          </form>
        </Modal>
    </li>
  </section>
</template>

<script>
// import { mapGetters } from 'vuex';
// import ListControl from '@/mixins/ListControl.js'
import { getItemList, deleteItem, patchUrl } from '@/api/index'
import EventBus from '../utils/bus';
import Modal from '@/components/common/Modal.vue'

export default {
  components: {
    Modal
  },
  data() {
    return {
      itemList: [],
      showModal: false,
      urlText: ""
    };
  },
  methods: {
    changeCheck(item) {
      item.checked = !item.checked;
      console.log(item.checked);
    },
    openUrlForm() {
      this.showModal = true;
    },
    async getData() {
      const { data } = await getItemList();
      // console.log('getItemList data : ', data);
      this.itemList = data;
      this.$store.commit('fetchItemList', this.itemList);
    },
    async deleteOneItem(item) {
      await deleteItem(item.name);
      this.getData();
    },
    async patchOneURL(item) {
      const obj = {
        id: item._id,
        urlText: this.urlText
      }
      await patchUrl(obj);
      this.getData();
      this.urlText = "";
    }
  },
  created() {
    console.log('view list에서의 created');
    this.getData();
  },
  mounted() {
    console.log('view list에서의 mounted');
    EventBus.$on('refresh', () => this.getData())
  },
  updated() {
    console.log('view list에서의 updated');
  },
  // computed : {
  //   ...mapGetters(['getAddCourse']),
  // },
  // mixins : [ListControl],
  filterItem(name) {
      this.$store.commit('filterListItem', name);
    },
}
</script>

<style scoped>
.sort-cont {
  text-align: center;
  margin: 1em;
}
a {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
}
a::after {
  display: inline-block;
  content : '';
  width: 1px;
  height: 0.8em;
  margin : 0 1em;
  background : black;
}
a:last-child::after {
  display: none;
}
a:active {
  color : rgba(124, 198, 255, 0.8);
}
a:hover {
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer;
}
.list-cont {
  margin : 0;
}
li {
  list-style: none;
  text-align: center;
  /* min-height: 50px; */
  height: 2em;
  line-height: 2em;
  margin: 1em 0;
  padding: 0 1em;
  font-family: 'Dongle', sans-serif;
  font-size: 1.5em;
  font-weight: 300;
  background: white;
  border-radius: 0.5em;
  box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.filterItem {
  display : none;
}
.checkBtn {
  float: left;
  margin : 0.5em;
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer
}
.utilBtn-cont {
  float : right;
}
.url-cont {
  display: inline-block;
  margin-right : 1em;
  cursor: pointer;
}
.checkURL {
  display : none;
}
/* url실행 */
.showURL {
  border-radius: 0.5em;
  background-color: #F6F6F6;
  padding: 0.2em 0.4em;
}
/* .backBtn-cont {
  margin-right : 0.5em;
} */
/* ******************뭔가 display:none이랑 관련 있을 듯...showURL 클래스를 다시 보자 */
.backBtn {
  display: inline-block;
  padding-top: 0.5em;
  margin-right : 0.5em;
}
.inputURL {
  border-style: none;
  border-radius: 0.5em;
  height: 1.5em;
}
/* .addBtn-cont {
  margin-left : 0.5em;
} */
.shareBtn {
  color : rgba(124, 198, 255, 0.8);
}
.existBtn {
  color :  #ffa7e5;
}
.position-cont {
  margin-right : 1em;
  cursor: pointer;
}
.existPOS {
  display: none;
}
.remove-cont {
  margin-right : 1em;
  color : rgba(124, 198, 255, 0.8);
}
.fa-trash-alt {
  cursor: pointer;
}
</style>