<template>
  <section class="inputBox">
    <div class="selectCategory">
      <select v-model="selected">
        <option disabled value="">--카테고리--</option>
        <option v-for="option in options" v-bind:key="option.text">
          {{ option.text}}
        </option>
      </select>
    </div>
    <input type="text" v-model="newDateCourse" v-on:keyup.enter="addCourse">
    <div class="addBtnContainer" v-on:click="addCourse">
      <i class="addBtn fas fa-plus"></i>
    </div>
  </section>
</template>

<script>
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
    }
  }
}
</script>

<style scoped>
.inputBox {
  background: rgba(124, 198, 255, 0.247);
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.selectCategory {
  float : left;
  margin-left : 10px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
  width: 60%;
  height: 50%;
  border-radius: 5px;
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