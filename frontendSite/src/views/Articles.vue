
<template> 
<div>
  <template v-for="article in this.articles">

         <v-card
          elevation="2"    
          v-bind:key=article.id
        >
            <v-card-title>{{article.title}}</v-card-title>
            <v-card-text>{{article.summary}}</v-card-text>
            <v-card-actions> 
                <v-btn
                class="mr-4"
                @click="goToPage(article.link)"
                >Link
                </v-btn>
            </v-card-actions> 
        </v-card>

    </template>

</div>
</template>
<script>
import SubscriptionFeed from '@/services/SubscriptionFeedService.js';
export default {
  methods: {
      async getArticles(){
        var id =  window.localStorage.getItem('subscription_id');
        var service = new SubscriptionFeed();
        var articles = await (service.getArticles(id ));
        this.sortByDate(articles)
        this.$store.commit('setArticles', articles)
    },
      goToPage(link){
          window.open(link, "_blank");    
      }, 
      sortByDate(articles){
          for (let i = 0; i < articles.length; i++) {
              articles[i].date_time = Date.parse(articles[i].date_time)
            }
          articles.sort((articleA, articleB) => (articleA.date_time < articleB.date_time) ? 1 : -1)
      }

  },  
  async mounted() {
        this.getArticles()
  },
  computed: {
    
    articles: function () {
   
      return this.$store.state.articles
    },
  },
};
</script>

