<template>
  <div id="app" class="mt-0 pt-0">
    <div v-if="getUserId != null">
      <NavBar></NavBar>
    </div>
    <RouterView></RouterView>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import { mapGetters } from "vuex";

import NavBar from '@/components/NavBar'

export default {
  name: 'App',

  components: {
    NavBar,
    RouterView,
  },

  computed: {
    ...mapGetters([
      "getUserId",
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
