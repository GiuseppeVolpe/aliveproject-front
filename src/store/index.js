import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    userId: null,
    username: null,
    availableEnvs: [],
    selectedEnvId: null,
    selectedEnvName: null,
    availableModels: [],
    availableDatasets: [],
    trainingSessions: [],
    generalAlerts: [],
    waitingForServerResponse: false,
  },

  getters: {
    getUserId: state => {
      return state.userId;
    },
    getUsername: state => {
      return state.username;
    },
    getAvailableEnvs: state => {
      return state.availableEnvs;
    },
    getSelectedEnvId: state => {
      return state.selectedEnvId;
    },
    getSelectedEnvName: state => {
      return state.selectedEnvName;
    },
    getAvailableModels: state => {
      return state.availableModels;
    },
    getAvailableDatasets: state => {
      return state.availableDatasets;
    },
    getTrainingSessions: state => {
      return state.trainingSessions;
    },
    getGeneralAlerts: state => {
      return state.generalAlerts;
    },
    isWaitingForServerResponse: state => {
      return state.waitingForServerResponse
    },
    getSession: state => {
      return {
        "user_id": state.userId,
        "username": state.username,
        "env_id": state.selectedEnvId,
        "env_name": state.selectedEnvName,
      }
    }
  },

  mutations: {
    setUserId: (state, userId) => {
      state.userId = userId
    },
    setUsername: (state, username) => {
      state.username = username
    },
    setAvailableEnvs: (state, availableEnvs) => {
      state.availableEnvs = availableEnvs
    },
    setSelectedEnvId: (state, envId) => {
      state.selectedEnvId = envId
    },
    setSelectedEnvName: (state, envName) => {
      state.selectedEnvName = envName
    },
    setAvailableModels: (state, availableModels) => {
      state.availableModels = availableModels
    },
    setAvailableDatasets: (state, availableDatasets) => {
      state.availableDatasets = availableDatasets
    },
    setTrainingSessions: (state, trainingSessions) => {
      state.trainingSessions = trainingSessions
    },
    pushAlert: (state, alert) => {

      if (state.generalAlerts.length > 0) {
        state.generalAlerts.pop()
      }

      state.generalAlerts.push(alert)
    },
    popAlert: (state) => {
      if (state.generalAlerts.length > 0) {
        state.generalAlerts.pop()
      }
    },
    setWaitingForServerResponse: (state, waitingForServerResponse) => {
      state.waitingForServerResponse = waitingForServerResponse
    },
    resetState: (state) => {
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
    pushAlertAction(context, alert) {
      context.commit('pushAlert', alert)
      setTimeout(() => { context.commit('popAlert') }, 2000)
    },

    deleteSelectedEnvironmentAction(context) {

      var url_to_delete_env = process.env.VUE_APP_API_URL + "delete_env"

      var payload = {
        "session": context.getters.getSession,
        "env_name": context.getters.getSelectedEnvName,
      }

      axios.post(url_to_delete_env, payload).then(response => {

        var responseData = response.data

        context.commit("setSelectedEnvId", null)
        context.commit("setSelectedEnvName", null)
        router.push("/env_selection")
        
        switch (responseData.code) {
          case 1:
            context.dispatch("pushAlertAction", "Environment deleted succesfully!")
            break
          case 1000:
          case 1001:
          case 1002:
            context.dispatch("pushAlertAction", "Couldn't delete the environment...")
        }
      })
    },

    closeSelectedEnvironmentAction(context) {
      context.commit("setSelectedEnvId", null)
      context.commit("setSelectedEnvName", null)
      router.push("/env_selection")

      context.dispatch("pushAlertAction", "Environment closed!")
    },

  },

  modules: {
  }
})
