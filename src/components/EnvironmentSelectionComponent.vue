<template>
  <div>
    <div class="row mt-5">
      <div class="col-4 offset-4 mt-5 mb-5 loginColor">
        <h1 class="mt-3">Alive</h1>

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
            <input name="environmentName" type="text" class="form-control mb-2" placeholder="Name" maxlength="50"
              minlength="8" />
          </div>
          <div class="col-4">
            <b-button class="col-12 mt-2 mb-3 buttonColor">Create new</b-button>
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
  name: "EnvironmentSelectionComponent",

  data() {
    return {
      selectedEnv: null,
    }
  },

  mounted() {
    this.updateAvailableEnvs()
  },

  computed: {
    ...mapGetters([
      "getAvailableEnvs",
      "getSession",
    ]),
  },

  methods: {
    ...mapMutations([
      "setSelectedEnvId",
      "setSelectedEnvName",
      "setAvailableEnvs",
    ]),

    updateAvailableEnvs() {
      var url_to_available_envs = process.env.VUE_APP_API_URL + "get_user_envs"

      var envs_payload = {
        "session": this.getSession
      }

      axios.post(url_to_available_envs, envs_payload).then(env_response => {
        var envResponseData = env_response.data

        if (envResponseData.code == 1) {
          this.setAvailableEnvs(envResponseData.data)
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

    createNewEnvironment() {

    },
  }
}

</script>
