<template>
    <div class="row">
        <div class="col-12 ml-2 mr-2 pl-2 pr-2">
            <div class="row mt-3">
                <div class="col-4 offset-4">

                    <small class="form-text text-muted">Model To Delete</small>
                    <b-form-select v-model="modelToDelete" :options="getAvailableModels" class="form-control" size="lg">
                        <option value="null" disabled hidden>Select Model to delete</option>
                    </b-form-select>
                </div>
            </div>
            <div class="row mt-3">

                <div class="col-4 offset-4">
                    <b-button class="col-12 mb-3" @click="deleteModel(modelToDelete)"
                        :disabled="!deleteButtonIsEnabled">Delete model</b-button>
                </div>
            </div>
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
            return this.modelToDelete != null && !this.isWaitingForServerResponse
        },
    },

    methods: {
        ...mapMutations([
            "resetState",
            "setWaitingForServerResponse",
        ]),
        ...mapActions([
            "pushAlertAction",
            "updateAvailableModelsAction",
        ]),

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

                this.updateAvailableModelsAction()
                this.setWaitingForServerResponse(false)
            })
            .catch(function (error) {
                this.pushAlertAction(error.toJSON())

                this.loading = false
                this.setWaitingForServerResponse(false)
            })
        },
    },
}

</script>
