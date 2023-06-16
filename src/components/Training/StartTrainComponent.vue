<template>
    <div>
        <div>
            <li v-for="(trainingSession, index) in getTrainQueue" :key="index">
                {{ trainingSession.text }} , {{ trainingSession.value.num_of_epochs }} epochs
            </li>

            <b-button class="col-12 mb-3" @click="startTrain()" :disabled="!startButtonIsEnabled">Start training</b-button>

            <b-button class="col-12 mb-3" @click="stopTrain()" :disabled="!stopButtonIsEnabled">Stop training</b-button>

            <TrainProgressCheckComponent></TrainProgressCheckComponent>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

import TrainProgressCheckComponent from "./TrainProgressCheckComponent";

export default {
    name: "StartTrainComponent",

    components: {
        TrainProgressCheckComponent,
    },

    data() {
        return {

        };
    },

    mounted() {

    },

    computed: {
        ...mapGetters([
            "getUserId",
            "getSelectedEnvId",
            "getSession",
            "getTrainQueue",
            "isWaitingForServerResponse",
        ]),

        startButtonIsEnabled() {
            return this.getTrainQueue != null && this.getTrainQueue.length > 0 && !this.isWaitingForServerResponse
        },

        stopButtonIsEnabled() {
            return true
        }
    },

    methods: {
        ...mapMutations([
            "resetState",
            "setWaitingForServerResponse",
            "setTrainingInProgress",
        ]),
        ...mapActions([
            "pushAlertAction",
            "updateTrainQueueAction",
        ]),

        startTrain() {

            var url_to_start_training_session = process.env.VUE_APP_API_URL + "start_train"

            var payload = {
                "session": this.getSession,
            }

            axios.post(url_to_start_training_session, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        this.$root.$emit("TrainingStarted")
                        this.setTrainingInProgress(true)
                        this.pushAlertAction("Training started!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.pushAlertAction("Couldn't start training...")
                }

                this.setWaitingForServerResponse(false)

            }).catch(function (error) {
                console.log(error)
            })
        },

        stopTrain() {

            var url_to_start_training_session = process.env.VUE_APP_API_URL + "stop_train"

            var payload = {
                "session": this.getSession,
            }

            axios.post(url_to_start_training_session, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        this.$root.$emit("TrainingStopped")
                        this.setTrainingInProgress(false)
                        this.pushAlertAction("Training stopped!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.pushAlertAction("Couldn't stop training...")
                }

                this.setWaitingForServerResponse(false)

            }).catch(function (error) {
                //this.pushAlertAction(error.toJSON())
                console.log(error)

                this.setWaitingForServerResponse(false)
            })
        }
    },
}

</script>
