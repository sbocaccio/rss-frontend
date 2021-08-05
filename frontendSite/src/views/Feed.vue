<template>
  <div>
    <v-list-item

        :key="feed.title"
    >
      <v-list-item-avatar>
        <v-img
            v-if="feed.image"
            :src="feed.image"/>

      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title><p class="content">{{ feed.title }} </p>
        </v-list-item-title>

      </v-list-item-content>
      <v-btn
          class="mr-4"
          @click="goToArticles(feed.id)"
      >
        Read
      </v-btn>
      <ConfirmDialog openDialoge="delete" title="Delete subscription" message="Are you sure that you want to delete it?"
                     cancelButton="cancel" okButton="delete" @confirmed="removeFeed"></ConfirmDialog>
    </v-list-item>


  </div>

</template>

<script>


import ConfirmDialog from "../shared_components/ConfirmDialog";

export default {
  components: {ConfirmDialog},
  props: ['feed', 'loading'],
  methods: {
    async goToArticles(subscriptionId) {
      if (this.loading) {
        return
      }
      this.$router.push({name: 'articles', params: {subscriptionId: subscriptionId}});
    },
    removeFeed() {
      if (this.loading) {
        return
      }
      this.$emit("removeFeed", this.feed)

    },
  }
}
</script>