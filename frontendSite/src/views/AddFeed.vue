
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
                  v-if="msg"
                  dense
                  outlined
                  type="error"
                >
                  {{msg}}
              </v-alert>

      </v-col>
    </v-row>
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
      msg: '',
      loading: false,
      isFormValid: false,

    };
  },
  methods: {
    handleError(){
         this.msg = 'Unable to add this page to your subscriptions ...'
    },
    async submitFeed() {
      if(!this.loading){
        var success = true
        try{
            
            this.loading = true
            const credentials = {
              'get_or_create': this.url,
            }
            var service = new SubscriptionFeed() 
            await (service.addFeed(credentials));
            
          
          }
        catch(error){
            success = false
            this.handleError();
            
        }
        if(success){
          this.msg = ''
        }
        this.loading = false;
      }
    }
  }
};
</script>