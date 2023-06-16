<template>
    <div>
        <div>
            <li v-for="(trainingSession, index) in getTrainQueue" :key="index">
                {{ trainingSession.text }} , {{ trainingSession.value.num_of_epochs }} epochs
            </li>

            <b-button class="col-12 mb-3" @click="startTrain()" :disabled="!startButtonIsEnabled">Start training</b-button>

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
    },

    methods: {
        ...mapMutations([
            "resetState",
            "setWaitingForServerResponse",
        ]),
        ...mapActions([
            "pushAlertAction",
            "updateTrainQueueAction",
            "waitForTrainingToFinishAction",
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
                        this.pushAlertAction("Training started!")
                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        this.pushAlertAction("Couldn't start training...")
                }

                this.setWaitingForServerResponse(false)
            })            
            .catch(function (error) {
                this.pushAlertAction(error.toJSON())

                this.setWaitingForServerResponse(false)
            })
        }
    },
}

</script>
