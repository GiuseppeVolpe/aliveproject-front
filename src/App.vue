<template>
  <div :style="myStyle" id="app" class="customColor">
    <!--<img alt="Vue logo" src="./assets/logo.png">-->
    <LoginComponent></LoginComponent>
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent'

export default {
  name: 'App',
  components: {
    LoginComponent,
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
