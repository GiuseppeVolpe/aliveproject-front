<template>
    <div>
        <div class="row mt-5 customColor">
            <div class="col-2 offset-5 border rounded mt-5 mb-5 loginColor">
                <h1 class="mt-3">Alive</h1>
                <div class="row">
                   <div class="col-12 mr-2 ml-2">
                        <input name="username"
                            type="text"
                            class="form-control mt-3 mb-2"
                            placeholder="Username"
                            title="Inserisci il tuo username"
                            maxlength="50"
                            required
                            autofocus
                            v-model="userDetails.username" />

                        <input name="username"
                            type="password"
                            class="form-control mb-2"
                            placeholder="Password"
                            title="Digita la password"
                            maxlength="50"
                            minlength="8"
                            required
                            v-model="userDetails.password" />
                            
                        <b-button class="col-12 mb-1 buttonColor" @click="login()">Login</b-button>
                        <b-button class="col-12 mb-3 buttonColor">Sign up</b-button>
                    </div>
                    
                
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
//import { mapGetters, mapActions, mapMutations } from "vuex";
import axios from 'axios';

export default {
  name: "LoginComponent", 
  data() {
    return {
        userDetails : {
            username : "", 
            password : "",
        }
    }
  }, 
  methods : {
    login() {
      var url = "http://localhost:5000/login"
      var payload = {
        "username" : "GiuVol",
        "user_password" : "password",
      }
      axios.post(url, payload).then(res => console.log(res))
    }
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
  