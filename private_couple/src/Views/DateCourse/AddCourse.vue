<template>
  <div>
    <div class="inputBox">
      <select v-model="selected" class="selectCategory">
        <option value="">--카테고리--</option>
        <option :value="{category : 'restaurant'}">음식점</option>
        <option :value="{category : 'cafe'}">카페</option>
        <option :value="{category : 'enjoying'}">즐길거리</option>
      </select>
      <input type="text" v-model="newDateCourse" v-on:keyup.enter="addCourse">
      <span class="addBtnContainer" v-on:click="addCourse">
        <i class="addBtn fas fa-plus"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected : "",
      newDateCourse : "",
    }
  },
  methods : {
    addCourse() {
      if(this.newDateCourse !== '') {
        const obj = { 
          category : this.selected, 
          item : this.newDateCourse
        }
        this.$store.commit('addOneCourse', obj)
        this.clearInput()
      }
    },
    clearInput() {
      this.newDateCourse = ""
    },
    selectChange() {
      console.log('송공')
    }
  }
}
</script>

<style>
input {
  border-style: groove;
  width: 300px;
  height: 30px;
  border-radius: 5px;
}
.selectCategory {
   float : left;
   height: 30px;
}
.inputBox {
  background: rgb(194, 221, 243);
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addBtnContainer {
  float : right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color : white;
}
</style>