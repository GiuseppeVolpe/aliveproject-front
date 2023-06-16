<template>
  <div id="app" class="mt-0 pt-0">
    <div v-if="getUserId != null">
      <NavBar></NavBar>
    </div>
    <RouterView></RouterView>
    <div v-if="getGeneralAlerts.length > 0">
      <AlertComponent :alerts="getGeneralAlerts"></AlertComponent>
    </div>
    
    <TrainProgressCheckComponent></TrainProgressCheckComponent>

  </div>
</template>

<script>
import { RouterView } from "vue-router";
import { mapGetters } from "vuex";

import NavBar from '@/components/NavBar'
import AlertComponent from '@/components/AlertComponent'

import TrainProgressCheckComponent from "@/components/Training/TrainProgressCheckComponent";

export default {
  name: 'App',

  components: {
    NavBar,
    RouterView,
    AlertComponent,
    TrainProgressCheckComponent,
  },

  computed: {
    ...mapGetters([
      "getUserId",
      "getGeneralAlerts"
    ]),
  },

  data: function () {
    return {

    }
  }
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
</style>
