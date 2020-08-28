<template>
  <div>
    <v-navigation-drawer
      v-if="logincheck"
      v-model="$globalStates.showSideDrawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      color='dark-4'
    >
      <v-list dense>
        <template v-for='item in items'>
          <v-row v-if='item.heading' :key='item.heading' align='center'>
            <v-col cols='6'>
              <v-subheader v-if='item.heading'>{{ item.heading }}</v-subheader>
            </v-col>
          </v-row>
          <v-list-group v-else-if='item.children' :key='item.text' v-model='item.model'
                        :append-icon="item.model ? item.icon : item['icon-alt']"
                        color="black">
            <template v-slot:activator>
              <v-icon>{{item.iconprepend}}</v-icon>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="ml-4" >{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item  v-for='(child, i) in item.children' :key='i' link :to=" '/'+ child.path">
              <v-list-item-action v-if='child.icon'>
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="ml-12 pl-2">{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key='item.text' link :to=" '/'+ item.path">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>

export default {
  name: 'Navigation',
  props: [],
  data: () => ({
    drawer: null,
    items: [
      {icon: 'mdi-home', text: 'Dashboard', path: 'dashboard'},
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        iconprepend: 'mdi-file-chart',
        text: 'Projects',
        model: false,
        children: [
          {text: 'Project-1', path: 'xxxx'},
          {text: 'Project-2', path: 'yyyy'}
        ]
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        iconprepend: 'mdi-account-group',
        text: 'Users',
        model: false,
        children: [
          {text: 'User Listing', path: 'uuuu'}
        ]
      }
    ]
  }),
  computed: {
    logincheck: function () {
      return this.$store.getters['AuthModule/isLoggedIn']
    }
  }
}
</script>
