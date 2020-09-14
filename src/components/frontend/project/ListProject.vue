<template>
  <div>
    <v-card>
      <v-card-title class="display-1">
        Projects
      </v-card-title>
      <v-data-table
        :loading="loading"
        :headers="headers"
        :items="projectList"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            class="font-weight-light ml-4 mr-4 mb-4"
            append-icon="mdi-magnify"
            label="Search Project"
            single-line
            hide-details
          />
        </template>
        <!--        <template v-slot:item.action="{ item }">-->
        <!--          <v-icon-->
        <!--            text-->
        <!--            small-->
        <!--            class="mr-2"-->
        <!--            @click="editItem(item)"-->
        <!--          >-->
        <!--            mdi-border-color-->
        <!--          </v-icon>-->
        <!--        </template>-->
        <template v-slot:no-data>
          <p>{{ NO_DATA_FOUND }}</p>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import CONSTANTS from "@/config/constant";
export default {
  name: 'ListProject',
  components: {
  },
  data: () => ({
    loading: true,
    NO_DATA_FOUND: CONSTANTS.NO_DATA_FOUND,
    ADD_NEW_PROJECT: CONSTANTS.ADD_NEW_PROJECT,
    projectList: [],
    search: '',
    headers: [
      {
        text: 'ID',
        align: 'left',
        sortable: true,
        value: 'id',
        class: 'subtitle-2'
      },
      {
        text: 'Name',
        align: 'left',
        sortable: true,
        value: 'projectName',
        class: 'subtitle-2'
      },
      {
        text: 'Start Date',
        align: 'left',
        sortable: false,
        value: 'projectStartDate',
        class: 'subtitle-2'
      },
      {
        text: 'End Date',
        align: 'left',
        sortable: true,
        value: 'projectEndDate',
        class: 'subtitle-2'
      },
      {
        text: 'Added by',
        align: 'left',
        sortable: true,
        value: 'user.email',
        class: 'subtitle-2'
      },
    ]
  }),
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      new Promise((resolve, reject) => {
        this.$store.dispatch('ProjectModule/getProjects', {
          resolve,
          reject
        })
      })
        .then(responseData => {
          this.projectList = responseData
        })
        .catch(
          (error) => {
            let errorMessage = typeof error !== 'undefined' ? error.message : ''
            this.$globalStates.notification.type = 'error'
            this.$globalStates.notification.text = this.$globalStates.getErrorMessageText(errorMessage)
            this.$globalStates.notification.init_notifications = true
          }
        )
        .finally(() => {
          this.loading = false
        })
    },
  }
}
</script>
