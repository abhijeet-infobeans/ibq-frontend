<template>
  <v-container
    class="text-center"
    fill-height
    style="height: calc(100vh - 58px);"
  >
    <v-row align="center">
      <v-col>
        <v-img
          :src="require('@/assets/logo.png')"
          contain
          height="64"
        />
        <h1 class="display-2 green-txt mt-4">
          Whoops, 404
        </h1>

        <p class="mt-4">
          The page you were looking for does not exist
        </p>

        <v-btn
          :to="`/`"
          class="fontcolor"
          dark
          outlined
        >
          Get me out of here!
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FourOhFour',
  props: {
  },
  created () {
    this.$ssrContext && this.$ssrContext.res.status(404)
  }
}
</script>
