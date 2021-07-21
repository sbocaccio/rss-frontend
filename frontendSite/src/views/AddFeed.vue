
<template>
    
<div id="app" >
  <v-app id="login">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        offset-sm="3"
      >      
      <v-form v-model="isFormValid">
      <v-text-field
        v-model="url"

        label="sendUrl"
        required
        :rules="[rules.required]"
      ></v-text-field>

      <v-btn
        class="mr-4"
        @click="submitFeed"
        :loading="loading"
        :disabled="!isFormValid"

      >
        Add subscription
      </v-btn>
     
      </v-form>
 
               <v-alert
                  v-if="errorMsg"
                  dense
                  outlined
                  type="error"
                >
                  {{errorMsg}}
              </v-alert>

              <v-alert
                v-if="successMsg"
                dense
                outlined
                type="success"
              >
                {{successMsg}}
            </v-alert>

      </v-col>
   </v-row>

    <v-card
    max-width="900"
    class="action"
  >

    <v-list three-line align="center">
      <template v-for="feed in feeds">

          <v-list-item
          :key="feed.title"
        >
          <v-list-item-avatar>
            <v-img :src="feed.image" />
        
          </v-list-item-avatar>

          <v-list-item-content>
          <v-list-item-title v-html="feed.title"></v-list-item-title>

          </v-list-item-content>

          </v-list-item>
      </template>
    </v-list>
  </v-card>
  </v-app>
</div>


</template>

<script>

import SubscriptionFeed from '@/services/SubscriptionFeedService.js';
export default {
  data() {
    return {
      rules:{
        required: value => !!value || 'Required.',
      },
      url: '',
      errorMsg: '',
      loading: false,
      isFormValid: false,
      successMsg: '',
      feeds: ''
    };
  },
  methods: {
    handleError(error){
         this.errorMsg = error          
         setTimeout(() => this.errorMsg = '', 3000)
    },
    async submitFeed() {
      if(!this.loading){
        var success = true
        try{
            
            this.loading = true
            const credentials = {
              'link': this.url,
            }
            var service = new SubscriptionFeed() 
            await (service.addFeed(credentials));
            
          
          }
        catch(error){
            success = false
            var message = ''
            if(error.response.status == 400){
                message = (error.response.data.link[0])
            }
            else{
              message = error.response.data.message
            }
            this.handleError(message);

        }
        if(success){

          this.successMsg = 'Subscription was created successfully'
          setTimeout(() => this.successMsg = '', 3000)
          this.getFeed()
          this.$forceUpdate()
        }
        this.loading = false;
      }


    },
    async getFeed(){
        var service = new SubscriptionFeed();
        this.feeds = await (service.getFeed());
    }
  },
  async mounted() {
      this.getFeed()
  }

};
</script>


<style>
.action {
    display: flex;
    align-items: left;
    justify-content: left;
    height: 100vh;
}
</style>