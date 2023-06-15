<template>
    <div>

        <div>
            <b-form-select v-model="modelForPrediction" :options="getAvailableModels" class="form-control" size="lg">
                <option value="null" disabled hidden>Select Model to make a prediction</option>
            </b-form-select>
            <input type="text" name="sentenceToPredict" class="form-control mb-2" placeholder="Sentence to predict"
                maxlength="500" v-model="sentenceToPredict" />
            <input type="text" name="prediction" class="form-control mb-2" placeholder="Prediction" maxlength="500"
                v-model="prediction" readonly />
            <b-button class="col-12 mb-3" @click="getPrediction(modelForPrediction, sentenceToPredict)"
                :disabled="!predictButtonIsEnabled">Predict</b-button>
        </div>

        <PulseLoader :loading="loading"></PulseLoader>

    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
    name: "ModelPredictionComponent",

    components: {
        PulseLoader,
    },

    data() {
        return {
            modelForPrediction: null,
            sentenceToPredict: null,
            prediction: null,
            loading: false,
        };
    },

    mounted() {

    },

    computed: {
        ...mapGetters([
            "getSession",
            "getAvailableModels",
            "isWaitingForServerResponse",
        ]),

        predictButtonIsEnabled() {
            var modelIsSet = this.modelForPrediction != null
            var sentenceIsSet = this.sentenceToPredict != null && this.sentenceToPredict.length > 0

            return modelIsSet && sentenceIsSet && !this.isWaitingForServerResponse
        }
    },

    methods: {
        ...mapMutations([
            "setWaitingForServerResponse",
        ]),
        ...mapActions([
            "pushAlertAction",
        ]),

        getPrediction(modelForPrediction, sentenceToPredict) {

            if (this.isWaitingForServerResponse) {
                return
            }

            this.loading = true
            this.setWaitingForServerResponse(true)

            var url_to_predict = process.env.VUE_APP_API_URL + "predict"

            var payload = {
                "session": this.getSession,
                "model_name": modelForPrediction.name,
                "sent": sentenceToPredict,
            }

            axios.post(url_to_predict, payload).then(response => {
                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        this.prediction = responseData.data.prediction
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.pushAlertAction("Something went wrong when trying to predict...")
                }

                this.loading = false
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
