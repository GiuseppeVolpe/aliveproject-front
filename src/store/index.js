import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    availableModelTypes: [],
    availableBaseModels: [],
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
    getAvailableModelTypes: state => {
      return state.availableModelTypes;
    },
    getAvailableBaseModels: state => {
      return state.availableBaseModels;
    },
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
    setAvailableModelTypes: (state, availableModelTypes) => {
      state.availableModelTypes = availableModelTypes
    },
    setAvailableBaseModels: (state, availableBaseModels) => {
      state.availableBaseModels = availableBaseModels
    },
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

    updateAvailableModelTypesAction(context) {

      var url_to_available_model_types = process.env.VUE_APP_API_URL + "fetch_available_model_types"

      axios.post(url_to_available_model_types, null).then(response => {
        var responseData = response.data

        if (responseData.code == 1) {
          context.commit("setAvailableModelTypes", responseData.data)
        }
      })
    },

    updateAvailableBaseModelsAction(context) {

      var url_to_available_base_models = process.env.VUE_APP_API_URL + "fetch_available_base_models"

      axios.post(url_to_available_base_models, null).then(response => {
        var responseData = response.data

        if (responseData.code == 1) {
          context.commit("setAvailableBaseModels", responseData.data)
        }
      })
    },

    updateAvailableEnvsAction(context) {

      var url_to_available_envs = process.env.VUE_APP_API_URL + "get_user_envs"

      var payload = {
        "session": context.getters.getSession
      }

      axios.post(url_to_available_envs, payload).then(response => {
        var responseData = response.data

        if (responseData.code == 1) {
          context.commit("setAvailableEnvs", responseData.data)
        }
      })
    },

    closeSelectedEnvAction(context) {
      context.commit("setSelectedEnvId", null)
      context.commit("setSelectedEnvName", null)
      router.push("/env_selection")

      context.dispatch("pushAlertAction", "Environment closed!")
    },

    deleteSelectedEnvAction(context) {

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

    updateAvailableModelsAction(context) {

      if (context.getters.getUserId == null || context.getters.getSelectedEnvId == null) {
        context.dispatch("pushAlertAction", "Lost your session data... try to login again.")
        context.commit("resetState")
        router.push("/")
        return
      }

      var url_to_available_models = process.env.VUE_APP_API_URL + "get_env_models"

      var payload = {
        "session": context.getters.getSession
      }

      axios.post(url_to_available_models, payload).then(response => {
        var responseData = response.data

        if (responseData.code == 1) {
          context.commit("setAvailableModels", responseData.data)
        }
      })
    },
  },

  modules: {
  }
})
