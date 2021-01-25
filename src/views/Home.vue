<template>
  <div>
    <nav-bar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from 'content/NavBar.vue'

export default {
  components: {
    NavBar
  }
}
</script>

<style>

</style>