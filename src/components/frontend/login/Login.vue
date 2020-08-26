<template>
  <v-content>
    <v-container>
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          sm="8"
          md="4"
        >
          <v-spacer />
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="username"
              shaped
              :rules="usernameRules"
              label="E-mail"
              required
              validate-on-blur
              @keyup.enter="submit"
            />
            <v-text-field
              v-model="password"
              shaped
              :rules="passwordRules"
              label="Password"
              type="password"
              required
              @keyup.enter="submit"
            />
            <v-checkbox
              v-model="keepLoggedIn"
              class="ma-0"
              label="Keep me logged in for 30 days"
            />
            <div class="float-right">
              <v-btn
                class="text-capitalize"
                :to="{ path: 'forgotpassword' }"
                text
                small
              >
                Forgot Password?
              </v-btn>
            </div>
            <v-spacer style="clear:both;" />
            <div class="float-right">
              <v-btn
                :loading="btnLoader"
                :disabled="!valid"
                class="mr-4 bgclr fontWhite"
                @click="submit"
              >
                Login
              </v-btn>
            </div>
            <v-spacer style="clear:both;" />
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import CONSTANTS from './../../../config/constant'
import router from '../../../router'
export default {
  name: 'Login',
  data: () => ({
    btnLoader: false,
    username: null,
    valid: true,
    password: null,
    error: null,
    errorMessage: null,
    alert: false,
    usernameRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordRules: [v => !!v || 'Password is required'],
    keepLoggedIn: false
  }),
  computed: {
    manageAlert: function () {
      return this.$store.getters['AuthModule/getAlert']
    }
  },
  methods: {
    submit () {
      this.btnLoader = true
      const credentials = {
        username: this.username,
        password: this.password
      }
      if (credentials.username === null || credentials.password === null) {
        this.btnLoader = false
        this.$globalStates.notification.type = 'error'
        this.$globalStates.notification.text = CONSTANTS.VALID_USERNAME_AND_PASSWORD_ERROR_MESSAGE
        this.$globalStates.notification.init_notifications = true
      } else {
        new Promise((resolve, reject) => {
          if (this.keepLoggedIn) {
            localStorage.setItem('keepLoggedIn', true)
          }
          this.$store.dispatch('AuthModule/attemptLogin', { resolve, reject, credentials })
        }).then((responseData) => {
          // Once receive a token, then set the token for further api calls
          // Set token
          let tokens = responseData.data
          this.$store.dispatch('AuthModule/setJWTTokens', { tokens }).then(() => {
            // Fetch user details
            let uname = credentials.username
            this.$store.dispatch('AuthModule/userRecord', { uname }).then((usrResponse) => {
              /**
               * Here the condition where we would checking user status
               */
              let userDetails = usrResponse.data.data
              if (userDetails.status === CONSTANTS.ACTIVE_USER_DEFAULT_STATUS) {
                this.$store.dispatch('AuthModule/setUserMetaInfoToApp', { userDetails }).then(() => {
                  // redirect user to dashboard
                  router.push({ path: 'dashboard' })
                  this.btnLoader = false
                }).catch()
              } else {
                /**
                 * show the incative message error
                 */
                this.btnLoader = false
                this.$globalStates.notification.type = 'error'
                this.$globalStates.notification.text = CONSTANTS.INCATIVE_USER_ERROR_MSG
                this.$globalStates.notification.init_notifications = true
              }
            }).catch()
          }).catch()
        }).catch(({ response }) => {
          this.btnLoader = false
          this.$globalStates.notification.type = 'error'
          this.$globalStates.notification.text = response.data.message
          this.$globalStates.notification.init_notifications = true
        })
      }
    },
  }
}
</script>
