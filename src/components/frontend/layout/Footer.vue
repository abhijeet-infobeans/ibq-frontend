<template>
  <v-footer
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    class="caption"
    color="grey darken-3"
    dark
    elevation-2
    fixed
    justify-center
  >
    {{ "COPYRIGHT " }} &copy; {{ new Date().getFullYear() + " InfoBeans, ALL RIGHTS RESERVED." }}
  </v-footer>
</template>
