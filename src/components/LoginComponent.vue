<template>
  <div id="loginComponent" class="mt-0 mb-0 mainColor">
    <div class="row">
      <div class="col mt-5">
        <div class="row mt-5">

          <div class="col-2 offset-5 shadow border rounded mt-5 mb-5 secondaryColor">

            <b-img class="mt-5 mb-5" src="logo/green_logo.png" width="200" height="50"></b-img>

            <div class="col-10 offset-1">

              <div class="row">
                <input name="username" type="text" class="form-control mb-2" placeholder="Username" title="Digit username"
                  minlength="2" maxlength="50" required autofocus v-model="userDetails.username" />
              </div>

              <div class="row">
                <input name="password" type="password" class="form-control mb-4" placeholder="Password"
                  title="Digit password" minlength="8" maxlength="50" required v-model="userDetails.password" />
              </div>

              <div class="row">
                <AlertComponent :alerts="alerts" backgroundColor="#8bd9b6" textColor="#ffffff"></AlertComponent>
              </div>

              <div class="row">
                <b-button class="col-12 mb-1 mainColor" @click="login()"
                  :disabled="!loginButtonIsEnabled">Login</b-button>
              </div>

              <div class="row">
                <b-button class="col-12 mb-3 mainColor" @click="goToSignup()">Go to signup</b-button>
              </div>

            </div>

          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import AlertComponent from '@/components/AlertComponent';

export default {
  name: "LoginComponent",

  components: {
    AlertComponent,
  },

  data() {
    return {
      userDetails: {},
      alerts: [],
    }
  },

  mounted() {
    this.userDetails = {}
    this.alerts = []
  },

  computed: {
    loginButtonIsEnabled() {
      var usernameIsSet = this.userDetails.username != null && this.userDetails.username.length > 0
      var passwordIsSet = this.userDetails.password != null && this.userDetails.password.length > 0

      return usernameIsSet && passwordIsSet
    },
  },

  methods: {

    login() {

      this.alerts = []

      var url_to_login = process.env.VUE_APP_API_URL + "login"

      var payload = {
        "username": this.userDetails.username,
        "user_password": this.userDetails.password,
      }

      axios.post(url_to_login, payload).then(response => {

        var responseData = response.data

        switch (responseData.code) {
          case 1:
            this.$store.commit("setUserId", responseData.data.user_id)
            this.$store.commit("setUsername", responseData.data.username)
            this.$router.push("/env_selection")

            this.$root.$emit("pushAlert", "Logged in!")
            break
          case 1000:
          case 1001:
            this.alerts.push(responseData.message)
            break
          case 1002:
            this.alerts = responseData.data
        }
      })
    },

    goToSignup() {
      this.$router.push("/signup")
    },
  }
}

</script>

<style scoped>
#loginComponent {
  margin-top: 5px;
  height: 100vh;
}
</style>
