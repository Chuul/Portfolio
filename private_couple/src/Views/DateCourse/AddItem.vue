<template>
  <section class="addItem-cont">
    <div class="select-cont">
      <select v-model="selected">
        <option disabled value="">--카테고리--</option>
        <option v-for="option in options" v-bind:key="option.text">
          {{ option.text}}
        </option>
      </select>
    </div>
    <input type="text" v-model="newDateCourse" v-on:keyup.enter="addCourse">
    <div class="btn-cont" v-on:click="addCourse">
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
.addItem-cont {
  margin : 0;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-radius: 0.5em;
  background: rgba(124, 198, 255, 0.247);
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
}
.addItem-cont input {
  border-style: none;
  font-size: 0.9rem;
  width: 60%;
  height: 50%;
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