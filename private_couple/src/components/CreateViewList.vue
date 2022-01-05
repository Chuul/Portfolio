<template>
  <section class="list-cont">
    <li v-for="item in getItemList" :key="item.name">
      <i 
        class="checkBtn far fa-check-circle" 
        @click="toggleOneItem(item)" 
        :class="{checkBtnChecked: item.checked}"
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
      />
      <i 
        class="urlBtn far fa-window-restore" 
        @click="openUrlForm(item)" 
        :class="{checkBtnChecked: item.url !== ''}"
      />
    </li>
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
  </section>
</template>

<script>
import { getItemList, deleteItem, patchUrl, patchPos } from '@/api/index'
import EventBus from '../utils/bus';
import Modal from '@/components/common/Modal.vue';

export default {
  components: {
    Modal
  },
  data() {
    return {
      itemList: [],
      urlText: "",
      posText: "",
      item: {},
      showUrlModal: false,
      showPosModal: false,
    };
  },
  computed: {
    getItemList() {
      return this.$store.state.itemListState;
    }
  },
  methods: {
    toggleOneItem(item) {
      this.$store.commit('toggleItem', item);
      this.getData();
    },
    async getData() {
      const { data } = await getItemList();
      this.$store.commit('fetchItemList', data);
    },
    async deleteOneItem(item) {
      await deleteItem(item._id);
      this.$store.commit('deleteCheckedItems', item.name)
      this.getData();
    },
    async patchOneUrl() {
      const obj = {
        id: this.item._id,
        urlText: this.urlText
      };
      await patchUrl(obj);
      this.getData();
      this.urlText = "";
    },
    async patchOnePos() {
      const obj = {
        id: this.item._id,
        posText: this.posText
      };
      await patchPos(obj);
      this.getData();
      this.posText = "";
    },
    openUrlForm(item) {
      this.showUrlModal = true;
      this.item = item;
    },
    openPosForm(item) {
      this.showPosModal = true;
      this.item = item;
    },
    closeUrlForm() {
      this.showUrlModal = false
      this.urlText = "";
    },
    closePosForm() {
      this.showPosModal = false
      this.posText = "";
    },
  },
  created() {
    this.getData();
  },
  updated() {
    EventBus.$on('refresh', () => this.getData());
    console.log('view list에서의 updated');
  },
}
</script>

<style scoped>
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
.checkBtn {
  float: left;
  margin : 0.5em;
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer;
}
.checkBtnChecked {
  color: #8763FB;
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
</style>