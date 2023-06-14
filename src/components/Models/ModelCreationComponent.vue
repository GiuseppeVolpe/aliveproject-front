<template>
    <div>
        <input type="text" name="modelName" class="form-control mb-2" placeholder="New model name" minlength="8"
            maxlength="50" v-model="newModelName" />

        <b-form-select v-model="selectedModelType" :options="availableModelTypes" class="form-control" size="lg">
            <option value="null" disabled hidden>Select model type</option>
        </b-form-select>

        <input type="checkbox" name="finetunable" v-model="finetunable" />
        <div>Finetunable: {{ finetunable }}</div>

        <b-form-select v-model="selectedBaseModel" :options="availableBaseModels" class="form-control" size="lg">
            <option value="null" disabled hidden>Select base model</option>
        </b-form-select>

        <input type="number" name="outputShape" min="1" class="form-control mb-2" placeholder="Output shape"
            v-model="outputShape" />

        <input type="checkbox" name="encoderTrainable" v-model="encoderTrainable" />
        <div>Encoder is trainable: {{ encoderTrainable }}</div>

        <input type="number" name="dropoutRate" min="0.1" step="0.1" class="form-control mb-2" placeholder="Dropout rate"
            v-model="dropoutRate" />

        <input type="number" name="optimizerLR" min="0.000005" step="0.000005" class="form-control mb-2"
            placeholder="Optimizer learning rate" v-model="optimizerLearningRate" />

        <input type="checkbox" name="public" v-model="publicModel" />
        <div>Public: {{ publicModel }}</div>

        <b-button class="col-12 mb-3" @click="createNewModel(newModelName)" :disabled="!createButtonIsEnabled">
            Create new model
        </b-button>

        {{ isWaitingForServerResponse }}
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

export default {
    name: "ModelCreationComponent",

    data() {
        return {
            newModelName: null,
            availableModelTypes: null,
            selectedModelType: null,
            finetunable: null,
            availableBaseModels: null,
            selectedBaseModel: null,
            outputShape: null,
            encoderTrainable: null,
            dropoutRate: null,
            optimizerLearningRate: null,
            publicModel: null,
        };
    },

    mounted() {
        this.updateAvailableModels()
        this.updateAvailableModelTypes()
        this.updateAvailableBaseModels()

        this.finetunable = false
        this.outputShape = 1
        this.encoderTrainable = false
        this.dropoutRate = 0.3
        this.optimizerLearningRate = 1e-5
        this.publicModel = false
    },

    computed: {
        ...mapGetters([
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
            "setAvailableModels",
            "setWaitingForServerResponse",
            "resetState",
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
                var responseData = response.data

                if (responseData.code == 1) {
                    this.setAvailableModels(responseData.data)
                }
            })
        },

        updateAvailableModelTypes() {
            var url_to_available_model_types = process.env.VUE_APP_API_URL + "fetch_available_model_types"

            axios.post(url_to_available_model_types, null).then(response => {
                var responseData = response.data

                if (responseData.code == 1) {
                    this.availableModelTypes = responseData.data
                }
            })
        },

        updateAvailableBaseModels() {
            var url_to_available_base_models = process.env.VUE_APP_API_URL + "fetch_available_base_models"

            axios.post(url_to_available_base_models, null).then(response => {
                var responseData = response.data

                if (responseData.code == 1) {
                    this.availableBaseModels = responseData.data
                }
            })
        },

        createNewModel() {

            if (this.isWaitingForServerResponse) {
                return
            }
            
            if (this.getUserId == null || this.getSelectedEnvId == null) {
                this.pushAlertAction("Lost your session data... try to login again.")
                this.resetState()
                this.$router.push("/")
                return
            }

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

            axios.post(url_to_create_model, payload).then(response => {

                var responseData = response.data
                
                switch (responseData.code) {
                    case 1:
                        this.pushAlertAction("New model created!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.pushAlertAction("Couldn't create the new model called '" + createdModelName + "'...")
                }

                this.updateAvailableModels()
                this.setWaitingForServerResponse(false)
            })
        },
    },
}
</script>