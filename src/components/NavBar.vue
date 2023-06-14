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
      
    ]),
  },

  methods : {
    ...mapMutations([
      "resetState",
      "pushAlertAction",
    ]),

    logout() {
      this.resetState()
      this.$router.push("/")
      this.pushAlertAction("Logged out!")
    },
  }
}

</script>
