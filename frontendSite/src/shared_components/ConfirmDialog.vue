<template>

    <v-dialog
        v-model="dialog"

    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            v-bind="attrs"
            v-on="on"
        >
          {{openDialoge}}
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          {{ title }}
        </v-card-title>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text

              @click="_cancel"
          >
            {{ cancelButton }}
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="_confirm"
          >
            {{ okButton }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['openDialoge','title', 'message', 'cancelButton','okButton'],
  data() {
    return {
      dialog: false,
    }

  },
  methods:{
    _confirm() {
      this.dialog= false
      this.$emit("confirmed", true)

    },

    _cancel() {
      this.dialog= false
      this.$emit("confirmed", false)

    },
  }
}
</script>

<style scoped>

</style>