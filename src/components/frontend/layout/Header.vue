<template>
  <div>
    <v-app-bar
      id="appHeader"
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      class="bgclr"
      dark
    >
      <v-app-bar-nav-icon
        v-if="logincheck"
        @click.stop="$globalStates.showSideDrawer = !$globalStates.showSideDrawer"
      />
      <router-link
        exact
        tag="span"
        to="/dashboard"
      >
        <span>
          <img
            alt="logo"
            class="logo mr-1"
            src="./../../../assets/logo.png"
          >
        </span>
      </router-link>
      <v-toolbar-title class="display-1">
        {{ APPLICATION_TITLE }}
      </v-toolbar-title>
      <v-spacer />
      <v-icon
        v-if="logincheck"
        medium
      >
        mdi-account
      </v-icon>
      <span
        v-if="logincheck"
        class="ml-0 pr-4"
      >{{ WELCOME }} {{ profileName }}!</span>
      <v-btn
        v-if="logincheck"
        class="setSecondaryBGColor fontWhite"
        dark
        @click="logout"
      >
        {{ LOGOUT }}
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import CONSTANTS from '../../../config/constant'

export default {
  name: 'Header',
  data: () => ({
    APPLICATION_TITLE: CONSTANTS.APPLICATION_TITLE,
    LOGOUT: CONSTANTS.LOGOUT,
    WELCOME: CONSTANTS.WELCOME
  }),
  computed: {
    logincheck: function () {
      return this.$store.getters['AuthModule/isLoggedIn']
    },
    profileName () {
      return this.$store.getters['AuthModule/getEmail']
    },
  },
  mounted () {
  },
  methods: {
    logout () {
      new Promise((resolve, reject) => {
        this.$store.dispatch('AuthModule/logout', { resolve, reject })
        if (this.$vuetify.breakpoint.width > 1024) {
          this.$globalStates.showSideDrawer = true
        }
      }).then(() => {
        this.$router.push({ name: 'Login' })
      }).catch(() => {
        this.$router.push({ name: 'Login' })
      })
    },
  }
}
</script>
