<template>
  <section class="list_cont">
    <li v-for="item in ItemList" :key="item.name">
      <i 
        class="toggle_Btn far fa-check-circle" 
        @click="toggleOneItem(item)" 
        :class="{checked_Btn: item.checked}"
      />
      <a 
        v-if="item.url"
        :href="item.url" 
        class="linkText"
        target="_blank"
      >
        {{ item.name }}
      </a>
      <a v-else>
        {{ item.name }}
      </a>
      <i 
        class="basic_Btn far fa-trash-alt" 
        @click="deleteOneItem(item)" 
      />
      <i 
        class="basic_Btn fas fa-map-marked-alt" 
        @click="openPosForm(item)" 
        :class="{checked_Btn: item.pos.length>0}"
      />
      <i 
        class="basic_Btn far fa-window-restore" 
        @click="openUrlForm(item)" 
        :class="{checked_Btn: item.url.length>0}"
      />
    </li>
    <!-- Modal -->
    <Modal v-if="showUrlModal" @close="closeUrlForm()">
      <h2 slot="header">URL 입력</h2>
      <form slot="body">  
        <input type="text" id="urlInput" v-model="textArea">
        <button @click.prevent="patchOneUrl()">입력</button>
      </form>
    </Modal>
    <Modal v-if="showPosModal" @close="closePosForm()">
      <h2 slot="header">Position 입력</h2>
      <form slot="body">
        <input type="text" id="posInput" v-model="textArea">
        <button @click.prevent="patchOnePos()">입력</button>
      </form>
    </Modal>
  </section>
</template>

<script>
import Modal from '@/components/common/Modal.vue';

export default {
  components: {
    Modal
  },
  data() {
    return {
      textArea: "",
      item: {},
      showUrlModal: false,
      showPosModal: false,
    };
  },
  computed: {
    ItemList() {
      return this.$store.state.itemList;
    },
  },
  methods: {
    toggleOneItem(item) {
      this.$store.dispatch('TOGGLE_ITEM', item);
    },
    deleteOneItem(item) {
      this.$store.dispatch('DELETE_ITEM', item._id);
    },
    setObj() {
      const obj = {
        id: this.item._id,
        textArea: this.textArea
      };
      this.textArea = "";
      return obj;
    },
    patchOneUrl() {
      const obj = this.setObj();
      this.$store.dispatch('PATCH_ITEM_URL', obj)
      this.showUrlModal = false;
    },
    patchOnePos() {
      const obj = this.setObj();
      this.$store.dispatch('PATCH_ITEM_POS', obj)
      this.showPosModal = false;
    },
    // Modal창 on/off
    openUrlForm(item) {
      this.showUrlModal = true;
      this.item = item;
    },
    openPosForm(item) {
      this.showPosModal = true;
      this.item = item;
    },
    closeUrlForm() {
      this.showUrlModal = false;
      this.textArea = "";
    },
    closePosForm() {
      this.showPosModal = false;
      this.textArea = "";
    },
  },
  created() {
    this.$store.dispatch('FETCH_ITEM_LIST');
  },
}
</script>

<style scoped>
.list_cont {
  margin : 0;
}
li {
  list-style: none;
  text-align: center;
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
.linkText {
  color : #ee27bc;
  font-weight: bold;
}
.toggle_Btn {
  float: left;
  margin : 0.5em;
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer;
}
.basic_Btn {
  float: right;
  margin: 0.5em;
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer;
}
.checked_Btn {
  color: #8763FB;
}
</style>