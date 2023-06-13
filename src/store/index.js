import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    userId : -1,
    username : "",
    availableEnvs : [],
    envId : -1,
    envName : "",
    availableModels : [],
    availableDatasets : [],
    errors : null,
  },

  getters: {
    getUserId : state => {
      return state.userId;
    },
    getUsername : state => {
      return state.username;
    },
    getAvailableEnvs : state => {
      return state.availableEnvs;
    },
    getEnvId : state => {
      return state.envId;
    },
    getEnvName : state => {
      return state.envName;
    },
    getAvailableModels : state => {
      return state.availableModels;
    },
    getAvailableDatasets : state => {
      return state.availableDatasets;
    },
    getSession : state => {
      return {
        "user_id" : state.userId,
        "username" : state.username,
        "env_id" : state.envId,
        "env_name" : state.envName,
      }
    }
  },

  mutations: {
    setUserId : (state, userIdValue) => {
      state.userId = userIdValue
    },
    setUsername : (state, usernameValue) => {
      state.username = usernameValue
    },
    setAvailableEnvs : (state, availableEnvs) => {
      state.availableEnvs = availableEnvs
    },
    setEnvId : (state, envIdValue) => {
      state.envId = envIdValue
    },
    setEnvName : (state, envNameValue) => {
      state.envName = envNameValue
    },
    setAvailableModels : (state, availableModels) => {
      state.availableModels = availableModels
    },
    setAvailableDatasets : (state, availableDatasets) => {
      state.availableDatasets = availableDatasets
    },
  },

  actions: {
  },

  modules: {
  }
})
