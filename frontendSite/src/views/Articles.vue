<template>
  <div>

    <v-alert
        v-if="responseMessage"
        dense
        outlined
        type="error"
    >
      {{ responseMessage }}
    </v-alert>
    <template v-for="userArticle in articles">
      <v-skeleton-loader
          :key="userArticle.id"
          v-if="loading"
          class="mx-auto"
          max-width="300"
          type="card"
      ></v-skeleton-loader>
      <Article :userArticle="userArticle" :key="userArticle.id"/>
    </template>


  </div>
</template>
<script>
import SubscriptionFeed from '@/services/SubscriptionFeedService.js';
import Article from './Article.vue';
import { mapGetters } from 'vuex';

export default {
  components: {Article},
  data() {
    return {
      responseMessage: '',
      loading: false
    };
  },
  methods: {
    async getArticles() {

      var subscription_id = this.$route.params.subscriptionId;
      var service = new SubscriptionFeed();
      this.loading = true
      try {
        var articles = await (service.getArticles(subscription_id));
        this.$store.commit('setArticles', articles)
      } catch (error) {
        this.responseMessage = error.response.data.detail
      }
      this.loading = false

    },
  },
  async mounted() {
    await this.getArticles()
  },
  computed: {
    ...mapGetters([
      'articles'
    ])
  },
};
</script>

