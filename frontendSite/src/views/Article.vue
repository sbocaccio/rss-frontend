<template>
  <v-card
      elevation="2"
  >
    <v-card-title v-if="article.title">{{ article.title }}</v-card-title>
    <v-card-text>{{ article.summary }}</v-card-text>
    <v-card-actions>
      <v-btn
          class="mr-4"
          @click="goToPage(article.link)"
      >Link
      </v-btn>
      <v-img
          v-if="article.image"
          :src="article.image"
          max-height="150"
          max-width="250"
      />

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['article'],
  methods: {

    goToPage(link) {
      window.open(link, "_blank");
    },
  }
}
</script>