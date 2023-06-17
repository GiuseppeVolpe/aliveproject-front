<template>
    <div class="row">
        <div class="col-12 ml-2 mr-2 pl-2 pr-2">
            <div class="row mt-3">
                <div class="col-4">
                    <small class="form-text text-muted">Model Name</small>
                    <input type="text" name="modelName" class="form-control mb-2" placeholder="New model name" minlength="8"
                        maxlength="50" v-model="newModelName" />
                </div>

                <div class="col-4">
                    <small class="form-text text-muted">Model Type</small>
                    <b-form-select v-model="selectedModelType" :options="getAvailableModelTypes" class="form-control"
                        size="lg">
                        <option value="null" disabled hidden>Select model type</option>
                    </b-form-select>
                </div>
                <div class="col-4">
                    <small class="form-text text-muted">Finetunable</small>
                    <b-checkbox switch v-model="finetunable" class="mt-2" />

                </div>

            </div>

            <div class="row">
                <div class="col-4">

                    <small class="form-text text-muted">Base Model</small>
                    <b-form-select v-model="selectedBaseModel" :options="getAvailableBaseModels" class="form-control"
                        size="lg">
                        <option value="null" disabled hidden>Select base model</option>
                    </b-form-select>
                </div>

                <div class="col-4">
                    <small class="form-text text-muted">Output shape</small>
                    <input type="number" name="outputShape" min="1" class="form-control mb-2" placeholder="Output shape"
                        v-model="outputShape" />
                </div>

                <div class="col-4">
                    <small class="form-text text-muted">Encoder is trainable</small>
                    <b-form-checkbox switch name="encoderTrainable" v-model="encoderTrainable" class="mt-2">
                    </b-form-checkbox>
                </div>

            </div>

            <div class="row">
                <div class="col-4">
                    <small class="form-text text-muted">Dropout rate</small>
                    <input type="number" name="dropoutRate" min="0.1" step="0.1" class="form-control mb-2"
                        placeholder="Dropout rate" v-model="dropoutRate" />

                </div>
                <div class="col-4">
                    <small class="form-text text-muted">Optimizer learning rate</small>
                    <input type="number" name="optimizerLR" min="0.000005" step="0.000005" class="form-control mb-2"
                        placeholder="Optimizer learning rate" v-model="optimizerLearningRate" />

                </div>
            </div>

            <div class="row">

                <div class="col-4 offset-4">
                    <small class="form-text text-muted">Public</small>
                    <b-form-checkbox switch name="public" v-model="publicModel" class="mt-2">
                    </b-form-checkbox>
                </div>
            </div>

            <div class="row mt-3">

                <div class="col-4 offset-4">
                    <b-button class="col-12 mb-3" @click="createNewModel(newModelName)" :disabled="!createButtonIsEnabled">
                        Create new model
                    </b-button>
                </div>
            </div>

            <PulseLoader :loading="loading"></PulseLoader>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import store from "@/store";

export default {
    name: "ModelCreationComponent",

    components: {
        PulseLoader,
    },

    data() {
        return {
            newModelName: null,
            selectedModelType: null,
            finetunable: null,
            selectedBaseModel: null,
            outputShape: null,
            encoderTrainable: null,
            dropoutRate: null,
            optimizerLearningRate: null,
            publicModel: null,
            loading: false,
        };
    },

    mounted() {
        this.finetunable = false
        this.outputShape = 1
        this.encoderTrainable = false
        this.dropoutRate = 0.3
        this.optimizerLearningRate = 1e-5
        this.publicModel = false
        this.loading = false
    },

    computed: {
        ...mapGetters([
            "getAvailableModelTypes",
            "getAvailableBaseModels",
            "getUserId",
            "getSelectedEnvId",
            "getSession",
            "getAvailableModels",
            "isWaitingForServerResponse"
        ]),

        createButtonIsEnabled() {

            if (this.isWaitingForServerResponse) {
                return false
            }

            var newModelNameIsSet = this.newModelName != null && this.newModelName.length > 0

            if (newModelNameIsSet) {
                for (var i = 0; i < this.getAvailableModels.length; i++) {
                    var currentModel = this.getAvailableModels[i]
                    var currentName = currentModel.value.name

                    if (this.newModelName == currentName) {
                        return false
                    }
                }
            } else {
                return false
            }

            var fieldsAreSet = this.selectedModelType != null && this.finetunable != null &&
                this.selectedBaseModel != null && this.outputShape != null &&
                this.encoderTrainable != null && this.dropoutRate != null &&
                this.optimizerLearningRate != null && this.publicModel != null

            return fieldsAreSet
        },
    },

    methods: {
        ...mapMutations([
            "setWaitingForServerResponse",
            "resetState",
        ]),
        ...mapActions([
            "pushAlertAction",
            "updateAvailableModelsAction",
        ]),

        createNewModel() {

            if (this.isWaitingForServerResponse) {
                return
            }

            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.$store.commit("pushAlert", "Lost your session data... try to login again.")
                this.resetState()
                this.$router.push("/")
                return
            }

            this.loading = true
            this.setWaitingForServerResponse(true)

            var url_to_create_model = process.env.VUE_APP_API_URL + "create_model"

            var payload = {
                "session": this.getSession,
                "model_name": this.newModelName,
                "model_type": this.selectedModelType,
                "finetunable": this.finetunable,
                "base_model": this.selectedBaseModel,
                "output_shape": this.outputShape,
                "encoder_trainable": this.encoderTrainable,
                "dropout_rate": this.dropoutRate,
                "optimizer_lr": this.optimizerLearningRate,
                "public": this.publicModel,
            }

            var createdModelName = this.newModelName

            axios.post(url_to_create_model, payload)
                .then(response => {

                    var responseData = response.data

                    switch (responseData.code) {
                        case 1:
                            this.$store.commit("pushAlert", "New model created!")
                            break
                        case 1000:
                        case 1001:
                        case 1002:
                            this.$store.commit("pushAlert", "Couldn't create the new model called '" + createdModelName + "'...")
                    }

                    this.updateAvailableModelsAction()

                    this.loading = false
                    this.setWaitingForServerResponse(false)
                }).catch(function (error) {
                    console.log(error)
                    store.commit("setWaitingForServerResponse", false)
                })
        },
    },
}
</script>
