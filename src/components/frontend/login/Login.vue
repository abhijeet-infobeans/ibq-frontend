<template>
  <v-main>
    <v-container>
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          md="4"
          sm="8"
        >
          <v-spacer />
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              label="E-mail"
              outlined
              required
              validate-on-blur
              @keyup.enter="submit"
            />
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              outlined
              required
              type="password"
              @keyup.enter="submit"
            />
            <v-checkbox
              v-model="keepLoggedIn"
              class="ma-0"
              label="Keep me logged in for 30 days"
            />
            <div class="float-right">
              <v-btn
                :to="{ path: 'forgotpassword' }"
                class="text-capitalize"
                small
                text
              >
                Forgot Password?
              </v-btn>
            </div>
            <v-spacer style="clear:both;" />
            <div class="float-right">
              <v-btn
                :disabled="!valid"
                :loading="btnLoader"
                class="mr-4 setPrimaryBGColor fontWhite"
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
  </v-main>
</template>

<script>
import CONSTANTS from './../../../config/constant'

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
  methods: {
    submit() {
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
          this.$store.dispatch('AuthModule/attemptLogin', {resolve, reject, credentials})
        }).then((responseData) => {
          // Once receive a token, then set the token for further api calls
          // Set token
          let tokens = responseData.data
          this.$store.dispatch('AuthModule/setJWTTokens', {tokens}).then(() => {
            // Fetch user details
            let uname = credentials.username
            this.$store.dispatch('AuthModule/getUserByEmail', {uname}).then((usrResponse) => {
              /**
               * Here the condition where we would checking user status
               */
              let userDetails = usrResponse.data.data
              if (userDetails.status === CONSTANTS.ACTIVE_USER_DEFAULT_STATUS) {
                this.$store.dispatch('AuthModule/setUserMetaInfoToApp', {userDetails}).then(() => {
                  // redirect user to dashboard
                  this.$router.push({path: 'dashboard'})
                  this.btnLoader = false
                }).catch()
              } else {
                /**
                 * show the inactive message error
                 */
                this.btnLoader = false
                this.$globalStates.notification.type = 'error'
                this.$globalStates.notification.text = CONSTANTS.INACTIVE_USER_ERROR_MSG
                this.$globalStates.notification.init_notifications = true
              }
            }).catch(() => {
              this.btnLoader = false
              this.$globalStates.notification.type = 'error'
              this.$globalStates.notification.text = this.$globalStates.getErrorMessageText('')
              this.$globalStates.notification.init_notifications = true
            })
          }).catch()
        }).catch(() => {
          this.btnLoader = false
          this.$globalStates.notification.type = 'error'
          this.$globalStates.notification.text = this.$globalStates.getErrorMessageText('')
          this.$globalStates.notification.init_notifications = true
        })
      }
    },
  }
}
</script>
