<template>
    <div>
        <div class="row mt-5">
            <div class="col-2 offset-5 border rounded mt-5 mb-5">
                <h1 class="mt-3">Alive</h1>
                <div class="row">
                    <div class="col-12 mr-2 ml-2">

                        <input name="username" type="text" class="form-control mt-3 mb-2" placeholder="Username"
                            title="Digit a username" minlength="2" maxlength="50" required autofocus
                            v-model="userDetails.username" />

                        <input name="email" type="text" class="form-control mt-3 mb-2" placeholder="Email"
                            title="Digit your email" minlength="5" maxlength="50" required 
                            v-model="userDetails.email" />

                        <input name="password" type="password" class="form-control mb-2" placeholder="Password"
                            title="Create a password" minlength="8" maxlength="50" required
                            v-model="userDetails.password" />
                        
                        <AlertComponent :alerts="alerts"></AlertComponent>

                        <b-button class="col-12 mb-1 buttonColor" @click="signup()" :disabled="!signupButtonIsEnabled" >Signup</b-button>
                        <b-button class="col-12 mb-1 buttonColor" @click="goToLogin()">Go to login</b-button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

import AlertComponent from "@/components/AlertComponent"

export default {
    name: "SignupComponent",

    components: {
    AlertComponent
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
        ...mapGetters([

        ]),

        signupButtonIsEnabled() {
            var usernameIsSet = this.userDetails.username != null && this.userDetails.username.length > 0
            var emailIsSet = this.userDetails.email != null && this.userDetails.email.length > 0
            var passwordIsSet = this.userDetails.password != null && this.userDetails.password.length > 0

            return usernameIsSet && emailIsSet && passwordIsSet
        },
    },

    methods: {
        ...mapMutations([

        ]),
        ...mapActions([
            "pushAlertAction",
        ]),

        signup() {
            
            this.alerts = []

            var url_to_signup = process.env.VUE_APP_API_URL + "signup"

            var payload = {
                "username": this.userDetails.username,
                "user_email": this.userDetails.email,
                "user_password": this.userDetails.password,
            }

            axios.post(url_to_signup, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        this.goToLogin()
                        this.pushAlertAction("User added succesfully!")
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
        
        goToLogin() {
            this.$router.push("/")
        },
    }
}

</script>
