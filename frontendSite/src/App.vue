s
<template>

  <div id="app" class="app">
    <v-footer
        class="success"
        padless

    >
      <v-row
          justify="center"
          no-gutters
      >
        <template v-if="loggedin">
          <v-btn
              color="green"
              text
              rounded
              class="my-2"
              @click="logout"

          >
            Log out
          </v-btn>
        </template>
        <template v-else>
          <v-btn
              v-for="link in notLoggedinLinks"
              :key="link"
              color="green"
              text
              rounded
              class="my-2"
          >
            <router-link :to="{name: link}">{{ link }}</router-link>
          </v-btn>
        </template>
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
  components: {},
  data: () => ({
    notLoggedinLinks: [
      'login',
      'register',
    ],
    'loggedin': false,
  }),
  updated() {
    this.loggedin = localStorage.getItem('loggedin');
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push({name: 'login'});
    }
  }
}
</script>

