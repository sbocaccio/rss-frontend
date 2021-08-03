<template>
  <v-list-item

      :key="feed.title"
  >
    <v-list-item-avatar size="60">
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
        :key="feed.id"
        class="mr-4"
        @click="removeFeed(feed,index)"
        :loading="loadingButtonIndex == index"
    >
      Delete
    </v-btn>


  </v-list-item>

</template>

<script>

export default {

  props: ['feed', 'index', 'loadingButtonIndex'],
  methods: {
    async goToArticles(subscriptionId) {
      this.$router.push({name: 'articles', params: {subscriptionId: subscriptionId}});
    },
    async removeFeed(subscription, index) {
      this.$emit("removeFeed", subscription,index)
    },
  }
}
</script>