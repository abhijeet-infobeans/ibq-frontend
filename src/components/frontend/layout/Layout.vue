<template>
  <div style="border:1px solid red;">
<!--    <Snackbar />-->
    <Navigation />
    <Header />
    <v-main>
      <div class="ma-4">
        <router-view></router-view>
      </div>
    </v-main>
    <Footer/>
  </div>
</template>
<script>
import Navigation from './Navigation'
import Header from './Header'
import Footer from './Footer'
// import Snackbar from './Snackbar'

export default {
  name: 'AdminLayout',
  components: {
    Navigation,
    Header,
    Footer,
    // Snackbar
  },
  data: () => ({})
}
</script>
