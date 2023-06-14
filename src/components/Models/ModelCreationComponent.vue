<template>
    <div>
        <input name="modelName" type="text" class="form-control mb-2" placeholder="New model name" maxlength="50"
            minlength="8" v-model="newModelName" />

        <b-button class="col-12 mb-3 buttonColor" @click="createNewModel(newModelName)" :disabled="!createButtonIsEnabled">
            Create new model
        </b-button>
    </div>
</template>

<script>
import EnvironmentSpaceBar from '@/components/EnvironmentSpaceBar'
import { mapGetters, mapMutations } from "vuex";
import axios from 'axios';

export default {
    name: "ModelsComponent",

    components: { EnvironmentSpaceBar },

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
            public: null,
        };
    },

    mounted() {
        this.updateAvailableModelTypes()
        this.updateAvailableModelTypes()
    },

    computed: {
        ...mapGetters([
            "getSession",
            "getAvailableModels"
        ]),

        createButtonIsEnabled() {
            var newModelNameIsSet = this.newModelName != null && this.newModelName.length > 0

            if (newModelNameIsSet) {
                for (var i = 0; i < this.getAvailableModels.length; i++) {
                    var currentModel = this.getAvailableModels[i]
                    var currentName = currentModel.value.name

                    if (this.newEnvName == currentName) {
                        return false
                    }
                }
            } else {
                return false
            }

            fieldsAreSet = this.selectedModelType != null && this.finetunable != null && this.selectedBaseModel != null &&
                this.outputShape != null && this.encoderTrainable != null &&
                this.dropoutRate != null && this.optimizerLearningRate != null &&
                this.public != null

            return fieldsAreSet
        },
    },

    methods: {
        ...mapMutations([
            "setAvailableModels"
        ]),

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

        createNewModel(modelName) {

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
                "public": this.public,
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
            })
        },

    },
}
</script>
