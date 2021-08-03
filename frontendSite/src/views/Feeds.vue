<script></script>
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
                :loading="loadingButtonIndex== -1 "
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
          <template v-for="(feed,index) in feeds">
            <Feed :feed="feed" :index="index" :loadingButtonIndex="loadingButtonIndex" :key="feed.id" @removeFeed="removeFeed">

            </Feed>

          </template>


        </v-list>

      </v-card>
    </v-app>
  </div>


</template>

<script>
import Feed from './Feed.vue';
import SubscriptionFeed from '@/services/SubscriptionFeedService.js';
import {mapGetters} from 'vuex'
import ConfirmDialog from "../shared_components/ConfirmDialog";

const NOT_BUTTONS_LOADING = -2;
const SUBMIT_BUTTON_INDEX = -1;

export default {
  components: {Feed},
  data() {
    return {
      rules: {
        required: value => !!value || 'Required.',
      },
      url: '',
      errorMsg: '',
      isFormValid: false,
      successMsg: '',
      typeMessage: '',
      responseMessage: '',
      loadingButtonIndex: '-2',

    };
  },
  methods: {
    handleError(error) {
      this.responseMessage = error
      this.typeMessage = 'error'
    },
    async submitFeed() {
      if (!this.loadingButtonIndex == NOT_BUTTONS_LOADING) {
        return
      }
      this.loadingButtonIndex = SUBMIT_BUTTON_INDEX
      var response;
      try {
        const credentials = {
          'link': this.url,
        }
        var service = new SubscriptionFeed()
        response = await (service.addFeed(credentials));
        this.$store.commit('addFeed', response.data)
        this.typeMessage = 'success'
        this.responseMessage = 'Subscription was created successfully'
        this.url = ' '
      } catch (error) {
        var message = ''
        if (error.response.status == 400) {
          message = ('Imposible to parse url')
        } else {
          message = error.response.data.message
        }
        this.handleError(message);
      }
      this.loadingButtonIndex = NOT_BUTTONS_LOADING

    },
    async removeFeed(subscription, index) {
        this.loadingButtonIndex = index
        try {
          console.log('holaaa')
          var service = new SubscriptionFeed()
          await (service.removeFeed(subscription.id));
          this.$store.commit('removeFeed', subscription)
        } catch (error) {
          var message = error.response.data.message
          this.handleError(message);
        }

      this.loadingButtonIndex = NOT_BUTTONS_LOADING

    },
    async getFeeds() {
      try {
        var service = new SubscriptionFeed();
        var feeds = await (service.getFeeds());
        this.$store.commit('setFeeds', feeds)
      } catch (error) {
        this.handleError(error.response.data.message);
      }
    },

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