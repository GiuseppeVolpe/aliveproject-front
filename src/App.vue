<template>
  <div id="app">

    <div v-if="getUserId != null">
      <NavBar></NavBar>
    </div>

    <RouterView></RouterView>

    <div v-if="isTrainingInProgress">
      <TrainProgressCheckComponent></TrainProgressCheckComponent>
    </div>

  </div>
</template>

<script setup>
const mainColor = "#8bd9b6"
const secondaryColor = "#fff"
</script>

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

    cssVars() {
      return {
        '--main-color': "#8bd9b6",
      }
    }
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
  color: #000;
}

.mainColor {
  background-color: v-bind(mainColor);
  border-color: v-bind(mainColor);
}

.secondaryColor {
  background-color: v-bind(secondaryColor);
  border-color: v-bind(secondaryColor);
}

button.mainColor {
  background-color: v-bind(mainColor);
  border-color: v-bind(mainColor);
  color: v-bind(secondaryColor);
  font: optional;
}

button.mainColor.disabled {
  background-color: v-bind(mainColor);
  border-color: v-bind(mainColor);
  color: v-bind(secondaryColor);
  font: optional;
}
</style>
