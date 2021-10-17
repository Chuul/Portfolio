<template>
  <div>
    <tool-bar></tool-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import ToolBar from './components/ToolBar.vue'

 
export default {
  components: {
    ToolBar,
  }
}
</script>

<style>
body {
  margin: 1rem;
  padding: 0;
  text-align: center;
  background:  #ccccff;
}
a {
  color : black;
  text-decoration: none;
}
</style>