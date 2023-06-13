<template>
  <div>
    <div class="row mt-5">
      <div class="col-4 offset-4 mt-5 mb-5 loginColor">
        <h1 class="mt-3">Welcome, {{ getUsername }}</h1>

        <div v-if="getAvailableEnvs.length > 0">

          <div class="row">
            <div class="col-12 mr-2 ml-2">

              <div class="row">
                <div class="col-8 mr-2 ml-2">
                  <b-form-select v-model="selectedEnv" :options="getAvailableEnvs" class="form-control" size="lg">
                    <option value="null" disabled hidden>Select Environment</option>
                  </b-form-select>
                </div>
                <div class="col-4">
                  <b-button class="col-12 mb-3 buttonColor" @click="selectEnvironment()">Select</b-button>
                </div>
              </div>

              <div class="row">
                <hr class="col-4 mt-5">
                <h3 class="col-4 mt-4">Or</h3>
                <hr class="col-4 mt-5">
              </div>

            </div>
          </div>

        </div>
        <div v-else>

          <div class="row">
            <h3>You don't have environments... create a new one!</h3>
          </div>

        </div>

        <div class="row">
          <div class="col-8 mt-2 mr-2 ml-2">
            <input name="environmentName" type="text" class="form-control mb-2" placeholder="Name" minlength="8"
              maxlength="50" v-model="newEnvName" />
          </div>
          <div class="col-4">
            <b-button class="col-12 mt-2 mb-3 buttonColor" @click="createNewEnvironment(newEnvName)"
              :disabled="!createButtonIsEnabled">
              Create new environment
            </b-button>
          </div>
        </div>

        <AlertComponent :alerts="alerts"></AlertComponent>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import axios from 'axios';

import AlertComponent from "@/components/AlertComponent"

export default {
  name: "EnvironmentSelectionComponent",

  components: {
    AlertComponent
  },

  data() {
    return {
      selectedEnv: null,
      newEnvName: null,
      alerts: [],
    }
  },

  mounted() {
    this.updateAvailableEnvs()
  },

  computed: {
    ...mapGetters([
      "getUsername",
      "getAvailableEnvs",
      "getSession",
    ]),

    createButtonIsEnabled() {
      var envNameIsSet = this.newEnvName != null && this.newEnvName.length > 0

      if (envNameIsSet) {
        for (var i = 0; i < this.getAvailableEnvs.length; i++) {
          var currentEnv = this.getAvailableEnvs[i]
          var currentName = currentEnv.value.name

          if (this.newEnvName == currentName) {
            //return false
          }
        }
      } else {
        return false
      }

      return true
    },
  },

  methods: {
    ...mapMutations([
      "setSelectedEnvId",
      "setSelectedEnvName",
      "setAvailableEnvs",
    ]),

    updateAvailableEnvs() {
      var url_to_available_envs = process.env.VUE_APP_API_URL + "get_user_envs"

      var payload = {
        "session": this.getSession
      }

      axios.post(url_to_available_envs, payload).then(response => {
        var responseData = response.data

        if (responseData.code == 1) {
          this.setAvailableEnvs(responseData.data)
        }
      })
    },

    selectEnvironment() {
      if (this.selectedEnv == null) {
        return
      }

      this.setEnvId(this.selectedEnv.id)
      this.setEnvName(this.selectedEnv.name)
      this.$router.push("/env_space")
    },

    deleteEnvironment() {

    },

    createNewEnvironment() {
      if (this.newEnvName == null) {
        return
      }

      var url_to_create_env = process.env.VUE_APP_API_URL + "create_env"

      var payload = {
        "session": this.getSession,
        "env_name": this.newEnvName,
      }

      axios.post(url_to_create_env, payload).then(response => {

        var responseData = response.data
        console.log(responseData)
        switch (responseData.code) {
          case 1:
            this.newEnvName = ""
            this.updateAvailableEnvs()
            break
          case 1000:
          case 1001:
            this.alerts.push(responseData.message)
            break
          case 1002:
            this.alerts = responseData.data
        }
      });
    },
  }
}

</script>
