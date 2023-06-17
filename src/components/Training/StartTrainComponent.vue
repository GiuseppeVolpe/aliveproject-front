<template>
    <div>
        <div class="row mt-3 mb-3">

            <div class="col-10">
                <b-list-group>
                    <b-list-group-item v-for="(trainingSession, index) in getTrainQueue" :key="index">
                        <b-badge pill variant="primary">{{ index }}</b-badge>
                        {{ trainingSession.text }}, {{ trainingSession.value.num_of_epochs }} epochs
                    </b-list-group-item>
                </b-list-group>
            </div>

            <div class="col-2">

                <div class="row">
                    <b-button @click="startTrain()" :disabled="!startButtonIsEnabled">Start training</b-button>
                </div>

                <div class="row mt-2">
                    <b-button @click="stopTrain()" :disabled="!stopButtonIsEnabled">Stop training</b-button>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

export default {
    name: "StartTrainComponent",

    components: {

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
                        this.$root.$emit("pushAlert", "Training started!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.$root.$emit("pushAlert", "Couldn't start training...")
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
                        this.$root.$emit("pushAlert", "Training stopped!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.$root.$emit("pushAlert", "Couldn't stop training...")
                }

                this.setWaitingForServerResponse(false)

            }).catch(function (error) {
                //this.$root.$emit("pushAlert", error.toJSON())
                console.log(error)

                this.setWaitingForServerResponse(false)
            })
        }
    },
}

</script>
