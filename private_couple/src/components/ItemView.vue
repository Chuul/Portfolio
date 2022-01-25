<template>
  <section>
    <li 
     class="list_cont"
     v-for="item in ItemList" 
     :key="item.name"
    >
      <i 
        class="toggle_Btn far fa-check-circle" 
        @click="toggleOneItem(item)" 
        :class="{checked_Btn: item.checked}"
        />
      <a 
        v-if="item.url"
        :href="item.url" 
        class="linkTextm"
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
        :class="{checked_Btn: item.pos.length !== 0}"
      />  
      <i 
        class="basic_Btn far fa-window-restore" 
        @click="openUrlForm(item)" 
        :class="{checked_Btn: item.furl.length !== 0}"
      />
      <template v-if="!routeName">
        <div class="arrow_cont">
          <i class="fas fa-arrow-down"></i>
        </div>
      </template>
    </li>
    <template v-if="!routeName">
      <button class="complete_Btn" @click="openCompleteForm()">
        코스 완료
      </button>
    </template>
    <!-- Modal -->
    <Modal v-if="showModal" @close="closeForm()">
      <h2 slot="header">코스 평가</h2>
      <form slot="body">  
        <label for="comment">한줄평 </label>
        <input type="text" id="comment" v-model="textArea">
        <button @click.prevent="patchItemComment()">평가완료</button>
      </form>
    </Modal>
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
    <Modal v-if="showCompleteModal" @close="closeCompleteForm()">
      <h2 slot="header">코스 평점</h2>
      <form slot="body">
        <input type="text" id="completeInput" v-model="textArea">
        <button @click.prevent="endStartCourse()">완료</button>
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
      showModal : false,
      showUrlModal: false,
      showPosModal: false,
      showCompleteModal: false
    }
  },
  computed: {
    ItemList() {
      if(this.$route.name==='creating') {
        console.log('creating computed: ', this.$store.state.itemList)
        return this.$store.state.itemList;
      } else if(this.$route.name ==='start'){
        return this.$store.state.startList;
      } else {
        return console.log('etc')
      }
    },
    routeName() {
      return this.$route.name === 'creating'? true : false
    }
  },
  methods: {
    toggleOneItem(item) {
      if(this.$route.name === 'creating') {
        this.$store.dispatch('TOGGLE_ITEM', item);
      } else if(this.$route.name === 'start') {
        if(item.checked === true) {
          this.$store.dispatch('FALSE_ITEM', item._id);
        } else {
          this.showModal = true;
          this.item = item;
        }
      }
    },
    patchItemComment() {
      const item = this.item;
      item.comment = this.textArea;
      this.$store.dispatch('PATCH_ITEM_COMMENT', item);
      this.textArea = "";
      this.showModal = false;
    },
    deleteOneItem(item) {
      if(this.$route.name === 'creating') {
        this.$store.dispatch('DELETE_ITEM', item._id);
      } else if(this.$route.name === 'start') {
        this.$store.dispatch('DELETE_START', item._id);
      }
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
      if(this.$route.name === 'creating') {
        this.$store.dispatch('PATCH_ITEM_URL', obj)
      } else if(this.$route.name === 'start') {
        this.$store.dispatch('PATCH_START_URL', obj)
      }
      this.showUrlModal = false;
    },
    patchOnePos() {
      const obj = this.setObj();
       if(this.$route.name === 'creating') {
        this.$store.dispatch('PATCH_ITEM_POS', obj)
      } else if(this.$route.name === 'start') {
        this.$store.dispatch('PATCH_START_POS', obj)
      }
      this.showPosModal = false;
    },
    endStartCourse() {
      this.$store.dispatch('STORE_START', this.textArea );
      this.showCompleteModal = false;
      this.textArea = "";
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
    openCompleteForm() {
      this.showCompleteModal = true;
    },
    closeForm() {
      this.showModal = false;
      this.item = "";
    },
    closeUrlForm() {
      this.showUrlModal = false;
      this.textArea = "";
    },
    closePosForm() {
      this.showPosModal = false;
      this.textArea = "";
    },
    closeCompleteForm() {
      this.showCompleteModal = false;
      this.item = "";
    },
  },
  created() {
    const name = this.$route.name;
    if(name === 'creating') {
      this.$store.dispatch('FETCH_ITEM_LIST');
    } else if (name === 'start') {
      if(this.$store.state.startList.length > 0) {
        return;
      }
      this.$store.dispatch('FETCH_START_LIST');
    }
  },
}
</script>

<style scoped>
section {
  margin : 0;
}
.list_cont {
  list-style: none;
  text-align: center;
  height: 2em;
  line-height: 2em;
  margin: 0.8em 0 2em;
  padding: 0 1em;
  font-family: 'Dongle', sans-serif;
  font-size: 1.5em;
  font-weight: 300;
  background: white;
  border-radius: 0.5em;
  box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
section .list_cont:nth-last-child(2) .arrow_cont {
  display: none;
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
.checked_Btn {
  color: rgba(152, 124, 255, 0.8);
}
.basic_Btn {
  float: right;
  margin: 0.5em;
  color : rgba(124, 198, 255, 0.8);
  cursor : pointer;
}
.arrow_cont {
  margin-top: 0.2em;
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