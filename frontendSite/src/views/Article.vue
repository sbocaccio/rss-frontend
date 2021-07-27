<template>
  <v-card
      elevation="2"
  >
    <v-card-title v-if="userArticle.article.title" @click="goToPage(userArticle.article.link)"
    >{{ userArticle.article.title }}
    </v-card-title>
    <v-card-text>{{ userArticle.article.summary }}</v-card-text>
    <v-card-actions>
      <v-btn
          class="mr-4"
          @click="goToPage(userArticle.article.link)"
      >Link
      </v-btn>
      <v-img
          v-if="userArticle.article.image"
          :src="userArticle.article.image"
          max-height="150"
          max-width="250"
      />

    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['userArticle'],
  methods: {

    goToPage(link) {
      window.open(link, "_blank");
    },
  }
}
</script>