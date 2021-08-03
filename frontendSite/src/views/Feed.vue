<template>
  <div>
    <v-list-item

        :key="feed.title"
    >
      <v-list-item-avatar>
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
      <ConfirmDialog openDialoge="delete" title="Delete subscription" message="Are you sure that you want to delete it?"
                     cancelButton="cancel" okButton="delete" @action="action"></ConfirmDialog>
    </v-list-item>


  </div>

</template>

<script>


import ConfirmDialog from "../shared_components/ConfirmDialog";

export default {
  components: {ConfirmDialog},
  props: ['feed', 'index', 'loadingButtonIndex'],
  methods: {
    async goToArticles(subscriptionId) {
      console.log(this.loadingButtonIndex)
      if (this.loadingButtonIndex != -2) {
        return
      } // Ask why if I compare this.loadingButtonIndex to NOT_BUTTONS_LOADING from Feeds is false even though both are -2
      this.$router.push({name: 'articles', params: {subscriptionId: subscriptionId}});


    },
    async removeFeed(subscription, index) {

      this.$emit("removeFeed", subscription, index)
    },
    action(delete_or_cancel) {
      if (delete_or_cancel) {
        if (this.loadingButtonIndex != -2) {
          return
        }
        this.$emit("SETBURRON LOADING ", PONER EL BOTON EN LOADING )
        this.$emit("removeFeed", this.feed, this.index)
        this.$emit("SETBURRON LOADING ", DEJAR D PONER EL BOTON EN LOADING )
      }
    },
  }
}
</script>