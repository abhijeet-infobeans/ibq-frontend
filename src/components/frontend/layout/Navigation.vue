<template>
  <div>
    <!--    <v-navigation-drawer v-if="logincheck"-->
    <!--                         v-model="$globalStates.showSideDrawer"-->
    <!--                         :clipped="$vuetify.breakpoint.lgAndUp"-->
    <!--                         app-->
    <!--                         color='dark-4'-->
    <!--    >-->
    <v-navigation-drawer
        :clipped="$vuetify.breakpoint.lgAndUp"
        app
        color='dark-4'
    >
      <v-list dense>
        <template v-for='item in items'>
          <v-row :key='item.heading' align='center' v-if='item.heading'>
            <v-col cols='6'>
              <v-subheader v-if='item.heading'>{{ item.heading }}</v-subheader>
            </v-col>
          </v-row>
          <v-list-group :append-icon="item.model ? item.icon : item['icon-alt']" :key='item.text' color="black"
                        prepend-icon
                        v-else-if='item.children' v-model='item.model'>
            <template v-slot:activator>
              <v-icon>{{ item.iconprepend }}</v-icon>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="ml-4">{{ item.text }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item :key='i' :to=" '/'+ child.path" link v-for='(child, i) in item.children'>
              <v-list-item-action v-if='child.icon'>
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="ml-12 pl-2">{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item :key='item.text' :to=" '/'+ item.path" link v-else>
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
  data: () => ({
    drawer: null,
    items: [
      {icon: 'mdi-home', text: 'Dashboard', path: 'admin/dashboard'},
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        iconprepend: 'mdi-file-chart',
        text: 'Reporting',
        model: false,
        children: [
          {text: 'Proposed Code Adoptions', path: 'admin/proposed-adoptions'},
          {text: 'Adoption Activity', path: 'admin/adoption-activity'}
        ]
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        iconprepend: 'mdi-book',
        text: 'Adoptions',
        model: false,
        children: [
          {text: 'Adoption Listing', path: 'admin/adoptions'},
          {text: 'Adoption Label Listing', path: 'admin/adoptionlabels'},
          {text: 'Adoption Profile Listing', path: 'admin/adoptionprofiles'},
          {text: 'Adoption Status Listing', path: 'admin/adoptionstatuses'},
          {text: 'Adoption Type Listing', path: 'admin/adoptiontypes'},
          {text: 'Import ISO Adoption Data', path: 'admin/iso-adoptions-import'},
          {text: 'Import Adoption Information', path: 'admin/adoptions-import'}
        ]
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        iconprepend: 'mdi-crosshairs',
        text: 'Locations',
        model: false,
        children: [
          {text: 'Country Listing', path: 'admin/countries'},
          {text: 'State Listing', path: 'admin/states'},
          {text: 'County Listing', path: 'admin/counties'},
          {text: 'Jurisdiction Listing', path: 'admin/jurisdictions'},
          {text: 'Township Listing', path: 'admin/townships'},
          {text: 'Postal Code Listing', path: 'admin/postalcodes'},
          {text: 'Import Location Data', path: 'admin/locations-import'}
        ]
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        iconprepend: 'mdi-book-multiple',
        text: 'Code Books',
        model: false,
        children: [
          {text: 'Code Book Listing', path: 'admin/codebooks'},
          {text: 'Code Year Listing', path: 'admin/codeyears'},
          {text: 'Publisher Listing', path: 'admin/publishers'},
          {text: 'Import Code Book Data', path: 'admin/code-book-import'}
        ]
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        iconprepend: 'mdi-database-search',
        text: 'Data',
        model: false,
        children: [
          {text: 'Key Contacts Listing', path: 'admin/keycontacts'},
          {text: 'Useful Links Listing', path: 'admin/usefullinks'},
          {text: 'Logs', path: 'admin/auditlogs'}
        ]
      },
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        iconprepend: 'mdi-account-group',
        text: 'Users',
        model: false,
        children: [
          {text: 'User Listing', path: 'admin/users'}
        ]
      }
    ]
  }),
  props: [],
  computed: {
    logincheck: function () {
      return true
      // return this.$store.getters['AuthModule/isLoggedIn']
    }
  }
}
</script>
