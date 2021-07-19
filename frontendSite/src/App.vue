
<template>

<div id="app" class= "app" >
  <v-footer
    class="success"
    padless

  >
    <v-row
      justify="center"
      

      no-gutters
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
        
        
      >
       <router-link :to="{name: link}">{{link}}</router-link>
      </v-btn>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >   
      </v-col>
    </v-row>
  </v-footer>

  <router-view></router-view>
  

</div>
</template>
<script>

export default {
  name: 'App',
  components: {
    
  },  
  data: () => ({
      links: [
        'login',
        'register',
      
      ],
    }),
}
</script>

