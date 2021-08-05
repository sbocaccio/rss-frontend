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
          @click="goToArticles()"
      >
        Read
      </v-btn>
      <v-btn
          class="mr-4"
          :loading="refreshLoading"
          @click="refreshArticles()"

      >
        Refresh
      </v-btn>
      <ConfirmDialog openDialoge="delete" title="Delete subscription" message="Are you sure that you want to delete it?"
                     cancelButton="cancel" okButton="delete" @confirmed="removeFeed" @loading="deleteLoading"
      ></ConfirmDialog>

    </v-list-item>

    <v-alert
        dense
        type="info"
        v-if="displayNumberOfNewArticles"
    >
      There are {{ new_articles }} new articles
    </v-alert>
  </div>

</template>

<script>


import ConfirmDialog from "../shared_components/ConfirmDialog";
import SubscriptionFeed from "../services/SubscriptionFeedService";

export default {
  components: {ConfirmDialog},
  props: ['feed', 'anyFeedLoading'],
  data() {
    return {
      refreshLoading: false,
      deleteLoading: false,
      new_articles: 0,
      displayNumberOfNewArticles: false,
    };
  },
  methods: {
    async goToArticles() {
      if (this.anyFeedLoading) {
        return
      }
      this.$router.push({name: 'articles', params: {subscriptionId: this.feed.id}});
    },
    async removeFeed() {
      if (this.anyFeedLoading) {
        return
      }
      this.$emit("lockFeedsActions")
      this.deleteLoading = true
      try {
        var service = new SubscriptionFeed()
        await (service.removeFeed(this.feed.id));
        this.$store.commit('removeFeed', this.feed)
        this.$emit("displayOnScreen", 'success', 'Subscription was deleted successfully')
      } catch (error) {
        this.$emit("displayOnScreen", 'error', error.response.data.message)
      }
      this.$emit("freeFeedsActions")
      this.deleteLoading = false

    },

    async refreshArticles() {
      if (this.anyFeedLoading) {
        return
      }
      this.$emit("lockFeedsActions")
      this.refreshLoading = true
      try {
        var service = new SubscriptionFeed()
        var response = await service.refreshFeed(this.feed.id);
        this.$store.commit('setArticles', response.data.user_articles)
        this.displayNumberOfNewArticles = true
        this.new_articles = response.data.number_of_new_articles
      } catch (error) {
        this.$emit("displayOnScreen", 'error', error.response.data.message)
      }
      this.$emit("freeFeedsActions")
      this.refreshLoading = false
    }
  }
}
</script>