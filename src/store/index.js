import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    userId : null,
    username : null,
    availableEnvs : [],
    selectedEnvId : null,
    selectedEnvName : null,
    availableModels : [],
    availableDatasets : [],
    trainingSessions : [],
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
    getSelectedEnvId : state => {
      return state.selectedEnvId;
    },
    getSelectedEnvName : state => {
      return state.selectedEnvName;
    },
    getAvailableModels : state => {
      return state.availableModels;
    },
    getAvailableDatasets : state => {
      return state.availableDatasets;
    },
    getTrainingSessions : state => {
      return state.trainingSessions;
    },
    getSession : state => {
      return {
        "user_id" : state.userId,
        "username" : state.username,
        "env_id" : state.selectedEnvId,
        "env_name" : state.selectedEnvName,
      }
    }
  },

  mutations: {
    setUserId : (state, userId) => {
      state.userId = userId
    },
    setUsername : (state, username) => {
      state.username = username
    },
    setAvailableEnvs : (state, availableEnvs) => {
      state.availableEnvs = availableEnvs
    },
    setSelectedEnvId : (state, envId) => {
      state.selectedEnvId = envId
    },
    setSelectedEnvName : (state, envName) => {
      state.selectedEnvName = envName
    },
    setAvailableModels : (state, availableModels) => {
      state.availableModels = availableModels
    },
    setAvailableDatasets : (state, availableDatasets) => {
      state.availableDatasets = availableDatasets
    },
    setTrainingSessions : (state, trainingSessions) => {
      state.trainingSessions = trainingSessions
    },
    resetState : (state) => {
      state.userId = null
      state.username = null
      state.availableEnvs = []
      state.selectedEnvId = null
      state.selectedEnvName = null
      state.availableModels = []
      state.availableDatasets = []
      state.trainingSessions = []
    }
  },

  actions: {
  },

  modules: {
  }
})
