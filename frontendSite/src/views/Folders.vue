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
          v-model="existingFolder"
          :disabled="newFolder != ''"
      ></v-autocomplete>
      or
      <v-text-field
          v-model="newFolder"
          label="New folder"
      ></v-text-field>
      <v-btn depressed
             @click="addSubscriptionsToFolder()"
      >
        Add

      </v-btn>
    </v-card-text>

  </v-card>
</template>

<script>
import Folders from "../services/Folders";
import {mapGetters} from "vuex";

export default {
  props: ['selectedSubscriptions'],
  data() {
    return {
      newFolder: '',
      existingFolder: '',
    }
  },
  methods: {
    async getFolders() {
      try {
        var service = new Folders();
        var folders = await (service.getFolders());
        this.$store.commit('setFolders', folders)
      } catch (error) {
        console.log(error)
      }
    },
    async addSubscriptionsToFolder() {
      var folderToBeAdded = null;
      var service = new Folders();
      if (this.newFolder) {
        var name = {'name': this.newFolder}
        folderToBeAdded = await (service.createFolder(name));
      } else {
        folderToBeAdded = this.$store.getters.folderWithName(this.existingFolder)
      }
      for (let element in this.selectedSubscriptions) {
        var data = {'subscription_id':this.selectedSubscriptions[element].id.toString()}
        var resp = await service.addSubscriptionToFolder(data,folderToBeAdded.pk)
        console.log(resp)
      }


    }
  },
  async mounted() {
    await this.getFolders()
  },
  computed: {
    ...mapGetters([
      'folders',
    ])
  },
}
</script>

<style scoped>

</style>