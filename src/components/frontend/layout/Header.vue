<template>
  <div>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      class="bgclr"
      dark
      id="appHeader"
    >
      <v-app-bar-nav-icon @click.stop="$globalStates.showSideDrawer = !$globalStates.showSideDrawer" v-if="logincheck"/>
      <router-link exact tag="span" to="/dashboard">
        <span>
          <img alt="logo" class="logo mr-1" src="./../../../assets/logo.png"/>
        </span>
      </router-link>
      <v-toolbar-title class="display-1">{{ APPLICATION_TITLE }}</v-toolbar-title>
      <v-spacer/>
      <v-icon medium v-if="logincheck">mdi-account</v-icon>
      <!--      <span class="ml-0 pr-4" v-if="logincheck">{{WELCOME}} {{profileName}}!</span>-->
      <!--      <v-btn v-if="logincheck" color="green" dark @click="logout">{{LOGOUT}}</v-btn>-->
    </v-app-bar>
  </div>
</template>

<script>
import CONSTANTS from '../../../config/constant'

export default {
  name: 'Header',
  data: () => ({
    APPLICATION_TITLE: CONSTANTS.APPLICATION_TITLE,
    FEVersion: '',
    BEVersion: ''
  }),
  methods: {
    logout () {
      new Promise((resolve, reject) => {
        this.$store.dispatch('AuthModule/logout', { resolve, reject })
        if (this.$vuetify.breakpoint.width > 1024) {
          this.$globalStates.showSideDrawer = true
        }
      }).then(() => {
        this.$router.push({ name: 'AdminLogin' })
      }).catch(() => {
        this.$router.push({ name: 'AdminLogin' })
      })
    },
  },
  computed: {
    logincheck: function () {
      return this.$store.getters['AuthModule/isLoggedIn']
    },
    profileName () {
      return this.$store.getters['AuthModule/getFirstName']
    },
  },
  mounted () {
  }
}
</script>
