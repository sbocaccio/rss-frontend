
<template>
<div id="app" class= "app" >

  <p>

    <router-link :to="{name: 'login'}">Login</router-link>
    <router-link :to="{name: 'register'}">Register</router-link>
  </p>
  <router-view></router-view>
</div>
</template>
<script>

export default {
  name: 'App',
  components: {
    
  },

}
</script>



<style lang="scss" scoped>
.app {

   color: black;
}
</style>