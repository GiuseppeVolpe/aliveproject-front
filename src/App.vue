<template>
  <div id="app" class="mt-0 pt-0">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <div v-if="getUserId > -1">
      <NavBar></NavBar>
    </div>
    <RouterView></RouterView>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from '@/components/NavBar'
//import LoginComponent from '@/components/LoginComponent'
import { RouterView } from "vue-router";

export default {
  name: 'App',

  components: {
    NavBar,
    RouterView
},

  computed : {
    ...mapGetters([
      "getUserId",
    ]),
  },
  
  data: function() {
      return {
         myStyle:{
            backgroundColor:"#8bd9b6" 
            }
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
  color: #2c3e50;
  margin-top: 60px;
}
  div.customColor {
    background-color: #8bd9b6;
  }
</style>
