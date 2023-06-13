<template>
    <div>
        <EnvironmentSpaceBar></EnvironmentSpaceBar>
        <div>
            <input name="modelName" type="text" class="form-control mb-2" placeholder="New model name" maxlength="50"
                minlength="8" v-model="newModelName" />
            <b-button class="col-12 mb-3 buttonColor" @click="createNewModel(newModelName)">Create new model</b-button>
        </div>
        <div>
            <b-form-select v-model="modelToDelete" :options="getAvailableModels" class="form-control" size="lg">
                <option value="null" disabled hidden>Select Model to delete</option>
            </b-form-select>
            <b-button class="col-12 mb-3 buttonColor" @click="deleteModel(modelToDelete)">Delete model</b-button>
        </div>
        <div>
            <b-form-select v-model="modelForPrediction" :options="getAvailableModels" class="form-control" size="lg">
                <option value="null" disabled hidden>Select Model to make a prediction</option>
            </b-form-select>
            <input name="sentenceToPredict" type="text" class="form-control mb-2" placeholder="Sentence to predict" maxlength="50"
                minlength="8" v-model="sentenceToPredict" />
            <input name="prediction" type="text" class="form-control mb-2" placeholder="Prediction" maxlength="50"
                minlength="8" v-model="prediction" />
            <b-button class="col-12 mb-3 buttonColor" @click="getPrediction(modelForPrediction, sentenceToPredict)">Predict</b-button>
        </div>
    </div>
</template>

<script>
import EnvironmentSpaceBar from '@/components/EnvironmentSpaceBar'
import { mapGetters, mapMutations } from "vuex";
import axios from 'axios';

export default {
    name: "ModelsComponent",
    data() {
        return {
            newModelName: null,
            modelToDelete: null,
            modelForPrediction: null,
            sentenceToPredict: null,
            prediction: null,
        };
    },
    mounted() {
        this.updateAvailableModels()
    },
    computed: {
        ...mapGetters([
            "getSession",
            "getAvailableModels"
        ]),
    },
    methods: {
        ...mapMutations([
            "setAvailableModels"
        ]),

        createNewModel(modelName) {
            console.log(modelName)
        },

        deleteModel(modelToDelete) {
            if (modelToDelete == null) {
                return
            }

            var url_to_delete_model = process.env.VUE_APP_API_URL + "delete_model"

            var payload = {
                "session": this.getSession,
                "model_name": modelToDelete.name,
            }

            axios.post(url_to_delete_model, payload).then( response => {
                console.log(response)
                this.updateAvailableModels()   
            })
        },

        updateAvailableModels() {
            var url_to_available_models = process.env.VUE_APP_API_URL + "get_env_models"

            var payload = {
                "session": this.getSession
            }

            axios.post(url_to_available_models, payload).then(env_response => {
                var envResponseData = env_response.data

                console.log(envResponseData)

                if (envResponseData.code == 1) {
                    this.setAvailableModels(envResponseData.data)
                }
            })
        },

        getPrediction(modelForPrediction, sentenceToPredict) {
            var url_to_predict = process.env.VUE_APP_API_URL + "predict"

            var payload = {
                "session": this.getSession, 
                "model_name": modelForPrediction.name, 
                "sent": sentenceToPredict,
            }

            axios.post(url_to_predict, payload).then(response => {
                var responseData = response.data

                console.log(responseData.data)

                this.prediction = responseData.data.prediction
            })
        },
    },
    components: { EnvironmentSpaceBar }
}

</script>
