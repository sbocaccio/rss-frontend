<template>
  <v-card
      class="mx-auto"
      max-width="500"
      max-height="500"

  >
    Add to folder
    <v-card-text>
      <v-alert
          dense
          outlined
          type="error"
      >
        Falle
      </v-alert>
      <v-autocomplete
          :items="folders"
          color="white"
          item-text="name"
          label="Existing folders"
      ></v-autocomplete>
      or
      <v-text-field
          v-model="newFolderName"
          label="New folder"
      ></v-text-field>
      <v-btn depressed>
        Add
      </v-btn>
    </v-card-text>

  </v-card>
</template>

<script>
import SubscriptionFeed from "../services/SubscriptionFeedService";
import {mapGetters} from "vuex";

export default {
  props: ['selectedSubscriptions'],
  data() {
    return {
      newFolderName: '',
    }
  },
  methods:{
    async getFolders(){
      try {
        var service = new SubscriptionFeed();
        var folders = await (service.getFolders());
        this.$store.commit('setFolders', folders)
      } catch (error) {
        console.log(error)
      }
    }
  },
  async mounted() {
    await this.getFolders()
    console.log(this.selectedSubscriptions)
  },
  computed: {
    ...mapGetters([
      'folders'
    ])
  },
}
</script>

<style scoped>

</style>