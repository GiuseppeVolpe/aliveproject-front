<template>
  <div>

    <b-navbar toggleable="lg" type="dark" variant="info">

      <b-navbar-brand>
        <b-img class="pb-1 mr-2" src="logo/white_logo.png" fluid alt="Alive" height="40" width="130"></b-img>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <template v-if="getSelectedEnvId != null">
          <b-navbar-nav>

            <b-nav-item to="/models">Models</b-nav-item>
            <b-nav-item to="/datasets">Datasets</b-nav-item>
            <b-nav-item to="/training">Training</b-nav-item>

            <b-nav-item-dropdown text="Manage Environment" right>
              <b-dropdown-item @click="closeSelectedEnvAction()">Close</b-dropdown-item>
              <b-dropdown-item @click="deleteSelectedEnvAction()">Delete</b-dropdown-item>
            </b-nav-item-dropdown>

          </b-navbar-nav>
        </template>

        <b-navbar-nav class="ml-auto">
          <b-navbar-brand href="#">
            <b-button @click="logout()">Logout</b-button>
          </b-navbar-brand>
        </b-navbar-nav>

      </b-collapse>

    </b-navbar>

  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "NavBar",

  data() {
    return {

    }
  },

  computed: {
    ...mapGetters([
      'getSelectedEnvId'
    ]),
  },

  methods: {
    ...mapMutations([
      "resetState",
    ]),
    ...mapActions([
      "closeSelectedEnvAction",
      "deleteSelectedEnvAction",
    ]),

    logout() {
      this.resetState()
      this.$router.push("/")
      this.$root.$emit("pushAlert", "Logged out!")
    },
  }
}

</script>
