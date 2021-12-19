<template>
  <section class="addItem-cont">
    <div class="select-cont">
      <select v-model="selected">
        <option disabled value="">--카테고리--</option>
        <option v-for="option in options" :key="option.text">
          {{ option.text}}
        </option>
      </select>
    </div>
    <input type="text" v-model="newDateCourse" @keyup.enter="addCourse">
    <div class="btn-cont" @click="addCourse">
      <i class="addBtn fas fa-plus"></i>
    </div>
  </section>
</template>

<script>
import { addItem } from '../api/index'
export default {
  data() {
    return {
      options : [
        {text : '음식점'},
        {text : '카페'},
        {text : '즐길거리'},
      ],
      selected : "",
      newDateCourse : "",
    }
  },
  methods : {
    async addCourse() {
      if(this.newDateCourse !== '') {
        const obj = { 
          category : this.selected, 
          name : this.newDateCourse,
          checked : false, 
          url : '',
          urlCheck : false,
          pos : '',
          posCheck : false,
          filtered : true,
        }
        const response = await addItem(obj);
        console.log('response 반환 : ', response);
        this.$store.commit('addOneCourse', obj)
        this.clearInput()
      }
    },
    clearInput() {
      this.newDateCourse = ""
    }
  }
}
</script>

<style scoped>
.addItem-cont {
  margin : 0;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-radius: 0.5em;
  background: rgba(124, 198, 255, 0.247);
  box-shadow: 0.5em -0.3em 10px 1px rgba(143, 143, 143, 0.2);
}
.select-cont {
  height: 100%;
  float : left;
  margin-left : 1em;
}
select {
  height: 60%;
  text-align: center;
  border-style : none;
  border-radius: 0.5em;
  font-family: 'Dongle', sans-serif;
  font-size: 1.5em;
  font-weight: 300;
}
.addItem-cont input {
  text-align: center;
  width: 60%;
  height: 60%;
  font-family: 'Dongle', sans-serif;
  font-weight: 300;
  font-size: 1.8em;
  border-style: none;
  border-radius: 0.5em;
  cursor: text;
}
.btn-cont {
  display: block;
  float : right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  width: 3em;
  border-radius: 0 0.5em 0.5em 0;
  cursor: pointer;
}
.addBtn {
  color : white;
}
</style>