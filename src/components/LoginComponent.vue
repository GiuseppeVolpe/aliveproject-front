<template>
  <div>
    <div class="row mt-5 customColor">
      <div class="col-2 offset-5 border rounded mt-5 mb-5 loginColor">
        <h1 class="mt-3">Alive</h1>
        <div class="row">
          <div class="col-12 mr-2 ml-2">
            <input name="username" type="text" class="form-control mt-3 mb-2" placeholder="Username"
              title="Inserisci il tuo username" maxlength="50" required autofocus v-model="userDetails.username" />

            <input name="username" type="password" class="form-control mb-2" placeholder="Password"
              title="Digita la password" maxlength="50" minlength="8" required v-model="userDetails.password" />

            <b-button class="col-12 mb-1 buttonColor" @click="login()">Login</b-button>
            <b-button class="col-12 mb-3 buttonColor">Sign up</b-button>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from 'axios';

export default {
  name: "LoginComponent",

  data() {
    return {
      userDetails: {},
    }
  },

  computed: {
    ...mapGetters([
      "getSession",
    ]),
  },

  methods: {
    ...mapMutations([
      "setUserId",
      "setUsername",
    ]),

    login() {
      var url_to_login = process.env.VUE_APP_API_URL + "login"

      var login_payload = {
        "username": this.userDetails.username,
        "user_password": this.userDetails.password,
      }

      axios.post(url_to_login, login_payload).then(login_response => {

        var loginResponseData = login_response.data
        console.log(login_response)

        if (loginResponseData.code == 1) {
          this.setUserId(loginResponseData.data.user_id)
          this.setUsername(loginResponseData.data.username)
          this.$router.push("/env_selection")
        }
      })
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

div.loginColor {
  background-color: #fff;
}

button.buttonColor {
  background-color: #8bd9b6;
  border-color: #8bd9b6;
}
</style>
  