<style>
a {
  text-decoration: none;
  color: black;
}

</style>


<template>
  <v-card
      :color="userArticle.read ? '#FFFFE5' : '#FFFFFF'"
  >
    <v-card-title v-if="userArticle.article.title"
                  @click="goToPage()"
                  to="userArticle.article.title"
    >
      <a class="section-link active" data-scroll="" :href=userArticle.article.link
         target="_blank">{{ userArticle.article.title }}</a>

    </v-card-title>

    <v-card-text>{{ userArticle.article.summary }}</v-card-text>
    <v-card-actions>
      <v-img
          v-if="userArticle.article.image"
          :src="userArticle.article.image"
          max-height="150"
          max-width="250"
          @click="goToPage()"
      />
    </v-card-actions>
    <v-checkbox
        v-model="userArticle.read"
        label="Mark as read"
        @change="updateRead()"
    ></v-checkbox>
    <v-alert
        v-if="failedUpdate"
        type="error"
        color='#F44336'
        height="50"
        width="300"
    >
      Could not update
    </v-alert>
  </v-card>

</template>

<script>
import SubscriptionFeed from '@/services/SubscriptionFeedService.js';

export default {
  props: ['userArticle'],
  data() {
    return {
      failedUpdate: false,

    }
  },
  methods: {

    goToPage() {
      if (!this.userArticle.read) {
        this.userArticle.read = true
        this.updateRead()
      }
      window.open(this.userArticle.article.link, "_blank");
    },

    async updateRead() {
      var service = new SubscriptionFeed();
      try {
        await (service.updateReadState(this.userArticle.pk, this.userArticle.read))
        this.failedUpdate = false;
      } catch {
        this.failedUpdate = true;
      }
    }
  },
}
</script>
