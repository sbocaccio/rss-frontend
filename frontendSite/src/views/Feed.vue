<template>
  <div>
    <v-list-item
        color=red
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
      <v-btn
          class="mr-4"
          :loading="loading"
          @click="refreshArticles(feed)"

      >
        Refresh
      </v-btn>
      <ConfirmDialog openDialoge="delete" title="Delete subscription" message="Are you sure that you want to delete it?"
                     cancelButton="cancel" okButton="delete" @confirmed="removeFeed"></ConfirmDialog>

    </v-list-item>

    <v-alert
        dense
        type="info"
        v-if="displayNumberOfNewArticles"
    >
      There are {{new_articles}} new articles
    </v-alert>
  </div>

</template>

<script>


import ConfirmDialog from "../shared_components/ConfirmDialog";
import SubscriptionFeed from '@/services/SubscriptionFeedService.js';

export default {
  components: {ConfirmDialog},
  props: ['feed', 'anyFeedLoading'],
  data() {
    return {
      loading: false,
      new_articles: 0,
      displayNumberOfNewArticles: false,
    };
  },
  methods: {
    async goToArticles(subscriptionId) {
      if (this.anyFeedLoading) {
        return
      }
      this.$router.push({name: 'articles', params: {subscriptionId: subscriptionId}});
    },
    removeFeed() {
      if (this.anyFeedLoading) {
        return
      }
      this.$emit("removeFeed", this.feed)

    },
    async refreshArticles(subscription) {
      if (this.anyFeedLoading) {
        return
      }
      this.loading = true
      var service = new SubscriptionFeed()
      var response = await service.refreshFeed(subscription.id);
      this.$store.commit('setArticles', response.data.user_articles)
      this.displayNumberOfNewArticles= true
      this.new_articles = response.data.number_of_new_articles

      this.loading = false
    }
  }
}
</script>