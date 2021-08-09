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
          @click="goToArticles()"
          :disabled="!canLoad"
      >
        Read
      </v-btn>
      <v-btn
          class="mr-4"
          :loading="loading"
          :disabled="!canLoad"
          @click="refreshArticles()"

      >
        Refresh
      </v-btn>
      <ConfirmDialog openDialoge="delete" title="Delete subscription" message="Are you sure that you want to delete it?"
                     cancelButton="cancel" okButton="delete" @confirmed="removeFeed"
      ></ConfirmDialog>

    </v-list-item>

    <v-alert
        dense
        type="info"
        v-if="new_articles >= 0"
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
  props: ['feed', 'canLoad'],
  data() {
    return {
      loading: false,
      new_articles: -1,
    };
  },
  methods: {
    async goToArticles() {
      if (!this.canLoad) {
        return
      }
      this.$router.push({name: 'articles', params: {subscriptionId: this.feed.id}});
    },
    async removeFeed() {
      if (!this.canLoad) {
        return
      }
      this.loading = true
      this.$emit("startedLoading")
      try {
        var service = new SubscriptionFeed()
        await (service.removeFeed(this.feed.id));
        this.$store.commit('removeFeed', this.feed)
        this.$emit("resultMessage",'success', 'Subscription was deleted successfully')
      } catch (error) {
        this.$emit("resultMessage", 'error', error.response.data.detail)
      }
      this.loading = false
    },

    async refreshArticles() {
      if (!this.canLoad) {
        return
      }
      this.$emit("startedLoading")
      this.loading = true
      try {
        var service = new SubscriptionFeed()
        var response = await service.refreshFeed(this.feed.id);
        this.$store.commit('setArticles', response.data.user_articles)
        this.new_articles = response.data.number_of_new_articles
        this.$emit("finishedLoading",'success', 'Subscription was refresh successfully')

      } catch (error) {
        this.$emit("finishedLoading",'error', error.response.data.detail)
      }
      this.loading = false
    }
  }
}
</script>