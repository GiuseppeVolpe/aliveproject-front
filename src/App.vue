<template>
  <div id="app" class="mt-0 pt-0">
    <div v-if="getUserId != null">
      <NavBar></NavBar>
    </div>
    <RouterView></RouterView>

    <div v-if="isTrainingInProgress">
          <TrainProgressCheckComponent></TrainProgressCheckComponent>
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import { mapGetters } from "vuex";

import NavBar from '@/components/NavBar'

import TrainProgressCheckComponent from "@/components/Training/TrainProgressCheckComponent";

export default {
  name: 'App',

  components: {
    NavBar,
    RouterView,
    TrainProgressCheckComponent,
  },

  mounted() {
    this.$root.$on("pushAlert", (message, desiredTitle = "Notification", desiredDelay = 2000, append = false) => {
      this.pushAlert(message, desiredTitle, desiredDelay, append)
    })
  },

  computed: {
    ...mapGetters([
      "getUserId",
      "isTrainingInProgress",
    ]),
  },

  data: function () {
    return {

    }
  },

  methods: {
    pushAlert(message, desiredTitle, desiredDelay, append) {
      this.$root.$bvToast.toast(message, {
        title: desiredTitle,
        autoHideDelay: desiredDelay,
        appendToast: append
      })
    },
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #8bd9b6;
  margin-top: 60px;
}
button.mainColor {
  background-color: #8bd9b6;
  border-color: #8bd9b6;
  font: optional;
  color: #fff;
}
button.mainColor.disabled {
  background-color: #8bd9b6;
  border-color: #8bd9b6;
  font: optional;
  color: #fff;
}
</style>
