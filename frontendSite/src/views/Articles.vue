
<template> 
<div>
  <template v-for="article in this.articles">

         <v-card
          elevation="2"    
          v-bind:key=article
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
        this.$store.commit('setArticles', articles)
    },
      goToPage(link){
          window.open(link, "_blank");    
      }, 
    
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

