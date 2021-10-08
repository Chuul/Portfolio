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
    ToolBar
  }
}
</script>

<style>
body {
  margin: 1rem;
  padding: 0;
  text-align: center;
}
a {
  color : black;
  text-decoration: none;
}
a:hover {
  color : rgb(112, 112, 241);
}
</style>