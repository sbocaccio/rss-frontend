<template>
  <v-card
      class="mx-auto"
      max-width="500"
      max-height="500"

  >
    Add to folder
    <v-card-text>

      <v-alert
          v-if="responseMessage"
          dense
          text
          :type="responseType"
      >
        {{ responseMessage }}
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
      responseMessage: '',
      responseType: '',
    }
  },
  methods: {
    async getFolders() {
      try {
        var service = new Folders();
        var folders = await (service.getFolders());
        this.$store.commit('setFolders', folders)
      } catch (error) {
        this.handleError(error.response.data.detail)
      }
    },
    createFolder: async function (service) {
      var name = {'name': this.newFolder}
      var folder = await (service.createFolder(name));
      this.$store.commit('addFolder', folder)
      return folder
    }, addSubscriptionToFolder: async function (element, service, folderToBeAdded) {
      var data = {'subscription_id': this.selectedSubscriptions[element].id.toString()}
      await service.addSubscriptionToFolder(data, folderToBeAdded.pk)
      this.$store.commit('addFolderToFeed', [this.selectedSubscriptions[element], folderToBeAdded])

    }, getFolder: async function (service) {
      if (this.newFolder) {
        try {
          return await this.createFolder(service);
        } catch (error) {
          this.handleError(error.response.data.detail)
        }
      } else {
        return this.$store.getters.folderWithName(this.existingFolder)
      }
    }, assertValidRequest: function () {
      if (this.selectedSubscriptions.length == 0) {
        this.handleError('You must select at least one subscription')
        return false;
      }
      if (!(this.existingFolder || this.newFolder)) {
        this.handleError('You have to create a new folder or select from a created one.')
        return false;
      }
      return true;

    }, async addSubscriptionsToFolder() {
      var validRequest = this.assertValidRequest();
      if (!validRequest) {
        return
      }
      var folderService = new Folders();
      var folderToBeAdded = await this.getFolder(folderService);
      if (folderToBeAdded) {
        try {
          for (let element in this.selectedSubscriptions) {
            await this.addSubscriptionToFolder(element, folderService, folderToBeAdded);
          }
        } catch (error) {
          this.handleError(error.response.data.detail)
          return
        }
        this.handleSuccess('Successfully added subscriptions to the folder')
      }
    },
    handleError(message) {
      this.responseMessage = message;
      this.responseType = 'error';
    },
    handleSuccess(message) {
      this.responseMessage = message;
      this.responseType = 'success';
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