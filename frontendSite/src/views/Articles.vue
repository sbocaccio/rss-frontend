
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
    <template v-for="article in this.articles">
      <Article :article="article" :key="article.id"/>
    </template>


  </div>
</template>
<script>
import SubscriptionFeed from '@/services/SubscriptionFeedService.js';
import Article from './Article.vue';

export default {
  components: {Article},
  data() {
    return {
      responseMessage: '',
    };
  },
  methods: {
    async getArticles() {

      var subscription_id = this.$route.params.subscriptionId;
      var service = new SubscriptionFeed();

      try {
        var articles = await (service.getArticles(subscription_id));
        this.$store.commit('setArticles', articles)
      } catch (error) {
        console.log(error.response.data.detail)
        this.responseMessage = error.response.data.detail

      }


    },
  },
  async mounted() {
    try {
      this.getArticles()
    } catch {
      console.log('mal ahi')
    }
  },
  computed: {
    articles: function () {

      return this.$store.state.articles
    },
  },
};
</script>

