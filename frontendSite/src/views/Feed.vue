<template>

  <div id="app">
    <v-app id="feed">
      <v-row>
        <v-col
            cols="12"
            offset-sm="3"
        >
          <v-form v-model="isFormValid" reset>
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
          max-width="1800"
          class="action"
      >

        <v-list three-line align="left"

        >
          <template v-for="feed in feeds">

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
                  class="mr-4"
                  @click="removeFeed(feed)"


              >

                Delete
              </v-btn>

            </v-list-item>

          </template>
          <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
        </v-list>
      </v-card>
    </v-app>
  </div>


</template>

<script>
import SubscriptionFeed from '@/services/SubscriptionFeedService.js';
import {mapGetters} from 'vuex'
import ConfirmDialogue from './ConfirmDialogue.vue';


export default {
  components: {ConfirmDialogue},
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

    async goToArticles(subscriptionId) {
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
          this.url = ' '
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
    async removeFeed(subscription) {
      if (!this.loading) {
        const confirmedDeletion = await this.$refs.confirmDialogue.show({
          title: 'Delete subscription',
          message: 'Are you sure you want to remove your subscription?',
          okButton: 'Delete',
        })
        if (confirmedDeletion) {
          try {
            this.loading = true
            var service = new SubscriptionFeed()
            await (service.removeFeed(subscription.id));
            this.$store.commit('removeFeed', subscription)
            this.typeMessage = 'success'
            this.responseMessage = 'Subscription was deleted successfully'
            this.$forceUpdate()
          } catch (error) {
            var message = error.response.data.message
            this.handleError(message);
          }
        }
      }
      this.loading = false;
    },
    async getFeeds() {
      try {
        var service = new SubscriptionFeed();
        var feeds = await (service.getFeeds());
        this.$store.commit('setFeeds', feeds)
      } catch (error) {
        this.handleError(error.response.data.message);
      }
    }
  },
  computed: {

    ...mapGetters([
      'feeds',
    ])
  },
  async mounted() {
    await this.getFeeds()
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

.content {
  font-size: 30px;
  size: A4;
  width: available;

}
</style>