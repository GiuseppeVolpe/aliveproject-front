<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#" class="col-2 offset-10">
          <b-button @click="logout()">Logout</b-button>
      </b-navbar-brand>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "NavBar",

  data() {
    return {
      
    }
  }, 

  computed : {
    ...mapGetters([
      "getUserId",
    ]),
  },

  methods : {
    ...mapMutations([
      "setUserId",
      "setUsername",
      "setAvailableEnvs",
      "setEnvId",
      "setEnvName",
      "setAvailableModels",
      "setAvailableDatasets",
    ]),

    logout() {
      this.setUserId(-1)
      this.setUsername("")
      this.setAvailableEnvs([])
      this.setEnvId(-1)
      this.setEnvName("")
      this.setAvailableModels([])
      this.setAvailableDatasets([])
      this.$router.push("/")
    },
  }
}

</script>
