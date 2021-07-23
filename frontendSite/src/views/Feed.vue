<template>

  <div id="app">
    <v-app id="feed">
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
              v-if="responseMessage"
              dense
              outlined
              v-bind:type="typeMessage"
          >
            {{ responseMessage }}
          </v-alert>

        </v-col>
      </v-row>

      <v-card
          max-width="900"
          class="action"
      >

        <v-list three-line align="center">
          <template v-for="feed in this.feeds">

            <v-list-item
                :key="feed.title"
            >
              <v-list-item-avatar>
                <v-img
                    v-if="feed.image"
                    :src="feed.image"/>

              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="feed.title"></v-list-item-title>

              </v-list-item-content>
              <v-btn
                  class="mr-4"
                  @click="getArticles(feed.id)"


              >
                Read
              </v-btn>

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
      rules: {
        required: value => !!value || 'Required.',
      },
      url: '',
      errorMsg: '',
      loading: false,
      isFormValid: false,
      successMsg: '',
      typeMessage: '',
      responseMessage: '',
    };
  },
  methods: {
    handleError(error) {
      this.responseMessage = error
      this.typeMessage = 'error'
    },

    async getArticles(subscriptionId) {
      this.$router.push({name: 'articles', params: {subscriptionId: subscriptionId}});
    },
    async submitFeed() {
      if (!this.loading) {
        var response;
        try {

          this.loading = true
          const credentials = {
            'link': this.url,
          }
          var service = new SubscriptionFeed()
          response = await (service.addFeed(credentials));
          this.$store.commit('addFeed', response.data)
          this.typeMessage = 'success'
          this.responseMessage = 'Subscription was created successfully'
          this.$forceUpdate()

        } catch (error) {

          var message = ''
          if (error.response.status == 400) {
            message = ('Imposible to parse url')
          } else {
            message = error.response.data.message
          }
          this.handleError(message);

        }
        this.loading = false;
      }


    },
    async getFeeds() {
      var service = new SubscriptionFeed();
      var feeds = await (service.getFeeds());
      this.$store.commit('setFeeds', feeds)


    }
  },
  computed: {

    feeds: function () {

      return this.$store.state.feeds
    },
  },
  async mounted() {
    this.getFeeds()
  },

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