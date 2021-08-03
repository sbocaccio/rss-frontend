<template>
  <div>
    <v-list-item

        :key="feed.title"
    >
      <v-list-item-avatar >
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
      <ConfirmDialog openDialoge="delete" title="Delete subscription" message="Are you sure that you want to delete it?" cancelButton="cancel" okButton="delete" @action="action" ></ConfirmDialog>
    </v-list-item>



  </div>

</template>

<script>


import ConfirmDialog from "../shared_components/ConfirmDialog";

export default {
  components: {ConfirmDialog},
  props: ['feed', 'index', 'loadingButtonIndex'],
  methods: {
    async goToArticles(subscriptionId) {
      this.$router.push({name: 'articles', params: {subscriptionId: subscriptionId}});
    },
    async removeFeed(subscription, index) {
      this.$emit("removeFeed", subscription, index)
    },
    action(delete_or_cancel) {
      if (delete_or_cancel) {
        this.$emit("removeFeed", this.feed, this.index)
      }
    },
  }
}
</script>