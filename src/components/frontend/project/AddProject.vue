<template>
  <div>
    <v-card>
      <v-card-title class="display-1">
        Add Project
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.name"
                :maxlength="250"
                :rules="nameRules"
                hint="Please enter project name."
                label="Project name*"
                outlined
                validate-on-blur
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="editedItem.description"
                outlined
                hint="Please enter description name."
                label="Project description"
                validate-on-blur
              />
            </v-col>
            <v-col cols="12">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="editedItem.startDate"
                    label="Start Date"
                    outlined
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="editedItem.startDate"
                  @input="menu2 = false"
                  color="#F38181"
                />
              </v-menu>
            </v-col>
            <v-col cols="12">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="editedItem.endDate"
                    label="End Date"
                    outlined
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="editedItem.endDate"
                  @input="menu1 = false"
                  color="#F38181"
                />
              </v-menu>
            </v-col>
          </v-row>
          <v-card-actions>
            <small color="primary">*indicates required fields</small>
            <v-spacer />
            <v-btn
              outlined
              dark
              color="red"
              @click="backToListingPage"
            >
              <v-icon dark>
                mdi-arrow-left
              </v-icon>Back
            </v-btn>
            <v-btn
              :loading="btnLoader"
              outlined
              class="setPrimaryBGColor fontWhite"
              @click="save"
            >
              <v-icon dark>
                mdi-check
              </v-icon>Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
// import CONSTANTS from "@/config/constant";
export default {
  name: 'AddProject',
  components: {
  },
  data: () => ({
    loading: true,
    valid: true,
    menu1: false,
    menu2: false,
    btnLoader: false,
    nameRules: [
      v => !!v || 'Project name is required.'
    ],
    editedItem: {
      name: '',
      description: '',
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
    },
  }),
  mounted () {
  },
  methods: {
    save () {
      let formData = {
        'name': this.editedItem.name,
        'description': this.editedItem.description,
        'startDate': this.editedItem.startDate,
        'endDate': this.editedItem.endDate
      }
      new Promise((resolve, reject) => {
        this.$store.dispatch('ProjectModule/addProject',{ resolve, reject, formData })
      })
        .then(responseData => {
          console.log(responseData)
        })
        .catch(error => {
          let errorMessage = typeof error !== 'undefined' ? error.message : ''
          this.$globalStates.notification.type = 'error'
          this.$globalStates.notification.text = this.$globalStates.getErrorMessageText(errorMessage)
          this.$globalStates.notification.init_notifications = true
        })
        .finally(() => {
        })
    },
    backToListingPage () {
      this.$router.push({ name: 'ListProject', params: {} })
    }
  }
}
</script>
