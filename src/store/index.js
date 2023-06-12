import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username : "",
    password : "",
    errors : null,
  },
  getters: {
    getUsername : state => {
      return state.username;
    },
    getPassword : state => {
      return state.password;
    },
  },
  mutations: {
    setUsername : (state, usernameValue) => {
      state.username = usernameValue
    },
    setPassword : (state, passwordValue) => {
      state.password = passwordValue
    },
  },
  actions: {
  },
  modules: {
  }
})
