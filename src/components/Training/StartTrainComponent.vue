<template>
    <div>
        <div>
            <li v-for="(trainingSession, index) in getTrainingQueue" :key="index">
                {{ trainingSession.text }} , {{ trainingSession.value.num_of_epochs }} epochs
            </li>

            <b-button class="col-12 mb-3" @click="startTrain()" :disabled="!startButtonIsEnabled">Start training</b-button>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

export default {
    name: "StartTrainComponent",

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
            "getTrainingQueue",
            "isWaitingForServerResponse",
        ]),

        startButtonIsEnabled() {
            return this.getTrainingQueue != null && this.getTrainingQueue.length > 0 && !this.isWaitingForServerResponse
        },
    },

    methods: {
        ...mapMutations([
            "resetState",
            "setWaitingForServerResponse",
        ]),
        ...mapActions([
            "pushAlertAction",
            "updateTrainingQueueAction",
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
