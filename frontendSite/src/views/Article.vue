
<style>
a {
  text-decoration: none;
  color: black;
}

</style>


<template>
  <v-card

  >
    <v-card-title v-if="userArticle.article.title"
                  @click="goToPage()"
                  to="userArticle.article.title"
    >
      <a class="section-link active" data-scroll="" :href=userArticle.article.link target="_blank">{{ userArticle.article.title }}</a>

    </v-card-title>

    <v-card-text>{{ userArticle.article.summary }}</v-card-text>
    <v-card-actions>

      <v-img
          v-if="userArticle.article.image"
          :src="userArticle.article.image"
          max-height="150"
          max-width="250"
          @click="goToPage(userArticle.article.link)"
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