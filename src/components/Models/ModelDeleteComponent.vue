<template>
    <div>
        <div>
            <b-form-select v-model="modelToDelete" :options="getAvailableModels" class="form-control" size="lg">
                <option value="null" disabled hidden>Select Model to delete</option>
            </b-form-select>
            <b-button class="col-12 mb-3" @click="deleteModel(modelToDelete)"
                :disabled="!deleteButtonIsEnabled">Delete model</b-button>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

export default {
    name: "ModelDeleteComponent",

    data() {
        return {
            modelToDelete: null,
        };
    },

    mounted() {
        //this.updateAvailableModels()
    },

    computed: {
        ...mapGetters([
            "getUserId",
            "getSelectedEnvId",
            "getSession",
            "getAvailableModels",
            "isWaitingForServerResponse",
        ]),

        deleteButtonIsEnabled() {
            return this.modelToDelete != null
        },
    },

    methods: {
        ...mapMutations([
            "setAvailableModels",
            "resetState",
            "setWaitingForServerResponse",
        ]),
        ...mapActions([
            "pushAlertAction",
        ]),

        updateAvailableModels() {

            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.pushAlertAction("Lost your session data... try to login again.")
                this.resetState()
                this.$router.push("/")
                return
            }

            var url_to_available_models = process.env.VUE_APP_API_URL + "get_env_models"

            var payload = {
                "session": this.getSession
            }

            axios.post(url_to_available_models, payload).then(response => {
                var envResponseData = response.data

                console.log(envResponseData)

                if (envResponseData.code == 1) {
                    this.setAvailableModels(envResponseData.data)
                }
            })
        },

        deleteModel(modelToDelete) {

            if (this.isWaitingForServerResponse) {
                return
            }

            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.pushAlertAction("Lost your session data... try to login again.")
                this.resetState()
                this.$router.push("/")
                return
            }

            if (modelToDelete == null) {
                return
            }

            this.setWaitingForServerResponse(true)

            var url_to_delete_model = process.env.VUE_APP_API_URL + "delete_model"

            var payload = {
                "session": this.getSession,
                "model_name": modelToDelete.name,
            }

            axios.post(url_to_delete_model, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        this.pushAlertAction("Model deleted!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.pushAlertAction("Couldn't delete the model...")
                }

                this.updateAvailableModels()
                this.setWaitingForServerResponse(false)
            })
        },
    },
}

</script>
