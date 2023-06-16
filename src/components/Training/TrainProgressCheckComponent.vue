<template>
    <div>
        <div>

            <div v-if="isTrainingInProgress && (currentSessionEpoch > 0)">
                <rotate-loader :loading="isTrainingInProgress"></rotate-loader>

                Now training {{ currentSessionModelName }} on {{ currentSessionDatasetName }},
                epoch {{ currentSessionEpoch }} out of {{ currentSessionEpochsLeft }}.
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import axios from 'axios';

import RotateLoader from 'vue-spinner/src/RotateLoader.vue'

export default {
    name: "StartTrainComponent",

    components: {
        RotateLoader,
    },

    data() {
        return {
            currentSessionIndex: 0,
            currentSessionModelName: null,
            currentSessionDatasetName: null,
            currentSessionEpoch: 0,
            currentSessionEpochsLeft: 0,
            timer: null,
        };
    },

    mounted() {
        this.$root.$on("TrainingStarted", () => {
            this.timer = setInterval(() => {
                this.updateTrainQueueProgressInfos()
            }, 4000)
        })

        this.$root.$on("TrainingStopped", () => {
            clearInterval(this.timer)
        })
    },

    computed: {
        ...mapGetters([
            "getUserId",
            "getSelectedEnvId",
            "getSession",
            "getTrainQueue",
            "isTrainingInProgress",
            "isWaitingForServerResponse",
        ]),

    },

    methods: {
        ...mapMutations([
            "resetState",
            "setWaitingForServerResponse",
        ]),
        ...mapActions([
            "pushAlertAction",
            "updateTrainQueueAction",
            "setTrainingInProgress",
            "waitForTrainingToFinishAction",
        ]),

        updateTrainQueueProgressInfos() {

            var url_to_infos = process.env.VUE_APP_API_URL + "get_train_queue_progress_info"

            var payload = {
                "session": this.getSession,
            }

            axios.post(url_to_infos, payload).then(response => {

                var responseData = response.data

                switch (responseData.code) {
                    case 1:
                        var data = responseData.data

                        if (data != null) {
                            this.currentSessionIndex = data.current_session_index
                            this.currentSessionModelName = data.current_session_model_name
                            this.currentSessionDatasetName = data.current_session_dataset_name
                            this.currentSessionEpoch = data.current_session_epoch
                            this.currentSessionEpochsLeft = data.current_session_epochs_left
                        } else {
                            this.setTrainingInProgress(false)
                        }

                        break
                    case 1000:
                    case 1001:
                    case 1002:
                        break
                }

            }).catch(function (error) {
                console.log(error)
            })
        }
    },

}

</script>
